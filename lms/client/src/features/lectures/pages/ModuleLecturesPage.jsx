
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, PlayCircle, RefreshCw } from "lucide-react";
import useModuleLectures from "../hooks/useModuleLectures.js";

const ModuleLecturesPage = () => {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();

  const {
    lectures,
    isLoading,
    error,
    refreshLectures,
  } = useModuleLectures(moduleId);

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        Loading lectures...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <button
        onClick={() => navigate(`/courses/${courseId}/modules`)}
        className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600"
      >
        <ArrowLeft size={18} />
        Back to Modules
      </button>

      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-slate-900">
          Module Lectures
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Select a lecture to start learning.
        </p>

        {error && (
          <div className="mt-6 rounded-xl bg-red-50 p-4 text-red-700">
            <p>{error}</p>

            <button
              onClick={refreshLectures}
              className="mt-3 flex items-center gap-2 font-semibold"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        )}

        {!error && lectures.length === 0 && (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center">
            <PlayCircle
              size={40}
              className="mx-auto text-slate-400"
            />

            <h2 className="mt-4 font-semibold text-slate-800">
              No lectures available
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Lectures for this module haven't been added yet.
            </p>
          </div>
        )}

        {!error && lectures.length > 0 && (
          <div className="mt-6 space-y-3">
            {lectures.map((lecture) => (
              <div
                key={lecture._id}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4"
              >
                <PlayCircle
                  size={28}
                  className="shrink-0 text-indigo-600"
                />

                <div>
                  <h2 className="font-semibold text-slate-800">
                    {lecture.title}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {lecture.description || "No description available"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleLecturesPage;
