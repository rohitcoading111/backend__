import React from "react";
import { shortenUrl, allUrls, increanmentClick,removeUrl } from "../urlSlice.js";
import {useDispatch,useSelector} from "react-redux"
import { useState } from "react";
import { useEffect } from "react";



const Home = () => {
   const dispatch = useDispatch();
  const [url, seturl] = useState("")
  const { loading, data, error } = useSelector((state) => state.url);
  const { urls } = useSelector((state) => state.url);

    useEffect(() => {
  dispatch(allUrls());
    }, []);

  return (
    <div className="min-h-screen bg-[#070b14] text-white">

      <nav className="border-b border-white/10 bg-[#090e19]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 text-xl shadow-lg shadow-violet-500/20">
              🔗
            </div>

            <span className="text-xl font-bold">
              Link<span className="text-violet-400">ly</span>
            </span>
          </div>

          <div className="flex gap-2">
            <a
              href="/"
              className="rounded-lg bg-violet-500/10 px-4 py-2 text-sm text-violet-400"
            >
              Home
            </a>

            <a
              href="/dashboard"
              className="rounded-lg px-4 py-2 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
            >
              Dashboard
            </a>
          </div>

        </div>
      </nav>

      <section className="mx-auto max-w-5xl px-5 pb-12 pt-20 text-center">

        <div className="mx-auto mb-6 inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
          ⚡ Shorten. Share. Track.
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
          Short Links,
          <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Big Possibilities
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-gray-400">
          Transform long URLs into clean, powerful and trackable short links.
        </p>
        <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-violet-950/20 backdrop-blur-xl">

          <div className="flex flex-col gap-3 sm:flex-row">

            <div className="flex flex-1 items-center rounded-xl border border-white/10 bg-[#0b111d] px-4">
              <span className="mr-3 text-xl text-violet-400">
                🔗
              </span>

              <input
                onChange={(e) => seturl(e.target.value)}
                value={url}
                type="text"
                placeholder="Paste your long URL here..."
                className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-gray-600"
              />
            </div>

            <button onClick={() => dispatch(shortenUrl(url))} className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 px-7 py-4 font-semibold shadow-lg shadow-violet-500/20 transition duration-300 hover:-translate-y-1 hover:shadow-violet-500/40 active:scale-95">
              Shorten URL →
            </button>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-4 px-5 sm:grid-cols-3">

        <StatCard
          icon="🔗"
          value="12"
          label="Total Links"
        />

        <StatCard
          icon="📊"
          value="1,482"
          label="Total Clicks"
        />

        <StatCard
          icon="⚡"
          value="8"
          label="Active Links"
        />

      </section>

      <section className="mx-auto mt-10 max-w-7xl px-5 pb-16">

        <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">

          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-2xl font-bold">
                Your Shortened URLs
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage and track all your links in one place.
              </p>
            </div>

            <input
              type="text"
              placeholder="Search URLs..."
              className="rounded-xl border border-white/10 bg-[#0b111d] px-4 py-3 text-sm outline-none transition focus:border-violet-500/50"
            />

          </div>

          <div className="hidden grid-cols-12 gap-4 border-b border-white/10 px-4 pb-3 text-xs uppercase tracking-wider text-gray-500 md:grid">

            <div className="col-span-3">
              Short Link
            </div>

            <div className="col-span-5">
              Original URL
            </div>

            <div className="col-span-2">
              Clicks
            </div>

            <div className="col-span-2">
              Actions
            </div>

          </div>
          <div className="space-y-3 pt-3">

            {urls.map((item) => (

              <div
               
                className="group rounded-xl border border-white/10 bg-[#0b111d]/70 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-violet-500/30 hover:bg-white/[0.05]"
              >

                <div className="grid items-center gap-4 md:grid-cols-12">
                  <div className="md:col-span-3">

                    <p className="mb-1 text-xs text-gray-600 md:hidden">
                      SHORT LINK
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="text-violet-400">
                        🔗
                      </span>

                      <span className="font-semibold text-violet-400">
                        /{item.shortCode}
                      </span>
                    </div>

                  </div>
                  <div className="md:col-span-5">

                    <p className="mb-1 text-xs text-gray-600 md:hidden">
                      ORIGINAL URL
                    </p>

                    <p className="truncate text-sm text-gray-400">
                      {item.originalUrl}
                    </p>

                  </div>

                  <div className="md:col-span-2">

                    <p className="mb-1 text-xs text-gray-600 md:hidden">
                      CLICKS
                    </p>

                    <span className="font-semibold text-emerald-400">
                      📈 {item.clicks}
                    </span>

                  </div>

                  <div className="flex gap-2 md:col-span-2">

                    <button
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 transition hover:scale-105 hover:bg-violet-500/20"
                      title="Copy"
                    >
                      📋
                    </button>

                    <button
                     onClick={() => {
                     dispatch(increanmentClick(item.shortCode));
                     window.open(`http://localhost:3000/api/url/${item.shortCode}`, "_blank");
                    }}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 transition hover:scale-105 hover:bg-blue-500/20"
                      title="Open"
                    >
                      ↗
                    </button>

                    <button
                      onClick={() => dispatch(removeUrl(item.shortCode))}
                      className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-red-400 transition hover:scale-105 hover:bg-red-500/20"
                      title="Delete"
                    >
                      🗑
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

  
      <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-600">
        © 2026 Linkly · Shorten. Share. Track.
      </footer>

    </div>
  );
};


const StatCard = ({ icon, value, label }) => {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-950/20">

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-xl transition duration-300 group-hover:scale-110">
          {icon}
        </div>

        <div>
          <p className="text-2xl font-bold">
            {value}
          </p>

          <p className="text-sm text-gray-500">
            {label}
          </p>
        </div>

      </div>

    </div>
  );
};

export default Home;