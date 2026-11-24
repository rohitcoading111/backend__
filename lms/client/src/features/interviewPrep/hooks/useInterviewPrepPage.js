
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useInterviewQuestions } from "./useInterviewQuestions";
import { useInterviewProgress } from "./useInterviewProgress";
import { useCompleteInterviewQuestion } from "./useCompleteInterviewQuestion";

export const useInterviewPrepPage = () => {
  const user = useSelector((state) => state.auth.user);

  const {
    questions,
    pagination,
    loading,
    error,
    fetchQuestions,
  } = useInterviewQuestions();

  const {
    progress,
    progressLoading,
    fetchProgress,
  } = useInterviewProgress();

  const {
    completeQuestion,
    completionLoading,
  } = useCompleteInterviewQuestion();

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  // Fetch first page whenever search or difficulty changes
  useEffect(() => {
    const params = {
      page: 1,
      limit: 10,
    };

    if (search.trim()) params.search = search.trim();
    if (difficulty !== "ALL") params.difficulty = difficulty;

    fetchQuestions(params);
  }, [search, difficulty]);

  // Fetch user progress
  useEffect(() => {
    if (user) fetchProgress();
  }, [user]);

  // Extract completed question IDs
  const completedQuestionIds = progress.map((item) =>
    typeof item.questionId === "object"
      ? item.questionId?._id
      : item.questionId
  );

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

  // Load next page
  const loadNextPage = () => {
    if (!pagination || loading) return;

    if (pagination.currentPage >= pagination.totalPages) return;

    const nextPage = pagination.currentPage + 1;

    const params = {
      page: nextPage,
      limit: 10,
    };

    if (search.trim()) params.search = search.trim();
    if (difficulty !== "ALL") params.difficulty = difficulty;

    fetchQuestions(params);
  };

  const completedCount = completedQuestionIds.length;

  return {
    user,
    questions,
    pagination,
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
    loadNextPage,
  };
};
