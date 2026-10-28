import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import {
  fetchCourseModules,
  addModule,
  editModule,
  removeModule,
} from "../thunks/moduleThunks";

export default function useModules(courses = []) {
  const dispatch = useDispatch();
  const location = useLocation();

  const { modules, loading, error } = useSelector(
    (state) => state.modules
  );

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

  useEffect(() => {
    if (selectedCourseId) {
      dispatch(fetchCourseModules(selectedCourseId));
    }
  }, [dispatch, selectedCourseId]);

  function handleCourseChange(courseId) {
    setSelectedCourseId(courseId);
    setIsFormOpen(false);
    setTitle("");
    setDescription("");
  }

  function openCreateForm() {
    if (!selectedCourseId) return;

    setTitle("");
    setDescription("");
    setIsFormOpen(true);
  }

  function closeCreateForm() {
    setIsFormOpen(false);
  }

  async function handleCreateModule(event) {
    event.preventDefault();

    if (!selectedCourseId || !title.trim()) return;

    try {
      await dispatch(
        addModule({
          courseId: selectedCourseId,
          moduleData: {
            title: title.trim(),
            description: description.trim(),
          },
        })
      ).unwrap();

      setTitle("");
      setDescription("");
      setIsFormOpen(false);

      // Refresh modules from the backend.
      await dispatch(fetchCourseModules(selectedCourseId)).unwrap();
    } catch (err) {
      console.error("Module creation failed:", err);
    }
  }

  async function handleUpdateModule(moduleId, moduleData) {
    try {
      await dispatch(
        editModule({ moduleId, moduleData })
      ).unwrap();

      await dispatch(fetchCourseModules(selectedCourseId)).unwrap();
    } catch (err) {
      console.error("Module update failed:", err);
    }
  }

  async function handleDeleteModule(moduleId) {
    try {
      await dispatch(removeModule(moduleId)).unwrap();
    } catch (err) {
      console.error("Module deletion failed:", err);
    }
  }

  return {
    modules,
    loading,
    error,
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
    handleUpdateModule,
    handleDeleteModule,
  };
}
