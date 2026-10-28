import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Layers,
  Video,
  Radio,
  Plus,
  Menu,
  X,
} from "lucide-react";

import CourseForm from "../components/CourseForm";
import CourseList from "../components/CourseList";
import useCourseForm from "../hooks/useCourseForm";
import useInstructorCourses from "../hooks/useInstructorCourses";
import ModuleManagement from "../components/ModuleManagement.jsx"

const NAV_ITEMS = [
  { id: "courses", label: "My Courses", icon: BookOpen },
  { id: "modules", label: "Modules", icon: Layers },
  { id: "lectures", label: "Lectures", icon: Video },
  { id: "live-classes", label: "Live Classes", icon: Radio },
];

export default function InstructorDashboard() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("courses");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const instructorName = user?.name?.trim() || "Instructor";

  const {
    submitCourse,
    loading: formLoading,
    error: formError,
  } = useCourseForm(selectedCourse);

  const {
    courses,
    loading: coursesLoading,
    error: coursesError,
    refreshCourses,
    handleDelete,
    handlePublish,
    handleUnpublish,
  } = useInstructorCourses();

  function handleSectionChange(section) {
    setActiveSection(section);
    setSidebarOpen(false);
    setIsFormOpen(false);
    setSelectedCourse(null);
  }

  function handleCreateCourse() {
    setSelectedCourse(null);
    setIsFormOpen(true);
  }

  function handleEditCourse(course) {
    setSelectedCourse(course);
    setIsFormOpen(true);
  }

 async function handleCourseSubmit(courseData) {
  try {
    await submitCourse(courseData);

    setIsFormOpen(false);
    setSelectedCourse(null);

    await refreshCourses();
  } catch (error) {
    console.error("Course submission failed:", error);
  }
}

  function handleCancelForm() {
    setIsFormOpen(false);
    setSelectedCourse(null);
  }

function handleAddModule(course) {
  setActiveSection("modules");
  setSelectedCourse(null);
  setIsFormOpen(false);
  setSidebarOpen(false);

  navigate("/instructor-dashboard", {
    replace: false,
    state: {
      activeSection: "modules",
      courseId: course._id,
      courseTitle: course.title,
    },
  });
}

  return (
    <div className="min-h-screen bg-white text-black">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-neutral-200 bg-white transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center gap-3 border-b border-neutral-200 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white">
            <BookOpen size={19} />
          </div>

          <div>
            <h1 className="font-semibold tracking-tight">LearnHub</h1>
            <p className="text-xs text-neutral-500">
              Instructor workspace
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
            className="ml-auto lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        <div className="px-4 py-6">
          <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-neutral-400">
            Workspace
          </p>

          <nav className="space-y-1">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleSectionChange(id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                  activeSection === id
                    ? "bg-black text-white"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-black"
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto border-t border-neutral-200 p-4">
          <div className="truncate px-2 text-sm font-medium">
            {instructorName}
          </div>
          <div className="px-2 pt-1 text-xs text-neutral-500">
            Instructor account
          </div>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-64">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-neutral-200 bg-white/95 px-5 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
              className="rounded-lg border border-neutral-200 p-2 lg:hidden"
            >
              <Menu size={19} />
            </button>

            <div>
              <h2 className="font-semibold">
                {NAV_ITEMS.find(
                  (item) => item.id === activeSection
                )?.label}
              </h2>
              <p className="text-xs text-neutral-500">
                Manage your teaching workspace
              </p>
            </div>
          </div>

          {activeSection === "courses" && !isFormOpen && (
            <button
              type="button"
              onClick={handleCreateCourse}
              className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">
                Create course
              </span>
            </button>
          )}
        </header>

        <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <div className="mb-8">
            <p className="text-sm text-neutral-500">Welcome back</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              {instructorName}
            </h1>
            <p className="mt-2 text-sm text-neutral-500">
              Create and manage your courses, lessons and live sessions.
            </p>
          </div>

          <section className="rounded-2xl border border-neutral-200 p-6 sm:p-8">
            {activeSection === "courses" && (
              <>
                {isFormOpen ? (
                  <div className="mx-auto max-w-2xl">
                    <CourseForm
                      initialCourse={selectedCourse}
                      onSubmit={handleCourseSubmit}
                      onCancel={handleCancelForm}
                      loading={formLoading}
                    />

                    {formError && (
                      <p className="mt-4 text-sm text-red-600">
                        {formError}
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold">
                        My courses
                      </h3>
                      <p className="mt-1 text-sm text-neutral-500">
                        Create courses and manage their content.
                      </p>
                    </div>

                    {coursesLoading ? (
                      <p className="py-8 text-center text-sm text-neutral-500">
                        Loading courses...
                      </p>
                    ) : coursesError ? (
                      <p className="py-8 text-center text-sm text-red-600">
                        {coursesError}
                      </p>
                    ) : (
                      <CourseList
                        courses={courses}
                        onEdit={handleEditCourse}
                        onDelete={handleDelete}
                        onPublish={handlePublish}
                        onUnpublish={handleUnpublish}
                        onAddModule={handleAddModule}
                      />
                    )}
                  </div>
                )}
              </>
            )}

           {activeSection === "modules" && (
          <ModuleManagement courses={courses} />
         )}

            {activeSection === "lectures" && (
              <SectionPlaceholder
                title="Lecture management"
                description="Select a course and module to manage video lessons."
              />
            )}

            {activeSection === "live-classes" && (
              <SectionPlaceholder
                title="Live classes"
                description="Create and manage live sessions for your courses."
              />
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

function SectionPlaceholder({ title, description }) {
  return (
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-neutral-500">{description}</p>
    </div>
  );
}
