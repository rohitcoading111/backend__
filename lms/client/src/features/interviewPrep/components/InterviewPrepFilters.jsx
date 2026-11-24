const InterviewPrepFilters = ({
  search,
  onSearchChange,
  difficulty,
  onDifficultyChange,
}) => {
  const difficulties = ["ALL", "BEGINNER", "INTERMEDIATE", "ADVANCED"];

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row">
      {/* Search */}
      <div className="relative flex-1">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
          ⌕
        </span>

        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search interview questions..."
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 py-3 pl-11 pr-4 text-sm text-zinc-200 outline-none transition focus:border-indigo-500/50"
        />
      </div>

      {/* Difficulty Filter */}
      <div className="sm:w-56">
        <select
          value={difficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-300 outline-none transition focus:border-indigo-500/50"
        >
          {difficulties.map((level) => (
            <option key={level} value={level}>
              {level === "ALL" ? "All Difficulties" : level}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InterviewPrepFilters;