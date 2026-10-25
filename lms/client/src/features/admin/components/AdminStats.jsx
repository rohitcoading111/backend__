
function AdminStats({ users }) {
  const stats = [
    {
      title: "Total Users",
      value: users.length,
    },
    {
      title: "Students",
      value: users.filter((user) => user.role === "STUDENT").length,
    },
    {
      title: "Instructors",
      value: users.filter((user) => user.role === "INSTRUCTOR").length,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-2xl border border-black/[0.07] bg-white p-5"
        >
          <p className="text-sm text-neutral-500">{stat.title}</p>
          <p className="mt-3 text-3xl font-semibold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminStats;
