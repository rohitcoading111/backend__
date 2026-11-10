function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}

function CourseAnalyticsTable({ courses = [] }) {
  if (!courses.length) {
    return (
      <div className="rounded-2xl border border-dashed border-violet-400/20 bg-gradient-to-br from-violet-500/[0.08] to-[#111111] p-8 text-center text-slate-400 shadow-[0_0_30px_rgba(139,92,246,0.05)]">
        No course analytics available yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/[0.06] via-[#111111] to-[#09090b] shadow-[0_0_32px_rgba(139,92,246,0.06)]">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10 text-left">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.18em] text-slate-400">
            <tr>
              <th className="px-5 py-4 font-medium">Course</th>
              <th className="px-5 py-4 font-medium">Students</th>
              <th className="px-5 py-4 font-medium">Gross revenue</th>
              <th className="px-5 py-4 font-medium">GST (18%)</th>
              <th className="px-5 py-4 font-medium">Razorpay (2%)</th>
              <th className="px-5 py-4 font-medium">Platform fee (10%)</th>
              <th className="px-5 py-4 font-medium">Payable amount</th>
              <th className="px-5 py-4 font-medium">Transactions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 text-sm text-white">
            {courses.map((course) => (
              <tr key={course?.courseId || course?.courseTitle} className="transition-colors hover:bg-violet-400/[0.06]">
                <td className="px-5 py-4 font-medium">{course?.courseTitle || "Course"}</td>
                <td className="px-5 py-4">{course?.totalStudents || 0}</td>
                <td className="px-5 py-4">{formatCurrency(course?.totalRevenue)}</td>
                <td className="px-5 py-4">{formatCurrency(course?.gstDeduction)}</td>
                <td className="px-5 py-4">{formatCurrency(course?.razorpayFee)}</td>
                <td className="px-5 py-4">{formatCurrency(course?.platformFee)}</td>
                <td className="px-5 py-4 font-semibold text-emerald-200">{formatCurrency(course?.payableAmount)}</td>
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
