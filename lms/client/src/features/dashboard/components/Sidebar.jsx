
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
} from "lucide-react";

const navigationItems = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "#overview",
  },
  {
    label: "My courses",
    icon: BookOpen,
    href: "#my-courses",
  },
  {
    label: "Live classes",
    icon: Radio,
    href: "#live-classes",
  },
  {
    label: "My progress",
    icon: Activity,
    href: "#my-progress",
  },
  {
    label: "Achievements",
    icon: Trophy,
    href: "#achievements",
  },
];

function Sidebar({
  user,
  initials = "ST",
  sidebarOpen = false,
  onClose,
  onLogout,
  loggingOut = false,
}) {
  return (
    <>
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-black/[0.07] bg-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-[76px] items-center justify-between border-b border-black/[0.06] px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-white">
              <GraduationCap size={22} />
            </div>

            <div>
              <h1 className="text-base font-bold tracking-tight">
                LearnHub
              </h1>
              <p className="mt-0.5 text-[10px] text-neutral-500">
                Learn without limits
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 hover:bg-neutral-100 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <div className="px-4 pt-8">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
            Workspace
          </p>

          <nav className="mt-4 space-y-1">
            {navigationItems.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                  label === "Overview"
                    ? "bg-neutral-900 font-medium text-white"
                    : "text-neutral-600 hover:bg-[#f7f7f5] hover:text-black"
                }`}
              >
                <Icon size={18} strokeWidth={1.8} />
                <span>{label}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom profile and logout */}
        <div className="mt-auto border-t border-black/[0.06] p-4">
          <div className="flex items-center gap-3 rounded-xl bg-[#f7f7f5] p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-sm font-semibold">
              {initials}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                {user?.name || "Student"}
              </p>
              <p className="truncate text-xs text-neutral-500">
                {user?.email || "Student account"}
              </p>
            </div>

            <Settings2 size={16} className="shrink-0 text-neutral-400" />
          </div>

          <button
            type="button"
            onClick={onLogout}
            disabled={loggingOut}
            className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-neutral-600 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogOut size={18} />
            {loggingOut ? "Logging out..." : "Log out"}
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
