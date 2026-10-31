
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  ArrowUpRight,
  Compass,
  Play,
} from "lucide-react";

import { logoutUser } from "../../auth/authThunk/authThunks.js";

import Sidebar from "../components/Sidebar.jsx";
import DashboardHeader from "../components/DashboardHeader.jsx";
import DashboardStats from "../components/DashboardStats.jsx";
import MyCourses from "../components/MyCourses.jsx";
import LearningProgress from "../components/LearningProgress.jsx";
import LiveClasses from "../components/LiveClasses.jsx";
import LearningActivity from "../components/LearningActivity.jsx";

import useLearningProgress from "../hooks/useLearningProgress.js";
import useMyCourses from "../hooks/useMyCourses.js";

function Dashboard() {
  // Redux user
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // UI states
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Active sidebar section
  const [activeSection, setActiveSection] = useState("overview");

  // User information
  const firstName =
    user?.name?.trim()?.split(/\s+/)[0] || "Learner";

  const initials = user?.name
    ? user.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase()
    : "S";

  // Learning progress hook
  const {
    summary,
    loading: progressLoading,
    error: progressError,
    refreshProgress,
    progress,
  } = useLearningProgress();

  // My courses hook
  const {
    enrollments,
    loading: coursesLoading,
    error: coursesError,
    refreshCourses,
  } = useMyCourses();

  // Logout
  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      await dispatch(logoutUser()).unwrap();

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
    }
  };

  // Join live class
  const handleJoinClass = (liveClass) => {
    navigate("/live-classes", {
      state: { liveClass },
    });
  };

  // Course click
  const handleCourseClick = (course) => {
    if (!course?._id) return;

    navigate(`/courses/${course._id}/modules`);
  };

  // Browse courses
  const handleBrowseCourses = () => {
    navigate("/courses");
  };

  // Sidebar navigation
  const handleNavigation = (section) => {
    setActiveSection(section);

    // Reset scroll when switching sections
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      id="overview"
      className="min-h-screen bg-[#f7f7f5] text-[#171717] antialiased"
    >
      {/* Sidebar */}
      <Sidebar
        user={user}
        initials={initials}
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
        loggingOut={loggingOut}
        activeSection={activeSection}
        onNavigate={handleNavigation}
      />

      {/* Main layout */}
      <div className="min-h-screen lg:pl-[260px]">

        {/* Header */}
        <DashboardHeader
          user={user}
          initials={initials}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">

          {/* ================================= */}
          {/* OVERVIEW */}
          {/* ================================= */}

          {activeSection === "overview" && (
            <>
              {/* Welcome */}
              <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white px-3 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-black" />

                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-600">
                      Your learning space
                    </span>
                  </div>

                  <h1 className="text-3xl font-semibold tracking-[-0.055em] sm:text-4xl lg:text-[46px]">
                    Welcome back, {firstName}.
                  </h1>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-500 sm:text-base">
                    Your next breakthrough starts with one lesson.
                    Let&apos;s make today count.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleBrowseCourses}
                  className="inline-flex w-fit items-center gap-2 rounded-xl bg-black px-5 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-800 active:scale-95"
                >
                  Explore learning
                  <ArrowUpRight size={17} />
                </button>
              </section>

              {/* Stats */}
              <section className="mt-9">
                <DashboardStats
                  enrolledCourses={summary.enrolledCourses}
                  completedLessons={summary.completedLessons}
                  learningHours={summary.learningHours}
                  overallProgress={summary.overallProgress}
                  loading={progressLoading}
                />
              </section>

              {/* Learning hero */}
              <section className="mt-9">
                <article className="relative overflow-hidden rounded-2xl bg-[#111111] p-6 text-white sm:p-8">

                  {/* Decorative circles */}
                  <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full border border-white/[0.08]" />

                  <div className="pointer-events-none absolute -right-7 -top-10 h-36 w-36 rounded-full border border-white/[0.08]" />

                  <div className="relative">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-300">
                      <Compass size={13} />
                      Your next chapter
                    </div>

                    <h2 className="mt-6 max-w-sm text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                      Knowledge grows with every step.
                    </h2>

                    <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-400">
                      Continue exploring your enrolled courses and make
                      progress one lesson at a time.
                    </p>

                    <button
                      type="button"
                      onClick={() => setActiveSection("my-courses")}
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-neutral-200"
                    >
                      <Play size={15} fill="currentColor" />
                      View my courses
                    </button>
                  </div>
                </article>
              </section>
            </>
          )}

          {/* ================================= */}
          {/* MY COURSES */}
          {/* ================================= */}

          {activeSection === "my-courses" && (
            <section>
              <div className="mb-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                  Learning library
                </p>

                <h1 className="mt-3 text-3xl font-semibold tracking-tight">
                  My courses
                </h1>

                <p className="mt-2 text-sm text-neutral-500">
                  Continue learning and explore your enrolled courses.
                </p>
              </div>

              <MyCourses
                enrollments={enrollments}
                loading={coursesLoading}
                error={coursesError}
                onRetry={refreshCourses}
                onCourseClick={handleCourseClick}
                onBrowseCourses={handleBrowseCourses}
              />
            </section>
          )}

          {/* ================================= */}
          {/* LIVE CLASSES */}
          {/* ================================= */}

          {activeSection === "live-classes" && (
            <section>
              <div className="mb-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                  Live learning
                </p>

                <h1 className="mt-3 text-3xl font-semibold tracking-tight">
                  Live classes
                </h1>

                <p className="mt-2 text-sm text-neutral-500">
                  Join your live learning sessions.
                </p>
              </div>

              <LiveClasses
                classes={[]}
                loading={false}
                onViewClasses={() => navigate("/live-classes")}
                onJoinClass={handleJoinClass}
              />
            </section>
          )}

          {/* ================================= */}
          {/* MY PROGRESS */}
          {/* ================================= */}

          {activeSection === "my-progress" && (
            <section>
              <div className="mb-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                  Performance
                </p>

                <h1 className="mt-3 text-3xl font-semibold tracking-tight">
                  My progress
                </h1>

                <p className="mt-2 text-sm text-neutral-500">
                  Track your completed lessons and learning performance.
                </p>
              </div>

              <LearningProgress
                summary={summary}
                progress={progress}
                loading={progressLoading}
                error={progressError}
                onRetry={refreshProgress}
              />
            </section>
          )}

          {/* ================================= */}
          {/* ACHIEVEMENTS */}
          {/* ================================= */}

          {activeSection === "achievements" && (
            <section>
              <div className="mb-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                  Your accomplishments
                </p>

                <h1 className="mt-3 text-3xl font-semibold tracking-tight">
                  Achievements
                </h1>

                <p className="mt-2 text-sm text-neutral-500">
                  Explore your learning activities and achievements.
                </p>
              </div>

              <LearningActivity
                activities={[]}
                achievements={[]}
                loading={false}
                onViewAchievements={() => {}}
              />
            </section>
          )}

          {/* ================================= */}
          {/* FOOTER */}
          {/* ================================= */}

          <footer className="mt-10 flex flex-col gap-2 border-t border-black/[0.07] py-6 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} LearnHub. Keep learning.
            </p>

            <p className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
              Student workspace
            </p>
          </footer>

        </main>
      </div>
    </div>
  );
}

export default Dashboard;
