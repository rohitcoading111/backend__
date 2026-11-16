import DsaQuestion from "../models/dsaQuestion.models.js";
import DsaProgress from "../models/dsaProgress.models.js";
import DsaRevisionHistory from "../models/dsaRevisionHistory.models.js";


const getNextRevisionDate = () => {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 7);
    return nextDate;
};

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

export const updateDsaQuestion = async (questionId,updateData) => {
 const existingQuestion = await DsaQuestion.findById(questionId);
 if (!existingQuestion) {
    throw new Error("Question not found");
}
const updateQuestion = await DsaQuestion.findByIdAndUpdate(
    questionId,
    updateData,
    {new:true,runValidators:true}
);
return updateQuestion;

}

export const deleteDsaQuestion = async (questionId) => {
  const session = await mongoose.startSession();

  try {
    let deletedQuestion;

    await session.withTransaction(async () => {
      deletedQuestion = await DsaQuestion.findById(questionId)
        .session(session);

      if (!deletedQuestion) {
        throw new Error("Question not found");
      }

      // Remove all students' progress
      await DsaProgress.deleteMany(
        { questionId: deletedQuestion._id },
        { session }
      );

      // Remove revision history
      await DsaRevisionHistory.deleteMany(
        { questionId: deletedQuestion._id },
        { session }
      );

      // Permanently delete question
      await DsaQuestion.deleteOne(
        { _id: deletedQuestion._id },
        { session }
      );
    });

    return deletedQuestion;
  } finally {
    await session.endSession();
  }
};

export const markQuestionSolved = async (studentId, questionId) => {
    console.log("studentId:", studentId);
   console.log("questionId:", questionId);
    const question = await DsaQuestion.findOne({
        _id: questionId,
        isActive: true
    });

    if (!question) {
        throw new Error("Question not found");
    }

    const now = new Date();
    const nextRevisionAt = getNextRevisionDate();

    const progress = await DsaProgress.findOneAndUpdate(
        { studentId, questionId },
        {
            $set: {
                lastSolvedAt: now,
                nextRevisionAt,
                isSolved: true
            },
            $setOnInsert: {
                studentId,
                questionId,
                firstSolvedAt: now
            },
            $inc: {
                solveCount: 1
            }
        },
        {
            new: true,
            upsert: true,
            runValidators: true
        }
    );

    await DsaRevisionHistory.create({
        studentId,
        questionId,
        progressId: progress._id,
        activityType: "SOLVED",
        activityAt: now
    });

    return progress;
};


export const getStudentDsaProgress = async (studentId) => {
  const progress = await DsaProgress.find({ studentId })
    .populate({
      path: "questionId",
      match: { isActive: true },
    })
    .sort({ updatedAt: -1 });

  const activeProgress = progress.filter(
    (item) => item.questionId !== null
  );

  const totalSolvedQuestions = activeProgress.filter(
    (item) => item.isSolved
  ).length;

  return {
    totalSolvedQuestions,
    progress: activeProgress,
  };
};

export const markQuestionRevised = async (studentId, questionId) => {
    const progress = await DsaProgress.findOne({
        studentId,
        questionId,
        isSolved: true
    });

    if (!progress) {
        throw new Error("Solved question progress not found");
    }

    const now = new Date();
    const nextRevisionAt = getNextRevisionDate();

    progress.lastRevisedAt = now;
    progress.nextRevisionAt = nextRevisionAt;

    await progress.save();

    await DsaRevisionHistory.create({
        studentId,
        questionId,
        progressId: progress._id,
        activityType: "REVISED",
        activityAt: now
    });

    return progress;
};


export const getStudentDsaRevisionHistory = async (studentId) => {
    const history = await DsaRevisionHistory.find({ studentId })
        .populate("questionId", "title difficulty topics")
        .sort({ activityAt: -1 });

    return history;
};


export const getDueRevisions = async (studentId) => {

    const dueRevisions = await DsaProgress.find({
        studentId,
        isSolved: true,
        nextRevisionAt: {
            $lte: new Date()
        }
    })
        .populate("questionId", "title description difficulty topics platform externalUrl")
        .sort({ nextRevisionAt: 1 });

    return dueRevisions;
};
