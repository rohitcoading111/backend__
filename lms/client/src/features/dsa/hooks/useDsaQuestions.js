import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllDsaQuestions } from "../dsaThunk/dsaThunk";


const dispatch = useDispatch();
const {questions,pagination,loadding,error} = useSelector((state) => state.dsa);

const fetchQuestions = useCallback(
  (page, limit) => {
   dispatch(getAllDsaQuestions({page,limit}))
  },
  [dispatch]
);

useEffect(()=>{
    fetchQuestions(1,10);
},[fetchQuestions])


const nextPage = ()=> {
     if(!pagination){
        return;
       }
       let currentPage = pagination.currentPage;
       let totalPages = pagination.totalPages;
       const limit = pagination.limit;
       if(currentPage>=totalPages){
        return;
       }
       currentPage++;
       fetchQuestions(currentPage,limit);
}

const previousPage = () => {
    if(!pagination){
        return;
       }
       let currentPage = pagination.currentPage;
       const limit = pagination.limit;
       if(currentPage===1){
        return;
       }
       currentPage--;
       fetchQuestions(currentPage,limit);
}

return {
    questions,
    pagination,
    loading,
    error,
    fetchQuestions,
    nextPage,
    previousPage
}