
import mongoose from "mongoose";
import Organization from "../models/organization.models.js";
import Payment from "../models/payment.models.js";

const GST_RATE = 0.18;
const RAZORPAY_FEE_RATE = 0.02;

const paiseToRupees = (paise) => Number((paise / 100).toFixed(2));

const getPaymentAmountStages = () => [
  {
    $set: {
      grossAmountPaise: {
        $round: [{ $multiply: ["$amount", 100] }, 0],
      },
    },
  },
  {
    $set: {
      gstDeductionPaise: {
        $round: [{ $multiply: ["$grossAmountPaise", GST_RATE] }, 0],
      },
      razorpayFeePaise: {
        $round: [{ $multiply: ["$grossAmountPaise", RAZORPAY_FEE_RATE] }, 0],
      },
    },
  },
  {
    $set: {
      payableAmountPaise: {
        $subtract: [
          "$grossAmountPaise",
          { $add: ["$gstDeductionPaise", "$razorpayFeePaise"] },
        ],
      },
    },
  },
];

const sumGroupAmountPaise = (groups, field) =>
  groups.reduce((total, group) => total + group[field], 0);

// Only successful and verified payments are included
const getSuccessfulPaymentFilter = () => ({
  status: "PAID",
  signatureVerified: true,
  organization: { $ne: null },
});

// Format payment statistics for one organization
const buildOrganizationAnalytics = (organization, paymentGroups) => {
  const uniqueStudents = new Set();

  let totalTransactions = 0;

  const courses = paymentGroups.map((group) => {
    group.students.forEach((studentId) => {
      uniqueStudents.add(studentId.toString());
    });

    totalTransactions += group.totalTransactions;

    return {
      courseId: group.courseId,
      courseTitle: group.courseTitle,
      totalStudents: group.students.length,
      totalRevenue: paiseToRupees(group.grossRevenuePaise),
      grossRevenue: paiseToRupees(group.grossRevenuePaise),
      gstDeduction: paiseToRupees(group.gstDeductionPaise),
      razorpayFee: paiseToRupees(group.razorpayFeePaise),
      totalDeductions: paiseToRupees(
        group.gstDeductionPaise + group.razorpayFeePaise
      ),
      payableAmount: paiseToRupees(group.payableAmountPaise),
      totalTransactions: group.totalTransactions,
    };
  });

  const grossRevenuePaise = sumGroupAmountPaise(
    paymentGroups,
    "grossRevenuePaise"
  );
  const gstDeductionPaise = sumGroupAmountPaise(
    paymentGroups,
    "gstDeductionPaise"
  );
  const razorpayFeePaise = sumGroupAmountPaise(
    paymentGroups,
    "razorpayFeePaise"
  );
  const payableAmountPaise = sumGroupAmountPaise(
    paymentGroups,
    "payableAmountPaise"
  );

  return {
    organizationId: organization._id,
    organizationName: organization.name,

    totalStudents: uniqueStudents.size,
    totalRevenue: paiseToRupees(grossRevenuePaise),
    grossRevenue: paiseToRupees(grossRevenuePaise),
    gstDeduction: paiseToRupees(gstDeductionPaise),
    razorpayFee: paiseToRupees(razorpayFeePaise),
    totalDeductions: paiseToRupees(
      gstDeductionPaise + razorpayFeePaise
    ),
    payableAmount: paiseToRupees(payableAmountPaise),
    totalTransactions,

    courses,
  };
};

// Get all organizations with course-wise payment analytics
export const getAllOrganizationsPaymentAnalytics = async () => {
  const organizations = await Organization.find()
    .select("_id name status")
    .sort({ createdAt: -1 })
    .lean();

  const paymentGroups = await Payment.aggregate([
    {
      $match: getSuccessfulPaymentFilter(),
    },
    ...getPaymentAmountStages(),
    {
      $group: {
        _id: {
          organization: "$organization",
          course: "$course",
          courseTitle: "$courseTitle",
        },

        students: {
          $addToSet: "$student",
        },

        grossRevenuePaise: {
          $sum: "$grossAmountPaise",
        },

        gstDeductionPaise: {
          $sum: "$gstDeductionPaise",
        },

        razorpayFeePaise: {
          $sum: "$razorpayFeePaise",
        },

        payableAmountPaise: {
          $sum: "$payableAmountPaise",
        },

        totalTransactions: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        organizationId: "$_id.organization",
        courseId: "$_id.course",
        courseTitle: "$_id.courseTitle",
        students: 1,
        grossRevenuePaise: 1,
        gstDeductionPaise: 1,
        razorpayFeePaise: 1,
        payableAmountPaise: 1,
        totalTransactions: 1,
      },
    },
  ]);

  // Group payment statistics by organization
  const organizationPaymentMap = new Map();

  for (const group of paymentGroups) {
    const organizationId = group.organizationId.toString();

    if (!organizationPaymentMap.has(organizationId)) {
      organizationPaymentMap.set(organizationId, []);
    }

    organizationPaymentMap.get(organizationId).push(group);
  }

  // Include organizations even if they have no successful payments
  const organizationAnalytics = organizations.map((organization) => {
    const groups =
      organizationPaymentMap.get(organization._id.toString()) || [];

    return {
      ...buildOrganizationAnalytics(organization, groups),
      status: organization.status,
    };
  });

  // Overall unique student count across all organizations
  const allStudents = new Set();

  let totalTransactions = 0;

  for (const organization of organizationAnalytics) {
    totalTransactions += organization.totalTransactions;

    for (const course of organization.courses) {
      // Course-level unique counts are not added here because
      // the same student may purchase multiple courses.
    }
  }

  // Calculate unique students across all organizations directly
  const globalStudentResult = await Payment.aggregate([
    {
      $match: getSuccessfulPaymentFilter(),
    },
    {
      $group: {
        _id: "$student",
      },
    },
    {
      $count: "totalStudents",
    },
  ]);

  const globalTotalStudents =
    globalStudentResult[0]?.totalStudents || 0;

  const totalGrossRevenuePaise = organizationAnalytics.reduce(
    (total, organization) =>
      total + Math.round(organization.grossRevenue * 100),
    0
  );
  const totalGstDeductionPaise = organizationAnalytics.reduce(
    (total, organization) =>
      total + Math.round(organization.gstDeduction * 100),
    0
  );
  const totalRazorpayFeePaise = organizationAnalytics.reduce(
    (total, organization) =>
      total + Math.round(organization.razorpayFee * 100),
    0
  );
  const totalPayablePaise = organizationAnalytics.reduce(
    (total, organization) =>
      total + Math.round(organization.payableAmount * 100),
    0
  );

  return {
    summary: {
      totalOrganizations: organizations.length,
      totalStudents: globalTotalStudents,
      totalRevenue: paiseToRupees(totalGrossRevenuePaise),
      grossRevenue: paiseToRupees(totalGrossRevenuePaise),
      gstDeduction: paiseToRupees(totalGstDeductionPaise),
      razorpayFee: paiseToRupees(totalRazorpayFeePaise),
      totalDeductions: paiseToRupees(
        totalGstDeductionPaise + totalRazorpayFeePaise
      ),
      payableAmount: paiseToRupees(totalPayablePaise),
      totalTransactions,
    },

    organizations: organizationAnalytics,
  };
};

// Get payment analytics for one organization
export const getOrganizationPaymentAnalytics = async (organizationId) => {
  if (!mongoose.Types.ObjectId.isValid(organizationId)) {
    throw new Error("Invalid organization ID");
  }

  const organization = await Organization.findById(organizationId)
    .select("_id name status")
    .lean();

  if (!organization) {
    throw new Error("Organization not found");
  }

  const paymentGroups = await Payment.aggregate([
    {
      $match: {
        ...getSuccessfulPaymentFilter(),
        organization: new mongoose.Types.ObjectId(organizationId),
      },
    },
    ...getPaymentAmountStages(),
    {
      $group: {
        _id: {
          course: "$course",
          courseTitle: "$courseTitle",
        },

        students: {
          $addToSet: "$student",
        },

        grossRevenuePaise: {
          $sum: "$grossAmountPaise",
        },

        gstDeductionPaise: {
          $sum: "$gstDeductionPaise",
        },

        razorpayFeePaise: {
          $sum: "$razorpayFeePaise",
        },

        payableAmountPaise: {
          $sum: "$payableAmountPaise",
        },

        totalTransactions: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        courseId: "$_id.course",
        courseTitle: "$_id.courseTitle",
        students: 1,
        grossRevenuePaise: 1,
        gstDeductionPaise: 1,
        razorpayFeePaise: 1,
        payableAmountPaise: 1,
        totalTransactions: 1,
      },
    },
  ]);

  return buildOrganizationAnalytics(organization, paymentGroups);
};
