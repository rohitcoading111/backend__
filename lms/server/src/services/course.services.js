import courseModel from "../models/course.models.js";
import imagekit from "../config/imagekit.js";

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