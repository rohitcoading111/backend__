import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

/**
 * Black and white custom dropdown.
 *
 * options: [{ value: string, label: string, badge?: string }]
 */
export default function PremiumSelect({
  id,
  options = [],
  value,
  onChange,
  placeholder = "Choose an option",
  disabled = false,
  emptyText = "Nothing to choose from",
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef(null);

  const selectedIndex = options.findIndex((option) => option.value === value);
  const selected = selectedIndex >= 0 ? options[selectedIndex] : null;
  const listId = `${id}-list`;
  const lastIndex = options.length - 1;

  // Close when clicking outside
  useEffect(() => {
    if (!open) return undefined;
    function onPointerDown(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  // Close if it becomes disabled while open
  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  // Keep the highlighted option visible while using the keyboard
  useEffect(() => {
    if (!open) return;
    document
      .getElementById(`${id}-opt-${activeIndex}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex, id]);

  function openList() {
    if (disabled) return;
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  }

  function choose(index) {
    const option = options[index];
    if (option) onChange(option.value);
    setOpen(false);
  }

  function handleKeyDown(event) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!open) openList();
        else setActiveIndex((i) => Math.max(0, Math.min(i + 1, lastIndex)));
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!open) openList();
        else setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        if (open) {
          event.preventDefault();
          setActiveIndex(0);
        }
        break;
      case "End":
        if (open) {
          event.preventDefault();
          setActiveIndex(Math.max(lastIndex, 0));
        }
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (!open) openList();
        else choose(activeIndex);
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        break;
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={
          open && options.length ? `${id}-opt-${activeIndex}` : undefined
        }
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleKeyDown}
        className={`flex w-full items-center justify-between gap-3 rounded-xl border bg-white/[0.03] px-4 py-3 text-left text-sm outline-none transition-all duration-300 hover:border-white/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-white/10 ${
          open
            ? "border-white bg-white/[0.06] ring-4 ring-white/10"
            : "border-white/10"
        }`}
      >
        <span className={`truncate ${selected ? "text-white" : "text-white/30"}`}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 transition-transform duration-300 motion-reduce:transition-none ${
            open ? "rotate-180 text-white" : "text-white/40"
          }`}
        />
      </button>

      <div
        className={`absolute left-0 right-0 z-20 mt-2 origin-top overflow-hidden rounded-2xl border border-white/15 bg-black/95 shadow-[0_24px_60px_-20px_rgba(255,255,255,0.18)] backdrop-blur-xl transition-[opacity,transform,visibility] duration-200 ease-out motion-reduce:transition-none ${
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible -translate-y-1 scale-[0.98] opacity-0"
        }`}
      >
        <ul
          id={listId}
          role="listbox"
          data-lenis-prevent
          className="max-h-64 overflow-y-auto p-1.5"
        >
          {options.length === 0 ? (
            <li className="px-3.5 py-6 text-center text-sm text-white/40">
              {emptyText}
            </li>
          ) : (
            options.map((option, index) => {
              const isSelected = option.value === value;
              const isActive = index === activeIndex;

              return (
                <li
                  key={option.value}
                  id={`${id}-opt-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => choose(index)}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3.5 py-3 text-sm transition-colors duration-150 ${
                    isActive ? "bg-white/10 text-white" : "text-white/60"
                  } ${isSelected ? "font-medium text-white" : ""}`}
                >
                  <span className="truncate">{option.label}</span>

                  <span className="flex shrink-0 items-center gap-2">
                    {option.badge && (
                      <span className="rounded-full border border-white/15 px-2 py-0.5 text-xs font-normal text-white/40">
                        {option.badge}
                      </span>
                    )}
                    {isSelected && <Check size={16} />}
                  </span>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}