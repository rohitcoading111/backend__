
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
    pagination,
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

    loadNextPage,
  } = useInterviewPrepPage();

  const hasMore = pagination
    ? pagination.currentPage < pagination.totalPages
    : false;

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <InterviewPrepHeader />

        <InterviewPrepStats
          totalQuestions={pagination?.totalQuestions ?? questions.length}
          completedQuestions={completedCount}
        />

        <InterviewPrepFilters
          search={search}
          onSearchChange={setSearch}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
        />

        {loading && questions.length === 0 ? (
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
            loadNextPage={loadNextPage}
            hasMore={hasMore}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default InterviewPrepPage;
