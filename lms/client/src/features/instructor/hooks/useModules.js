
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useModules(courses = []) {
  const location = useLocation();

  const [selectedCourseId, setSelectedCourseId] = useState(
    location.state?.courseId || ""
  );

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const selectedCourse = courses.find(
    (course) => course._id === selectedCourseId
  );

  useEffect(() => {
    if (location.state?.courseId) {
      setSelectedCourseId(location.state.courseId);
    }
  }, [location.state?.courseId]);

  function handleCourseChange(courseId) {
    setSelectedCourseId(courseId);
    setIsFormOpen(false);
    setTitle("");
    setDescription("");
  }

  function openCreateForm() {
    if (!selectedCourseId) return;
    setIsFormOpen(true);
  }

  function closeCreateForm() {
    setIsFormOpen(false);
  }

  function handleCreateModule(event) {
    event.preventDefault();

    if (!selectedCourseId || !title.trim()) return;

    // Temporary until the module API is connected.
    const moduleData = {
      courseId: selectedCourseId,
      title: title.trim(),
      description: description.trim(),
    };

    console.log("Module data:", moduleData);
  }

  return {
    selectedCourseId,
    selectedCourse,
    isFormOpen,
    title,
    description,
    setTitle,
    setDescription,
    handleCourseChange,
    openCreateForm,
    closeCreateForm,
    handleCreateModule,
  };
}
