import { useId } from "react";
import { useSelector } from "react-redux";
import { Radio } from "lucide-react";
import useLiveSession from "../hooks/useLiveSession";
import PremiumSelect from "./PremiumSelect";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black";

function LiveSessionWorkspace() {
  const uid = useId();
  const { courses = [] } = useSelector((state) => state.instructor);

  const {
    selectedCourseId,
    setSelectedCourseId,
    handleStartLive,
    loading,
    error,
  } = useLiveSession();

  const selectedCourse = courses.find((course) => course._id === selectedCourseId);

  const courseOptions = courses.map((course) => ({
    value: course._id,
    label: course.title,
    badge: course.status === "DRAFT" ? "Draft" : undefined,
  }));

  return (
    <div className="text-white">
      {/* Header */}
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/80">
          <Radio size={21} />
        </span>
        <div>
          <h3 className="text-xl font-semibold tracking-tight">Live classes</h3>
          <p className="mt-1 text-sm text-white/40">
            Select a course and start your live session.
          </p>
        </div>
      </div>

      {/* Start card */}
      <div className="mt-8 max-w-2xl rounded-3xl border border-white/10 bg-black p-6 sm:p-8">
        <label
          htmlFor={`${uid}-course`}
          className="mb-2 block text-sm font-medium text-white/80"
        >
          Select course
        </label>

        <PremiumSelect
          id={`${uid}-course`}
          options={courseOptions}
          value={selectedCourseId}
          onChange={setSelectedCourseId}
          disabled={loading}
          placeholder="Choose a course"
          emptyText="No courses yet"
        />

        {/* Selected course summary */}
        {selectedCourse && (
          <div className="mt-5 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            {selectedCourse.thumbnail?.url ? (
              <img
                src={selectedCourse.thumbnail.url}
                alt=""
                className="h-14 w-14 shrink-0 rounded-xl object-cover"
              />
            ) : (
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/10 text-white/30">
                <Radio size={20} />
              </span>
            )}

            <div className="min-w-0">
              <p className="text-xs text-white/40">You will go live in</p>
              <p className="mt-0.5 truncate font-medium">
                {selectedCourse.title}
              </p>
            </div>
          </div>
        )}

        {error && (
          <p
            role="alert"
            className="mt-5 rounded-xl border border-white/20 bg-white/[0.04] px-4 py-3 text-sm text-white/80"
          >
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleStartLive}
          disabled={!selectedCourseId || loading}
          className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-all hover:bg-white/85 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:active:scale-100 ${focusRing}`}
        >
          {loading ? (
            <svg
              className="h-4 w-4 animate-spin motion-reduce:animate-none"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeOpacity="0.25"
                strokeWidth="3"
              />
              <path
                d="M21 12a9 9 0 0 0-9-9"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <Radio size={17} />
          )}
          {loading ? "Starting" : "Start live session"}
        </button>
      </div>
    </div>
  );
}

export default LiveSessionWorkspace;