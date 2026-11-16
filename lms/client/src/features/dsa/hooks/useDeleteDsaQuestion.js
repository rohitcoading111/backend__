import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteDsaQuestion } from "../dsaThunk/dsaThunk";

const useDeleteDsaQuestion = () => {
  const dispatch = useDispatch();

  const { mutationLoading, mutationError } = useSelector(
    (state) => state.dsa
  );

  const deleteQuestion = useCallback(
    (questionId) => {
      return dispatch(deleteDsaQuestion(questionId));
    },
    [dispatch]
  );

  return {
    mutationLoading,
    mutationError,
    deleteQuestion
  };
};

export default useDeleteDsaQuestion;
