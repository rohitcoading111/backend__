
import mongoose from "mongoose";
import { randomUUID } from "node:crypto";

import Course from "../models/course.models.js";
import LiveSession from "../models/liveSession.models.js";

export const createLiveSession = async (courseId, instructorId) => {
  if (!mongoose.isValidObjectId(courseId)) {
    const error = new Error("Invalid course ID");
    error.statusCode = 400;
    throw error;
  }

  const course = await Course.findById(courseId);

  if (!course) {
    const error = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }

  // Verify course ownership
  if (course.instructor.toString() !== instructorId.toString()) {
    const error = new Error(
      "You can only start a live session for your own course"
    );
    error.statusCode = 403;
    throw error;
  }

  if (course.status !== "PUBLISHED") {
    const error = new Error(
      "Only published courses can have live sessions"
    );
    error.statusCode = 400;
    throw error;
  }

  // Check whether a live session already exists
  const existingSession = await LiveSession.findOne({
    course: course._id,
    status: "LIVE",
  });

  if (existingSession) {
    const error = new Error(
      "This course already has a live session"
    );
    error.statusCode = 409;
    throw error;
  }

  const liveSession = await LiveSession.create({
    course: course._id,
    instructor: instructorId,
    roomId: randomUUID(),
    status: "LIVE",
    startedAt: new Date(),
  });

  return liveSession;
};
