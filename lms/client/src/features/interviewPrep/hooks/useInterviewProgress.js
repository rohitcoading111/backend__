import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyInterviewProgress,
} from "../thunks/interviewPrepThunk";

export const useInterviewProgress = () => {
  const dispatch = useDispatch();

  const { progress, progressLoading, error } = useSelector(
    (state) => state.interviewPrep
  );

  const fetchProgress = () => {
    return dispatch(fetchMyInterviewProgress());
  };

  return {
    progress,
    progressLoading,
    error,
    fetchProgress,
  };
};