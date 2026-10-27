
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
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const [enrolledCoursesCount, setEnrolledCoursesCount] = useState(0);

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

  const {
  summary,
  loading: progressLoading,
  error: progressError,
  refreshProgress,
  progress
} = useLearningProgress();

const {
  enrollments,
  loading: coursesLoading,
  error: coursesError,
  refreshCourses,
} = useMyCourses();



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

  const scrollToSection = (id) => {
    setSidebarOpen(false);

    if (id === "overview") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth" });
  };

 const handleCourseClick = (course) => {
  if (!course?._id) return;

  navigate(`/courses/${course._id}/modules`);
};

  const handleBrowseCourses = () => {
    navigate("/courses");
  };

  return (
    <div
      id="overview"
      className="min-h-screen bg-[#f7f7f5] text-[#171717]"
    >
      <Sidebar
        user={user}
        initials={initials}
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
        loggingOut={loggingOut}
      />

      <div className="min-h-screen lg:pl-[260px]">
        <DashboardHeader
          user={user}
          initials={initials}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
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
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-black px-5 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              Explore learning
              <ArrowUpRight size={17} />
            </button>
          </section>

          {/* Stats */}
      <DashboardStats
  enrolledCourses={summary.enrolledCourses}
  completedLessons={summary.completedLessons}
  learningHours={summary.learningHours}
  overallProgress={summary.overallProgress}
  loading={progressLoading}
/>

          {/* Learning hero */}
          <section className="mt-9">
            <article className="relative overflow-hidden rounded-2xl bg-[#111111] p-6 text-white sm:p-8">
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
                  onClick={() => scrollToSection("my-courses")}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-neutral-200"
                >
                  <Play size={15} fill="currentColor" />
                  View my courses
                </button>
              </div>
            </article>
          </section>

          {/* My enrolled courses */}
          <section id="my-courses" className="mt-5 scroll-mt-28">
           <MyCourses
  enrollments={enrollments}
  loading={coursesLoading}
  error={coursesError}
  onRetry={refreshCourses}
  onCourseClick={handleCourseClick}
  onBrowseCourses={handleBrowseCourses}
/>
          </section>

          {/* Learning progress */}
          <section id="my-progress" className="mt-5 scroll-mt-28">
           <LearningProgress
  summary={summary}
  progress={progress}
  loading={progressLoading}
  error={progressError}
  onRetry={refreshProgress}
/>
          </section>

          {/* Live classes and activity */}
          <section
            id="live-classes"
            className="mt-5 grid scroll-mt-28 grid-cols-1 gap-5 xl:grid-cols-2"
          >
            <LiveClasses
              classes={[]}
              loading={false}
              onViewClasses={() => {
                // Connect the live classes route when available.
              }}
              onJoinClass={(liveClass) => {
                console.log("Join live class:", liveClass);
              }}
            />

            <div id="achievements" className="scroll-mt-28">
              <LearningActivity
                activities={[]}
                achievements={[]}
                loading={false}
                onViewAchievements={() => {
                  // Connect the achievements route when available.
                }}
              />
            </div>
          </section>

          {/* Footer */}
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
