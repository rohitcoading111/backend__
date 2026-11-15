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
    const filterQuery = {
    isActive: true
    };

    const fetchedQuestions = await DsaQuestion.find(filterQuery)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
    const totalQuestions = await DsaQuestion.countDocuments(filterQuery);
    const totalPages = Math.ceil(totalQuestions / limit);
    return {
    questions: fetchedQuestions,
    pagination: {
        totalQuestions,
        currentPage: page,
        totalPages,
        limit
    }
};
}


export const getSingleDsaQuestion = async (questionId) => {
    const fetchedQuestion = await DsaQuestion.findById(questionId);

    if (!fetchedQuestion) {
        throw new Error("Question not found");
    }

    return fetchedQuestion;
};