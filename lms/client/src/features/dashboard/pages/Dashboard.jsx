
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Compass,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Play,
  Radio,
  Settings2,
  Sparkles,
  Target,
  Trophy,
  UserRound,
  X,
} from "lucide-react";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../auth/authThunk/authThunks.js";

function Dashboard() {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

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

  const navigation = [
    { label: "Overview", icon: LayoutDashboard, active: true },
    { label: "My courses", icon: BookOpen },
    { label: "Live classes", icon: Radio },
    { label: "My progress", icon: Target },
    { label: "Achievements", icon: Trophy },
  ];

  const stats = [
    {
      label: "Enrolled courses",
      value: "—",
      icon: BookOpen,
      description: "Your learning library",
    },
    {
      label: "Completed lessons",
      value: "—",
      icon: CheckCircle2,
      description: "Lessons completed",
    },
    {
      label: "Learning hours",
      value: "—",
      icon: Clock3,
      description: "Time spent learning",
    },
    {
      label: "Overall progress",
      value: "—",
      icon: Target,
      description: "Across your courses",
    },
  ];

  const firstName = user?.name?.trim()?.split(/\s+/)[0] || "Learner";

  const initials = user?.name
    ? user.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase()
    : "S";

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-[#0b0b0b] text-white">
      <div className="flex h-[84px] items-center justify-between border-b border-white/[0.07] px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
            <GraduationCap size={23} strokeWidth={2.2} />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight">LearnHub</h1>
            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-500">
              Student workspace
            </p>
          </div>
        </div>

        <button
          onClick={() => setSidebarOpen(false)}
          className="rounded-lg p-2 text-neutral-400 hover:bg-white/10 lg:hidden"
          aria-label="Close navigation"
        >
          <X size={19} />
        </button>
      </div>

      <div className="px-4 pt-8">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
          Workspace
        </p>

        <nav className="space-y-1">
          {navigation.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                setSidebarOpen(false);
                if (label === "Overview") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  document
                    .getElementById(
                      label === "My courses"
                        ? "my-courses"
                        : label === "Live classes"
                          ? "live-classes"
                          : label === "My progress"
                            ? "my-progress"
                            : "achievements"
                    )
                    ?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm transition ${
                active
                  ? "bg-white font-medium text-black"
                  : "text-neutral-400 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <Icon size={18} strokeWidth={1.8} />
              {label}
              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-black" />
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="mx-4 mt-8 border-t border-white/[0.07] pt-6">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
          Account
        </p>

        <div className="flex items-center gap-3 rounded-xl px-3 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-neutral-800 text-sm font-semibold">
            {initials}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">
              {user?.name || "Student"}
            </p>
            <p className="truncate text-xs text-neutral-500">
              {user?.email || "Student account"}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="mt-2 flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm text-neutral-400 transition hover:bg-white/[0.06] hover:text-white disabled:opacity-50"
        >
          <LogOut size={18} />
          {loggingOut ? "Signing out..." : "Sign out"}
        </button>
      </div>

      <div className="mt-auto p-4">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
            <Sparkles size={18} />
          </div>

          <p className="mt-4 text-sm font-medium">Your next milestone</p>
          <p className="mt-1 text-xs leading-5 text-neutral-500">
            Keep learning, one lesson at a time. Your journey starts here.
          </p>
        </div>

        <p className="mt-5 px-2 text-[10px] text-neutral-600">
          LEARNHUB · STUDENT PORTAL
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#171717]">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[260px] border-r border-white/[0.06] lg:block">
        <SidebarContent />
      </aside>

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] transition-transform duration-300 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>

      <div className="min-h-screen lg:pl-[260px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-black/[0.06] bg-[#f7f7f5]/90 px-5 backdrop-blur-xl sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl border border-black/10 bg-white p-2.5 lg:hidden"
              aria-label="Open navigation"
            >
              <Menu size={19} />
            </button>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                Student portal
              </p>
              <h2 className="mt-1 text-sm font-semibold tracking-tight sm:text-base">
                Overview
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">{user?.name || "Student"}</p>
              <p className="mt-0.5 text-xs text-neutral-500">Student account</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-sm font-semibold">
              {initials}
            </div>

            <ChevronDown size={16} className="hidden text-neutral-400 sm:block" />
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
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
              onClick={() =>
                document
                  .getElementById("my-courses")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-black px-5 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              Explore learning
              <ArrowUpRight size={17} />
            </button>
          </section>

          <section className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(({ label, value, icon: Icon, description }, index) => (
              <article
                key={label}
                className="group rounded-2xl border border-black/[0.07] bg-white p-5 transition hover:-translate-y-0.5 hover:border-black/15 hover:shadow-[0_12px_35px_rgba(0,0,0,0.04)] sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.06] bg-[#f7f7f5]">
                    <Icon size={19} strokeWidth={1.7} />
                  </div>

                  <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
                    0{index + 1}
                  </span>
                </div>

                <p className="mt-6 text-sm text-neutral-500">{label}</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {value}
                </p>
                <p className="mt-2 text-xs text-neutral-400">{description}</p>
              </article>
            ))}
          </section>

          <section
            id="my-courses"
            className="mt-9 grid scroll-mt-28 grid-cols-1 gap-5 xl:grid-cols-[1.55fr_1fr]"
          >
            <article className="overflow-hidden rounded-2xl border border-black/[0.07] bg-white">
              <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-5 sm:px-7">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                    Your classroom
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">
                    Continue learning
                  </h3>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f7f5]">
                  <BookOpen size={19} />
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="relative overflow-hidden rounded-2xl bg-[#111111] p-6 text-white sm:p-8">
                  <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full border border-white/[0.08]" />
                  <div className="pointer-events-none absolute -right-7 -top-10 h-36 w-36 rounded-full border border-white/[0.08]" />

                  <div className="relative">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-300">
                      <Compass size={13} />
                      Your next chapter
                    </div>

                    <h4 className="mt-6 max-w-sm text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                      Knowledge grows with every step.
                    </h4>

                    <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-400">
                      Your enrolled courses and learning progress will
                      appear here once connected.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        document
                          .getElementById("my-courses")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-neutral-200"
                    >
                      <Play size={15} fill="currentColor" />
                      View my courses
                    </button>
                  </div>
                </div>

                <div className="mt-5 flex items-start gap-3 rounded-xl border border-dashed border-black/15 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f7f7f5]">
                    <BookOpen size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-medium">Your course library</p>
                    <p className="mt-1 text-xs leading-5 text-neutral-500">
                      We&apos;ll load your active enrollments from your
                      student API in the next step.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            <article
              id="my-progress"
              className="scroll-mt-28 rounded-2xl border border-black/[0.07] bg-white p-5 sm:p-7"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                    Your growth
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">
                    Learning progress
                  </h3>
                </div>

                <Activity size={20} strokeWidth={1.7} />
              </div>

              <div className="mt-8 rounded-2xl bg-[#f7f7f5] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-neutral-500">Overall progress</p>
                    <p className="mt-2 text-3xl font-semibold">—</p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white">
                    <TrendingUpIcon />
                  </div>
                </div>

                <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-black/[0.07]">
                  <div className="h-full w-0 rounded-full bg-black" />
                </div>

                <p className="mt-3 text-xs leading-5 text-neutral-500">
                  Your progress will be calculated from your course and
                  lesson data.
                </p>
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f7f5]">
                    <CheckCircle2 size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Lessons completed</p>
                    <p className="mt-1 text-xs text-neutral-500">
                      Track your learning milestones
                    </p>
                  </div>
                  <span className="text-sm text-neutral-400">—</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f7f5]">
                    <Clock3 size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Time invested</p>
                    <p className="mt-1 text-xs text-neutral-500">
                      Your learning hours
                    </p>
                  </div>
                  <span className="text-sm text-neutral-400">—</span>
                </div>
              </div>
            </article>
          </section>

          <section
            id="live-classes"
            className="mt-5 grid scroll-mt-28 grid-cols-1 gap-5 xl:grid-cols-2"
          >
            <article className="rounded-2xl border border-black/[0.07] bg-white p-5 sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                    Learn together
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">
                    Live classes
                  </h3>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f7f5]">
                  <Radio size={19} />
                </div>
              </div>

              <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-black/10 px-5 py-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f7f7f5]">
                  <CalendarDays size={22} />
                </div>

                <h4 className="mt-4 text-sm font-semibold">
                  Your live classroom awaits
                </h4>
                <p className="mt-2 max-w-xs text-xs leading-5 text-neutral-500">
                  Active sessions for your enrolled courses will appear here.
                </p>
              </div>
            </article>

            <article
              id="achievements"
              className="scroll-mt-28 rounded-2xl border border-black/[0.07] bg-white p-5 sm:p-7"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                    Keep moving forward
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">
                    Learning activity
                  </h3>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f7f5]">
                  <Activity size={19} />
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-black/[0.07]">
                    <Sparkles size={17} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Your learning journey</p>
                    <p className="mt-1 text-xs leading-5 text-neutral-500">
                      Course activity and completed lessons will be shown
                      here when the relevant tracking API is available.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-black/[0.07]">
                    <Trophy size={17} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Your achievements</p>
                    <p className="mt-1 text-xs leading-5 text-neutral-500">
                      Celebrate milestones as you progress through your
                      courses.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </section>

          <footer className="mt-10 flex flex-col gap-2 border-t border-black/[0.07] py-6 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} LearnHub. Keep learning.</p>
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

function TrendingUpIcon() {
  return <ArrowDownRight size={19} strokeWidth={1.7} />;
}

export default Dashboard;
