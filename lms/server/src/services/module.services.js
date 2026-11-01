
import Module from "../models/module.models.js";
import courseModel from "../models/course.models.js";
import Lecture from "../models/lecture.models.js";
import User from "../models/user.models.js";
import Organization from "../models/organization.models.js";
import imagekit from "../config/imagekit.js";

// Verify instructor's course ownership
const findOwnedCourse = async ({
  courseId,
  instructorId,
  organizationId,
}) => {
  return courseModel.findOne({
    _id: courseId,
    instructor: instructorId,
    organizationId,
  });
};


// CREATE MODULE
export const createModule = async ({
  courseId,
  instructorId,
  organizationId,
  title,
  description,
}) => {
  if (!courseId || !instructorId || !organizationId) {
    throw new Error("Invalid course, instructor or organization ID");
  }

  // Verify course belongs to this instructor and organization
  const course = await findOwnedCourse({
    courseId,
    instructorId,
    organizationId,
  });

  if (!course) {
    throw new Error("Course not found or access denied");
  }

  // Find highest existing module order
  const lastModule = await Module.findOne({
    course: courseId,
  }).sort({ order: -1 });

  const nextOrder = lastModule
    ? lastModule.order + 1
    : 1;

  const module = await Module.create({
    title,
    description,
    course: courseId,
    order: nextOrder,
  });

  return module;
};


// UPDATE MODULE
export const updateModule = async ({
  moduleId,
  instructorId,
  organizationId,
  title,
  description,
  order,
}) => {
  if (!moduleId || !instructorId || !organizationId) {
    throw new Error("Invalid module or instructor ID");
  }

  const module = await Module.findById(moduleId);

  if (!module) {
    throw new Error("Module not found");
  }

  // Verify parent course ownership
  const course = await findOwnedCourse({
    courseId: module.course,
    instructorId,
    organizationId,
  });

  if (!course) {
    throw new Error("Access denied");
  }

  if (title !== undefined) {
    module.title = title;
  }

  if (description !== undefined) {
    module.description = description;
  }

  if (order !== undefined) {
    module.order = order;
  }

  await module.save();

  return module;
};


// DELETE MODULE
export const deleteModule = async (
  moduleId,
  instructorId,
  organizationId
) => {
  if (!moduleId || !instructorId || !organizationId) {
    throw new Error("Invalid module or instructor ID");
  }

  // Find module
  const module = await Module.findById(moduleId);

  if (!module) {
    throw new Error("Module not found");
  }

  // Verify parent course ownership before deleting anything
  const course = await findOwnedCourse({
    courseId: module.course,
    instructorId,
    organizationId,
  });

  if (!course) {
    throw new Error("Access denied");
  }

  // Find lectures inside this module
  const lectures = await Lecture.find({
    module: moduleId,
  });

  // Delete lectures
  await Lecture.deleteMany({
    module: moduleId,
  });

  // Delete module
  const deletedModule = await Module.findByIdAndDelete(moduleId);

  // Collect uploaded video IDs
  const fileIds = lectures
    .map((lecture) => lecture.video?.fileId)
    .filter(Boolean);

  // Clean up ImageKit videos
  const cleanupResults = await Promise.allSettled(
    fileIds.map((fileId) => imagekit.files.delete(fileId))
  );

  const videoCleanupFailed = cleanupResults.some(
    (result) => result.status === "rejected"
  );

  return {
    module: deletedModule,
    deletedLectures: lectures.length,
    videoCleanupFailed,
  };
};


// GET MODULES
export const getModules = async ({
  courseId,
  userId,
  userRole,
}) => {
  if (!courseId || !userId) {
    throw new Error("Invalid course or user ID");
  }

  const course = await courseModel.findById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  // STUDENT: Published courses only
  if (userRole === "STUDENT") {
    if (course.status !== "PUBLISHED") {
      throw new Error("Course is not available");
    }
  }

  // INSTRUCTOR: Must be actively hired by the course's organization
  else if (userRole === "INSTRUCTOR") {
    const instructor = await User.findOne({
      _id: userId,
      role: "INSTRUCTOR",
      employmentStatus: "ACTIVE",
      organizationId: { $ne: null },
      hiredBy: { $ne: null },
    }).select("_id organizationId hiredBy employmentStatus");

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

    // Instructor can access only their own courses
    if (
      course.instructor.toString() !== userId.toString() ||
      !course.organizationId ||
      course.organizationId.toString() !==
        organization._id.toString()
    ) {
      throw new Error("Access denied");
    }
  }

  // ORGANIZATION ADMIN: Only their own organization's courses
  else if (userRole === "ADMIN") {
    const admin = await User.findOne({
      _id: userId,
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
      course.organizationId.toString() !==
        organization._id.toString()
    ) {
      throw new Error("Access denied");
    }
  }

  else {
    throw new Error("Access denied");
  }

  // Fetch modules
  const modules = await Module.find({
    course: courseId,
  }).sort({ order: 1 });

  // Attach lecture count
  const modulesWithLectureCount = await Promise.all(
    modules.map(async (module) => {
      const lectureCount = await Lecture.countDocuments({
        module: module._id,
      });

      return {
        ...module.toObject(),
        lectureCount,
      };
    })
  );

  return modulesWithLectureCount;
};
