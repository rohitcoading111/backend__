
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  ArrowUpRight,
  Compass,
  Play,
} from "lucide-react";

import DashboardStats from "../components/DashboardStats.jsx";
import MyCourses from "../components/MyCourses.jsx";
import LearningProgress from "../components/LearningProgress.jsx";
import LiveClasses from "../components/LiveClasses.jsx";
import LearningActivity from "../components/LearningActivity.jsx";

import useLearningProgress from "../hooks/useLearningProgress.js";
import useMyCourses from "../hooks/useMyCourses.js";

function Dashboard({ activeSection = "overview" }) {
  // Redux user
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  // User information
  const firstName =
    user?.name?.trim()?.split(/\s+/)[0] || "Learner";

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

  // Dashboard section content
  const renderSection = () => {
    switch (activeSection) {
      // =================================
      // OVERVIEW
      // =================================

      case "overview":
        return (
          <div className="lh-animate-fade space-y-9">
            {/* Welcome */}
            <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111111] px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
                    Your learning space
                  </span>
                </div>

                <h1 className="text-3xl font-semibold tracking-[-0.055em] text-white sm:text-4xl lg:text-[46px]">
                  Welcome back, {firstName}.
                </h1>

                <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-400 sm:text-base">
                  Your next breakthrough starts with one lesson.
                  Let&apos;s make today count.
                </p>
              </div>

              <button
                type="button"
                onClick={handleBrowseCourses}
                className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-medium text-black transition hover:bg-neutral-200 active:scale-95"
              >
                Explore learning
                <ArrowUpRight size={17} />
              </button>
            </section>

            {/* Stats */}
            <section>
              <DashboardStats
                enrolledCourses={summary.enrolledCourses}
                completedLessons={summary.completedLessons}
                learningHours={summary.learningHours}
                overallProgress={summary.overallProgress}
                loading={progressLoading}
              />
            </section>

            {/* Learning Hero */}
            <section>
              <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111111] p-6 text-white sm:p-8">
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
                    onClick={() => navigate("/dashboard", { replace: true, state: { section: "my-courses" } })}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-neutral-200 active:scale-95"
                  >
                    <Play size={15} fill="currentColor" />
                    View my courses
                  </button>
                </div>
              </article>
            </section>
          </div>
        );

      // =================================
      // MY COURSES
      // =================================

      case "my-courses":
        return (
          <section className="lh-animate-fade">
            <div className="mb-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Learning library
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                My courses
              </h1>

              <p className="mt-2 text-sm text-neutral-400">
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
        );

      // =================================
      // LIVE CLASSES
      // =================================

      case "live-classes":
        return (
          <section className="lh-animate-fade">
            <div className="mb-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Live learning
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Live classes
              </h1>

              <p className="mt-2 text-sm text-neutral-400">
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
        );

      // =================================
      // MY PROGRESS
      // =================================

      case "my-progress":
        return (
          <section className="lh-animate-fade">
            <div className="mb-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Performance
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                My progress
              </h1>

              <p className="mt-2 text-sm text-neutral-400">
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
        );

      // =================================
      // ACHIEVEMENTS
      // =================================

      case "achievements":
        return (
          <section className="lh-animate-fade">
            <div className="mb-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Your accomplishments
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Achievements
              </h1>

              <p className="mt-2 text-sm text-neutral-400">
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
        );

      // =================================
      // DEFAULT
      // =================================

      default:
        return (
          <section className="lh-animate-fade py-16 text-center">
            <h1 className="text-2xl font-semibold text-white">
              Section not found
            </h1>

            <p className="mt-2 text-sm text-neutral-400">
              Please select a valid dashboard section.
            </p>
          </section>
        );
    }
  };

  return (
    <div className="space-y-10">
      {renderSection()}

      {/* Footer */}
      <footer className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} LearnHub. Keep learning.
        </p>

        <p className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-500" />
          Student workspace
        </p>
      </footer>
    </div>
  );
}

export default Dashboard;
