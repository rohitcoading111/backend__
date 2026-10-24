
import { ChevronDown, Menu } from "lucide-react";

function DashboardHeader({
  user,
  initials,
  onMenuClick,
}) {
  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-black/[0.06] bg-[#f7f7f5]/90 px-5 backdrop-blur-xl sm:px-8 lg:px-10">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
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
          <p className="text-sm font-semibold">
            {user?.name || "Student"}
          </p>

          <p className="mt-0.5 text-xs text-neutral-500">
            Student account
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-sm font-semibold">
          {initials}
        </div>

        <ChevronDown
          size={16}
          className="hidden text-neutral-400 sm:block"
        />
      </div>
    </header>
  );
}

export default DashboardHeader;
