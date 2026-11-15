import { createAsyncThunk } from "@reduxjs/toolkit";
import dsaService from "../services/dsaService";
import { getRequestErrorMessage } from "../../../utils/errorHandler";

// Get All DSA Questions
export const getAllDsaQuestions = createAsyncThunk(
    "dsa/getAllQuestions",
    async (params, { rejectWithValue }) => {
        try {
            const response = await dsaService.getAllDsaQuestions(params);
            return response;
        } catch (error) {
            return rejectWithValue(
                getRequestErrorMessage(
                    error,
                    "Failed to fetch DSA questions. Please try again."
                )
            );
        }
    }
);