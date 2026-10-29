
import { UploadCloud, Video, Plus } from "lucide-react";

function LectureForm() {
  return (
    <div className="w-full max-w-2xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">

      {/* Form Header */}
      <div className="mb-8">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100">
          <Video size={23} />
        </div>

        <h2 className="text-2xl font-semibold tracking-tight">
          Add New Lecture
        </h2>

        <p className="mt-2 text-sm text-neutral-500">
          Add a new lecture to your selected module.
        </p>
      </div>

      <form className="space-y-5">

        {/* Lecture Title */}
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="text-sm font-medium text-neutral-700"
          >
            Lecture Title
          </label>

          <input
            id="title"
            type="text"
            placeholder="Enter lecture title"
            className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-black focus:ring-2 focus:ring-black/5"
          />
        </div>

        {/* Lecture Notes */}
        <div className="space-y-2">
          <label
            htmlFor="notes"
            className="text-sm font-medium text-neutral-700"
          >
            Lecture Description / Notes
          </label>

          <textarea
            id="notes"
            rows={4}
            placeholder="Write something about this lecture..."
            className="w-full resize-y rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-black focus:ring-2 focus:ring-black/5"
          />
        </div>

        {/* Lecture Order */}
        <div className="space-y-2">
          <label
            htmlFor="order"
            className="text-sm font-medium text-neutral-700"
          >
            Lecture Order
          </label>

          <input
            id="order"
            type="number"
            min="1"
            placeholder="e.g. 1"
            className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-black focus:ring-2 focus:ring-black/5"
          />

          <p className="text-xs text-neutral-400">
            Set the position of this lecture inside the module.
          </p>
        </div>

        {/* Video Upload */}
        <div className="space-y-2">
          <label
            htmlFor="video"
            className="text-sm font-medium text-neutral-700"
          >
            Lecture Video
          </label>

          <label
            htmlFor="video"
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 px-5 py-9 text-center transition hover:border-neutral-400 hover:bg-neutral-100"
          >
            <UploadCloud size={30} className="mb-3 text-neutral-500" />

            <p className="text-sm font-medium text-neutral-700">
              Choose a video to upload
            </p>

            <p className="mt-1 text-xs text-neutral-400">
              Select a video file from your device
            </p>

            <input
              id="video"
              type="file"
              accept="video/*"
              className="sr-only"
            />
          </label>
        </div>

        {/* Submit Button */}
        <div className="border-t border-neutral-100 pt-5">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-800 sm:w-fit"
          >
            <Plus size={18} />
            Add Lecture
          </button>
        </div>

      </form>
    </div>
  );
}

export default LectureForm;
