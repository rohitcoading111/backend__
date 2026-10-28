
import { useEffect, useState } from "react";

const INITIAL_FORM = {
  title: "",
  description: "",
  price: "",
  category: "",
  level: "BEGINNER",
};

function CourseForm({
  initialCourse,
  onSubmit,
  onCancel,
  loading = false,
}) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [thumbnail, setThumbnail] = useState(null);

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

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
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
      className="space-y-5 rounded-xl border border-gray-300 bg-white p-6 text-black"
    >
      <h2 className="text-xl font-semibold">
        {initialCourse ? "Edit Course" : "Create Course"}
      </h2>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Course Title
        </label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={150}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
          placeholder="Enter course title"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
          placeholder="Describe your course"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Price (₹)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
            placeholder="499"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Category
          </label>
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
            placeholder="Web Development"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Course Level
        </label>
        <select
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
        >
          <option value="BEGINNER">Beginner</option>
          <option value="INTERMEDIATE">Intermediate</option>
          <option value="ADVANCED">Advanced</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Thumbnail
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(event) =>
            setThumbnail(event.target.files?.[0] ?? null)
          }
          required={!initialCourse}
          className="block w-full text-sm"
        />

        {initialCourse?.thumbnail?.url && !thumbnail && (
          <img
            src={initialCourse.thumbnail.url}
            alt="Current course thumbnail"
            className="mt-3 h-24 rounded-lg object-cover"
          />
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-black px-5 py-2 text-white disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : initialCourse
              ? "Update Course"
              : "Create Course"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-5 py-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CourseForm;
