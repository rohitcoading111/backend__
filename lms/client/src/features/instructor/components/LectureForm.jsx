import { useId, useState } from "react";
import { UploadCloud, Video, Plus, X } from "lucide-react";
import useLectures from "../hooks/useLectures";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-300 hover:border-white/20 focus:border-white focus:bg-white/[0.06] focus:ring-4 focus:ring-white/10";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black";

function formatSize(bytes) {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  return mb >= 1024 ? `${(mb / 1024).toFixed(2)} GB` : `${mb.toFixed(1)} MB`;
}

function LectureForm({ moduleId, editingLecture, onClose }) {
  const uid = useId();
  const [dragging, setDragging] = useState(false);

  const {
    title,
    setTitle,
    notes,
    setNotes,
    order,
    setOrder,
    video,
    setVideo,
    handleSubmit,
    error,
    loading,
  } = useLectures(moduleId, editingLecture, onClose);

  function pickVideo(file) {
    if (file && file.type.startsWith("video/")) setVideo(file);
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragging(false);
    pickVideo(event.dataTransfer.files?.[0]);
  }

  return (
    <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-black p-6 text-white sm:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white/80">
          <Video size={21} />
        </div>

        <h2 className="text-2xl font-semibold tracking-tight">
          {editingLecture ? "Update lecture" : "Add new lecture"}
        </h2>

        <p className="mt-1.5 text-sm text-white/40">
          {editingLecture
            ? "Update your existing lecture details."
            : "Add a new lecture to your selected module."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor={`${uid}-title`}
            className="mb-2 block text-sm font-medium text-white/80"
          >
            Lecture title
          </label>
          <input
            id={`${uid}-title`}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Introduction to arrays"
            className={inputClass}
          />
        </div>

        {/* Notes */}
        <div>
          <label
            htmlFor={`${uid}-notes`}
            className="mb-2 block text-sm font-medium text-white/80"
          >
            Description and notes
          </label>
          <textarea
            id={`${uid}-notes`}
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write something about this lecture"
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Order */}
        <div>
          <label
            htmlFor={`${uid}-order`}
            className="mb-2 block text-sm font-medium text-white/80"
          >
            Lecture order
          </label>
          <input
            id={`${uid}-order`}
            type="number"
            min="1"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            placeholder="1"
            className={`${inputClass} [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
          />
        </div>

        {/* Video upload */}
        <div>
          <p className="mb-2 text-sm font-medium text-white/80">
            Lecture video
          </p>

          <label
            htmlFor={`${uid}-video`}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`group flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-5 py-10 text-center transition-all duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-white has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-black ${
              dragging
                ? "border-white bg-white/10"
                : "border-white/20 bg-white/[0.02] hover:border-white/50 hover:bg-white/[0.05]"
            }`}
          >
            <span className="mb-4 rounded-full border border-white/15 p-3 text-white/60 transition-colors group-hover:border-white/40 group-hover:text-white">
              <UploadCloud size={22} />
            </span>

            <p className="max-w-full truncate text-sm font-medium">
              {video
                ? video.name
                : editingLecture
                  ? "Choose a new video (optional)"
                  : "Drop a video here, or browse"}
            </p>

            <p className="mt-1 text-xs text-white/40">
              {video
                ? `${formatSize(video.size)}. Click to change.`
                : "MP4, MOV or WebM from your device"}
            </p>

            <input
              id={`${uid}-video`}
              type="file"
              accept="video/*"
              onChange={(e) => pickVideo(e.target.files?.[0])}
              className="sr-only"
            />
          </label>

          {video && (
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setVideo(null)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white ${focusRing}`}
              >
                <X size={14} />
                Remove video
              </button>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <p
            role="alert"
            className="rounded-xl border border-white/20 bg-white/[0.04] px-4 py-3 text-sm text-white/80"
          >
            {error}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className={`rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10 disabled:opacity-40 ${focusRing}`}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-white/85 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:active:scale-100 ${focusRing}`}
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
              <Plus size={16} />
            )}
            {loading
              ? "Saving"
              : editingLecture
                ? "Update lecture"
                : "Add lecture"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default LectureForm;