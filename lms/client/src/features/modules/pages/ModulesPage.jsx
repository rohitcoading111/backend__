
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import { getCourseModules } from "../services/moduleService.js";

function ModulesPage() {
  const { courseId } = useParams();

  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchModules = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getCourseModules(courseId);

        if (!response?.success) {
          throw new Error(
            response?.message || "Failed to load modules."
          );
        }

        // Apne backend response ke according data read karna.
        const fetchedModules = response?.data?.modules;

        if (!Array.isArray(fetchedModules)) {
          throw new Error("Invalid modules response.");
        }

        if (!cancelled) {
          setModules(fetchedModules);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err?.response?.data?.message ||
              err?.message ||
              "Unable to load modules."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    if (courseId) {
      fetchModules();
    } else {
      setError("Course ID is missing.");
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [courseId]);

  return (
    <main className="min-h-screen bg-[#f7f7f5] px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="mb-6 inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-black"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
            Your classroom
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Course modules
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Select a module to explore its lectures.
          </p>
        </div>

        {loading && (
          <p className="text-sm text-neutral-500">
            Loading modules...
          </p>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-white p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && modules.length === 0 && (
          <div className="rounded-2xl border border-black/[0.07] bg-white p-8 text-center">
            <BookOpen className="mx-auto text-neutral-400" size={30} />
            <h2 className="mt-3 font-semibold">No modules yet</h2>
            <p className="mt-1 text-sm text-neutral-500">
              Modules for this course will appear here.
            </p>
          </div>
        )}

        {!loading && !error && modules.length > 0 && (
          <div className="space-y-3">
            {modules.map((module, index) => (
              <article
                key={module._id}
                className="rounded-xl border border-black/[0.07] bg-white p-5"
              >
                <p className="text-xs text-neutral-400">
                  Module {module.order ?? index + 1}
                </p>
                <h2 className="mt-1 text-lg font-semibold">
                  {module.title}
                </h2>
                {module.description && (
                  <p className="mt-2 text-sm leading-6 text-neutral-500">
                    {module.description}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default ModulesPage;
