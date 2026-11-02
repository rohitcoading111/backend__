
import courseModel from "../models/course.models.js";
import imagekit from "../config/imagekit.js";
import Module from "../models/module.models.js";
import Lecture from "../models/lecture.models.js";

// Common ownership filter
const getCourseOwnershipFilter = (
  courseId,
  instructorId,
  organizationId
) => ({
  _id: courseId,
  instructor: instructorId,
  organizationId: organizationId ?? null,
});

// Create Course
export const createCourse = async ({
  courseData,
  instructorId,
  organizationId,
  file,
}) => {
  const {
    title,
    description,
    price,
    category,
    level,
  } = courseData;

  if (!instructorId) {
    throw new Error("Invalid instructor ID");
  }

  if (!file) {
    throw new Error("Course thumbnail is required");
  }

  let thumbnailData = {
    url: null,
    fileId: null,
  };

  const uploadResponse = await imagekit.files.upload({
    file: file.buffer.toString("base64"),
    fileName: `${Date.now()}-${file.originalname}`,
    folder: "/lms/course-thumbnails",
  });

  thumbnailData = {
    url: uploadResponse.url,
    fileId: uploadResponse.fileId,
  };

  const course = await courseModel.create({
    title,
    description,
    thumbnail: thumbnailData,
    instructor: instructorId,
    organizationId: organizationId ?? null,
    price,
    category,
    level,
    status: "DRAFT",
  });

  return course;
};


// Get My Courses
// Get Organization Courses / My Individual Courses
export const getCourse = async (
  instructorId,
  organizationId
) => {
  if (!instructorId) {
    throw new Error("Invalid instructor ID");
  }

  // Hired instructor: fetch all courses of their organization
  // Independent instructor: fetch only their own courses
  const filter = organizationId
    ? { organizationId }
    : {
        instructor: instructorId,
        organizationId: null,
      };

  const courses = await courseModel
    .find(filter)
    .sort({ createdAt: -1 });

  return courses;
};


// Get Single Course
// Get Single Course
export const getSingleCourse = async (
  courseId,
  instructorId,
  organizationId
) => {
  if (!courseId || !instructorId) {
    throw new Error("Invalid course or instructor ID");
  }

  const filter = organizationId
    ? {
        _id: courseId,
        organizationId,
      }
    : {
        _id: courseId,
        instructor: instructorId,
        organizationId: null,
      };

  const course = await courseModel.findOne(filter);

  if (!course) {
    throw new Error("Course not found or access denied");
  }

  return course;
};


// Get All Published Courses (Public)
export const getAllPublishedCourses = async () => {
  const courses = await courseModel
    .find({
      status: "PUBLISHED",
    })
    .select("-__v")
    .sort({ createdAt: -1 });

  return courses;
};


// Update Course
export const updateCourse = async ({
  courseId,
  instructorId,
  organizationId,
  updateData,
  file,
}) => {
  if (!courseId || !instructorId) {
    throw new Error("Invalid course or instructor ID");
  }

  const course = await courseModel.findOne(
    getCourseOwnershipFilter(
      courseId,
      instructorId,
      organizationId
    )
  );

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

  // Update only allowed fields
  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      course[field] = updateData[field];
    }
  });

  // Update thumbnail
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


// Delete Course
export const deleteCourse = async (
  courseId,
  instructorId,
  organizationId
) => {
  if (!courseId || !instructorId) {
    throw new Error("Invalid course or instructor ID");
  }

  const ownershipFilter = getCourseOwnershipFilter(
    courseId,
    instructorId,
    organizationId
  );

  // Verify course ownership first
  const course = await courseModel.findOne(ownershipFilter);

  if (!course) {
    throw new Error("Course not found or access denied");
  }

  // Get all modules belonging to this course
  const modules = await Module.find({
    course: courseId,
  });

  const moduleIds = modules.map((module) => module._id);

  // Get all lectures belonging to these modules
  const lectures = await Lecture.find({
    module: { $in: moduleIds },
  });

  // Delete lectures
  await Lecture.deleteMany({
    module: { $in: moduleIds },
  });

  // Delete modules
  await Module.deleteMany({
    course: courseId,
  });

  // Delete course using same ownership filter
  const deletedCourse = await courseModel.findOneAndDelete(
    ownershipFilter
  );

  if (!deletedCourse) {
    throw new Error("Course not found or access denied");
  }

  // Collect ImageKit file IDs
  const fileIds = [];

  if (deletedCourse.thumbnail?.fileId) {
    fileIds.push(deletedCourse.thumbnail.fileId);
  }

  for (const lecture of lectures) {
    if (lecture.video?.fileId) {
      fileIds.push(lecture.video.fileId);
    }
  }

  // Delete uploaded media
  const cleanupResults = await Promise.allSettled(
    fileIds.map((fileId) => imagekit.files.delete(fileId))
  );

  const imageCleanupFailed = cleanupResults.some(
    (result) => result.status === "rejected"
  );

  return {
    course: deletedCourse,
    deletedModules: modules.length,
    deletedLectures: lectures.length,
    imageCleanupFailed,
  };
};


// Publish Course
export const publishCourse = async (
  courseId,
  instructorId,
  organizationId
) => {
  if (!courseId || !instructorId) {
    throw new Error("Invalid course or instructor ID");
  }

  const course = await courseModel.findOne(
    getCourseOwnershipFilter(
      courseId,
      instructorId,
      organizationId
    )
  );

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


// Unpublish Course
export const unpublishCourse = async (
  courseId,
  instructorId,
  organizationId
) => {
  if (!courseId || !instructorId) {
    throw new Error("Invalid course or instructor ID");
  }

  const course = await courseModel.findOne(
    getCourseOwnershipFilter(
      courseId,
      instructorId,
      organizationId
    )
  );

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
