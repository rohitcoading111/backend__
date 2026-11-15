import { createSlice } from "@reduxjs/toolkit";
import { getAllDsaQuestions } from "../dsaThunk/dsaThunk";

const initialState = {
    questions: [],
    pagination: null,
    loading: false,
    error: null
};

const dsaSlice = createSlice({
    name: "dsa",
    initialState,

    extraReducers: (builder) => {
        builder.addCase(getAllDsaQuestions.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllDsaQuestions.fulfilled,(state,action)=>{
            state.loading = false;
            state.questions = action.payload.data.questions;
            state.pagination = action.payload.data.pagination;
        })
        .addCase(getAllDsaQuestions.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export default dsaSlice.reducer;