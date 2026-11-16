import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllDsaQuestions } from "../dsaThunk/dsaThunk";

const useDsaQuestions = () => {

  // Redux hooks
  const dispatch = useDispatch();

  const {
    questions,
    pagination,
    loading,
    error
  } = useSelector((state) => state.dsa);

  // Fetch all questions
  const fetchQuestions = useCallback(
    (page, limit) => {
      dispatch(getAllDsaQuestions({ page, limit }));
    },
    [dispatch]
  );

  // Initial API call
  useEffect(() => {
    fetchQuestions(1, 10);
  }, [fetchQuestions]);

  // Next page
  const nextPage = () => {
    if (!pagination) {
      return;
    }

    let currentPage = pagination.currentPage;
    const totalPages = pagination.totalPages;
    const limit = pagination.limit;

    if (currentPage >= totalPages) {
      return;
    }

    currentPage++;
    fetchQuestions(currentPage, limit);
  };

  // Previous page
  const previousPage = () => {
    if (!pagination) {
      return;
    }

    let currentPage = pagination.currentPage;
    const limit = pagination.limit;

    if (currentPage === 1) {
      return;
    }

    currentPage--;
    fetchQuestions(currentPage, limit);
  };

  // Return data and functions
  return {
    questions,
    pagination,
    loading,
    error,
    fetchQuestions,
    nextPage,
    previousPage
  };
};

export default useDsaQuestions;
