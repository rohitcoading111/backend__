
import {
  Activity,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Radio,
  Settings2,
  Trophy,
  X,
  ChevronRight,
} from "lucide-react";

const navigationItems = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    id: "my-courses",
    label: "My courses",
    icon: BookOpen,
  },
  {
    id: "live-classes",
    label: "Live classes",
    icon: Radio,
  },
  {
    id: "my-progress",
    label: "My progress",
    icon: Activity,
  },
  {
    id: "achievements",
    label: "Achievements",
    icon: Trophy,
  },
];

function Sidebar({
  user,
  initials = "ST",
  sidebarOpen = false,
  onClose,
  onLogout,
  loggingOut = false,
  activeSection = "overview",
  onNavigate,
}) {
  return (
    <>
      {/* Mobile overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          sidebarOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-neutral-200/80 bg-white text-neutral-900 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-neutral-100 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#171717] text-white shadow-sm">
              <GraduationCap size={21} strokeWidth={1.8} />
            </div>

            <div>
              <h1 className="text-[15px] font-bold tracking-tight">
                LearnHub
              </h1>

              <p className="mt-0.5 text-[10px] font-medium text-neutral-400">
                Learn without limits
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-black lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 pt-8">
          <div className="mb-4 flex items-center justify-between px-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
              Workspace
            </p>

            <span className="text-[10px] text-neutral-300">
              01 — 05
            </span>
          </div>

          <nav className="space-y-1" aria-label="Student navigation">
            {navigationItems.map(({ id, label, icon: Icon }, index) => {
              const isActive = activeSection === id;

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    onNavigate?.(id);
                    onClose?.();
                  }}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-xl px-3.5 py-3 text-left text-[13px] transition-all duration-200 ${
                    isActive
                      ? "bg-[#171717] font-semibold text-white shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
                      : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                  }`}
                >
                  <Icon
                    size={18}
                    strokeWidth={isActive ? 2 : 1.7}
                    className={`shrink-0 transition-transform duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-neutral-400 group-hover:scale-110 group-hover:text-neutral-800"
                    }`}
                  />

                  <span className="flex-1">{label}</span>

                  {isActive ? (
                    <ChevronRight
                      size={15}
                      className="text-white/60"
                    />
                  ) : (
                    <span className="text-[10px] font-medium text-neutral-300 opacity-0 transition-opacity group-hover:opacity-100">
                      0{index + 1}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom profile */}
        <div className="shrink-0 border-t border-neutral-100 p-3">
          <div className="group flex items-center gap-3 rounded-xl border border-transparent bg-[#f7f7f5] p-3 transition hover:border-neutral-200">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-xs font-bold text-neutral-800">
              {initials}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-neutral-900">
                {user?.name || "Student"}
              </p>

              <p className="mt-1 truncate text-[10px] text-neutral-500">
                {user?.email || "Student account"}
              </p>
            </div>

            <Settings2
              size={16}
              className="shrink-0 text-neutral-400 transition-transform duration-300 group-hover:rotate-45"
            />
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={onLogout}
            disabled={loggingOut}
            className="mt-2.5 flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-[13px] font-medium text-neutral-500 transition-all duration-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogOut size={17} />

            <span>
              {loggingOut ? "Logging out..." : "Log out"}
            </span>
          </button>

          <p className="px-3 pb-1 pt-3 text-center text-[9px] tracking-wide text-neutral-300">
            LEARNHUB © {new Date().getFullYear()}
          </p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
