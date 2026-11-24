import { useDispatch, useSelector } from "react-redux";
import { completeInterviewQuestion } from "../thunks/interviewPrepThunk";

export const useCompleteInterviewQuestion = () => {
  const dispatch = useDispatch();

  const { completionLoading, error, progress } = useSelector(
    (state) => state.interviewPrep
  );

  const completeQuestion = (questionId) => {
    return dispatch(completeInterviewQuestion(questionId));
  };

  return {
    completeQuestion,
    completionLoading,
    error,
    progress,
  };
};