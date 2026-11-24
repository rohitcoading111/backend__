import InterviewQuestionCard from "./InterviewQuestionCard";

const InterviewQuestionList = ({
  questions,
  onQuestionClick,
  expandedQuestionId,
  user,
  isQuestionCompleted,
  onCompleteQuestion,
  completionLoading,
}) => {
  if (!questions?.length) {
    return (
      <div className="py-16 text-center">
        <h3 className="text-lg font-semibold text-zinc-300">
          No interview questions found
        </h3>

        <p className="mt-2 text-sm text-zinc-500">
          Questions will appear here once available.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {questions.map((question) => (
        <InterviewQuestionCard
          key={question._id}
          question={question}
          onClick={() => onQuestionClick(question._id)}
          isExpanded={expandedQuestionId === question._id}
          user={user}
          isCompleted={isQuestionCompleted(question._id)}
          onComplete={() => onCompleteQuestion(question._id)}
          completionLoading={completionLoading}
        />
      ))}
    </div>
  );
};

export default InterviewQuestionList;