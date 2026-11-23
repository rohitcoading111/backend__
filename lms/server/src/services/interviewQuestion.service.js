import InterviewCategory from "../models/interviewCategory.model.js";
import InterviewQuestion from "../models/interviewQuestion.model.js";

export const createInterviewQuestion = async (data, adminId) => {
  const { categoryId, title, answer, difficulty, tags, order } = data;

  // 1. Check whether category exists
  const category = await InterviewCategory.findById(categoryId);

  if (!category) {
    throw new Error("Interview category not found");
  }

  // 2. Check whether category is active
  if (!category.isActive) {
    throw new Error("Cannot add question to inactive category");
  }

  // 3. Create question
  const question = await InterviewQuestion.create({
    categoryId,
    title,
    answer,
    difficulty,
    tags,
    order,
    source: "ADMIN",
    createdBy: adminId,
  });

  // 4. Return created question
  return question;
};


export const updateInterviewQuestion = async (questionId, data) => {
  // 1. Find existing question
  const question = await InterviewQuestion.findById(questionId);

  if (!question) {
    throw new Error("Interview question not found");
  }

  // 2. Validate category if categoryId is provided
  if (data.categoryId) {
    const category = await InterviewCategory.findById(data.categoryId);

    if (!category) {
      throw new Error("Interview category not found");
    }

    if (!category.isActive) {
      throw new Error("Cannot assign question to inactive category");
    }

    question.categoryId = data.categoryId;
  }

  // 3. Update only allowed fields
  if (data.title !== undefined) {
    question.title = data.title;
  }

  if (data.answer !== undefined) {
    question.answer = data.answer;
  }

  if (data.difficulty !== undefined) {
    question.difficulty = data.difficulty;
  }

  if (data.tags !== undefined) {
    question.tags = data.tags;
  }

  if (data.order !== undefined) {
    question.order = data.order;
  }

  // 4. Save updated document
  await question.save();

  // 5. Return updated question
  return question;
};

export const deleteInterviewQuestion = async (questionId) => {
  // 1. Find the specific question
  const question = await InterviewQuestion.findById(questionId);

  if (!question) {
    throw new Error("Interview question not found");
  }

  // 2. Delete only this question
  await InterviewQuestion.deleteOne({ _id: questionId });

  // 3. Return confirmation data
  return {
    questionId: question._id,
    message: "Interview question deleted successfully",
  };
};