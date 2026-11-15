import api from "../../../services/api";

const dsaService = {

    // 1. Create DSA Question
    createDsaQuestion: async (questionData) => {
        const response = await api.post("/dsa/questions", questionData);
        return response.data;
    },

    // 2. Get All DSA Questions
    getAllDsaQuestions: async (params = {}) => {
        const response = await api.get("/dsa/questions", {
            params
        });

        return response.data;
    },

    // 3. Get Single DSA Question
    getSingleDsaQuestion: async (questionId) => {
        const response = await api.get(`/dsa/questions/${questionId}`);
        return response.data;
    },

    // 4. Update DSA Question
    updateDsaQuestion: async (questionId, updateData) => {
        const response = await api.patch(
            `/dsa/questions/${questionId}`,
            updateData
        );

        return response.data;
    },

    // 5. Delete DSA Question (Soft Delete)
    deleteDsaQuestion: async (questionId) => {
        const response = await api.delete(`/dsa/questions/${questionId}`);
        return response.data;
    },

    // 6. Mark Question as Solved
    markQuestionSolved: async (questionId) => {
        const response = await api.post(
            `/dsa/questions/${questionId}/solve`
        );

        return response.data;
    },

    // 7. Get Student DSA Progress
    getStudentDsaProgress: async () => {
        const response = await api.get("/dsa/my/progress");
        return response.data;
    },

    // 8. Get Due Revisions
    getDueRevisions: async () => {
        const response = await api.get("/dsa/my/due-revisions");
        return response.data;
    },

    // 9. Mark Question as Revised
    markQuestionRevised: async (questionId) => {
        const response = await api.post(
            `/dsa/questions/${questionId}/revise`
        );

        return response.data;
    },

    // 10. Get Student Revision History
    getStudentDsaRevisionHistory: async () => {
        const response = await api.get("/dsa/my/revision-history");
        return response.data;
    }

};

export default dsaService;
