import { useInterviewPrepPage } from "../hooks/useInterviewPrepPage";

import InterviewPrepHeader from "../components/InterviewPrepHeader";
import InterviewPrepFilters from "../components/InterviewPrepFilters";
import InterviewPrepStats from "../components/InterviewPrepStats";
import InterviewQuestionList from "../components/InterviewQuestionList";
import InterviewQuestionSkeleton from "../components/InterviewQuestionSkeleton";

const InterviewPrepPage = () => {
  const {
    user,
    questions,
    loading,
    error,

    search,
    setSearch,

    difficulty,
    setDifficulty,

    completedCount,
    expandedQuestionId,
    handleQuestionClick,
    isQuestionCompleted,
    handleCompleteQuestion,
    completionLoading,
  } = useInterviewPrepPage();

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <InterviewPrepHeader />

        <InterviewPrepStats
          totalQuestions={questions.length}
          completedQuestions={completedCount}
        />

        <InterviewPrepFilters
          search={search}
          onSearchChange={setSearch}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
        />

        {loading ? (
          <InterviewQuestionSkeleton count={6} />
        ) : error ? (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-red-400">
            {error}
          </div>
        ) : (
          <InterviewQuestionList
            questions={questions}
            onQuestionClick={handleQuestionClick}
            expandedQuestionId={expandedQuestionId}
            user={user}
            isQuestionCompleted={isQuestionCompleted}
            onCompleteQuestion={handleCompleteQuestion}
            completionLoading={completionLoading}
          />
        )}
      </div>
    </div>
  );
};

export default InterviewPrepPage;