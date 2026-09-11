import React from "react";
import { useUserContext } from "../../../context/user.context";

const Profile = () => {
  const { user } = useUserContext();

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-indigo-400">
            Account
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Your Profile
          </h1>

          <p className="mt-3 text-slate-400">
            Manage and view your account information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
          {/* Top section */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-8 py-10">
            <div className="flex flex-col items-center gap-5 sm:flex-row">
              {/* Avatar */}
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/30 bg-white/20 text-3xl font-bold backdrop-blur">
                {user?.name?.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="text-sm text-white/70">Welcome back</p>

                <h2 className="mt-1 text-3xl font-bold">
                  {user?.name}
                </h2>

                <p className="mt-1 text-white/80">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* User information */}
          <div className="p-8">
            <h3 className="mb-6 text-xl font-semibold">
              Personal Information
            </h3>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Name */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                <p className="text-sm text-slate-500">Full Name</p>

                <p className="mt-2 text-lg font-medium text-slate-100">
                  {user?.name}
                </p>
              </div>

              {/* Email */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                <p className="text-sm text-slate-500">Email Address</p>

                <p className="mt-2 break-all text-lg font-medium text-slate-100">
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-900/50 bg-emerald-950/30 p-5">
              <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50"></span>

              <div>
                <p className="font-medium text-emerald-300">
                  Account Active
                </p>

                <p className="text-sm text-emerald-400/70">
                  Your account is successfully authenticated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;