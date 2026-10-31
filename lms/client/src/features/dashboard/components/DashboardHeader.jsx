
import {
  ChevronDown,
  Menu,
  Sparkles,
} from "lucide-react";

const pageTitles = {
  overview: {
    title: "Overview",
    description: "Your learning dashboard",
  },
  "my-courses": {
    title: "My courses",
    description: "Explore your learning library",
  },
  "live-classes": {
    title: "Live classes",
    description: "Your upcoming learning sessions",
  },
  "my-progress": {
    title: "My progress",
    description: "Track your learning journey",
  },
  achievements: {
    title: "Achievements",
    description: "Your learning milestones",
  },
};

function DashboardHeader({
  user,
  initials = "ST",
  onMenuClick,
  activeSection = "overview",
}) {
  const currentPage =
    pageTitles[activeSection] || pageTitles.overview;

  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-white/[0.08] bg-[#080808]/85 px-5 backdrop-blur-xl sm:px-8 lg:px-10">

      {/* Left section */}
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">

        {/* Mobile menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-95 lg:hidden"
        >
          <Menu size={19} />
        </button>

        {/* Page information */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />

            <p className="truncate text-[9px] font-semibold uppercase tracking-[0.24em] text-white/35 sm:text-[10px]">
              Student portal
            </p>
          </div>

          <h2
            key={activeSection}
            className="mt-1 truncate text-sm font-semibold tracking-tight text-white sm:text-base lh-animate-fade"
          >
            {currentPage.title}
          </h2>
        </div>
      </div>

      {/* Right section */}
      <div className="flex shrink-0 items-center gap-3 sm:gap-4">

        {/* Learning status */}
        <div className="hidden items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-2 xl:flex">
          <Sparkles size={13} className="text-white/50" />

          <span className="text-[10px] font-medium text-white/55">
            Keep learning
          </span>
        </div>

        {/* User details */}
        <div className="hidden text-right sm:block">
          <p className="max-w-[150px] truncate text-xs font-semibold text-white">
            {user?.name?.trim() || "Learner"}
          </p>

          <p className="mt-1 max-w-[150px] truncate text-[10px] text-white/35">
            {user?.email || "Your account"}
          </p>
        </div>

        {/* Avatar */}
        <button
          type="button"
          aria-label="User profile"
          className="group flex items-center gap-2 rounded-full transition hover:bg-white/[0.05] sm:p-1"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white text-xs font-bold text-black transition-transform duration-300 group-hover:scale-105">
            {initials}
          </div>

          <ChevronDown
            size={15}
            className="hidden text-white/40 transition-transform duration-200 group-hover:translate-y-0.5 sm:block"
          />
        </button>
      </div>
    </header>
  );
}

export default DashboardHeader;
