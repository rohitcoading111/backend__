
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getStudentDsaProgress,
  markQuestionSolved
} from "../dsaThunk/dsaThunk";

const useDsaProgress = () => {
  const dispatch = useDispatch();

  const {
    progress,
    loading,
    error,
    mutationLoading,
    mutationError
  } = useSelector((state) => state.dsa);

  const fetchProgress = useCallback(() => {
    return dispatch(getStudentDsaProgress());
  }, [dispatch]);

  const markSolved = useCallback(
    (questionId) => {
      return dispatch(markQuestionSolved(questionId));
    },
    [dispatch]
  );

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  return {
    progress,
    loading,
    error,
    mutationLoading,
    mutationError,
    fetchProgress,
    markSolved
  };
};

export default useDsaProgress;
