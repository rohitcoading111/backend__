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