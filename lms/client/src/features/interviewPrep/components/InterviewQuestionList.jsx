
import { useEffect, useRef } from "react";
import InterviewQuestionCard from "./InterviewQuestionCard";

const InterviewQuestionList = ({
  questions,
  onQuestionClick,
  expandedQuestionId,
  user,
  isQuestionCompleted,
  onCompleteQuestion,
  completionLoading,
  loadNextPage,
  hasMore,
  loading,
}) => {
  const observerRef = useRef(null);

  useEffect(() => {
    const element = observerRef.current;

    if (!element || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadNextPage();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasMore, loading, loadNextPage]);

  if (!questions?.length && !loading) {
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
    <>
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

      {/* Scroll detection element */}
      {hasMore && (
        <div
          ref={observerRef}
          className="h-20 flex items-center justify-center"
        >
          {loading && (
            <p className="text-sm text-zinc-400">
              Loading more questions...
            </p>
          )}
        </div>
      )}

      {!hasMore && questions.length > 0 && (
        <p className="py-8 text-center text-sm text-zinc-500">
          You have reached the end of the questions.
        </p>
      )}
    </>
  );
};

export default InterviewQuestionList;
