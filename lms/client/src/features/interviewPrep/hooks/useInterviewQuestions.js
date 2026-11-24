import { useDispatch, useSelector } from "react-redux";
import { fetchInterviewQuestions } from "../thunks/interviewPrepThunk";

export const useInterviewQuestions = () => {
  const dispatch = useDispatch();

  const {
    questions,
    pagination,
    loading,
    error,
  } = useSelector((state) => state.interviewPrep);

  const fetchQuestions = (params = {}) => {
    return dispatch(fetchInterviewQuestions(params));
  };

  return {
    questions,
    pagination,
    loading,
    error,
    fetchQuestions,
  };
};