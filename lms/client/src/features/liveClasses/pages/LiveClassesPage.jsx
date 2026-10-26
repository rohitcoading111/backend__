
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  RefreshCw,
  Video,
} from "lucide-react";

import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
} from "@livekit/components-react";

import "@livekit/components-styles";
import useLiveClasses from "../hooks/useLiveClasses.js";

function LiveClassesPage() {
  const navigate = useNavigate();

  const {
    liveCourses,
    isLoading,
    error,
    joiningSessionId,
    refreshLiveCourses,
    joinCourseLiveSession,
  } = useLiveClasses();

  // Credentials returned after the backend authorizes joining.
  const [roomCredentials, setRoomCredentials] = useState(null);
  const [joinError, setJoinError] = useState("");

  const handleJoinLive = async (sessionId) => {
    try {
      setJoinError("");

      // The backend verifies enrollment/payment and returns a token.
      const credentials = await joinCourseLiveSession(sessionId);

      setRoomCredentials(credentials);
    } catch (error) {
      setJoinError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to join live class."
      );
    }
  };

  // Show the LiveKit classroom after a successful join response.
  if (roomCredentials) {
    return (
      <main className="min-h-screen bg-slate-950 p-4 text-white">
        <div className="mx-auto mb-4 flex max-w-7xl items-center justify-between gap-3">
          <h1 className="text-xl font-semibold">Live Classroom</h1>

          <button
            type="button"
            onClick={() => setRoomCredentials(null)}
            className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10"
          >
            Leave classroom
          </button>
        </div>

        <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl">
          <LiveKitRoom
            key={roomCredentials.sessionId}
            serverUrl={roomCredentials.liveKitUrl}
            token={roomCredentials.token}
            connect={true}
            audio={true}
            video={true}
            onDisconnected={() => setRoomCredentials(null)}
          >
            <RoomAudioRenderer />
            <VideoConference />
          </LiveKitRoom>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            Dashboard
          </button>

          <div className="flex items-center gap-2 font-semibold">
            <Video size={20} className="text-indigo-600" />
            LearnHub Live
          </div>

          <button
            type="button"
            onClick={refreshLiveCourses}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw size={15} />
            Refresh
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
          Learn together
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Your Live Classes
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Live sessions for your enrolled courses appear here.
        </p>

        {joinError && (
          <p className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {joinError}
          </p>
        )}

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-white p-5">
            <p className="text-sm text-red-700">{error}</p>

            <button
              type="button"
              onClick={refreshLiveCourses}
              className="mt-3 text-sm font-semibold text-indigo-700"
            >
              Try again
            </button>
          </div>
        )}

        {isLoading ? (
          <p className="mt-8 text-sm text-slate-500">
            Loading your enrolled courses...
          </p>
        ) : !error && liveCourses.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <BookOpen className="mx-auto text-slate-400" size={32} />

            <h2 className="mt-4 font-semibold">
              No enrolled courses found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Courses you are actively enrolled in will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {liveCourses.map(
              ({ course, activeSession, liveCheckError }) => (
                <article
                  key={course._id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="h-44 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-44 items-center justify-center bg-indigo-50 text-indigo-500">
                      <BookOpen size={40} />
                    </div>
                  )}

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="font-semibold">
                        {course.title || "Untitled course"}
                      </h2>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          activeSession
                            ? "bg-red-50 text-red-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {activeSession ? "LIVE NOW" : "OFFLINE"}
                      </span>
                    </div>

                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
                      {course.description ||
                        "View live learning sessions for this course."}
                    </p>

                    {liveCheckError && (
                      <p className="mt-3 text-xs text-amber-700">
                        {liveCheckError}
                      </p>
                    )}

                    {activeSession && (
                      <button
                        type="button"
                        disabled={
                          Boolean(joiningSessionId) ||
                          Boolean(liveCheckError)
                        }
                        onClick={() =>
                          handleJoinLive(activeSession._id)
                        }
                        className="mt-5 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {joiningSessionId === activeSession._id
                          ? "Joining..."
                          : "Join Live"}
                      </button>
                    )}

                    {!activeSession && (
                      <p className="mt-5 rounded-xl bg-slate-50 px-4 py-3 text-center text-sm text-slate-500">
                        {liveCheckError
                          ? "Live status unavailable"
                          : "No active live session"}
                      </p>
                    )}
                  </div>
                </article>
              )
            )}
          </div>
        )}
      </section>
    </main>
  );
}

export default LiveClassesPage;
