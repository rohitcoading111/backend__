import Lecture from "../models/lecture.models.js";
import Module from "../models/module.models.js";
import courseModel from "../models/course.models.js";
import imagekit from "../config/imagekit.js";
import { toFile } from "@imagekit/nodejs";
import Enrollment from "../models/enrollment.models.js";
import Payment from "../models/payment.models.js";

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
  videoFile,
}) => {
  if (!lectureId || !instructorId) {
    throw new Error("Invalid lecture or instructor ID");
  }

  // 1. Find lecture
  const lecture = await Lecture.findById(lectureId);

  if (!lecture) {
    throw new Error("Lecture not found");
  }

  // 2. Find module
  const existingModule = await Module.findById(lecture.module);

  if (!existingModule) {
    throw new Error("Module not found");
  }

  // 3. Verify course ownership
  const course = await courseModel.findOne({
    _id: existingModule.course,
    instructor: instructorId,
  });

  if (!course) {
    throw new Error("Access denied");
  }

  // 4. Check duplicate order
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

  // 5. Update text fields
  if (title !== undefined) {
    lecture.title = title;
  }

  if (notes !== undefined) {
    lecture.notes = notes;
  }

  // 6. Upload new video only if provided
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

    lecture.video = {
      url: uploadedVideo.url,
      fileId: uploadedVideo.fileId,
    };
  }

  // 7. Save changes
  await lecture.save();

  return lecture;
};

export const deleteLecture = async ({
  lectureId,
  instructorId,
}) => {
  if (!lectureId || !instructorId) {
    throw new Error("Invalid lecture or instructor ID");
  }

  // 1. Find lecture
  const lecture = await Lecture.findById(lectureId);

  if (!lecture) {
    throw new Error("Lecture not found");
  }

  // 2. Find its module
  const existingModule = await Module.findById(lecture.module);

  if (!existingModule) {
    throw new Error("Module not found");
  }

  // 3. Verify course ownership
  const course = await courseModel.findOne({
    _id: existingModule.course,
    instructor: instructorId,
  });

  if (!course) {
    throw new Error("Access denied");
  }

  // 4. Delete lecture from MongoDB
  const deletedLecture = await Lecture.findByIdAndDelete(lectureId);

  // 5. Delete its ImageKit video, if available
  let videoCleanupFailed = false;

  if (lecture.video?.fileId) {
    try {
      await imagekit.files.delete(lecture.video.fileId);
    } catch (error) {
      videoCleanupFailed = true;

      console.error(
        "ImageKit video cleanup failed:",
        error.message
      );
    }
  }

  return {
    lecture: deletedLecture,
    videoCleanupFailed,
  };
};

export const getLectures = async ({
  moduleId,
  userId,
  userRole,
}) => {
  if (!moduleId || !userId) {
    throw new Error("Invalid module or user ID");
  }

  // 1. Find the module
  const existingModule = await Module.findById(moduleId);

  if (!existingModule) {
    throw new Error("Module not found");
  }

  // 2. Find the course of this module
  const course = await courseModel.findById(
    existingModule.course
  );

  if (!course) {
    throw new Error("Course not found");
  }

  // 3. Allow only valid roles
  if (!["STUDENT", "INSTRUCTOR", "ADMIN"].includes(userRole)) {
    throw new Error("Access denied");
  }

  // 4. Students can access published courses
  if (
    userRole === "STUDENT" &&
    course.status !== "PUBLISHED"
  ) {
    throw new Error("Course is not available");
  }

  // 5. Instructors can access only their own courses
  if (
    userRole === "INSTRUCTOR" &&
    course.instructor.toString() !== userId
  ) {
    throw new Error("Access denied");
  }

  // 6. Get all lectures of this module
  const lectures = await Lecture.find({
    module: moduleId,
  }).sort({ order: 1 });

  let completedIds = new Set();

if (userRole === "STUDENT") {
  const enrollment = await Enrollment.findOne({
    student: userId,
    course: course._id,
    status: "ACTIVE",
  });

  if (enrollment) {
    completedIds = new Set(
      (enrollment.completedLectures || []).map(
        (id) => id.toString()
      )
    );
  }
}

return lectures.map((lecture) => ({
  ...lecture.toObject(),
  isCompleted: completedIds.has(lecture._id.toString()),
}));
};


// Get a lecture's video after checking access permissions
export const getLectureVideo = async ({
  lectureId,
  userId,
  userRole,
}) => {
  if (!lectureId || !userId) {
    throw new Error("Invalid lecture or user ID");
  }

  // 1. Find the lecture
  const lecture = await Lecture.findById(lectureId);

  if (!lecture) {
    throw new Error("Lecture not found");
  }

  // 2. Find the module
  const existingModule = await Module.findById(lecture.module);

  if (!existingModule) {
    throw new Error("Module not found");
  }

  // 3. Find the course
  const course = await courseModel.findById(
    existingModule.course
  );

  if (!course) {
    throw new Error("Course not found");
  }

  // 4. Validate role
  if (!["STUDENT", "INSTRUCTOR", "ADMIN"].includes(userRole)) {
    throw new Error("Access denied");
  }

  // 5. Check course access for students
  if (userRole === "STUDENT") {
    if (course.status !== "PUBLISHED") {
      throw new Error("Course is not available");
    }

    const enrollment = await Enrollment.findOne({
      student: userId,
      course: course._id,
      status: "ACTIVE",
    });

    if (!enrollment) {
      throw new Error("Access denied");
    }

    const payment = await Payment.findOne({
      _id: enrollment.paymentId,
      student: userId,
      course: course._id,
      status: "PAID",
      signatureVerified: true,
    });

    if (!payment) {
      throw new Error("Access denied");
    }
  }

  // 6. Instructors can access only their own courses
  if (
    userRole === "INSTRUCTOR" &&
    course.instructor.toString() !== userId.toString()
  ) {
    throw new Error("Access denied");
  }

  // 7. Check video availability
  if (!lecture.video?.url || !lecture.video?.fileId) {
    throw new Error("Video not available");
  }

  // 8. Return the video URL only to authorized users
  return {
    lectureId: lecture._id,
    title: lecture.title,
    videoUrl: lecture.video.url,
  };
};

export const markLectureCompleted = async ({
  lectureId,
  studentId,
}) => {
  const lecture = await Lecture.findById(lectureId);

  if (!lecture) {
    throw new Error("Lecture not found");
  }

  const module = await Module.findById(lecture.module);

  if (!module) {
    throw new Error("Module not found");
  }

  const enrollment = await Enrollment.findOne({
    student: studentId,
    course: module.course,
    status: "ACTIVE",
  });

  if (!enrollment) {
    throw new Error("Active enrollment not found");
  }

  // Same lecture ko baar-baar add nahi karega
  const updatedEnrollment = await Enrollment.findOneAndUpdate(
    {
      _id: enrollment._id,
      student: studentId,
      course: module.course,
      status: "ACTIVE",
    },
    {
      $addToSet: {
        completedLectures: lecture._id,
      },
    },
    {
      new: true,
    }
  );

  const courseModules = await Module.find({
    course: module.course,
  }).select("_id");

  const moduleIds = courseModules.map((item) => item._id);

  const totalLectures = await Lecture.countDocuments({
    module: { $in: moduleIds },
  });

  const completedCount = updatedEnrollment.completedLectures.length;

  const progress = totalLectures
    ? Math.round((completedCount / totalLectures) * 100)
    : 0;

  return {
    lectureId: lecture._id,
    completed: true,
    completedCount,
    totalLectures,
    progress,
  };
};