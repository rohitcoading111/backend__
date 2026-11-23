import InterviewProgress from "../models/interviewProgress.model.js";
import InterviewQuestion from "../models/interviewQuestion.model.js";

export const markQuestionCompleted = async (userId, questionId) => {
  const question = await InterviewQuestion.findById(questionId);

  if (!question) {
    throw new Error("Interview question not found");
  }

  const progress = await InterviewProgress.findOneAndUpdate(
    { userId, questionId },
    {
      userId,
      questionId,
      status: "COMPLETED",
      completedAt: new Date(),
    },
    {
      upsert: true,
      new: true,
    }
  );

  return progress;
};