import api from "../../../services/api.js";

const BASE_URL = "/organization/instructors";

// 1. Get all instructors of logged-in organization
export const getOrganizationInstructors = async () => {
  const response = await api.get(BASE_URL);

  return response.data;
};

// 2. Search independent instructor using email or instructorCode
export const searchIndependentInstructor = async (identifier) => {
  const response = await api.get(
    `${BASE_URL}/search`,
    {
      params: {
        identifier: identifier.trim(),
      },
    }
  );

  return response.data;
};

// 3. Hire an independent instructor
export const hireInstructor = async (userId) => {
  const response = await api.post(
    `${BASE_URL}/${userId}/hire`
  );

  return response.data;
};

// 4. Remove instructor from organization
export const removeInstructor = async (instructorId) => {
  const response = await api.patch(
    `${BASE_URL}/${instructorId}/remove`
  );

  return response.data;
};