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