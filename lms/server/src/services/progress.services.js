
import mongoose from "mongoose";

import LessonProgress from "../models/lessonProgress.models.js";
import Lecture from "../models/lecture.models.js";
import Module from "../models/module.models.js";
import Enrollment from "../models/enrollment.models.js";

// 1. Mark a lecture as completed
export const markLectureComplete = async ({
  studentId,
  lectureId,
}) => {
  if (
    !mongoose.isValidObjectId(studentId) ||
    !mongoose.isValidObjectId(lectureId)
  ) {
    throw new Error("Invalid student or lecture ID.");
  }

  const lecture = await Lecture.findById(lectureId).populate(
    "module",
    "course"
  );

  if (!lecture || !lecture.module) {
    throw new Error("Lecture not found.");
  }

  const courseId = lecture.module.course;

  const enrollment = await Enrollment.findOne({
    student: studentId,
    course: courseId,
    status: "ACTIVE",
  });

  if (!enrollment) {
    throw new Error("You are not actively enrolled in this course.");
  }

  const progress = await LessonProgress.findOneAndUpdate(
    {
      student: studentId,
      lecture: lectureId,
    },
    {
      $set: {
        course: courseId,
        isCompleted: true,
        completedAt: new Date(),
      },
      $setOnInsert: {
        timeSpentSeconds: 0,
      },
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
    }
  );

  return progress;
};

// 2. Get progress for one course
export const getCourseProgress = async ({
  studentId,
  courseId,
}) => {
  if (
    !mongoose.isValidObjectId(studentId) ||
    !mongoose.isValidObjectId(courseId)
  ) {
    throw new Error("Invalid student or course ID.");
  }

  const enrollment = await Enrollment.findOne({
    student: studentId,
    course: courseId,
    status: "ACTIVE",
  });

  if (!enrollment) {
    throw new Error("You are not actively enrolled in this course.");
  }

  const modules = await Module.find({ course: courseId })
    .select("_id")
    .lean();

  const moduleIds = modules.map((module) => module._id);

  const totalLessons = await Lecture.countDocuments({
    module: { $in: moduleIds },
  });

  const completedLessons = await LessonProgress.countDocuments({
    student: studentId,
    course: courseId,
    isCompleted: true,
  });

  const overallProgress =
    totalLessons === 0
      ? 0
      : Math.round((completedLessons / totalLessons) * 100);

  const timeResult = await LessonProgress.aggregate([
    {
      $match: {
        student: new mongoose.Types.ObjectId(studentId),
        course: new mongoose.Types.ObjectId(courseId),
      },
    },
    {
      $group: {
        _id: null,
        totalSeconds: { $sum: "$timeSpentSeconds" },
      },
    },
  ]);

  const learningHours = Number(
    ((timeResult[0]?.totalSeconds || 0) / 3600).toFixed(2)
  );

  return {
    courseId,
    totalLessons,
    completedLessons,
    overallProgress,
    learningHours,
  };
};

// 3. Get overall learning summary for dashboard
export const getLearningSummary = async ({ studentId }) => {
  if (!mongoose.isValidObjectId(studentId)) {
    throw new Error("Invalid student ID.");
  }

  const enrollments = await Enrollment.find({
    student: studentId,
    status: "ACTIVE",
  })
    .select("course")
    .lean();

  const courseIds = enrollments.map(
    (enrollment) => enrollment.course
  );

  if (courseIds.length === 0) {
    return {
      enrolledCourses: 0,
      totalLessons: 0,
      completedLessons: 0,
      overallProgress: 0,
      learningHours: 0,
    };
  }

  const modules = await Module.find({
    course: { $in: courseIds },
  })
    .select("_id")
    .lean();

  const moduleIds = modules.map((module) => module._id);

  const totalLessons = await Lecture.countDocuments({
    module: { $in: moduleIds },
  });

  const progressResult = await LessonProgress.aggregate([
    {
      $match: {
        student: new mongoose.Types.ObjectId(studentId),
        course: { $in: courseIds },
      },
    },
    {
      $group: {
        _id: null,
        completedLessons: {
          $sum: {
            $cond: ["$isCompleted", 1, 0],
          },
        },
        totalSeconds: {
          $sum: "$timeSpentSeconds",
        },
      },
    },
  ]);

  const completedLessons =
    progressResult[0]?.completedLessons || 0;

  const overallProgress =
    totalLessons === 0
      ? 0
      : Math.round((completedLessons / totalLessons) * 100);

  const learningHours = Number(
    ((progressResult[0]?.totalSeconds || 0) / 3600).toFixed(2)
  );

  return {
    enrolledCourses: courseIds.length,
    totalLessons,
    completedLessons,
    overallProgress,
    learningHours,
  };
};
