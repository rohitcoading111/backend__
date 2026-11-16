
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getStudentDsaRevisionHistory
} from "../dsaThunk/dsaThunk";

const useDsaRevisionHistory = () => {
  const dispatch = useDispatch();

  const {
    revisionHistory,
    loading,
    error
  } = useSelector((state) => state.dsa);

  const fetchRevisionHistory = useCallback(() => {
    return dispatch(getStudentDsaRevisionHistory());
  }, [dispatch]);

  useEffect(() => {
    fetchRevisionHistory();
  }, [fetchRevisionHistory]);

  return {
    revisionHistory,
    loading,
    error,
    fetchRevisionHistory
  };
};

export default useDsaRevisionHistory;
