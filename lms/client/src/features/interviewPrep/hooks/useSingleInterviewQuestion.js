import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleInterviewQuestion,
} from "../thunks/interviewPrepThunk";

import { clearSelectedQuestion } from "../store/interviewPrepSlice";

export const useSingleInterviewQuestion = () => {
  const dispatch = useDispatch();

  const { selectedQuestion, singleQuestionLoading, error } = useSelector(
    (state) => state.interviewPrep
  );

  const fetchSingleQuestion = (questionId) => {
    return dispatch(fetchSingleInterviewQuestion(questionId));
  };

  const clearQuestion = () => {
    dispatch(clearSelectedQuestion());
  };

  return {
    selectedQuestion,
    singleQuestionLoading,
    error,
    fetchSingleQuestion,
    clearQuestion,
  };
};