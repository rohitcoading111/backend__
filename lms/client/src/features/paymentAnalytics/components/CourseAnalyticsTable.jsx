function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function CourseAnalyticsTable({ courses = [] }) {
  if (!courses.length) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-[#111111] p-8 text-center text-slate-400">
        No course analytics available yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111]">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10 text-left">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.18em] text-slate-400">
            <tr>
              <th className="px-5 py-4 font-medium">Course</th>
              <th className="px-5 py-4 font-medium">Students</th>
              <th className="px-5 py-4 font-medium">Revenue</th>
              <th className="px-5 py-4 font-medium">Transactions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 text-sm text-white">
            {courses.map((course) => (
              <tr key={course?.courseId || course?.courseTitle} className="hover:bg-white/5">
                <td className="px-5 py-4 font-medium">{course?.courseTitle || "Course"}</td>
                <td className="px-5 py-4">{course?.totalStudents || 0}</td>
                <td className="px-5 py-4">{formatCurrency(course?.totalRevenue)}</td>
                <td className="px-5 py-4">{course?.totalTransactions || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CourseAnalyticsTable;
