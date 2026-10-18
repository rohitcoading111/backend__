import mongoose from "mongoose";
import { randomUUID } from "node:crypto";

import Course from "../models/course.models.js";
import LiveSession from "../models/liveSession.models.js";

import Enrollment from "../models/enrollment.models.js";
import Payment from "../models/payment.models.js";

import config from "../config/config.js"
import { generateLiveKitToken } from "../utils/liveKit.utils.js";

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

const token = await generateLiveKitToken({
  roomId: liveSession.roomId,
  participantId: instructorId,
  participantName: "Instructor",
  canPublish: true,
});

return {
  session: liveSession,
  token,
  liveKitUrl: config.LIVEKIT_URL,
};
};


export const getActiveLiveSession = async (courseId) => {
  const session = await LiveSession.findOne({
    course: courseId,
    status: "LIVE",
  });

  return session;
};

export const endLiveSession = async (sessionId, instructorId) => {
  const session = await LiveSession.findById(sessionId);

  if (!session) {
    const error = new Error("Live session not found");
    error.statusCode = 404;
    throw error;
  }

  if (session.instructor.toString() !== instructorId.toString()) {
    const error = new Error("You can only end your own live session");
    error.statusCode = 403;
    throw error;
  }

  if (session.status === "ENDED") {
    const error = new Error("Live session has already ended");
    error.statusCode = 400;
    throw error;
  }

  session.status = "ENDED";
  session.endedAt = new Date();

  return await session.save();
};

export const joinLiveSession = async (sessionId, studentId) => {
  const session = await LiveSession.findById(sessionId);

  if (!session) {
    const error = new Error("Live session not found");
    error.statusCode = 404;
    throw error;
  }

  if (session.status !== "LIVE") {
    const error = new Error("This live class has ended");
    error.statusCode = 400;
    throw error;
  }

  const enrollment = await Enrollment.findOne({
    student: studentId,
    course: session.course,
    status: "ACTIVE",
  });

  if (!enrollment) {
    const error = new Error("You are not enrolled in this course");
    error.statusCode = 403;
    throw error;
  }

  const payment = await Payment.findOne({
    _id: enrollment.paymentId,
    student: studentId,
    course: session.course,
    status: "PAID",
    signatureVerified: true,
  });

  if (!payment) {
    const error = new Error("Verified payment not found");
    error.statusCode = 403;
    throw error;
  }

  const token = await generateLiveKitToken({
  roomId: session.roomId,
  participantId: studentId,
  participantName: "Student",
  canPublish: false,
});

return {
  sessionId: session._id,
  roomId: session.roomId,
  courseId: session.course,
  token,
  liveKitUrl: config.LIVEKIT_URL,
};
};
