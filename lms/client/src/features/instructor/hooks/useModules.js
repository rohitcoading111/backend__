import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import {
  fetchCourseModules,
  addModule,
  editModule,
  removeModule,
} from "../thunks/moduleThunks";

export default function useModules(courses = [], initialCourseId) {
  const dispatch = useDispatch();
  const location = useLocation();

  const { modules, loading, error } = useSelector(
    (state) => state.modules
  );

  const user = useSelector((state) => state.auth.user);

  const currentInstructorId = user?.id || user?._id;

  const routeCourseId =
    initialCourseId || location.state?.courseId || "";

  const [selectedCourseId, setSelectedCourseId] = useState(
    routeCourseId
  );

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingModule, setEditingModule] = useState(null);
  const [actionError, setActionError] = useState("");

  // Selected course
  const selectedCourse = useMemo(
    () =>
      courses.find(
        (course) =>
          String(course._id) === String(selectedCourseId)
      ) || null,
    [courses, selectedCourseId]
  );

  // Identify course owner
  const courseInstructorId =
    typeof selectedCourse?.instructor === "object"
      ? selectedCourse.instructor?._id ||
        selectedCourse.instructor?.id
      : selectedCourse?.instructor;

  const isOwner =
    Boolean(currentInstructorId) &&
    Boolean(courseInstructorId) &&
    String(currentInstructorId) === String(courseInstructorId);

  // Sync selected course from navigation
  useEffect(() => {
    if (routeCourseId) {
      setSelectedCourseId(routeCourseId);
    }
  }, [routeCourseId]);

  // Fetch modules whenever course changes
  useEffect(() => {
    if (selectedCourseId) {
      dispatch(fetchCourseModules(selectedCourseId));
    }
  }, [dispatch, selectedCourseId]);

  // Reset form
  function resetForm() {
    setTitle("");
    setDescription("");
    setEditingModule(null);
    setIsFormOpen(false);
    setActionError("");
  }

  // Select course
  function handleCourseChange(courseId) {
    setSelectedCourseId(courseId);
    resetForm();
  }

  // Open create form
  function openCreateForm() {
    if (!selectedCourseId || !isOwner) return;

    setEditingModule(null);
    setTitle("");
    setDescription("");
    setActionError("");
    setIsFormOpen(true);
  }

  // Close form
  function closeCreateForm() {
    resetForm();
  }

  // Start editing module
  function startEditing(module) {
    if (!isOwner) return;

    setEditingModule(module);
    setTitle(module.title || "");
    setDescription(module.description || "");
    setActionError("");
    setIsFormOpen(true);
  }

  // Cancel form
  function handleCancel() {
    resetForm();
  }

  // Create module
  async function handleCreateModule(event) {
    event?.preventDefault();

    if (!isOwner) {
      setActionError("You can only manage your own course modules.");
      return false;
    }

    if (!selectedCourseId || !title.trim()) {
      setActionError("Module title is required.");
      return false;
    }

    try {
      setActionError("");

      await dispatch(
        addModule({
          courseId: selectedCourseId,
          moduleData: {
            title: title.trim(),
            description: description.trim(),
          },
        })
      ).unwrap();

      await dispatch(
        fetchCourseModules(selectedCourseId)
      ).unwrap();

      resetForm();

      return true;
    } catch (err) {
      setActionError(
        err?.message || "Module creation failed."
      );

      return false;
    }
  }

  // Update module
  async function handleUpdateModule(moduleId, moduleData) {
    if (!isOwner) {
      setActionError("You can only update your own course modules.");
      return false;
    }

    try {
      setActionError("");

      await dispatch(
        editModule({
          moduleId,
          moduleData,
        })
      ).unwrap();

      await dispatch(
        fetchCourseModules(selectedCourseId)
      ).unwrap();

      return true;
    } catch (err) {
      setActionError(
        err?.message || "Module update failed."
      );

      return false;
    }
  }

  // Single submit handler for create and update
  async function handleSubmitModule(event) {
    event.preventDefault();

    if (!isOwner) return false;

    if (!editingModule) {
      return handleCreateModule(event);
    }

    const success = await handleUpdateModule(
      editingModule._id,
      {
        title: title.trim(),
        description: description.trim(),
      }
    );

    if (success) {
      resetForm();
    }

    return success;
  }

  // Delete module
  async function handleDeleteModule(moduleId) {
    if (!isOwner) {
      setActionError("You cannot delete another instructor's module.");
      return false;
    }

    try {
      setActionError("");

      await dispatch(
        removeModule(moduleId)
      ).unwrap();

      await dispatch(
        fetchCourseModules(selectedCourseId)
      ).unwrap();

      return true;
    } catch (err) {
      setActionError(
        err?.message || "Module deletion failed."
      );

      return false;
    }
  }

  // Open lecture workspace
  function handleOpenLectures(module, onAddLecture) {
    if (!onAddLecture) return;

    onAddLecture({
      courseId: selectedCourseId,
      courseTitle: selectedCourse?.title,
      moduleId: module._id,
      moduleTitle: module.title,
      readOnly: !isOwner,
    });
  }

  return {
    modules,
    loading,
    error,
    actionError,

    selectedCourseId,
    selectedCourse,
    isOwner,

    isFormOpen,
    editingModule,

    title,
    description,
    setTitle,
    setDescription,

    handleCourseChange,
    openCreateForm,
    closeCreateForm,

    startEditing,
    handleCancel,

    handleCreateModule,
    handleUpdateModule,
    handleSubmitModule,
    handleDeleteModule,

    handleSelectCourse: handleCourseChange,
    handleOpenLectures,
  };
}