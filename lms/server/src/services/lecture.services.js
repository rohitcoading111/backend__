import Lecture from "../models/lecture.models.js";
import Module from "../models/module.models.js";
import courseModel from "../models/course.models.js";
import imagekit from "../config/imagekit.js";
import { toFile } from "@imagekit/nodejs";

export const createLecture = async ({
  moduleId,
  instructorId,
  title,
  notes,
  order,
  videoFile,
}) => {
  if (!moduleId || !instructorId) {
    throw new Error("Invalid module or instructor ID");
  }

  // 1. Find the module
  const existingModule = await Module.findById(moduleId);

  if (!existingModule) {
    throw new Error("Module not found");
  }

  // 2. Verify course ownership
  const course = await courseModel.findOne({
    _id: existingModule.course,
    instructor: instructorId,
  });

  if (!course) {
    throw new Error("Access denied");
  }

  // 3. Prevent duplicate lecture order
  const existingLecture = await Lecture.findOne({
    module: moduleId,
    order,
  });

  if (existingLecture) {
    throw new Error("Lecture order already exists");
  }

  // 4. Default video fields
  let video = {
    url: null,
    fileId: null,
  };

  // 5. Upload video only if instructor provided one
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

  // 6. Create lecture with notes and video details
  const lecture = await Lecture.create({
    title,
    notes,
    module: moduleId,
    order,
    video,
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