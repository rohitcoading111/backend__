import { useState, useMemo } from "react";
import { useInterviewPrepPage } from "../hooks/useInterviewPrepPage";

import InterviewPrepHeader from "../components/InterviewPrepHeader";
import InterviewPrepFilters from "../components/InterviewPrepFilters";
import InterviewPrepStats from "../components/InterviewPrepStats";
import InterviewQuestionList from "../components/InterviewQuestionList";
import InterviewQuestionSkeleton from "../components/InterviewQuestionSkeleton";
import InterviewTopicsList from "../components/InterviewTopicsList";

// 1. Category nikalne ka simple helper function (bar-bar repeat nahi karna padega)
const getCategoryInfo = (question) => {
  const cat = question.categoryId;
  if (typeof cat === "object" && cat !== null) {
    return { id: cat._id, name: cat.name };
  }
  return { id: cat, name: question.category?.name || "Other" };
};

const InterviewPrepPage = () => {
  const [selectedTopicId, setSelectedTopicId] = useState(null);

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
    expandedQuestionId,
    handleQuestionClick,
    isQuestionCompleted,
    handleCompleteQuestion,
    completionLoading,
    loadNextPage,
  } = useInterviewPrepPage();

  // 2. Saare topics aur unke questions ko ek hi jagah group kar liya
  const topics = useMemo(() => {
    const grouped = {};

    questions.forEach((question) => {
      const { id, name } = getCategoryInfo(question);

      if (!grouped[id]) {
        grouped[id] = {
          id,
          name,
          questions: [],
          completedCount: 0,
        };
      }

      grouped[id].questions.push(question);
      if (isQuestionCompleted(question._id)) {
        grouped[id].completedCount += 1;
      }
    });

    return Object.values(grouped).map((topic) => ({
      ...topic,
      questionCount: topic.questions.length,
    }));
  }, [questions, isQuestionCompleted]);

  // 3. Selected topic ka sara data (questions + count) directly mil jayega
  const currentTopic = topics.find((t) => t.id === selectedTopicId) || null;
  const hasMore = pagination ? pagination.currentPage < pagination.totalPages : false;

  // 4. Content render karne ke liye clean function (nested ternary se bachne ke liye)
  const renderContent = () => {
    if (loading && questions.length === 0) {
      return <InterviewQuestionSkeleton count={6} />;
    }

    if (error) {
      return (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-red-400">
          {error}
        </div>
      );
    }

    // Agar koi topic select nahi hai, toh topics ki list dikhao
    if (!currentTopic) {
      if (topics.length === 0) {
        return (
          <div className="py-16 text-center">
            <h3 className="text-lg font-semibold text-zinc-300">
              No interview topics available
            </h3>
            <p className="mt-2 text-sm text-zinc-500">
              Topics will appear here once questions are available.
            </p>
          </div>
        );
      }

      return (
        <InterviewTopicsList
          topics={topics}
          onTopicClick={(topic) => setSelectedTopicId(topic.id)}
        />
      );
    }

    // Agar topic select hai, toh uske questions aur filters dikhao
    return (
      <>
        <div className="mb-6">
          <button
            onClick={() => setSelectedTopicId(null)}
            className="mb-4 text-sm text-indigo-400 hover:text-indigo-300"
          >
            ← Back to Topics
          </button>

          <h2 className="text-2xl font-bold text-zinc-100">
            {currentTopic.name} Interview Questions
          </h2>
        </div>

        <InterviewPrepStats
          totalQuestions={currentTopic.questionCount}
          completedQuestions={currentTopic.completedCount}
        />

        <InterviewPrepFilters
          search={search}
          onSearchChange={setSearch}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
        />

        <InterviewQuestionList
          questions={currentTopic.questions}
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
      </>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <InterviewPrepHeader />
        {renderContent()}
      </div>
    </div>
  );
};

export default InterviewPrepPage;