import {
    createDsaQuestion,
    getAllDsaQuestions,
    getSingleDsaQuestion,
    updateDsaQuestion,
    deleteDsaQuestion,
    markQuestionSolved,
    getStudentDsaProgress,
    getDueRevisions,
    markQuestionRevised,
    getStudentDsaRevisionHistory
} from "../services/dsa.services.js";

// Create DSA Question
export const createDsaQuestionController = async (req, res, next) => {
    try {
        const question = await createDsaQuestion(req.body);

        return res.status(201).json({
            success: true,
            message: "DSA question created successfully",
            data: question
        });
    } catch (error) {
        next(error);
    }
};

// Get All DSA Questions
export const getAllDsaQuestionsController = async (req, res, next) => {
    try {
        const questions = await getAllDsaQuestions(req.query);

        return res.status(200).json({
            success: true,
            data: questions
        });
    } catch (error) {
        next(error);
    }
};

// Get Single DSA Question
export const getSingleDsaQuestionController = async (req, res, next) => {
    try {
        const question = await getSingleDsaQuestion(req.params.questionId);

        return res.status(200).json({
            success: true,
            data: question
        });
    } catch (error) {
        next(error);
    }
};

// Update DSA Question
export const updateDsaQuestionController = async (req, res, next) => {
    try {
        const question = await updateDsaQuestion(
            req.params.questionId,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "DSA question updated successfully",
            data: question
        });
    } catch (error) {
        next(error);
    }
};

// Soft Delete DSA Question
export const deleteDsaQuestionController = async (req, res, next) => {
    try {
        const question = await deleteDsaQuestion(req.params.questionId);

        return res.status(200).json({
            success: true,
            message: "DSA question deactivated successfully",
            data: question
        });
    } catch (error) {
        next(error);
    }
};

// Mark Question as Solved
export const markQuestionSolvedController = async (req, res, next) => {
    try {
        const studentId = req.user.id ;
        console.log("CONTROLLER USER:", req.user);
        console.log("CONTROLLER STUDENT ID:", studentId);

        const progress = await markQuestionSolved(
            studentId,
            req.params.questionId
        );

        return res.status(200).json({
            success: true,
            message: "Question marked as solved",
            data: progress
        });
    } catch (error) {
        next(error);
    }
};

// Get Student DSA Progress
export const getStudentDsaProgressController = async (req, res, next) => {
    try {
        const studentId = req.user.id;

        const progress = await getStudentDsaProgress(studentId);

        return res.status(200).json({
            success: true,
            data: progress
        });
    } catch (error) {
        next(error);
    }
};

// Get Due Revisions
export const getDueRevisionsController = async (req, res, next) => {
    try {
        const studentId = req.user.id;

        const revisions = await getDueRevisions(studentId);

        return res.status(200).json({
            success: true,
            data: revisions
        });
    } catch (error) {
        next(error);
    }
};

// Mark Question as Revised
export const markQuestionRevisedController = async (req, res, next) => {
    try {
        const studentId = req.user.id;

        const progress = await markQuestionRevised(
            studentId,
            req.params.questionId
        );

        return res.status(200).json({
            success: true,
            message: "Question revision completed",
            data: progress
        });
    } catch (error) {
        next(error);
    }
};

// Get Student Revision History
export const getStudentDsaRevisionHistoryController = async (req, res, next) => {
    try {
        const studentId = req.user.id;

        const history = await getStudentDsaRevisionHistory(studentId);

        return res.status(200).json({
            success: true,
            data: history
        });
    } catch (error) {
        next(error);
    }
};
