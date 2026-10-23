import { BookOpen, Clock, CheckCircle, TrendingUp, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../auth/authThunk/authThunks.js";

function Dashboard() {
  const user = useSelector((state) => state.auth.user);

const dispatch = useDispatch();
const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await dispatch(logoutUser()).unwrap();
    navigate("/login", { replace: true });
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
  const stats = [
    {
      title: "My Courses",
      value: "0",
      icon: BookOpen,
    },
    {
      title: "Completed Lessons",
      value: "0",
      icon: CheckCircle,
    },
    {
      title: "Learning Hours",
      value: "0",
      icon: Clock,
    },
    {
      title: "Progress",
      value: "0%",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
        <div>
          <h1 className="text-2xl font-bold text-blue-400">
            LearnHub
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Learning Management System
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm transition hover:bg-slate-800"
        >
          <LogOut size={17} />
          Logout
        </button>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <section className="mb-8">
          <p className="text-sm text-slate-400">Your dashboard</p>

          <h2 className="mt-2 text-3xl font-bold">
            Welcome back{user?.name ? `, ${user.name}` : ""}! 👋
          </h2>

          <p className="mt-3 text-slate-400">
            Continue learning and track your progress here.
          </p>

          {user?.email && (
            <p className="mt-2 text-sm text-slate-500">
              {user.email}
            </p>
          )}
        </section>

        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ title, value, icon: Icon }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm text-slate-400">{title}</p>
                <Icon size={22} className="text-blue-400" />
              </div>

              <p className="text-3xl font-bold">{value}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
            <BookOpen className="text-blue-400" size={25} />
          </div>

          <h3 className="mt-5 text-xl font-semibold">
            Your courses will appear here
          </h3>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
            Once courses are connected to the backend, you will be
            able to view enrolled courses, continue lessons and track
            your learning progress from this page.
          </p>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
