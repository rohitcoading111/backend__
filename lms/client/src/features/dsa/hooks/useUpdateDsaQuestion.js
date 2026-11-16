
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateDsaQuestion } from "../dsaThunk/dsaThunk";

const useUpdateDsaQuestion = () => {

  // Redux dispatch
  const dispatch = useDispatch();

  // Redux state
  const { mutationLoading, mutationError } = useSelector(
    (state) => state.dsa
  );

  // Update question
  const updateQuestion = useCallback(
    ({ questionId, updateData }) => {
      return dispatch(
        updateDsaQuestion({ questionId, updateData })
      );
    },
    [dispatch]
  );

  // Return values
  return {
    mutationLoading,
    mutationError,
    updateQuestion
  };
};

export default useUpdateDsaQuestion;
