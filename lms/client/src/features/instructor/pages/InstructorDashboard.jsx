import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  BookOpen,
  Layers,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Radio,
  Video,
  X,
} from "lucide-react";

import { logoutUser } from "../../auth/authThunk/authThunks.js";
import { logout } from "../../auth/authSlices/authSlice.js";

import LectureWorkspace from "../components/LectureWorkspace";
import LiveSessionWorkspace from "../components/LiveSessionWorkspace.jsx";
import CourseForm from "../components/CourseForm";
import CourseList from "../components/CourseList";
import ModuleManagement from "../components/ModuleManagement.jsx";

import useCourseForm from "../hooks/useCourseForm";
import useInstructorCourses from "../hooks/useInstructorCourses";

const NAV_ITEMS = [
  {
    id: "courses",
    label: "Organization Courses",
    hint: "View organization courses and manage your own",
    icon: BookOpen,
  },
  {
    id: "modules",
    label: "Modules",
    hint: "View and manage course modules",
    icon: Layers,
  },
  {
    id: "lectures",
    label: "Lectures",
    hint: "View and manage course lectures",
    icon: Video,
  },
  {
    id: "live-classes",
    label: "Live Classes",
    hint: "Schedule and host live sessions",
    icon: Radio,
  },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black";

function CourseSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10">
      <div className="aspect-[16/10] animate-pulse bg-white/5" />

      <div className="space-y-3 p-6">
        <div className="h-4 w-2/3 animate-pulse rounded-full bg-white/10" />
        <div className="h-3 w-full animate-pulse rounded-full bg-white/5" />
        <div className="h-3 w-4/5 animate-pulse rounded-full bg-white/5" />
        <div className="h-10 w-full animate-pulse rounded-full bg-white/5" />
      </div>
    </div>
  );
}

export default function InstructorDashboard() {
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [loggingOut, setLoggingOut] = useState(false);
  const [activeSection, setActiveSection] = useState("courses");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const instructorName = user?.name?.trim() || "Instructor";
  const initial = instructorName.charAt(0).toUpperCase();

  const {
    submitCourse,
    loading: formLoading,
    error: formError,
  } = useCourseForm(selectedCourse);

  const {
    courses,
    coursesWithOwnership,
    loading: coursesLoading,
    error: coursesError,
    refreshCourses,
    isCourseOwner,
    handleDelete,
    handlePublish,
    handleUnpublish,
  } = useInstructorCourses();

  // Sync active section from navigation state.
  useEffect(() => {
    if (location.state?.activeSection) {
      setActiveSection(location.state.activeSection);
    }
  }, [location.state?.activeSection]);

  // Close mobile sidebar with Escape.
  useEffect(() => {
    if (!sidebarOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [sidebarOpen]);

  // Dashboard statistics.
  const stats = useMemo(() => {
    const published = courses.filter(
      (course) => course.status === "PUBLISHED"
    ).length;

    return [
      { label: "Total courses", value: courses.length },
      { label: "Published", value: published },
      { label: "Drafts", value: courses.length - published },
    ];
  }, [courses]);

  const activeItem = NAV_ITEMS.find(
    (item) => item.id === activeSection
  );

  const showStats =
    activeSection === "courses" &&
    !isFormOpen &&
    !coursesLoading &&
    !coursesError;

  // Return to organization overview.
  function handleDashboardRedirect() {
    navigate("/organization-overview");
  }

  // Logout with local fallback.
  async function handleLogout() {
    if (loggingOut) return;

    try {
      setLoggingOut(true);
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
      dispatch(logout());
    } finally {
      navigate("/login", { replace: true });
      setLoggingOut(false);
    }
  }

  // Change dashboard section.
  function handleSectionChange(section) {
    setActiveSection(section);
    setSidebarOpen(false);
    setIsFormOpen(false);
    setSelectedCourse(null);
  }

  // Create course.
  function handleCreateCourse() {
    setSelectedCourse(null);
    setIsFormOpen(true);
  }

  // Edit course: owner only.
  function handleEditCourse(course) {
    if (!isCourseOwner(course)) return;

    setSelectedCourse(course);
    setIsFormOpen(true);
  }

  // Submit course form.
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

  // Cancel course form.
  function handleCancelForm() {
    setIsFormOpen(false);
    setSelectedCourse(null);
  }

  // Open modules for any organization course.
  function handleAddModule(course) {
    setActiveSection("modules");
    setSelectedCourse(null);
    setIsFormOpen(false);
    setSidebarOpen(false);

    navigate("/organization-instructor-dashboard", {
      state: {
        activeSection: "modules",
        courseId: course._id,
        courseTitle: course.title,
      },
    });
  }

  // Open lecture workspace for selected module.
  function handleAddLecture({
    courseId,
    courseTitle,
    moduleId,
    moduleTitle,
    readOnly = false,
  }) {
    setActiveSection("lectures");
    setSelectedCourse(null);
    setIsFormOpen(false);
    setSidebarOpen(false);

    navigate("/organization-instructor-dashboard", {
      state: {
        activeSection: "lectures",
        lectureCourseId: courseId,
        lectureCourseTitle: courseTitle,
        lectureModuleId: moduleId,
        lectureModuleTitle: moduleTitle,
        readOnly,
      },
    });
  }

  return (
    <div className="min-h-screen bg-black text-white antialiased">

      {/* Mobile overlay */}
      <div
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          sidebarOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-black transition-transform duration-300 ease-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
            <BookOpen size={18} />
          </div>

          <div>
            <h1 className="font-semibold tracking-tight">
              LearnHub
            </h1>

            <p className="text-xs text-white/40">
              Organization instructor
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
            className={`ml-auto rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white lg:hidden ${focusRing}`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 space-y-1 px-4 py-6"
          aria-label="Workspace"
        >
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const active = activeSection === id;

            return (
              <button
                key={id}
                type="button"
                onClick={() => handleSectionChange(id)}
                aria-current={active ? "page" : undefined}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all ${focusRing} ${
                  active
                    ? "bg-white text-black"
                    : "text-white/50 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Profile */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 px-2 pb-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-sm font-semibold">
              {initial}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {instructorName}
              </p>

              <p className="text-xs text-white/40">
                Instructor account
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDashboardRedirect}
            className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white ${focusRing}`}
          >
            <LayoutDashboard size={18} />
            Organization overview
          </button>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className={`mt-1 flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm text-white/60 transition-colors hover:bg-white hover:text-black disabled:opacity-40 ${focusRing}`}
          >
            <LogOut size={18} />
            {loggingOut ? "Logging out..." : "Log out"}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="min-h-screen lg:pl-64">

        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-white/10 bg-black/70 px-4 backdrop-blur-xl sm:h-20 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
              className={`rounded-full border border-white/15 p-2.5 text-white/70 hover:border-white/40 hover:text-white lg:hidden ${focusRing}`}
            >
              <Menu size={18} />
            </button>

            <div className="min-w-0">
              <h2 className="font-semibold tracking-tight">
                {activeItem?.label}
              </h2>

              <p className="hidden text-xs text-white/40 sm:block">
                {activeItem?.hint}
              </p>
            </div>
          </div>

          {activeSection === "courses" && !isFormOpen && (
            <button
              type="button"
              onClick={handleCreateCourse}
              aria-label="Create course"
              className={`inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-3 py-2.5 text-sm font-semibold text-black transition-all hover:bg-white/85 active:scale-[0.97] sm:px-5 ${focusRing}`}
            >
              <Plus size={16} />
              <span className="hidden sm:inline">
                Create course
              </span>
            </button>
          )}
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-10">

          {/* Greeting */}
          {!(activeSection === "courses" && isFormOpen) && (
            <div className="mb-10">
              <p className="text-sm text-white/40">
                Welcome back
              </p>

              <h1 className="mt-2 break-words text-3xl font-semibold tracking-tight sm:text-5xl">
                {instructorName}
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/40">
                View organization courses and manage your own courses,
                modules, lectures and live sessions.
              </p>
            </div>
          )}

          {/* Stats */}
          {showStats && (
            <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5"
                >
                  <p className="text-2xl font-semibold tabular-nums tracking-tight sm:text-3xl">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-xs text-white/40 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Courses */}
          {activeSection === "courses" && (
            <section>
              {isFormOpen ? (
                <div>
                  <button
                    type="button"
                    onClick={handleCancelForm}
                    className={`mb-6 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/50 transition-colors hover:bg-white/10 hover:text-white ${focusRing}`}
                  >
                    <ArrowLeft size={16} />
                    Back to courses
                  </button>

                  <CourseForm
                    initialCourse={selectedCourse}
                    onSubmit={handleCourseSubmit}
                    onCancel={handleCancelForm}
                    loading={formLoading}
                  />

                  {formError && (
                    <p
                      role="alert"
                      className="mt-4 rounded-xl border border-white/20 bg-white/[0.04] px-4 py-3 text-sm text-white/80"
                    >
                      {formError}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold tracking-tight">
                      Organization courses
                    </h3>

                    <p className="mt-1 text-sm text-white/40">
                      All courses in your organization. You can manage
                      courses created by you.
                    </p>
                  </div>

                  {coursesLoading ? (
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                      <CourseSkeleton />
                      <CourseSkeleton />
                      <CourseSkeleton />
                    </div>
                  ) : coursesError ? (
                    <p
                      role="alert"
                      className="rounded-2xl border border-white/15 bg-white/[0.03] px-6 py-10 text-center text-sm text-white/70"
                    >
                      {coursesError}
                    </p>
                  ) : (
                    <CourseList
                      courses={coursesWithOwnership}
                      onEdit={handleEditCourse}
                      onDelete={handleDelete}
                      onPublish={handlePublish}
                      onUnpublish={handleUnpublish}
                      onAddModule={handleAddModule}
                      onCreate={handleCreateCourse}
                    />
                  )}
                </div>
              )}
            </section>
          )}

          {/* Modules */}
          {activeSection === "modules" && (
            <section>
              <ModuleManagement
                courses={courses}
                onAddLecture={handleAddLecture}
                initialCourseId={location.state?.courseId}
              />
            </section>
          )}

          {/* Lectures */}
          {activeSection === "lectures" && (
            <section>
              <LectureWorkspace
                courses={courses}
                readOnly={Boolean(location.state?.readOnly)}
              />
            </section>
          )}

          {/* Live Classes */}
          {activeSection === "live-classes" && (
            <section>
              <LiveSessionWorkspace />
            </section>
          )}
        </main>
      </div>
    </div>
  );
}