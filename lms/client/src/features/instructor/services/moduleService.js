
import api from "../../../services/api";

// Get all modules for a specific course
export async function getCourseModules(courseId) {
  const response = await api.get(
    `/modules/courses/${courseId}/modules`
  );

  return response.data;
}

// Create a module inside a course
export async function createModule(courseId, moduleData) {
  const response = await api.post(
    `/modules/courses/${courseId}/modules`,
    moduleData
  );

  return response.data;
}

// Update an existing module
export async function updateModule(moduleId, moduleData) {
  const response = await api.patch(
    `/modules/${moduleId}`,
    moduleData
  );

  return response.data;
}

// Delete an existing module
export async function deleteModule(moduleId) {
  const response = await api.delete(`/modules/${moduleId}`);

  return response.data;
}
