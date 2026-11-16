import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

import useDsaQuestions from "../hooks/useDsaQuestions";
import useDsaProgress from "../hooks/useDsaProgress";
import useDueRevisions from "../hooks/useDueRevisions";
import useDsaRevisionHistory from "../hooks/useDsaRevisionHistory";
import useSingleDsaQuestion from "../hooks/useSingleDsaQuestion";
import useDeleteDsaQuestion from "../hooks/useDeleteDsaQuestion";

import DsaQuestionList from "../components/DsaQuestionList";
import DsaQuestionDetails from "../components/DsaQuestionDetails";
import DsaProgressCard from "../components/DsaProgressCard";
import DueRevisionList from "../components/DueRevisionList";
import RevisionHistory from "../components/RevisionHistory";
import CreateDsaQuestion from "../components/CreateDsaQuestion";

/* ---------------------------------
   Reusable section wrapper
--------------------------------- */

const Section = ({ title, subtitle, action, children }) => (
  <section className="premium-card rounded-xl p-4 sm:p-6">
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="text-base font-bold text-white">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-xs text-neutral-500">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
    {children}
  </section>
);


/* ---------------------------------
   Create / Update modal
--------------------------------- */

const stop = (event) => event.stopPropagation();

const DsaFormModal = ({ question, onClose, onSuccess }) => {
  const title = question ? "Update Question" : "Create Question";

  // Lock background scroll + close on Escape
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="dsa-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="dsa-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {/* HEADER (fixed) */}
        <div className="dsa-modal-header">
          <div>
            <p className="text-[10px] uppercase tracking-[2px] text-neutral-500">
              LearnHub / DSA
            </p>
            <h2 className="mt-1 text-sm font-semibold text-white">{title}</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="dsa-close-button"
            aria-label="Close form"
          >
            ✕
          </button>
        </div>

        {/* BODY (only scrolling area).
            stopPropagation keeps smooth-scroll libs / page handlers
            from swallowing wheel & touch events. */}
        <div
          className="dsa-modal-body"
          data-lenis-prevent
          onWheel={stop}
          onTouchMove={stop}
        >
          <CreateDsaQuestion question={question} onSuccess={onSuccess} />
        </div>
      </div>
    </div>,
    document.body
  );
};


/* ---------------------------------
   Dashboard
--------------------------------- */

const DsaDashboard = () => {
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const {
    questions = [],
    pagination,
    loading: questionsLoading,
    error: questionsError,
    fetchQuestions,
    nextPage,
    previousPage
  } = useDsaQuestions();

  const {
    selectedQuestion,
    loading: detailsLoading,
    error: detailsError
  } = useSingleDsaQuestion(selectedQuestionId);

  const {
    progress,
    loading: progressLoading,
    error: progressError,
    fetchProgress,
    markSolved
  } = useDsaProgress();

  const {
    dueRevisions = [],
    loading: revisionsLoading,
    error: revisionsError,
    fetchDueRevisions,
    markRevised
  } = useDueRevisions();

  const {
    revisionHistory = [],
    loading: historyLoading,
    error: historyError,
    fetchRevisionHistory
  } = useDsaRevisionHistory();

  const { deleteQuestion } = useDeleteDsaQuestion();

  /* ---------- data refresh ---------- */

  const refreshStudentData = useCallback(
    () =>
      Promise.all([
        fetchProgress(),
        fetchDueRevisions(),
        fetchRevisionHistory()
      ]),
    [fetchProgress, fetchDueRevisions, fetchRevisionHistory]
  );

  const refreshQuestions = useCallback(
    () =>
      fetchQuestions(
        pagination?.currentPage || 1,
        pagination?.limit || 10
      ),
    [fetchQuestions, pagination?.currentPage, pagination?.limit]
  );

  /* ---------- form handlers ---------- */

  const handleCreate = useCallback(() => {
    setEditingQuestion(null);
    setShowForm(true);
  }, []);

  const handleEdit = useCallback((question) => {
    setEditingQuestion(question);
    setShowForm(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setShowForm(false);
    setEditingQuestion(null);
  }, []);

  const handleFormSuccess = useCallback(async () => {
    handleCloseForm();
    await refreshQuestions();
  }, [handleCloseForm, refreshQuestions]);

  /* ---------- question actions ---------- */

  const handleViewQuestion = useCallback(
    (questionId) => setSelectedQuestionId(questionId),
    []
  );

  const handleCloseDetails = useCallback(
    () => setSelectedQuestionId(null),
    []
  );

  const handleDelete = useCallback(
    async (questionId) => {
      if (!window.confirm("Are you sure you want to delete this question?")) {
        return;
      }

      try {
        await deleteQuestion(questionId).unwrap();
        await refreshQuestions();

        setSelectedQuestionId((current) =>
          current === questionId ? null : current
        );
      } catch (error) {
        console.error("Question deletion failed:", error);
      }
    },
    [deleteQuestion, refreshQuestions]
  );

  const handleMarkSolved = useCallback(
    async (questionId) => {
      try {
        await markSolved(questionId).unwrap();
        await refreshStudentData();
      } catch (error) {
        console.error("Mark solved failed:", error);
      }
    },
    [markSolved, refreshStudentData]
  );

  const handleMarkRevised = useCallback(
    async (questionId) => {
      try {
        await markRevised(questionId).unwrap();
        await refreshStudentData();
      } catch (error) {
        console.error("Revision update failed:", error);
      }
    },
    [markRevised, refreshStudentData]
  );

  /* ---------- UI ---------- */

  return (
    <main className="premium-dashboard min-h-screen px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-7">

        {/* HEADER */}
        <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[2px] text-neutral-500">
              LearnHub / Practice
            </p>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              DSA Dashboard
            </h1>
            <p className="mt-2 text-xs text-neutral-500 sm:text-sm">
              Practice consistently. Track progress. Revise smarter.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCreate}
            className="lh-button-primary w-full sm:w-auto"
          >
            + Add Question
          </button>
        </header>

        {/* PROGRESS */}
        <section>
          <DsaProgressCard
            progress={progress}
            loading={progressLoading}
            error={progressError}
          />
        </section>

        {/* QUESTION BANK */}
        <Section
          title="Question Bank"
          subtitle="Explore and manage coding questions"
          action={
            <span className="rounded-md border border-white/10 px-3 py-1 text-xs text-neutral-400">
              {pagination?.totalQuestions ?? questions.length} Questions
            </span>
          }
        >
          <DsaQuestionList
            questions={questions}
            loading={questionsLoading}
            error={questionsError}
            pagination={pagination}
            onView={handleViewQuestion}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onMarkSolved={handleMarkSolved}
            onNextPage={nextPage}
            onPreviousPage={previousPage}
          />
        </Section>

        {/* QUESTION DETAILS */}
        {selectedQuestionId && (
          <Section
            title="Question Details"
            action={
              <button
                type="button"
                onClick={handleCloseDetails}
                className="lh-button-secondary"
              >
                Close
              </button>
            }
          >
            <DsaQuestionDetails
              question={selectedQuestion}
              loading={detailsLoading}
              error={detailsError}
            />
          </Section>
        )}

        {/* DUE REVISIONS */}
        <Section
          title="Due Revisions"
          subtitle="Questions scheduled for revision"
        >
          <DueRevisionList
            dueRevisions={dueRevisions}
            loading={revisionsLoading}
            error={revisionsError}
            onMarkRevised={handleMarkRevised}
          />
        </Section>

        {/* REVISION HISTORY */}
        <Section
          title="Revision History"
          subtitle="Your previous solving and revision activity"
        >
          <RevisionHistory
            revisionHistory={revisionHistory}
            loading={historyLoading}
            error={historyError}
          />
        </Section>
      </div>

      {showForm && (
        <DsaFormModal
          question={editingQuestion}
          onClose={handleCloseForm}
          onSuccess={handleFormSuccess}
        />
      )}
    </main>
  );
};

export default DsaDashboard;