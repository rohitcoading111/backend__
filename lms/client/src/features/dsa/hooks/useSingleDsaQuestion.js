import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSingleDsaQuestion } from "../dsaThunk/dsaThunk";

const useSingleDsaQuestion = (questionId) => {

  const dispatch = useDispatch();
  const {
    selectedQuestion,
    loading,
    error
  } = useSelector((state) => state.dsa);

  const fetchQuestion = useCallback((questionId) => {
    dispatch(getSingleDsaQuestion(questionId));
  }, [dispatch]);

  useEffect(() => {
    if (questionId) {
      fetchQuestion(questionId);
    }
  }, [questionId, fetchQuestion]);

  return {
    selectedQuestion,
    loading,
    error,
    fetchQuestion
  };
};

export default useSingleDsaQuestion;
