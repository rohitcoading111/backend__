
import api from "../../../services/api.js";

// Fetch courses in which the logged-in student is enrolled.
export const getMyEnrolledCourses = async () => {
  const response = await api.get("/enrollments/my-enrollments");
  return response.data;
};

// Fetch the active live session for one course.
// A 404 means the course currently has no active session.
export const getActiveLiveSession = async (courseId) => {
  const response = await api.get(
    `/live-sessions/course/${courseId}/active`
  );

  return response.data;
};

// Ask the backend to authorize the student to join a live session.
export const joinLiveSession = async (sessionId) => {
  const response = await api.post(
    `/live-sessions/${sessionId}/join`
  );

  return response.data;
};
