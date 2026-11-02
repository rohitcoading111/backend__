import api from "../../../services/api.js";


const INSTRUCTOR_URL = "/organization/instructors";

// ==========================================
// ORGANIZATION DETAILS
// ==========================================

// GET: Logged-in Organization Admin's organization
export const getOrganizationDetails = async () => {
  const response = await api.get("/organizations/me");
  return response.data;
};

// ==========================================
// INSTRUCTOR MANAGEMENT
// ==========================================

// GET: Organization instructors
export const getOrganizationInstructors = async () => {
  const response = await api.get(INSTRUCTOR_URL);
  return response.data;
};

// GET: Search independent instructor by ID or email
export const searchIndependentInstructor = async (identifier) => {
  const response = await api.get(
    `${INSTRUCTOR_URL}/search`,
    {
      params: {
        identifier: identifier.trim(),
      },
    }
  );

  return response.data;
};

// POST: Hire instructor
export const hireInstructor = async (userId) => {
  const response = await api.post(
    `${INSTRUCTOR_URL}/${userId}/hire`
  );

  return response.data;
};

// PATCH: Remove instructor
export const removeInstructor = async (instructorId) => {
  const response = await api.patch(
    `${INSTRUCTOR_URL}/${instructorId}/remove`
  );

  return response.data;
};