import { createInterviewQuestion,deleteInterviewQuestion } from "../services/interviewQuestion.service.js";

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


export const deleteInterviewQuestionController = async (req, res) => {
  try {
    const result = await deleteInterviewQuestion(
      req.params.questionId
    );

    return res.status(200).json({
      success: true,
      message: result.message,
      questionId: result.questionId,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};