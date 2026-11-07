
import mongoose from "mongoose";
import Organization from "../models/organization.models.js";
import Payment from "../models/payment.models.js";

// Only successful and verified payments are included
const getSuccessfulPaymentFilter = () => ({
  status: "PAID",
  signatureVerified: true,
  organization: { $ne: null },
});

// Format payment statistics for one organization
const buildOrganizationAnalytics = (organization, paymentGroups) => {
  const uniqueStudents = new Set();

  let totalRevenue = 0;
  let totalTransactions = 0;

  const courses = paymentGroups.map((group) => {
    group.students.forEach((studentId) => {
      uniqueStudents.add(studentId.toString());
    });

    totalRevenue += group.totalRevenue;
    totalTransactions += group.totalTransactions;

    return {
      courseId: group.courseId,
      courseTitle: group.courseTitle,
      totalStudents: group.students.length,
      totalRevenue: group.totalRevenue,
      totalTransactions: group.totalTransactions,
    };
  });

  return {
    organizationId: organization._id,
    organizationName: organization.name,

    totalStudents: uniqueStudents.size,
    totalRevenue,
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

        totalRevenue: {
          $sum: "$amount",
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
        totalRevenue: 1,
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

  let totalRevenue = 0;
  let totalTransactions = 0;

  for (const organization of organizationAnalytics) {
    totalRevenue += organization.totalRevenue;
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

  return {
    summary: {
      totalOrganizations: organizations.length,
      totalStudents: globalTotalStudents,
      totalRevenue,
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
    {
      $group: {
        _id: {
          course: "$course",
          courseTitle: "$courseTitle",
        },

        students: {
          $addToSet: "$student",
        },

        totalRevenue: {
          $sum: "$amount",
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
        totalRevenue: 1,
        totalTransactions: 1,
      },
    },
  ]);

  return buildOrganizationAnalytics(organization, paymentGroups);
};
