import Module from "../models/module.models.js";
import courseModel from "../models/course.models.js";
import Lecture from "../models/lecture.models.js"
import imagekit from "../config/imagekit.js";


export const createModule = async ({
  courseId,
  instructorId,
  title,
  description,
}) => {
  if (!courseId || !instructorId) {
    throw new Error("Invalid course or instructor ID");
  }

  const course = await courseModel.findOne({
    _id: courseId,
    instructor: instructorId,
  });

  if (!course) {
    throw new Error("Course not found or access denied");
  }

  // Find the highest existing order for this course
  const lastModule = await Module.findOne({
    course: courseId,
  }).sort({ order: -1 });

  const nextOrder = lastModule ? lastModule.order + 1 : 1;

  const module = await Module.create({
    title,
    description,
    course: courseId,
    order: nextOrder,
  });

  return module;
};


export const updateModule = async ({
  moduleId,
  instructorId,
  title,
  description,
  order,
}) => {
  if (!moduleId || !instructorId) {
    throw new Error("Invalid module or instructor ID");
  }

  const module = await Module.findById(moduleId);

  if (!module) {
    throw new Error("Module not found");
  }

  const course = await courseModel.findOne({
    _id: module.course,
    instructor: instructorId,
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

export const deleteModule = async (moduleId, instructorId) => {
  if (!moduleId || !instructorId) {
    throw new Error("Invalid module or instructor ID");
  }

  // 1. Find module
  const module = await Module.findById(moduleId);

  if (!module) {
    throw new Error("Module not found");
  }

  // 2. Check course ownership
  const course = await courseModel.findOne({
    _id: module.course,
    instructor: instructorId,
  });

  if (!course) {
    throw new Error("Access denied");
  }

  // 3. Find lectures inside this module
  const lectures = await Lecture.find({
    module: moduleId,
  });

  // 4. Delete lectures from database
  await Lecture.deleteMany({
    module: moduleId,
  });

  // 5. Delete the module
  const deletedModule = await Module.findByIdAndDelete(moduleId);

  // 6. Collect uploaded video IDs
  const fileIds = lectures
    .map((lecture) => lecture.video?.fileId)
    .filter(Boolean);

  // 7. Delete videos from ImageKit
  const cleanupResults = await Promise.allSettled(
    fileIds.map((fileId) => imagekit.files.delete(fileId))
  );

  const videoCleanupFailed = cleanupResults.some(
    (result) => result.status === "rejected"
  );

  // 8. Return deletion details
  return {
    module: deletedModule,
    deletedLectures: lectures.length,
    videoCleanupFailed,
  };
};

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

  if (
    userRole === "STUDENT" &&
    course.status !== "PUBLISHED"
  ) {
    throw new Error("Course is not available");
  }

  if (
    userRole === "INSTRUCTOR" &&
    course.instructor.toString() !== userId
  ) {
    throw new Error("Access denied");
  }

  if (!["STUDENT", "INSTRUCTOR", "ADMIN"].includes(userRole)) {
    throw new Error("Access denied");
  }

  const modules = await Module.find({
    course: courseId,
  }).sort({ order: 1 });

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