import Module from "../models/module.models.js";
import courseModel from "../models/course.models.js";

export const createModule = async ({
  courseId,
  instructorId,
  title,
  description,
  order,
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

  const existingModule = await Module.findOne({
    course: courseId,
    order,
  });

  if (existingModule) {
    throw new Error("Module order already exists");
  }

  const module = await Module.create({
    title,
    description,
    course: courseId,
    order,
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

  const deletedModule = await Module.findByIdAndDelete(moduleId);

  return deletedModule;
};

export const getModules = async ({
  courseId,
  userId,
  userRole,
}) => {
  if (!courseId || !userId) {
    throw new Error("Invalid course or user ID");
  }

  // 1. Find the course
  const course = await courseModel.findById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  // 2. Check student access
  if (
    userRole === "STUDENT" &&
    course.status !== "PUBLISHED"
  ) {
    throw new Error("Course is not available");
  }

  // 3. Check instructor ownership
  if (
    userRole === "INSTRUCTOR" &&
    course.instructor.toString() !== userId
  ) {
    throw new Error("Access denied");
  }

  // 4. Allow only valid roles
  if (!["STUDENT", "INSTRUCTOR", "ADMIN"].includes(userRole)) {
    throw new Error("Access denied");
  }

  // 5. Get all modules of this course
  const modules = await Module.find({
    course: courseId,
  }).sort({ order: 1 });

  return modules;
};