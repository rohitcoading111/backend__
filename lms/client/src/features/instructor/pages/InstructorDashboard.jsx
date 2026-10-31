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
    label: "My Courses",
    hint: "Create courses and manage their content",
    icon: BookOpen,
  },
  {
    id: "modules",
    label: "Modules",
    hint: "Organise each course into modules",
    icon: Layers,
  },
  {
    id: "lectures",
    label: "Lectures",
    hint: "Upload and arrange your lessons",
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

/*
  Modules, Lectures and Live Classes components are still styled for a white
  background. Until they are restyled, they sit inside this light panel so
  nothing becomes unreadable on the black page.
*/
const LIGHT_PANEL = "rounded-3xl bg-white p-6 text-black sm:p-8";

function CourseSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10">
      <div className="aspect-[16/10] animate-pulse bg-white/5 motion-reduce:animate-none" />
      <div className="space-y-3 p-6">
        <div className="h-4 w-2/3 animate-pulse rounded-full bg-white/10 motion-reduce:animate-none" />
        <div className="h-3 w-full animate-pulse rounded-full bg-white/5 motion-reduce:animate-none" />
        <div className="h-3 w-4/5 animate-pulse rounded-full bg-white/5 motion-reduce:animate-none" />
        <div className="h-10 w-full animate-pulse rounded-full bg-white/5 motion-reduce:animate-none" />
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
    loading: coursesLoading,
    error: coursesError,
    refreshCourses,
    handleDelete,
    handlePublish,
    handleUnpublish,
  } = useInstructorCourses();

  // Sync activeSection if passed from navigation state
  useEffect(() => {
    if (location.state?.activeSection) {
      setActiveSection(location.state.activeSection);
    }
  }, [location.state]);

  // Close the mobile sidebar with Escape
  useEffect(() => {
    if (!sidebarOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sidebarOpen]);

  const stats = useMemo(() => {
    const list = Array.isArray(courses) ? courses : [];
    const published = list.filter((c) => c.status !== "DRAFT").length;
    return [
      { label: "Total courses", value: list.length },
      { label: "Published", value: published },
      { label: "Drafts", value: list.length - published },
    ];
  }, [courses]);

  const activeItem = NAV_ITEMS.find((item) => item.id === activeSection);
  const showStats =
    activeSection === "courses" &&
    !isFormOpen &&
    !coursesLoading &&
    !coursesError;

  function handleDashboardRedirect() {
    navigate("/dashboard");
  }

  async function handleLogout() {
    try {
      setLoggingOut(true);
      await dispatch(logoutUser()).unwrap();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
    }
  }

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

  function handleAddLecture({ courseId, courseTitle, moduleId, moduleTitle }) {
    setActiveSection("lectures");
    setSelectedCourse(null);
    setIsFormOpen(false);
    setSidebarOpen(false);

    navigate("/instructor-dashboard", {
      replace: false,
      state: {
        activeSection: "lectures",
        lectureCourseId: courseId,
        lectureCourseTitle: courseTitle,
        lectureModuleId: moduleId,
        lectureModuleTitle: moduleTitle,
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
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-black transition-transform duration-300 ease-out motion-reduce:transition-none lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
            <BookOpen size={18} />
          </div>

          <div>
            <h1 className="font-semibold tracking-tight">LearnHub</h1>
            <p className="text-xs text-white/40">Instructor workspace</p>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
            className={`ml-auto rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white lg:hidden ${focusRing}`}
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-6" aria-label="Workspace">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const active = activeSection === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => handleSectionChange(id)}
                aria-current={active ? "page" : undefined}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-300 ${focusRing} ${
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

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 px-2 pb-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-sm font-semibold">
              {initial}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{instructorName}</p>
              <p className="text-xs text-white/40">Instructor account</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDashboardRedirect}
            className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white ${focusRing}`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className={`mt-1 flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm text-white/60 transition-colors hover:bg-white hover:text-black disabled:opacity-40 ${focusRing}`}
          >
            <LogOut size={18} />
            {loggingOut ? "Logging out" : "Log out"}
          </button>
        </div>
      </aside>

      {/* Main column */}
      <div className="min-h-screen lg:pl-64">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-black/70 px-5 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
              className={`rounded-full border border-white/15 p-2.5 text-white/70 transition-colors hover:border-white/40 hover:text-white lg:hidden ${focusRing}`}
            >
              <Menu size={18} />
            </button>

            <div>
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
              className={`inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all hover:bg-white/85 active:scale-[0.97] motion-reduce:active:scale-100 ${focusRing}`}
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Create course</span>
            </button>
          )}
        </header>

        <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          {/* Greeting (hidden while the course form is open) */}
          {!(activeSection === "courses" && isFormOpen) && (
            <div className="mb-10">
              <p className="text-sm text-white/40">Welcome back</p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
                {instructorName}
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/40">
                Create and manage your courses, lessons and live sessions.
              </p>
            </div>
          )}

          {/* Stats */}
          {showStats && (
            <div className="mb-10 grid grid-cols-3 gap-3 sm:gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5"
                >
                  <p className="text-3xl font-semibold tabular-nums tracking-tight">
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
                      My courses
                    </h3>
                    <p className="mt-1 text-sm text-white/40">
                      Create courses and manage their content.
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
            </section>
          )}

          {activeSection === "modules" && (
            <section className={LIGHT_PANEL}>
              <ModuleManagement
                courses={courses}
                onAddLecture={handleAddLecture}
                initialCourseId={location.state?.courseId}
              />
            </section>
          )}

          {activeSection === "lectures" && (
            <section className={LIGHT_PANEL}>
              <LectureWorkspace courses={courses} />
            </section>
          )}

          {activeSection === "live-classes" && (
            <section className={LIGHT_PANEL}>
              <LiveSessionWorkspace />
            </section>
          )}
        </main>
      </div>
    </div>
  );
}