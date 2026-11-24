import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useInterviewQuestions } from "./useInterviewQuestions";
import { useInterviewProgress } from "./useInterviewProgress";
import { useCompleteInterviewQuestion } from "./useCompleteInterviewQuestion";

export const useInterviewPrepPage = () => {
  const user = useSelector((state) => state.auth.user);

  // Question fetching
  const {
    questions,
    loading,
    error,
    fetchQuestions,
  } = useInterviewQuestions();

  // User progress
  const {
    progress,
    progressLoading,
    fetchProgress,
  } = useInterviewProgress();

  // Completion action
  const {
    completeQuestion,
    completionLoading,
  } = useCompleteInterviewQuestion();

  // Local UI state
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  // Fetch questions whenever filters change
  useEffect(() => {
    const params = {};

    if (search.trim()) {
      params.search = search.trim();
    }

    if (difficulty !== "ALL") {
      params.difficulty = difficulty;
    }

    fetchQuestions(params);
  }, [search, difficulty]);

  // Fetch user progress only when logged in
  useEffect(() => {
    if (user) {
      fetchProgress();
    }
  }, [user]);

  // Normalize question IDs from progress
  const completedQuestionIds = progress.map((item) =>
    typeof item.questionId === "object"
      ? item.questionId?._id
      : item.questionId
  );

  // Check whether a question is completed
  const isQuestionCompleted = (questionId) =>
    completedQuestionIds.includes(questionId);

  // Expand / collapse question
  const handleQuestionClick = (questionId) => {
    setExpandedQuestionId((previousId) =>
      previousId === questionId ? null : questionId
    );
  };

  // Mark question completed
 const handleCompleteQuestion = async (questionId) => {
  const result = await completeQuestion(questionId);

  if (result.meta?.requestStatus === "fulfilled") {
    await fetchProgress();
  }

  return result;
};

  // Statistics
  const completedCount = completedQuestionIds.length;

  return {
    user,

    questions,
    loading,
    error,

    progress,
    progressLoading,
    completionLoading,

    search,
    setSearch,

    difficulty,
    setDifficulty,

    expandedQuestionId,
    handleQuestionClick,

    completedQuestionIds,
    completedCount,
    isQuestionCompleted,
    handleCompleteQuestion,

    fetchQuestions,
    fetchProgress,
  };
};