import api from "../../../services/api.js";

export const getInstructorOrganizationOverview = async () => {
  const response = await api.get(
    "/organizations/instructor-overview"
  );

  return response.data.data;
};