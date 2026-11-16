import { useState } from "react";

// Custom Hooks
import useDsaQuestions from "../hooks/useDsaQuestions";
import useDsaProgress from "../hooks/useDsaProgress";
import useDueRevisions from "../hooks/useDueRevisions";
import useDsaRevisionHistory from "../hooks/useDsaRevisionHistory";
import useSingleDsaQuestion from "../hooks/useSingleDsaQuestion";

// Components
import DsaQuestionList from "../components/DsaQuestionList";
import DsaQuestionDetails from "../components/DsaQuestionDetails";
import DsaProgressCard from "../components/DsaProgressCard";
import DueRevisionList from "../components/DueRevisionList";
import RevisionHistory from "../components/RevisionHistory";
import CreateDsaQuestion from "../components/CreateDsaQuestion";


const DsaDashboard = () => {

  // ----------------------------------
  // 1. LOCAL UI STATES
  // ----------------------------------

  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [editingQuestion, setEditingQuestion] = useState(null);


  // ----------------------------------
  // 2. DSA QUESTIONS
  // ----------------------------------

  const {
    questions,
    pagination,
    loading: questionsLoading,
    error: questionsError,
    fetchQuestions,
    nextPage,
    previousPage
  } = useDsaQuestions();


  // ----------------------------------
  // 3. SINGLE QUESTION DETAILS
  // ----------------------------------

  const {
    selectedQuestion,
    loading: detailsLoading,
    error: detailsError
  } = useSingleDsaQuestion(selectedQuestionId);


  // ----------------------------------
  // 4. STUDENT PROGRESS
  // ----------------------------------

  const {
    progress,
    loading: progressLoading,
    error: progressError
  } = useDsaProgress();


  // ----------------------------------
  // 5. DUE REVISIONS
  // ----------------------------------

  const {
    dueRevisions,
    loading: revisionsLoading,
    error: revisionsError,
    markRevised,
    fetchDueRevisions
  } = useDueRevisions();


  // ----------------------------------
  // 6. REVISION HISTORY
  // ----------------------------------

  const {
    revisionHistory,
    loading: historyLoading,
    error: historyError,
    fetchRevisionHistory
  } = useDsaRevisionHistory();


  // ----------------------------------
  // 7. CREATE QUESTION
  // ----------------------------------

  const handleCreate = () => {

    // Edit mode clear kar do
    setEditingQuestion(null);

    // Form open kar do
    setShowForm(true);
  };


  // ----------------------------------
  // 8. EDIT QUESTION
  // ----------------------------------

  const handleEdit = (question) => {

    // Selected question ka complete data store karo
    setEditingQuestion(question);

    // Same form open karo
    setShowForm(true);
  };


  // ----------------------------------
  // 9. VIEW QUESTION
  // ----------------------------------

  const handleViewQuestion = (questionId) => {

    // Selected question ki ID store karo
    setSelectedQuestionId(questionId);
  };


  // ----------------------------------
  // 10. CLOSE FORM
  // ----------------------------------

  const handleCloseForm = () => {

    setShowForm(false);

    setEditingQuestion(null);
  };


  // ----------------------------------
  // 11. AFTER CREATE / UPDATE
  // ----------------------------------

  const handleFormSuccess = () => {

    // Form close karo
    handleCloseForm();

    // Question list refresh karo
    fetchQuestions(1, 10);
  };


  // ----------------------------------
  // 12. MARK REVISION
  // ----------------------------------

  const handleMarkRevised = async (questionId) => {

    try {

      // Revision API call
      await markRevised(questionId).unwrap();

      // Due revisions refresh
      fetchDueRevisions();

      // Revision history refresh
      fetchRevisionHistory();

    } catch (error) {

      console.error("Revision failed:", error);

    }
  };


  // ----------------------------------
  // 13. DASHBOARD UI
  // ----------------------------------

  return (

    <div className="min-h-screen bg-slate-950 px-4 py-8 text-white md:px-8">

      <div className="mx-auto max-w-7xl space-y-8">

        {/* HEADER */}

        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>

            <h1 className="text-3xl font-bold">
              DSA Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Manage questions, track progress and revise coding problems.
            </p>

          </div>

          <button
            onClick={handleCreate}
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold transition hover:bg-indigo-500"
          >
            + Add Question
          </button>

        </header>


        {/* STUDENT PROGRESS */}

        <section>

          <DsaProgressCard
            progress={progress}
            loading={progressLoading}
            error={progressError}
          />

        </section>


        {/* QUESTION BANK */}

        <section className="space-y-4">

          <h2 className="text-xl font-semibold">
            DSA Question Bank
          </h2>

          <DsaQuestionList
            questions={questions}
            loading={questionsLoading}
            error={questionsError}
            pagination={pagination}
            onView={handleViewQuestion}
            onEdit={handleEdit}
            onNextPage={nextPage}
            onPreviousPage={previousPage}
          />

        </section>


        {/* SELECTED QUESTION DETAILS */}

        {selectedQuestionId && (

          <section className="space-y-4">

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-semibold">
                Question Details
              </h2>

              <button
                onClick={() => setSelectedQuestionId(null)}
                className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
              >
                Close Details
              </button>

            </div>

            <DsaQuestionDetails
              question={selectedQuestion}
              loading={detailsLoading}
              error={detailsError}
            />

          </section>

        )}


        {/* DUE REVISIONS */}

        <section className="space-y-4">

          <h2 className="text-xl font-semibold">
            Due Revisions
          </h2>

          <DueRevisionList
            dueRevisions={dueRevisions}
            loading={revisionsLoading}
            error={revisionsError}
            onMarkRevised={handleMarkRevised}
          />

        </section>


        {/* REVISION HISTORY */}

        <section className="space-y-4">

          <h2 className="text-xl font-semibold">
            Revision History
          </h2>

          <RevisionHistory
            revisionHistory={revisionHistory}
            loading={historyLoading}
            error={historyError}
          />

        </section>


        {/* CREATE / UPDATE FORM MODAL */}

        {showForm && (

          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-4">

            <div className="mx-auto my-8 max-w-5xl rounded-2xl border border-slate-800 bg-slate-950">

              {/* Modal Header */}

              <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

                <h2 className="text-lg font-semibold">
                  {editingQuestion
                    ? "Update DSA Question"
                    : "Create DSA Question"}
                </h2>

                <button
                  onClick={handleCloseForm}
                  className="rounded-lg px-3 py-2 text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                  ✕
                </button>

              </div>


              {/* Same Form for Create and Update */}

              <CreateDsaQuestion
                question={editingQuestion}
                onSuccess={handleFormSuccess}
              />

            </div>

          </div>

        )}

      </div>

    </div>

  );

};

export default DsaDashboard;
