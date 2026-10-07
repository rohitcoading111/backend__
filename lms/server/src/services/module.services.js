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