import { createInterviewQuestion } from "../services/interviewQuestion.service.js";

export const createInterviewQuestionController = async (req, res) => {
  try {
    const question = await createInterviewQuestion(
      req.body,
      req.user.id
    );

    return res.status(201).json({
      success: true,
      message: "Interview question created successfully",
      question,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};