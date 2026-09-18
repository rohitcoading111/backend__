import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#070b14] text-white">
      <nav className="border-b border-white/10 bg-[#090e19]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500">
              🔗
            </div>

            <span className="text-xl font-bold">
              Link<span className="text-violet-400">ly</span>
            </span>
          </div>

          <div className="flex gap-2">
            <a
              href="/"
              className="rounded-lg px-4 py-2 text-sm text-gray-400 hover:bg-white/5 hover:text-white"
            >
              Home
            </a>

            <a
              href="/dashboard"
              className="rounded-lg bg-violet-500/10 px-4 py-2 text-sm text-violet-400"
            >
              Dashboard
            </a>
          </div>

        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-5 py-12">

        <div className="mb-10">
          <p className="text-sm text-violet-400">
            Analytics
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Monitor your shortened URLs and their performance.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <DashboardCard
            icon="🔗"
            title="Total Links"
            value="12"
          />

          <DashboardCard
            icon="📊"
            title="Total Clicks"
            value="1,482"
          />

          <DashboardCard
            icon="📈"
            title="Average Clicks"
            value="123"
          />

          <DashboardCard
            icon="⚡"
            title="Active Links"
            value="8"
          />

        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 lg:col-span-2">

            <h2 className="text-xl font-bold">
              Click Analytics
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Link performance overview
            </p>

            <div className="mt-10 flex h-64 items-end gap-3">

              {[35, 50, 42, 70, 55, 80, 65, 92, 75, 60, 85, 95].map(
                (height, index) => (

                  <div
                    key={index}
                    className="group flex h-full flex-1 items-end"
                  >
                    <div
                      style={{ height: `${height}%` }}
                      className="w-full rounded-t-lg bg-gradient-to-t from-violet-600/40 to-violet-400 transition-all duration-500 group-hover:from-blue-500 group-hover:to-violet-400"
                    />
                  </div>

                )
              )}

            </div>

            <div className="mt-4 flex justify-between text-xs text-gray-600">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>

          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">

            <h2 className="text-xl font-bold">
              Top Links
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Most clicked URLs
            </p>

            <div className="mt-6 space-y-3">

              {[
                ["SKiHRE", "245"],
                ["aB72Kx", "128"],
                ["xY91Lp", "86"],
                ["Qw82Mn", "42"],
              ].map(([code, clicks]) => (

                <div
                  key={code}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] p-3 transition hover:border-violet-500/30"
                >

                  <div className="flex items-center gap-3">
                    <span className="text-violet-400">
                      🔗
                    </span>

                    <span>
                      /{code}
                    </span>
                  </div>

                  <span className="text-sm text-emerald-400">
                    {clicks}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};


const DashboardCard = ({ icon, title, value }) => {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-950/20">

      <div className="flex items-center justify-between">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-xl transition group-hover:scale-110">
          {icon}
        </div>

        <span className="text-sm text-emerald-400">
          +12%
        </span>

      </div>

      <p className="mt-6 text-3xl font-bold">
        {value}
      </p>

      <p className="mt-1 text-sm text-gray-500">
        {title}
      </p>

    </div>
  );
};

export default Dashboard;