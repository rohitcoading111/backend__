import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createDsaQuestion } from "../dsaThunk/dsaThunk";

const useCreateDsaQuestion = () => {
  const dispatch = useDispatch();

 const { mutationLoading, mutationError } = useSelector(
  (state) => state.dsa
);

const createQuestion = useCallback((questionData) => {
   return dispatch(createDsaQuestion(questionData));
}, [dispatch]);

return{
    mutationError,
    mutationLoading,
    createQuestion
}
};

export default useCreateDsaQuestion;