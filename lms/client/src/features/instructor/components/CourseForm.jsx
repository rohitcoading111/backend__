import { useEffect, useId, useState } from "react";

const INITIAL_FORM = {
  title: "",
  description: "",
  price: "",
  category: "",
  level: "BEGINNER",
};

const LEVELS = [
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
];

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-300 hover:border-white/20 focus:border-white focus:bg-white/[0.06] focus:ring-4 focus:ring-white/10";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black";

function Icon({ children, className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function Field({ label, htmlFor, aside, children }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor={htmlFor} className="text-sm font-medium text-white/80">
          {label}
        </label>
        {aside && (
          <span className="text-xs tabular-nums text-white/30">{aside}</span>
        )}
      </div>
      {children}
    </div>
  );
}

function CourseForm({ initialCourse, onSubmit, onCancel, loading = false }) {
  const uid = useId();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [thumbnail, setThumbnail] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (initialCourse) {
      setFormData({
        title: initialCourse.title ?? "",
        description: initialCourse.description ?? "",
        price: String(initialCourse.price ?? ""),
        category: initialCourse.category ?? "",
        level: initialCourse.level ?? "BEGINNER",
      });
    } else {
      setFormData(INITIAL_FORM);
    }

    setThumbnail(null);
  }, [initialCourse]);

  // Local preview for a newly picked file
  useEffect(() => {
    if (!thumbnail) {
      setPreviewUrl(null);
      return undefined;
    }
    const url = URL.createObjectURL(thumbnail);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [thumbnail]);

  const currentPreview = previewUrl || initialCourse?.thumbnail?.url || null;

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  }

  function pickFile(file) {
    if (file && file.type.startsWith("image/")) setThumbnail(file);
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragging(false);
    pickFile(event.dataTransfer.files?.[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      ...formData,
      price: Number(formData.price),
      thumbnail,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-7 rounded-3xl border border-white/10 bg-black p-6 text-white sm:p-8"
    >
      <header>
        <h2 className="text-2xl font-semibold tracking-tight">
          {initialCourse ? "Edit course" : "Create course"}
        </h2>
        <p className="mt-1.5 text-sm text-white/40">
          {initialCourse
            ? "Update the details students see on your course."
            : "Add the basics now. You can add modules after saving."}
        </p>
      </header>

      <Field
        label="Course title"
        htmlFor={`${uid}-title`}
        aside={`${formData.title.length}/150`}
      >
        <input
          id={`${uid}-title`}
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={150}
          className={inputClass}
          placeholder="Data structures in C"
        />
      </Field>

      <Field label="Description" htmlFor={`${uid}-description`}>
        <textarea
          id={`${uid}-description`}
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="What will students learn?"
        />
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Price" htmlFor={`${uid}-price`}>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/40">
              ₹
            </span>
            <input
              id={`${uid}-price`}
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              required
              className={`${inputClass} pl-9 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
              placeholder="499"
            />
          </div>
        </Field>

        <Field label="Category" htmlFor={`${uid}-category`}>
          <input
            id={`${uid}-category`}
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="Web development"
          />
        </Field>
      </div>

      {/* Level: segmented control */}
      <div>
        <p className="mb-2 text-sm font-medium text-white/80">Level</p>
        <div
          role="radiogroup"
          aria-label="Course level"
          className="grid grid-cols-3 gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1"
        >
          {LEVELS.map((level) => (
            <label key={level.value} className="relative cursor-pointer">
              <input
                type="radio"
                name="level"
                value={level.value}
                checked={formData.level === level.value}
                onChange={handleChange}
                className="peer sr-only"
              />
              <span className="block rounded-full px-3 py-2 text-center text-sm font-medium text-white/50 transition-all duration-300 hover:text-white peer-checked:bg-white peer-checked:text-black peer-focus-visible:ring-2 peer-focus-visible:ring-white peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-black">
                {level.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Thumbnail: drag and drop */}
      <div>
        <p className="mb-2 text-sm font-medium text-white/80">Thumbnail</p>

        <label
          htmlFor={`${uid}-thumbnail`}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`group relative block cursor-pointer overflow-hidden rounded-2xl border border-dashed transition-all duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-white has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-black ${
            dragging
              ? "border-white bg-white/10"
              : "border-white/20 bg-white/[0.02] hover:border-white/50 hover:bg-white/[0.05]"
          }`}
        >
          <input
            id={`${uid}-thumbnail`}
            type="file"
            accept="image/*"
            onChange={(event) => pickFile(event.target.files?.[0])}
            required={!initialCourse && !thumbnail}
            className="sr-only"
          />

          {currentPreview ? (
            <div className="relative aspect-[16/7]">
              <img
                src={currentPreview}
                alt="Course thumbnail preview"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <span className="rounded-full border border-white/30 px-4 py-2 text-sm font-medium">
                  Replace image
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
              <span className="rounded-full border border-white/15 p-3 text-white/60 transition-colors group-hover:border-white/40 group-hover:text-white">
                <Icon>
                  <path d="M12 16V4" />
                  <path d="m7 9 5-5 5 5" />
                  <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
                </Icon>
              </span>
              <div>
                <p className="text-sm font-medium">
                  Drop an image here, or browse
                </p>
                <p className="mt-1 text-xs text-white/40">
                  PNG, JPG or WebP. 16:9 works best.
                </p>
              </div>
            </div>
          )}
        </label>

        {thumbnail && (
          <div className="mt-3 flex items-center justify-between gap-3 text-xs text-white/50">
            <span className="truncate">{thumbnail.name}</span>
            <button
              type="button"
              onClick={() => setThumbnail(null)}
              className={`shrink-0 rounded-full px-2 py-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white ${focusRing}`}
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
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
          {loading && (
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
          )}
          {loading
            ? "Saving"
            : initialCourse
              ? "Update course"
              : "Create course"}
        </button>
      </div>
    </form>
  );
}

export default CourseForm;