
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import useCreateDsaQuestion from "../hooks/useCreateDsaQuestion";
import useUpdateDsaQuestion from "../hooks/useUpdateDsaQuestion";

/* ---------------------------------
   Constants & helpers
--------------------------------- */

const EMPTY_FORM = {
  title: "",
  description: "",
  difficulty: "",
  platform: "",
  externalUrl: "",
  topics: "",
  companies: "",
  constraints: "",
  hints: ""
};

const DIFFICULTIES = [
  { value: "EASY", label: "Easy" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HARD", label: "Hard" }
];

const PLATFORMS = [
  { value: "LEETCODE", label: "LeetCode" },
  { value: "GFG", label: "GeeksforGeeks" },
  { value: "CODEFORCES", label: "Codeforces" },
  { value: "HACKERRANK", label: "HackerRank" },
  { value: "OTHER", label: "Other" }
];

// Generate slug automatically from title
const generateSlug = (title = "") => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

const toFormValues = (question) =>
  question
    ? {
        title: question.title || "",
        description: question.description || "",
        difficulty: question.difficulty || "",
        platform: question.platform || "",
        externalUrl: question.externalUrl || "",
        topics: question.topics?.join(", ") || "",
        companies: question.companies?.join(", ") || "",
        constraints: question.constraints || "",
        hints: question.hints?.join("\n") || ""
      }
    : EMPTY_FORM;

const splitBy = (value, separator) =>
  (value || "")
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean);

/* ---------------------------------
   Styles
--------------------------------- */

const baseField =
  "w-full min-w-0 rounded-lg border border-white/10 bg-[#0c0c0c] px-3.5 py-3 text-[13px] text-white placeholder:text-neutral-600 outline-none transition-colors duration-200 hover:border-white/20 focus:border-white/40";

const inputStyle = baseField;
const textareaStyle = `${baseField} leading-5 resize-y`;
const selectStyle = `${baseField} appearance-none cursor-pointer pr-10`;
const labelStyle =
  "mb-2 block text-[12px] font-semibold tracking-wide text-neutral-300";
const sectionStyle =
  "rounded-xl border border-white/10 bg-[#0b0b0b] p-4 sm:p-5";

/* ---------------------------------
   Small UI pieces
--------------------------------- */

const SelectArrow = () => (
  <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m7 10 5 5 5-5" />
    </svg>
  </span>
);

const FormSection = ({ title, children }) => (
  <section className={sectionStyle}>
    <div className="mb-5 flex items-center gap-2">
      <span className="h-4 w-[3px] rounded-full bg-white" />
      <h3 className="text-sm font-semibold text-white">{title}</h3>
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {children}
    </div>
  </section>
);



const Field = ({
  label,
  required,
  error,
  hint,
  full,
  htmlFor,
  children
}) => (
  <div className={full ? "sm:col-span-2" : undefined}>
    <label htmlFor={htmlFor} className={labelStyle}>
      {label}
      {required && <span className="text-neutral-500"> *</span>}
    </label>

    {children}

    {hint && (
      <p className="mt-1.5 text-[10px] text-neutral-600">{hint}</p>
    )}

    {error && (
      <p className="mt-1.5 text-[11px] text-red-400">
        {error.message}
      </p>
    )}
  </div>
);

const SelectField = ({ id, options, placeholder, registration }) => (
  <div className="relative">
    <select id={id} {...registration} className={selectStyle}>
      <option value="">{placeholder}</option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>

    <SelectArrow />
  </div>
);

/* ---------------------------------
   Component
--------------------------------- */

const CreateDsaQuestion = ({ question = null, onSuccess }) => {
  const isEditMode = Boolean(question);

  const {
    createQuestion,
    mutationLoading: createLoading,
    mutationError: createError
  } = useCreateDsaQuestion();

  const {
    updateQuestion,
    mutationLoading: updateLoading,
    mutationError: updateError
  } = useUpdateDsaQuestion();

  const mutationLoading = isEditMode ? updateLoading : createLoading;
  const mutationError = isEditMode ? updateError : createError;

  const initialValues = useMemo(
    () => toFormValues(question),
    [question]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: initialValues
  });

  // Populate form when switching between create / edit
  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  // =====================================
  // FORM SUBMIT
  // =====================================

const onSubmit = async (formData) => {
  console.log("1. onSubmit triggered");

  try {
    const questionData = {
      ...formData,
      slug: generateSlug(formData.title),
      topics: splitBy(formData.topics, ","),
      companies: splitBy(formData.companies, ","),
      hints: splitBy(formData.hints, "\n")
    };

    if (isEditMode) {
      await updateQuestion({
        questionId: question._id,
        updateData: questionData
      }).unwrap();
    } else {
      await createQuestion(questionData).unwrap();
    }

    console.log("2. API successful");
    console.log("3. Calling onSuccess");

    onSuccess?.();

  } catch (error) {
    console.error("API failed:", error);
  }
};
  

  const submitLabel = mutationLoading
    ? isEditMode
      ? "Updating..."
      : "Creating..."
    : isEditMode
      ? "Save Changes"
      : "Create Question";

  return (
    <div className="w-full bg-[#050505] px-4 py-5 text-white sm:px-6">
      <div className="mx-auto w-full max-w-[850px]">

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-5"
          noValidate
        >

          {/* BASIC INFORMATION */}

          <FormSection title="Basic Information">

            <Field
              full
              required
              label="Question Title"
              htmlFor="dsa-title"
              error={errors.title}
            >
              <input
                id="dsa-title"
                placeholder="e.g. Two Sum"
                className={inputStyle}
                {...register("title", {
                  required: "Question title is required"
                })}
              />
            </Field>

            <Field
              full
              required
              label="Description"
              htmlFor="dsa-description"
              error={errors.description}
            >
              <textarea
                id="dsa-description"
                rows={4}
                placeholder="Write the complete problem description..."
                className={`${textareaStyle} min-h-[130px]`}
                {...register("description", {
                  required: "Description is required"
                })}
              />
            </Field>

            <Field
              required
              label="Difficulty"
              htmlFor="dsa-difficulty"
              error={errors.difficulty}
            >
              <SelectField
                id="dsa-difficulty"
                options={DIFFICULTIES}
                placeholder="Select difficulty"
                registration={register("difficulty", {
                  required: "Select difficulty"
                })}
              />
            </Field>

            <Field
              required
              label="Platform"
              htmlFor="dsa-platform"
              error={errors.platform}
            >
              <SelectField
                id="dsa-platform"
                options={PLATFORMS}
                placeholder="Select platform"
                registration={register("platform", {
                  required: "Select platform"
                })}
              />
            </Field>

            <Field
              full
              label="External Question URL"
              htmlFor="dsa-url"
            >
              <input
                id="dsa-url"
                type="url"
                placeholder="https://leetcode.com/problems/two-sum/"
                className={inputStyle}
                {...register("externalUrl")}
              />
            </Field>

          </FormSection>

          {/* QUESTION METADATA */}

          <FormSection title="Question Metadata">

            <Field
              required
              label="Topics"
              htmlFor="dsa-topics"
              hint="Separate using commas."
              error={errors.topics}
            >
              <input
                id="dsa-topics"
                placeholder="Arrays, Hashing"
                className={inputStyle}
                {...register("topics", {
                  required: "Add at least one topic"
                })}
              />
            </Field>

            <Field
              label="Companies"
              htmlFor="dsa-companies"
              hint="Separate using commas."
            >
              <input
                id="dsa-companies"
                placeholder="Google, Amazon"
                className={inputStyle}
                {...register("companies")}
              />
            </Field>

            <Field
              full
              label="Constraints"
              htmlFor="dsa-constraints"
            >
              <textarea
                id="dsa-constraints"
                rows={3}
                placeholder="Enter question constraints..."
                className={textareaStyle}
                {...register("constraints")}
              />
            </Field>

            <Field
              full
              label="Hints"
              htmlFor="dsa-hints"
              hint="Enter each hint on a new line."
            >
              <textarea
                id="dsa-hints"
                rows={4}
                placeholder={"Hint 1\nHint 2\nHint 3"}
                className={textareaStyle}
                {...register("hints")}
              />
            </Field>

          </FormSection>

          {/* ERROR */}

          {mutationError && (
            <div
              role="alert"
              className="rounded-lg border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-xs text-red-400"
            >
              {typeof mutationError === "string"
                ? mutationError
                : "Something went wrong. Please try again."}
            </div>
          )}

          {/* ACTIONS */}

          <div className="flex flex-col-reverse justify-end gap-2 border-t border-white/[0.07] pt-4 sm:flex-row">

            <button
              type="button"
              disabled={mutationLoading}
              onClick={() => reset(initialValues)}
              className="lh-button-secondary !rounded-lg !px-5 !py-2.5"
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={mutationLoading}
              className="lh-button-primary !rounded-lg !px-6 !py-2.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitLabel}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateDsaQuestion;
