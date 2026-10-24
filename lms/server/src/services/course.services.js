import courseModel from "../models/course.models.js";
import imagekit from "../config/imagekit.js";
import Module from "../models/module.models.js";
import Lecture from "../models/lecture.models.js";

export const createCourse = async ({ courseData, instructorId, file }) => {
  const {
    title,
    description,
    price,
    category,
    level,
  } = courseData;

  let thumbnailData = {
    url: null,
    fileId: null,
  };

  if (file) {
    const uploadResponse = await imagekit.files.upload({
      file: file.buffer.toString("base64"),
      fileName: `${Date.now()}-${file.originalname}`,
      folder: "/lms/course-thumbnails",
    });

    thumbnailData = {
      url: uploadResponse.url,
      fileId: uploadResponse.fileId,
    };
  }

  const course = await courseModel.create({
    title,
    description,
    thumbnail: thumbnailData,
    instructor: instructorId,
    price,
    category,
    level,
    status: "DRAFT",
  });

  return course;
};

export const getCourse = async (instructorId) => {
  if (!instructorId) {
    throw new Error("Invalid instructor ID");
  }

  const matchingData = await courseModel.find({
    instructor: instructorId,
  });

  return matchingData;
};

export const getSingleCourse = async (courseId, instructorId) => {
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

  return course;
};


export const getAllPublishedCourses = async () => {
  const courses = await courseModel
    .find({ status: "PUBLISHED" })
    .select("-__v")
    .sort({ createdAt: -1 });

  return courses;
};



export const updateCourse = async ({
  courseId,
  instructorId,
  updateData,
  file,
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

  const allowedFields = [
    "title",
    "description",
    "price",
    "category",
    "level",
  ];

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      course[field] = updateData[field];
    }
  });

  if (file) {
    const uploadResponse = await imagekit.files.upload({
      file: file.buffer.toString("base64"),
      fileName: `${Date.now()}-${file.originalname}`,
      folder: "/lms/course-thumbnails",
    });

    course.thumbnail = {
      url: uploadResponse.url,
      fileId: uploadResponse.fileId,
    };
  }

  await course.save();

  return course;
};

export const deleteCourse = async (courseId, instructorId) => {
  if (!courseId || !instructorId) {
    throw new Error("Invalid course or instructor ID");
  }

  // 1. Check course ownership
  const course = await courseModel.findOne({
    _id: courseId,
    instructor: instructorId,
  });

  if (!course) {
    throw new Error("Course not found or access denied");
  }

  // 2. Find all modules of this course
  const modules = await Module.find({ course: courseId });

  const moduleIds = modules.map((module) => module._id);

  // 3. Find all lectures inside these modules
  const lectures = await Lecture.find({
    module: { $in: moduleIds },
  });

  // 4. Delete lectures from database
  await Lecture.deleteMany({
    module: { $in: moduleIds },
  });

  // 5. Delete modules from database
  await Module.deleteMany({
    course: courseId,
  });

  // 6. Delete the course itself
  const deletedCourse = await courseModel.findOneAndDelete({
    _id: courseId,
    instructor: instructorId,
  });

  if (!deletedCourse) {
    throw new Error("Course not found or access denied");
  }

  // 7. Collect ImageKit file IDs
  const fileIds = [];

  if (deletedCourse.thumbnail?.fileId) {
    fileIds.push(deletedCourse.thumbnail.fileId);
  }

  for (const lecture of lectures) {
    if (lecture.video?.fileId) {
      fileIds.push(lecture.video.fileId);
    }
  }

  // 8. Clean up uploaded files from ImageKit
  const cleanupResults = await Promise.allSettled(
    fileIds.map((fileId) => imagekit.files.delete(fileId))
  );

  const imageCleanupFailed = cleanupResults.some(
    (result) => result.status === "rejected"
  );

  // 9. Return deletion summary
  return {
    course: deletedCourse,
    deletedModules: modules.length,
    deletedLectures: lectures.length,
    imageCleanupFailed,
  };
};

export const publishCourse = async (courseId, instructorId) => {
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

  if (course.status === "PUBLISHED") {
    throw new Error("Course is already published");
  }

  course.status = "PUBLISHED";

  await course.save();

  return course;
};

export const unpublishCourse = async (courseId, instructorId) => {
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

  if (course.status === "DRAFT") {
    throw new Error("Course is already in draft");
  }

  course.status = "DRAFT";

  await course.save();

  return course;
};