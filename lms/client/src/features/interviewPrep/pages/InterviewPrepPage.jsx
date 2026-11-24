import { useState } from "react";
import { useInterviewPrepPage } from "../hooks/useInterviewPrepPage";

import InterviewPrepHeader from "../components/InterviewPrepHeader";
import InterviewPrepFilters from "../components/InterviewPrepFilters";
import InterviewPrepStats from "../components/InterviewPrepStats";
import InterviewQuestionList from "../components/InterviewQuestionList";
import InterviewQuestionSkeleton from "../components/InterviewQuestionSkeleton";
import InterviewTopicsList from "../components/InterviewTopicsList";

const InterviewPrepPage = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);

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

  // 1. Create topic groups
  const topics = [];

  questions.forEach((question) => {
    const category = question.categoryId;

    const categoryId =
      typeof category === "object"
        ? category._id
        : category;

    const categoryName =
      typeof category === "object"
        ? category.name
        : "Other";

    // Check if this topic already exists
    let topic = topics.find((item) => item.id === categoryId);

    // If topic doesn't exist, create it
    if (!topic) {
      topic = {
        id: categoryId,
        name: categoryName,
        questions: [],
        completedCount: 0,
      };

      topics.push(topic);
    }

    // Add question to topic
    topic.questions.push(question);

    // Count completed questions
    if (isQuestionCompleted(question._id)) {
      topic.completedCount++;
    }
  });

  // 2. Add question counts
  topics.forEach((topic) => {
    topic.questionCount = topic.questions.length;
  });

  // 3. Find selected topic
  const currentTopic = topics.find(
    (topic) => topic.id === selectedTopic
  );

  const hasMore = pagination
    ? pagination.currentPage < pagination.totalPages
    : false;

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <InterviewPrepHeader />

        {loading && questions.length === 0 ? (
          <InterviewQuestionSkeleton count={6} />
        ) : error ? (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-red-400">
            {error}
          </div>
        ) : !currentTopic ? (
          topics.length === 0 ? (
            <div className="py-16 text-center">
              <h3 className="text-lg font-semibold text-zinc-300">
                No interview topics available
              </h3>

              <p className="mt-2 text-sm text-zinc-500">
                Topics will appear here once questions are available.
              </p>
            </div>
          ) : (
            <InterviewTopicsList
              topics={topics}
              onTopicClick={(topic) => setSelectedTopic(topic.id)}
            />
          )
        ) : (
          <>
            {/* Back Button */}
            <div className="mb-6">
              <button
                onClick={() => setSelectedTopic(null)}
                className="mb-4 text-sm text-indigo-400 hover:text-indigo-300"
              >
                ← Back to Topics
              </button>

              <h2 className="text-2xl font-bold text-zinc-100">
                {currentTopic.name} Interview Questions
              </h2>
            </div>

            {/* Stats */}
            <InterviewPrepStats
              totalQuestions={currentTopic.questionCount}
              completedQuestions={currentTopic.completedCount}
            />

            {/* Filters */}
            <InterviewPrepFilters
              search={search}
              onSearchChange={setSearch}
              difficulty={difficulty}
              onDifficultyChange={setDifficulty}
            />

            {/* Questions */}
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
        )}
      </div>
    </div>
  );
};

export default InterviewPrepPage;