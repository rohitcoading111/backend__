import Lecture from "../models/lecture.models.js";
import Module from "../models/module.models.js";
import courseModel from "../models/course.models.js";
import imagekit from "../config/imagekit.js";
import { toFile } from "@imagekit/nodejs";
import Enrollment from "../models/enrollment.models.js";
import Payment from "../models/payment.models.js";
import User from "../models/user.models.js";
import Organization from "../models/organization.models.js";


// --------------------------------------------------
// ORGANIZATION INSTRUCTOR ACCESS HELPER
// --------------------------------------------------

const verifyInstructorCourseAccess = async ({
  instructorId,
  course,
  organizationId,
}) => {
  const instructor = await User.findOne({
    _id: instructorId,
    role: "INSTRUCTOR",
    organizationId,
    employmentStatus: "ACTIVE",
    hiredBy: { $ne: null },
  }).select("_id hiredBy organizationId employmentStatus");

  if (!instructor) {
    throw new Error("Access denied");
  }

  const organization = await Organization.findOne({
    _id: instructor.organizationId,
    owner: instructor.hiredBy,
    status: "ACTIVE",
  }).select("_id");

  if (!organization) {
    throw new Error("Access denied");
  }

  const admin = await User.findOne({
    _id: instructor.hiredBy,
    role: "ADMIN",
    adminType: "ORGANIZATION_ADMIN",
    organizationId: organization._id,
    adminStatus: { $ne: "SUSPENDED" },
  }).select("_id");

  if (!admin) {
    throw new Error("Access denied");
  }

  // Instructor must own the course and it must belong
  // to the same organization.
  if (
    !course.organizationId ||
    course.organizationId.toString() !== organizationId.toString() ||
    course.instructor.toString() !== instructorId.toString()
  ) {
    throw new Error("Access denied");
  }

  return organization;
};


// --------------------------------------------------
// ORGANIZATION ADMIN COURSE ACCESS HELPER
// --------------------------------------------------

const verifyAdminCourseAccess = async ({
  adminId,
  course,
}) => {
  const admin = await User.findOne({
    _id: adminId,
    role: "ADMIN",
    adminType: "ORGANIZATION_ADMIN",
    adminStatus: { $ne: "SUSPENDED" },
  }).select("_id organizationId");

  if (!admin || !admin.organizationId) {
    throw new Error("Access denied");
  }

  const organization = await Organization.findOne({
    _id: admin.organizationId,
    owner: admin._id,
    status: "ACTIVE",
  }).select("_id");

  if (
    !organization ||
    !course.organizationId ||
    course.organizationId.toString() !== organization._id.toString()
  ) {
    throw new Error("Access denied");
  }

  return organization;
};


// --------------------------------------------------
// CREATE LECTURE
// --------------------------------------------------

export const createLecture = async ({
  moduleId,
  instructorId,
  organizationId,
  title,
  notes,
  order,
  videoFile,
}) => {
  if (!moduleId || !instructorId || !organizationId) {
    throw new Error("Invalid module or instructor ID");
  }

  // 1. Find module
  const existingModule = await Module.findById(moduleId);

  if (!existingModule) {
    throw new Error("Module not found");
  }

  // 2. Find its course
  const course = await courseModel.findById(
    existingModule.course
  );

  if (!course) {
    throw new Error("Course not found");
  }

  // 3. Verify Instructor, Organization and Course ownership
  await verifyInstructorCourseAccess({
    instructorId,
    course,
    organizationId,
  });

  // 4. Prevent duplicate lecture order
  const existingLecture = await Lecture.findOne({
    module: moduleId,
    order,
  });

  if (existingLecture) {
    throw new Error("Lecture order already exists");
  }

  // 5. Default video
  let video = {
    url: null,
    fileId: null,
  };

  // 6. Upload video if provided
  if (videoFile) {
    const safeFileName = videoFile.originalname.replace(
      /[^a-zA-Z0-9._-]/g,
      "_"
    );

    const uploadedVideo = await imagekit.files.upload({
      file: await toFile(videoFile.buffer, safeFileName),
      fileName: `${Date.now()}-${safeFileName}`,
      folder: "/lms/course-videos",
    });

    video = {
      url: uploadedVideo.url,
      fileId: uploadedVideo.fileId,
    };
  }

  // 7. Create lecture
  const lecture = await Lecture.create({
    title,
    notes,
    module: moduleId,
    order,
    video,
  });

  return lecture;
};


// --------------------------------------------------
// UPDATE LECTURE
// --------------------------------------------------

export const updateLecture = async ({
  lectureId,
  instructorId,
  organizationId,
  title,
  notes,
  order,
  videoFile,
}) => {
  if (!lectureId || !instructorId || !organizationId) {
    throw new Error("Invalid lecture or instructor ID");
  }

  // 1. Find lecture
  const lecture = await Lecture.findById(lectureId);

  if (!lecture) {
    throw new Error("Lecture not found");
  }

  // 2. Find module
  const existingModule = await Module.findById(
    lecture.module
  );

  if (!existingModule) {
    throw new Error("Module not found");
  }

  // 3. Find course
  const course = await courseModel.findById(
    existingModule.course
  );

  if (!course) {
    throw new Error("Course not found");
  }

  // 4. Verify ownership
  await verifyInstructorCourseAccess({
    instructorId,
    course,
    organizationId,
  });

  // 5. Check duplicate order
  if (order !== undefined) {
    const existingLecture = await Lecture.findOne({
      module: lecture.module,
      order,
      _id: { $ne: lectureId },
    });

    if (existingLecture) {
      throw new Error("Lecture order already exists");
    }

    lecture.order = order;
  }

  // 6. Update text fields
  if (title !== undefined) {
    lecture.title = title;
  }

  if (notes !== undefined) {
    lecture.notes = notes;
  }

  // 7. Upload replacement video
  if (videoFile) {
    const safeFileName = videoFile.originalname.replace(
      /[^a-zA-Z0-9._-]/g,
      "_"
    );

    const uploadedVideo = await imagekit.files.upload({
      file: await toFile(videoFile.buffer, safeFileName),
      fileName: `${Date.now()}-${safeFileName}`,
      folder: "/lms/course-videos",
    });

    lecture.video = {
      url: uploadedVideo.url,
      fileId: uploadedVideo.fileId,
    };
  }

  await lecture.save();

  return lecture;
};


// --------------------------------------------------
// DELETE LECTURE
// --------------------------------------------------

export const deleteLecture = async ({
  lectureId,
  instructorId,
  organizationId,
}) => {
  if (!lectureId || !instructorId || !organizationId) {
    throw new Error("Invalid lecture or instructor ID");
  }

  // 1. Find lecture
  const lecture = await Lecture.findById(lectureId);

  if (!lecture) {
    throw new Error("Lecture not found");
  }

  // 2. Find module
  const existingModule = await Module.findById(
    lecture.module
  );

  if (!existingModule) {
    throw new Error("Module not found");
  }

  // 3. Find parent course
  const course = await courseModel.findById(
    existingModule.course
  );

  if (!course) {
    throw new Error("Course not found");
  }

  // 4. Verify ownership
  await verifyInstructorCourseAccess({
    instructorId,
    course,
    organizationId,
  });

  // 5. Delete lecture
  const deletedLecture = await Lecture.findByIdAndDelete(
    lectureId
  );

  // 6. Clean up uploaded video
  let videoCleanupFailed = false;

  if (lecture.video?.fileId) {
    try {
      await imagekit.files.delete(lecture.video.fileId);
    } catch (error) {
      videoCleanupFailed = true;

      console.error(
        "ImageKit video cleanup failed:",
        error.message
      );
    }
  }

  return {
    lecture: deletedLecture,
    videoCleanupFailed,
  };
};


// --------------------------------------------------
// GET LECTURES
// --------------------------------------------------

export const getLectures = async ({
  moduleId,
  userId,
  userRole,
}) => {
  if (!moduleId || !userId) {
    throw new Error("Invalid module or user ID");
  }

  // 1. Find module
  const existingModule = await Module.findById(moduleId);

  if (!existingModule) {
    throw new Error("Module not found");
  }

  // 2. Find course
  const course = await courseModel.findById(
    existingModule.course
  );

  if (!course) {
    throw new Error("Course not found");
  }

  // 3. Student access
  if (userRole === "STUDENT") {
    if (course.status !== "PUBLISHED") {
      throw new Error("Course is not available");
    }

    // Suspended organization courses are not accessible
    if (course.organizationId) {
      const organization = await Organization.findOne({
        _id: course.organizationId,
        status: "ACTIVE",
      }).select("_id");

      if (!organization) {
        throw new Error("Course is not available");
      }
    }
  }

  // 4. Instructor access
  else if (userRole === "INSTRUCTOR") {
    const instructor = await User.findOne({
      _id: userId,
      role: "INSTRUCTOR",
      employmentStatus: "ACTIVE",
      organizationId: { $ne: null },
      hiredBy: { $ne: null },
    }).select("organizationId");

    if (!instructor) {
      throw new Error("Access denied");
    }

    await verifyInstructorCourseAccess({
      instructorId: userId,
      course,
      organizationId: instructor.organizationId,
    });
  }

  // 5. Organization Admin access
  else if (userRole === "ADMIN") {
    await verifyAdminCourseAccess({
      adminId: userId,
      course,
    });
  }

  else {
    throw new Error("Access denied");
  }

  // 6. Fetch lectures
  const lectures = await Lecture.find({
    module: moduleId,
  }).sort({ order: 1 });

  // 7. Student completion data
  let completedIds = new Set();

  if (userRole === "STUDENT") {
    const enrollment = await Enrollment.findOne({
      student: userId,
      course: course._id,
      status: "ACTIVE",
    });

    if (enrollment) {
      completedIds = new Set(
        (enrollment.completedLectures || []).map(
          (id) => id.toString()
        )
      );
    }
  }

  return lectures.map((lecture) => ({
    ...lecture.toObject(),
    isCompleted: completedIds.has(
      lecture._id.toString()
    ),
  }));
};


// --------------------------------------------------
// GET LECTURE VIDEO
// --------------------------------------------------

export const getLectureVideo = async ({
  lectureId,
  userId,
  userRole,
}) => {
  if (!lectureId || !userId) {
    throw new Error("Invalid lecture or user ID");
  }

  // 1. Find lecture
  const lecture = await Lecture.findById(lectureId);

  if (!lecture) {
    throw new Error("Lecture not found");
  }

  // 2. Find module
  const existingModule = await Module.findById(
    lecture.module
  );

  if (!existingModule) {
    throw new Error("Module not found");
  }

  // 3. Find course
  const course = await courseModel.findById(
    existingModule.course
  );

  if (!course) {
    throw new Error("Course not found");
  }

  // 4. Student video access
  if (userRole === "STUDENT") {
    if (course.status !== "PUBLISHED") {
      throw new Error("Course is not available");
    }

    if (course.organizationId) {
      const organization = await Organization.findOne({
        _id: course.organizationId,
        status: "ACTIVE",
      }).select("_id");

      if (!organization) {
        throw new Error("Course is not available");
      }
    }

    const enrollment = await Enrollment.findOne({
      student: userId,
      course: course._id,
      status: "ACTIVE",
    });

    if (!enrollment) {
      throw new Error("Access denied");
    }

    const payment = await Payment.findOne({
      _id: enrollment.paymentId,
      student: userId,
      course: course._id,
      status: "PAID",
      signatureVerified: true,
    });

    if (!payment) {
      throw new Error("Access denied");
    }
  }

  // 5. Instructor video access
  else if (userRole === "INSTRUCTOR") {
    const instructor = await User.findOne({
      _id: userId,
      role: "INSTRUCTOR",
      employmentStatus: "ACTIVE",
      organizationId: { $ne: null },
    }).select("organizationId");

    if (!instructor) {
      throw new Error("Access denied");
    }

    await verifyInstructorCourseAccess({
      instructorId: userId,
      course,
      organizationId: instructor.organizationId,
    });
  }

  // 6. Organization Admin video access
  else if (userRole === "ADMIN") {
    await verifyAdminCourseAccess({
      adminId: userId,
      course,
    });
  }

  else {
    throw new Error("Access denied");
  }

  // 7. Video availability
  if (!lecture.video?.url || !lecture.video?.fileId) {
    throw new Error("Video not available");
  }

  return {
    lectureId: lecture._id,
    title: lecture.title,
    videoUrl: lecture.video.url,
  };
};


// --------------------------------------------------
// MARK LECTURE COMPLETED
// --------------------------------------------------

export const markLectureCompleted = async ({
  lectureId,
  studentId,
}) => {
  const lecture = await Lecture.findById(lectureId);

  if (!lecture) {
    throw new Error("Lecture not found");
  }

  const module = await Module.findById(lecture.module);

  if (!module) {
    throw new Error("Module not found");
  }

  const course = await courseModel.findById(module.course);

  if (!course) {
    throw new Error("Course not found");
  }

  if (course.status !== "PUBLISHED") {
    throw new Error("Course is not available");
  }

  if (course.organizationId) {
    const organization = await Organization.findOne({
      _id: course.organizationId,
      status: "ACTIVE",
    }).select("_id");

    if (!organization) {
      throw new Error("Course is not available");
    }
  }

  const enrollment = await Enrollment.findOne({
    student: studentId,
    course: module.course,
    status: "ACTIVE",
  });

  if (!enrollment) {
    throw new Error("Active enrollment not found");
  }

  // Prevent duplicate completion entries
  const updatedEnrollment = await Enrollment.findOneAndUpdate(
    {
      _id: enrollment._id,
      student: studentId,
      course: module.course,
      status: "ACTIVE",
    },
    {
      $addToSet: {
        completedLectures: lecture._id,
      },
    },
    {
      new: true,
    }
  );

  const courseModules = await Module.find({
    course: module.course,
  }).select("_id");

  const moduleIds = courseModules.map(
    (item) => item._id
  );

  const totalLectures = await Lecture.countDocuments({
    module: { $in: moduleIds },
  });

  const completedCount =
    updatedEnrollment.completedLectures.length;

  const progress = totalLectures
    ? Math.round((completedCount / totalLectures) * 100)
    : 0;

  return {
    lectureId: lecture._id,
    completed: true,
    completedCount,
    totalLectures,
    progress,
  };
};