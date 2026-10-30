
import api from "../../../services/api";

// 1. Create live session
export const createLiveSessionService = async (courseId) => {
  const response = await api.post("/live-sessions", {
    courseId,
  });

  return response.data.data;
};

// 2. Get active session of a course
export const getActiveLiveSessionService = async (courseId) => {
  const response = await api.get(
    `/course/${courseId}/active`
  );

  return response.data.data;
};


// 4. End live session (Instructor)
export const endLiveSessionService = async (sessionId) => {
  const response = await api.patch(
    `/${sessionId}/end`
  );

  return response.data.data;
};

// 5. Get LiveKit room details
export const getLiveKitRoomService = async (roomId) => {
  const response = await api.get(
    `/rooms/${roomId}`
  );

  return response.data.data;
};
