import DsaQuestion from "../models/dsaQuestion.models.js";

export const createDsaQuestion = async (questionData) => {

    const existingData = await DsaQuestion.findOne({
        slug: questionData.slug
    });

    if (existingData) {
        throw new Error("Question already exists");
    }

    const newQuestion = await DsaQuestion.create(questionData);

    return newQuestion;
};


export const getAllDsaQuestions = async (filters) => {
    const page = Number(filters.page) || 1;
    const limit = Number(filters.limit) || 10;
    const skip = (page-1)*limit;
}