import { useRef, useState } from "react";
import { generateAICourse } from "../services/ai.services.js";

const CourseGenerator = () => {
    const thumbnailInputRef = useRef(null);
    const [prompt, setPrompt] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!prompt.trim() || !thumbnail || loading) return;

        const formData = new FormData();
        formData.append("prompt", prompt.trim());
        formData.append("thumbnail", thumbnail);

        setLoading(true);
        setError("");
        setCourse(null);

        try {
            const createdCourse = await generateAICourse(formData);
            setCourse(createdCourse);
        } catch (requestError) {
            setError(
                requestError.response?.data?.message ||
                requestError.message ||
                "Course generation failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto mb-6 max-w-4xl rounded-2xl border border-violet-500/30 bg-slate-900/80 p-5 text-left shadow-xl shadow-violet-950/20"
        >
            <h2 className="text-lg font-semibold text-white">
                Create a course with AI
            </h2>
            <p className="mt-1 text-sm text-slate-400">
                Describe the course and choose an image to use as its thumbnail.
                The generated course will be saved as a draft.
            </p>

            <label
                htmlFor="ai-course-prompt"
                className="mt-4 block text-sm font-medium text-slate-200"
            >
                Course idea
            </label>
            <textarea
                id="ai-course-prompt"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                maxLength={2000}
                rows={3}
                placeholder="For example: A beginner-friendly course on JavaScript fundamentals..."
                disabled={loading}
                className="mt-2 w-full resize-y rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500"
            />

            <label
                htmlFor="ai-course-thumbnail"
                className="mt-4 block text-sm font-medium text-slate-200"
            >
                Course thumbnail
            </label>
            <div className="mt-2 flex flex-wrap items-center gap-3">
                <input
                    ref={thumbnailInputRef}
                    id="ai-course-thumbnail"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(event) => {
                        const selectedFile = event.target.files?.[0] || null;
                        setError("");
                        setCourse(null);
                        if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
                            setThumbnail(null);
                            setError("Image must be 5 MB or smaller.");
                            event.target.value = "";
                            return;
                        }

                        setThumbnail(selectedFile);
                    }}
                    disabled={loading}
                    className="hidden"
                />
                <button
                    type="button"
                    onClick={() => thumbnailInputRef.current?.click()}
                    disabled={loading}
                    className="rounded-lg border border-violet-500/40 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300 transition hover:bg-violet-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Choose image
                </button>
                <span className="text-sm text-slate-400">
                    {thumbnail?.name || "No image selected"}
                </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
                JPEG, PNG, or WebP; maximum size 5 MB.
            </p>

            {error && (
                <p role="alert" className="mt-3 text-sm text-red-400">
                    {error}
                </p>
            )}

            {course && (
                <p role="status" className="mt-3 text-sm text-emerald-400">
                    Draft created: <span className="font-semibold">{course.title}</span>
                </p>
            )}

            <button
                type="submit"
                disabled={!prompt.trim() || !thumbnail || loading}
                className="mt-4 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading ? "Generating course..." : "Generate course"}
            </button>
        </form>
    );
};

export default CourseGenerator;
