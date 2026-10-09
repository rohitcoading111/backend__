import Lecture from "../models/lecture.models.js";
import Module from "../models/module.models.js";
import courseModel from "../models/course.models.js";

export const createLecture = async ({
  moduleId,
  instructorId,
  title,
  notes,
  order,
}) => {
  if (!moduleId || !instructorId) {
    throw new Error("Invalid module or instructor ID");
  }

  // 1. Find the module
  const existingModule = await Module.findById(moduleId);

  if (!existingModule) {
    throw new Error("Module not found");
  }

  // 2. Verify that the instructor owns the course
  const course = await courseModel.findOne({
    _id: existingModule.course,
    instructor: instructorId,
  });

  if (!course) {
    throw new Error("Access denied");
  }

  // 3. Prevent duplicate lecture order in the same module
  const existingLecture = await Lecture.findOne({
    module: moduleId,
    order,
  });

  if (existingLecture) {
    throw new Error("Lecture order already exists");
  }

  // 4. Create the lecture
  const lecture = await Lecture.create({
    title,
    notes,
    module: moduleId,
    order,
  });

  return lecture;
};

export const updateLecture = async ({
  lectureId,
  instructorId,
  title,
  notes,
  order,
}) => {
  if (!lectureId || !instructorId) {
    throw new Error("Invalid lecture or instructor ID");
  }

  const lecture = await Lecture.findById(lectureId);

  if (!lecture) {
    throw new Error("Lecture not found");
  }

  const module = await Module.findById(lecture.module);

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

  if (title !== undefined) {
    lecture.title = title;
  }

  if (notes !== undefined) {
    lecture.notes = notes;
  }

  await lecture.save();

  return lecture;
};