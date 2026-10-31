
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  RefreshCw,
  Video,
  Maximize2,
  Minimize2,
  Radio,
  Clock3,
  ArrowUpRight,
  Loader2,
  AlertCircle,
  GraduationCap,
  Wifi,
} from "lucide-react";

import { useState, useRef, useEffect } from "react";

import {
  LiveKitRoom,
  RoomAudioRenderer,
} from "@livekit/components-react";

import "@livekit/components-styles";
import "./LiveClassesPage.css";

import StudentClassroomLayout from "../components/LiveClassesPage.jsx";
import useLiveClasses from "../hooks/useLiveClasses.js";

function LiveClassesPage() {
  const navigate = useNavigate();

  const [isMaximized, setIsMaximized] = useState(false);
  const [roomCredentials, setRoomCredentials] = useState(null);
  const [joinError, setJoinError] = useState("");

  const classroomRef = useRef(null);

  const {
    liveCourses,
    isLoading,
    isRefreshing,
    error,
    joiningSessionId,
    refreshLiveCourses,
    joinCourseLiveSession,
  } = useLiveClasses();

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsMaximized(
        document.fullscreenElement === classroomRef.current
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  const handleToggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (classroomRef.current) {
        await classroomRef.current.requestFullscreen();
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  };

  const handleJoinLive = async (sessionId) => {
    try {
      setJoinError("");

      const credentials = await joinCourseLiveSession(sessionId);

      setRoomCredentials(credentials);
    } catch (err) {
      console.error("Join live error:", err);

      setJoinError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to join live class."
      );
    }
  };

  const handleLeaveClassroom = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Exit fullscreen error:", err);
    } finally {
      setRoomCredentials(null);
    }
  };

  const getThumbnailUrl = (thumbnail) => {
    if (typeof thumbnail === "string") return thumbnail;
    return thumbnail?.url || "";
  };

  // LIVE CLASSROOM
  if (roomCredentials) {
    return (
      <main
        ref={classroomRef}
        className="flex h-screen min-h-0 w-full flex-col overflow-hidden bg-black text-white"
      >
        <header className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#080808] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
              <Video size={19} />
            </div>

            <div>
              <h1 className="text-sm font-semibold">
                LearnHub Live
              </h1>
              <p className="mt-0.5 text-[10px] uppercase tracking-widest text-neutral-500">
                Virtual classroom
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleFullscreen}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs text-neutral-300 transition hover:bg-white/10"
            >
              {isMaximized ? (
                <>
                  <Minimize2 size={15} />
                  <span className="hidden sm:inline">Restore</span>
                </>
              ) : (
                <>
                  <Maximize2 size={15} />
                  <span className="hidden sm:inline">Fullscreen</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleLeaveClassroom}
              className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-neutral-200"
            >
              Leave classroom
            </button>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-hidden">
          <LiveKitRoom
            key={roomCredentials.sessionId}
            serverUrl={roomCredentials.liveKitUrl}
            token={roomCredentials.token}
            connect={true}
            audio={false}
            video={false}
            onDisconnected={() => setRoomCredentials(null)}
            style={{ width: "100%", height: "100%" }}
          >
            <RoomAudioRenderer />
            <StudentClassroomLayout />
          </LiveKitRoom>
        </div>
      </main>
    );
  }

  // LIVE CLASSES PAGE
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* BACKGROUND LIGHTING */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-60 top-20 h-[600px] w-[600px] rounded-full bg-white/[0.06] blur-[150px]" />

        <div className="absolute -right-60 top-[35%] h-[650px] w-[650px] rounded-full bg-neutral-400/[0.07] blur-[160px]" />

        <div className="absolute left-1/2 top-[-350px] h-[550px] w-[900px] -translate-x-1/2 rounded-full bg-white/[0.04] blur-[150px]" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#050505_100%)]" />
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-black/75 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-neutral-300 transition hover:border-white/30 hover:bg-white hover:text-black"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
              <Video size={18} />
            </div>

            <div>
              <h1 className="text-sm font-bold tracking-tight">
                LearnHub Live
              </h1>
              <p className="hidden text-[9px] uppercase tracking-[0.18em] text-neutral-500 sm:block">
                Virtual learning
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={refreshLiveCourses}
            disabled={isLoading || isRefreshing}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-neutral-300 transition hover:border-white/30 hover:bg-white hover:text-black disabled:opacity-50"
          >
            <RefreshCw
              size={15}
              className={isRefreshing ? "animate-spin" : ""}
            />
            <span className="hidden sm:inline">
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </span>
          </button>
        </div>
      </header>

      {/* MAIN */}
      <section className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">

        {/* PAGE HEADING */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                Learn together
              </p>
            </div>

            <h1 className="mt-5 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl lg:text-5xl">
              Your Live Classes
              <span className="text-neutral-600">.</span>
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-6 text-neutral-500">
              Join interactive learning sessions and learn directly
              from your instructors.
            </p>
          </div>

          {!isLoading && !error && (
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-xl">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-black">
                <GraduationCap size={21} />
              </div>

              <div>
                <p className="text-xl font-semibold tabular-nums">
                  {liveCourses.length}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-neutral-500">
                  Enrolled courses
                </p>
              </div>
            </div>
          )}
        </div>

        {/* JOIN ERROR */}
        {joinError && (
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/[0.06] p-4 text-sm text-red-300">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <p>{joinError}</p>
          </div>
        )}

        {/* API ERROR */}
        {error && (
          <div className="mt-10 rounded-2xl border border-white/10 bg-[#0b0b0b] p-7">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="mt-0.5 text-red-400" />

              <div>
                <h2 className="font-semibold">
                  Unable to load live classes
                </h2>

                <p className="mt-2 text-sm text-neutral-500">{error}</p>

                <button
                  type="button"
                  onClick={refreshLiveCourses}
                  disabled={isRefreshing}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-neutral-200 disabled:opacity-50"
                >
                  <RefreshCw
                    size={15}
                    className={isRefreshing ? "animate-spin" : ""}
                  />
                  Try again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* LOADING */}
        {isLoading ? (
          <div className="mt-12 grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-[28px] border border-white/10 bg-[#080808]"
              >
                <div className="h-52 animate-pulse bg-neutral-900" />

                <div className="space-y-4 p-7">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-neutral-800" />
                  <div className="h-3 w-full animate-pulse rounded bg-neutral-900" />
                  <div className="h-12 animate-pulse rounded-full bg-neutral-900" />
                </div>
              </div>
            ))}
          </div>
        ) : !error && liveCourses.length === 0 ? (

          /* EMPTY STATE */
          <div className="mt-12 rounded-[28px] border border-white/10 bg-[#080808] px-6 py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-black">
              <BookOpen size={28} />
            </div>

            <h2 className="mt-6 text-xl font-semibold">
              No enrolled courses found
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-neutral-500">
              Your enrolled courses will appear here when they are
              available for live learning.
            </p>

            <button
              type="button"
              onClick={() => navigate("/courses")}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
            >
              Explore courses
              <ArrowUpRight size={16} />
            </button>
          </div>

        ) : !error && (

          /* COURSE CARDS */
          <div className="mt-12 grid grid-cols-1 gap-9 sm:grid-cols-2 xl:grid-cols-3">
            {liveCourses.map(({ course, activeSession, liveCheckError }) => {
              const thumbnailUrl = getThumbnailUrl(course.thumbnail);
              const isJoining = joiningSessionId === activeSession?._id;

              return (
                <article
                  key={course._id}
                  className="group relative overflow-hidden rounded-[28px] border border-white/[0.22] bg-[#050505] shadow-[0_0_30px_rgba(255,255,255,0.025),0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-500 hover:-translate-y-1 hover:border-white/40 hover:shadow-[0_0_45px_rgba(255,255,255,0.10),0_25px_70px_rgba(0,0,0,0.8)]"
                >
                  {/* CARD SIDE LIGHTING */}
                  <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] bg-white/[0.035] opacity-0 blur-3xl transition duration-700 group-hover:opacity-100" />

                  {/* THUMBNAIL */}
                  <div className="relative h-52 overflow-hidden bg-neutral-900 sm:h-56">

                    <div className="absolute inset-0 flex items-center justify-center text-neutral-700">
                      <BookOpen size={42} />
                    </div>

                    {thumbnailUrl && (
                      <img
                        src={thumbnailUrl}
                        alt={course.title || "Course thumbnail"}
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                        className="relative z-[1] h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    )}

                    {/* IMAGE BOTTOM DARK GRADIENT */}
                    <div className="pointer-events-none absolute inset-0 z-[2] bg-linear-to-t from-[#050505] via-black/15 to-transparent" />

                    {/* IMAGE SIDE LIGHT */}
                    <div className="pointer-events-none absolute -left-20 top-0 z-[2] h-full w-40 bg-white/10 blur-3xl transition duration-700 group-hover:translate-x-16" />

                    {/* CATEGORY */}
                    <span className="absolute left-5 top-5 z-[3] rounded-full border border-white/20 bg-black/70 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-xl">
                      {course.category || "COURSE"}
                    </span>

                    {/* LIVE BADGE */}
                    {activeSession && (
                      <span className="absolute right-5 top-5 z-[3] inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[10px] font-bold tracking-wider text-black">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-black" />
                        LIVE
                      </span>
                    )}
                  </div>

                  {/* CARD CONTENT */}
                  <div className="relative z-[3] -mt-1 bg-[#050505] px-7 pb-7 pt-3">

                    <div className="flex items-start justify-between gap-3">
                      <h2 className="line-clamp-2 text-xl font-semibold tracking-tight text-white">
                        {course.title || "Untitled course"}
                      </h2>

                      <span
                        className={`shrink-0 rounded-full px-3 py-1.5 text-[9px] font-bold tracking-wider ${
                          activeSession
                            ? "bg-white text-black"
                            : "bg-white/10 text-neutral-400"
                        }`}
                      >
                        {activeSession ? "LIVE NOW" : "OFFLINE"}
                      </span>
                    </div>

                    <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-6 text-neutral-400">
                      {course.description ||
                        "View live learning sessions for this course."}
                    </p>

                    <div className="mt-7 flex items-center gap-2 text-xs text-neutral-500">
                      {activeSession ? (
                        <>
                          <Wifi size={15} className="text-white" />
                          Instructor is live
                        </>
                      ) : (
                        <>
                          <Clock3 size={15} />
                          Live learning session
                        </>
                      )}
                    </div>

                    {liveCheckError && (
                      <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-xs leading-5 text-neutral-400">
                        {liveCheckError}
                      </p>
                    )}

                    {/* DIVIDER */}
                    <div className="my-6 h-px bg-white/10" />

                    {/* JOIN BUTTON */}
                    {activeSession ? (
                      <button
                        type="button"
                        disabled={
                          Boolean(joiningSessionId) ||
                          Boolean(liveCheckError)
                        }
                        onClick={() => handleJoinLive(activeSession._id)}
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-white bg-white px-5 py-3.5 text-sm font-semibold text-black transition duration-300 hover:bg-transparent hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isJoining ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Joining classroom...
                          </>
                        ) : (
                          <>
                            <Video size={16} />
                            Join Live Class
                            <ArrowUpRight size={16} />
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3.5 text-sm font-medium text-neutral-400">
                        <Radio size={16} />
                        {liveCheckError
                          ? "Live status unavailable"
                          : "No active live session"}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* FOOTER */}
        <footer className="mt-20 flex flex-col items-center justify-between gap-3 border-t border-white/10 py-8 text-xs text-neutral-600 sm:flex-row">
          <p>
            © {new Date().getFullYear()} LearnHub. All rights reserved.
          </p>

          <p className="tracking-[0.18em]">
            LEARN. CONNECT. GROW.
          </p>
        </footer>
      </section>
    </main>
  );
}

export default LiveClassesPage;
