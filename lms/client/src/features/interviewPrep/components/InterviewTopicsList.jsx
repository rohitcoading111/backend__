import InterviewTopicCard from "./InterviewTopicCard";

const InterviewTopicsList = ({ topics, onTopicClick }) => {
  console.log("Topics received:", topics);

  return (
    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {topics?.map((topic) => (
        <InterviewTopicCard
          key={topic.id || topic.name}
          topic={topic.name}
          questionCount={topic.questionCount}
          completedCount={topic.completedCount}
          onClick={() => onTopicClick(topic)}
        />
      ))}
    </div>
  );
};

export default InterviewTopicsList;