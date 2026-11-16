import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getDueRevisions,
  markQuestionRevised
} from "../dsaThunk/dsaThunk";

const useDueRevisions = () => {
  const dispatch = useDispatch();

  const {
    dueRevisions,
    loading,
    error,
    mutationLoading,
    mutationError
  } = useSelector((state) => state.dsa);

  const fetchDueRevisions = useCallback(() => {
    return dispatch(getDueRevisions());
  }, [dispatch]);

  const markRevised = useCallback(
    (questionId) => {
      return dispatch(markQuestionRevised(questionId));
    },
    [dispatch]
  );

  useEffect(() => {
    fetchDueRevisions();
  }, [fetchDueRevisions]);

  return {
    dueRevisions,
    loading,
    error,
    mutationLoading,
    mutationError,
    fetchDueRevisions,
    markRevised
  };
};

export default useDueRevisions;
