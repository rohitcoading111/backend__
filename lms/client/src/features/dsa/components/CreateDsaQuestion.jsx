
import { useForm } from "react-hook-form";
import { useCreateDsaQuestion } from "../hooks/useCreateDsaQuestion";

const CreateDsaQuestion = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const {
    mutationError,
    mutationLoading,
    createQuestion
  } = useCreateDsaQuestion();

  const onSubmit = async (questionData) => {
    try {
      await createQuestion(questionData).unwrap();
      reset();
    } catch (error) {
      console.error("Question creation failed:", error);
    }
  };

  const inputStyle =
    "w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";

  const labelStyle =
    "mb-2 block text-sm font-medium text-slate-300";

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-white md:px-8">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-indigo-400">
            <span>DSA Management</span>
            <span>/</span>
            <span className="text-slate-400">Create Question</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Create DSA Question
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Add a new coding problem to the LearnHub question bank.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="space-y-6">

            {/* Basic Information */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 md:p-7">

              <h2 className="mb-6 text-lg font-semibold">
                Basic Information
              </h2>

              <div className="grid gap-5 md:grid-cols-2">

                <div className="md:col-span-2">
                  <label className={labelStyle}>
                    Question Title *
                  </label>

                  <input
                    {...register("title", {
                      required: "Question title is required"
                    })}
                    placeholder="e.g. Two Sum"
                    className={inputStyle}
                  />

                  {errors.title && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className={labelStyle}>
                    Description *
                  </label>

                  <textarea
                    rows={5}
                    {...register("description", {
                      required: "Description is required"
                    })}
                    placeholder="Write the complete problem description..."
                    className={inputStyle}
                  />

                  {errors.description && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelStyle}>
                    Difficulty *
                  </label>

                  <select
                    {...register("difficulty", {
                      required: "Select difficulty"
                    })}
                    className={inputStyle}
                  >
                    <option value="">Select difficulty</option>
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                  </select>

                  {errors.difficulty && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.difficulty.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelStyle}>
                    Platform *
                  </label>

                  <select
                    {...register("platform", {
                      required: "Select platform"
                    })}
                    className={inputStyle}
                  >
                    <option value="">Select platform</option>
                    <option value="LEETCODE">LeetCode</option>
                    <option value="GFG">GeeksforGeeks</option>
                    <option value="CODEFORCES">Codeforces</option>
                    <option value="HACKERRANK">HackerRank</option>
                    <option value="OTHER">Other</option>
                  </select>

                  {errors.platform && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.platform.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className={labelStyle}>
                    External Question URL
                  </label>

                  <input
                    type="url"
                    {...register("externalUrl")}
                    placeholder="https://leetcode.com/problems/two-sum/"
                    className={inputStyle}
                  />
                </div>

              </div>
            </section>

            {/* Question Metadata */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 md:p-7">

              <h2 className="mb-6 text-lg font-semibold">
                Question Metadata
              </h2>

              <div className="space-y-5">

                <div>
                  <label className={labelStyle}>
                    Topics *
                  </label>

                  <input
                    {...register("topics", {
                      required: "Add at least one topic",
                      setValueAs: (value) =>
                        value.split(",").map((item) => item.trim()).filter(Boolean)
                    })}
                    placeholder="Arrays, Hashing, Two Pointers"
                    className={inputStyle}
                  />

                  <p className="mt-2 text-xs text-slate-500">
                    Separate multiple topics using commas.
                  </p>

                  {errors.topics && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.topics.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelStyle}>
                    Companies
                  </label>

                  <input
                    {...register("companies", {
                      setValueAs: (value) =>
                        value.split(",").map((item) => item.trim()).filter(Boolean)
                    })}
                    placeholder="Google, Amazon, Microsoft"
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className={labelStyle}>
                    Constraints
                  </label>

                  <textarea
                    rows={3}
                    {...register("constraints")}
                    placeholder="Enter question constraints..."
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className={labelStyle}>
                    Hints
                  </label>

                  <textarea
                    rows={3}
                    {...register("hints", {
                      setValueAs: (value) =>
                        value.split("\n").map((item) => item.trim()).filter(Boolean)
                    })}
                    placeholder="Write one hint per line..."
                    className={inputStyle}
                  />

                  <p className="mt-2 text-xs text-slate-500">
                    Enter each hint on a new line.
                  </p>
                </div>

              </div>
            </section>

            {/* Error */}
            {mutationError && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                {mutationError}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col justify-end gap-3 sm:flex-row">

              <button
                type="button"
                onClick={() => reset()}
                className="rounded-xl border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
              >
                Reset Form
              </button>

              <button
                type="submit"
                disabled={mutationLoading}
                className="rounded-xl bg-indigo-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {mutationLoading
                  ? "Creating Question..."
                  : "Create Question"}
              </button>

            </div>

          </div>
        </form>

      </div>
    </div>
  );
};

export default CreateDsaQuestion;
