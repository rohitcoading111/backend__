
import mongoose from "mongoose";
import { randomUUID } from "node:crypto";

import Course from "../models/course.models.js";
import LiveSession from "../models/liveSession.models.js";
import User from "../models/user.models.js";
import Organization from "../models/organization.models.js";
import Enrollment from "../models/enrollment.models.js";
import Payment from "../models/payment.models.js";

import config from "../config/config.js";
import { generateLiveKitToken } from "../config/liveKit.utils.js";
import { RoomServiceClient } from "livekit-server-sdk";


// Common error helper
const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};


// --------------------------------------------------
// VERIFY INSTRUCTOR COURSE OWNERSHIP
// --------------------------------------------------

const verifyInstructorCourseAccess = async ({
  course,
  instructorId,
}) => {
  const instructor = await User.findOne({
    _id: instructorId,
    role: "INSTRUCTOR",
    employmentStatus: "ACTIVE",
    organizationId: { $ne: null },
    hiredBy: { $ne: null },
  }).select("_id organizationId hiredBy");

  if (!instructor) {
    throw createError(
      "You must be hired by an active organization",
      403
    );
  }

  const organization = await Organization.findOne({
    _id: instructor.organizationId,
    owner: instructor.hiredBy,
    status: "ACTIVE",
  }).select("_id");

  if (!organization) {
    throw createError("Organization access denied", 403);
  }

  const admin = await User.findOne({
    _id: instructor.hiredBy,
    role: "ADMIN",
    adminType: "ORGANIZATION_ADMIN",
    organizationId: organization._id,
    adminStatus: { $ne: "SUSPENDED" },
  }).select("_id");

  if (!admin) {
    throw createError(
      "Organization Admin access is inactive",
      403
    );
  }

  // Course must belong to this instructor and organization
  if (
    course.instructor.toString() !== instructorId.toString() ||
    !course.organizationId ||
    course.organizationId.toString() !==
      organization._id.toString()
  ) {
    throw createError(
      "You are not authorized for this course",
      403
    );
  }

  return { instructor, organization };
};


// --------------------------------------------------
// VERIFY ORGANIZATION ADMIN COURSE OWNERSHIP
// --------------------------------------------------

const verifyOrganizationAdminCourseAccess = async ({
  course,
  adminId,
}) => {
  const admin = await User.findOne({
    _id: adminId,
    role: "ADMIN",
    adminType: "ORGANIZATION_ADMIN",
    adminStatus: { $ne: "SUSPENDED" },
  }).select("_id organizationId");

  if (!admin || !admin.organizationId) {
    throw createError("Organization Admin access denied", 403);
  }

  const organization = await Organization.findOne({
    _id: admin.organizationId,
    owner: admin._id,
    status: "ACTIVE",
  }).select("_id");

  if (
    !organization ||
    !course.organizationId ||
    course.organizationId.toString() !==
      organization._id.toString()
  ) {
    throw createError("Organization access denied", 403);
  }

  return organization;
};


// --------------------------------------------------
// VERIFY STUDENT ENROLLMENT AND PAYMENT
// --------------------------------------------------

const verifyStudentCourseAccess = async ({
  course,
  studentId,
}) => {
  if (course.status !== "PUBLISHED") {
    throw createError("Course is not available", 404);
  }

  // Organization courses are unavailable if organization is suspended
  if (course.organizationId) {
    const organization = await Organization.findOne({
      _id: course.organizationId,
      status: "ACTIVE",
    }).select("_id");

    if (!organization) {
      throw createError("Course is not available", 404);
    }
  }

  const enrollment = await Enrollment.findOne({
    student: studentId,
    course: course._id,
    status: "ACTIVE",
  });

  if (!enrollment) {
    throw createError(
      "You are not enrolled in this course",
      403
    );
  }

  const payment = await Payment.findOne({
    _id: enrollment.paymentId,
    student: studentId,
    course: course._id,
    status: "PAID",
    signatureVerified: true,
  });

  if (!payment) {
    throw createError("Verified payment not found", 403);
  }

  return enrollment;
};


// --------------------------------------------------
// CREATE LIVE SESSION
// --------------------------------------------------

export const createLiveSession = async (
  courseId,
  instructorId,
  organizationId
) => {
  if (!mongoose.isValidObjectId(courseId)) {
    throw createError("Invalid course ID", 400);
  }

  if (!organizationId) {
    throw createError(
      "You must be hired by an organization",
      403
    );
  }

  const course = await Course.findById(courseId);

  if (!course) {
    throw createError("Course not found", 404);
  }

  // Verify Instructor + Organization ownership
  await verifyInstructorCourseAccess({
    course,
    instructorId,
  });

  if (
    course.organizationId.toString() !==
    organizationId.toString()
  ) {
    throw createError("Organization access denied", 403);
  }

  if (course.status !== "PUBLISHED") {
    throw createError(
      "Only published courses can have live sessions",
      400
    );
  }

  // Prevent multiple active sessions for same course
  const existingSession = await LiveSession.findOne({
    course: course._id,
    status: "LIVE",
  });

  if (existingSession) {
    throw createError(
      "This course already has a live session",
      409
    );
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


// --------------------------------------------------
// GET ACTIVE LIVE SESSION
// --------------------------------------------------

export const getActiveLiveSession = async (
  courseId,
  userId,
  userRole
) => {
  if (!mongoose.isValidObjectId(courseId)) {
    throw createError("Invalid course ID", 400);
  }

  const course = await Course.findById(courseId);

  if (!course) {
    throw createError("Course not found", 404);
  }

  if (userRole === "STUDENT") {
    await verifyStudentCourseAccess({
      course,
      studentId: userId,
    });
  } else if (userRole === "INSTRUCTOR") {
    await verifyInstructorCourseAccess({
      course,
      instructorId: userId,
    });
  } else if (userRole === "ADMIN") {
    await verifyOrganizationAdminCourseAccess({
      course,
      adminId: userId,
    });
  } else {
    throw createError("Access denied", 403);
  }

  return LiveSession.findOne({
    course: course._id,
    status: "LIVE",
  });
};


// --------------------------------------------------
// END LIVE SESSION
// --------------------------------------------------

export const endLiveSession = async (
  sessionId,
  instructorId,
  organizationId
) => {
  if (!mongoose.isValidObjectId(sessionId)) {
    throw createError("Invalid session ID", 400);
  }

  const session = await LiveSession.findById(sessionId);

  if (!session) {
    throw createError("Live session not found", 404);
  }

  if (session.instructor.toString() !== instructorId.toString()) {
    throw createError(
      "You can only end your own live session",
      403
    );
  }

  if (session.status === "ENDED") {
    throw createError(
      "Live session has already ended",
      400
    );
  }

  const course = await Course.findById(session.course);

  if (!course) {
    throw createError("Course not found", 404);
  }

  await verifyInstructorCourseAccess({
    course,
    instructorId,
  });

  if (
    !organizationId ||
    course.organizationId.toString() !== organizationId.toString()
  ) {
    throw createError("Organization access denied", 403);
  }

  await deleteLiveKitRoom(session.roomId);

  session.status = "ENDED";
  session.endedAt = new Date();

  return session.save();
};


// --------------------------------------------------
// JOIN LIVE SESSION
// --------------------------------------------------

export const joinLiveSession = async (
  sessionId,
  studentId
) => {
  if (!mongoose.isValidObjectId(sessionId)) {
    throw createError("Invalid session ID", 400);
  }

  const session = await LiveSession.findById(sessionId);

  if (!session) {
    throw createError("Live session not found", 404);
  }

  if (session.status !== "LIVE") {
    throw createError("This live class has ended", 400);
  }

  const course = await Course.findById(session.course);

  if (!course) {
    throw createError("Course not found", 404);
  }

  await verifyStudentCourseAccess({
    course,
    studentId,
  });

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


// --------------------------------------------------
// GET LIVEKIT ROOM
// --------------------------------------------------

export const getLiveKitRoom = async (
  roomId,
  instructorId,
  organizationId
) => {
  const session = await LiveSession.findOne({
    roomId,
    status: "LIVE",
    instructor: instructorId,
  });

  if (!session) {
    return null;
  }

  const course = await Course.findById(session.course);

  if (!course) {
    throw createError("Course not found", 404);
  }

  await verifyInstructorCourseAccess({
    course,
    instructorId,
  });

  if (
    !organizationId ||
    course.organizationId.toString() !== organizationId.toString()
  ) {
    throw createError("Organization access denied", 403);
  }

  const roomService = new RoomServiceClient(
    config.LIVEKIT_URL,
    config.LIVEKIT_API_KEY,
    config.LIVEKIT_API_SECRET
  );

  const rooms = await roomService.listRooms([roomId]);

  return rooms[0] || null;
};


// --------------------------------------------------
// DELETE LIVEKIT ROOM
// --------------------------------------------------

export const deleteLiveKitRoom = async (roomId) => {
  const roomService = new RoomServiceClient(
    config.LIVEKIT_URL,
    config.LIVEKIT_API_KEY,
    config.LIVEKIT_API_SECRET
  );

  await roomService.deleteRoom(roomId);
};
