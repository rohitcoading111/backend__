
import { useParams, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  CirclePlay,
  FileText,
  LoaderCircle,
  MonitorPlay,
  RefreshCw,
} from "lucide-react";

import useModuleLectures from "../hooks/useModuleLectures.js";

const ModuleLecturesPage = () => {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();

  // Video reference
  const videoRef = useRef(null);

  // Video player states
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Play / Pause
  const togglePlayPause = async () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch (error) {
        console.error("Unable to play video:", error);
        setIsPlaying(false);
      }
    } else {
      video.pause();
    }
  };

  // Volume change
  const handleVolumeChange = (event) => {
    const newVolume = Number(event.target.value);
    const video = videoRef.current;

    if (!video) return;

    video.volume = newVolume;
    video.muted = newVolume === 0;

    setVolume(newVolume);
    setIsMuted(video.muted);
  };

  // Mute / Unmute
  const toggleMute = () => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  // LMS data and actions
  const {
    lectures,
    selectedLecture,
    currentIndex,
    isLoading,
    error,
    videoUrl,
    videoLoading,
    videoError,
    completedLectureIds,
    completedCount,
    progressPercentage,
    selectLecture,
    goToPreviousLecture,
    goToNextLecture,
    markLectureCompleted,
    retryVideo,
    refreshLectures,
  } = useModuleLectures(moduleId);

  // Back to modules
  const handleBack = () => {
    navigate(`/courses/${courseId}/modules`);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <LoaderCircle
          className="animate-spin text-indigo-600"
          size={32}
        />

        <span className="ml-3 font-medium text-slate-600">
          Loading lectures...
        </span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
          <BookOpen className="mx-auto text-red-500" size={40} />

          <h1 className="mt-4 text-xl font-bold">
            Unable to load lectures
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {error}
          </p>

          <button
            onClick={refreshLectures}
            className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={handleBack}
              aria-label="Back to modules"
              className="rounded-xl border border-slate-200 p-2.5 hover:bg-slate-50"
            >
              <ArrowLeft size={19} />
            </button>

            <div className="flex items-center gap-2">
              <MonitorPlay
                className="text-indigo-600"
                size={24}
              />

              <span className="text-lg font-extrabold">
                LearnHub
              </span>
            </div>
          </div>

          <div className="hidden text-right sm:block">
            <p className="text-xs text-slate-500">
              MODULE PROGRESS
            </p>

            <p className="mt-1 font-bold text-indigo-600">
              {completedCount} / {lectures.length} completed
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <button
            onClick={handleBack}
            className="hover:text-indigo-600"
          >
            Courses
          </button>

          <span>/</span>
          <span>Modules</span>
          <span>/</span>

          <span className="font-semibold text-slate-800">
            Lectures
          </span>
        </div>

        {/* Empty lectures */}
        {lectures.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <BookOpen
              className="mx-auto text-indigo-500"
              size={42}
            />

            <h1 className="mt-4 text-2xl font-bold">
              No lectures yet
            </h1>

            <p className="mt-2 text-slate-500">
              Your instructor hasn't added lectures to this module.
            </p>

            <button
              onClick={handleBack}
              className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white"
            >
              Back to modules
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
            {/* Main content */}
            <section className="min-w-0">
              {/* Video player container */}
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-950 shadow-xl">
                {videoLoading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
                    <LoaderCircle
                      size={36}
                      className="animate-spin text-indigo-400"
                    />

                    <p className="text-sm text-slate-300">
                      Preparing your video...
                    </p>
                  </div>
                ) : videoError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
                    <MonitorPlay
                      size={42}
                      className="text-indigo-300"
                    />

                    <h2 className="mt-4 text-lg font-bold">
                      Video unavailable
                    </h2>

                    <p className="mt-2 max-w-md text-sm text-slate-400">
                      {videoError}
                    </p>

                    {selectedLecture?.videoAvailable && (
                      <button
                        onClick={retryVideo}
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold hover:bg-indigo-500"
                      >
                        <RefreshCw size={16} />
                        Retry video
                      </button>
                    )}
                  </div>
                ) : videoUrl ? (
                  <div
                    className="absolute inset-0 overflow-hidden rounded-2xl bg-black"
                    onContextMenu={(event) =>
                      event.preventDefault()
                    }
                  >
                    {/* Video element */}
                    <video
                      ref={videoRef}
                      key={`${selectedLecture?._id}-${videoUrl}`}
                      src={videoUrl}
                      playsInline
                      preload="metadata"
                      controls={false}
                      controlsList="nodownload noremoteplayback"
                      disablePictureInPicture
                      disableRemotePlayback
                      onContextMenu={(event) =>
                        event.preventDefault()
                      }
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onVolumeChange={() => {
                        const video = videoRef.current;

                        if (video) {
                          setVolume(video.volume);
                          setIsMuted(video.muted);
                        }
                      }}
                      onEnded={() => {
                        setIsPlaying(false);
                        markLectureCompleted();
                      }}
                      className="h-full w-full object-contain"
                    />

                    {/* Custom player controls */}
                    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-3 border-t border-white/10 bg-slate-950 px-3 py-3 sm:px-4">
                      {/* Play / Pause */}
                      <button
                        type="button"
                        onClick={togglePlayPause}
                        aria-label={
                          isPlaying
                            ? "Pause video"
                            : "Play video"
                        }
                        className="flex shrink-0 items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-white hover:bg-white/10 sm:px-3"
                      >
                        {isPlaying ? (
                          <Pause size={20} />
                        ) : (
                          <Play size={20} />
                        )}

                        <span className="hidden sm:inline">
                          {isPlaying ? "Pause" : "Play"}
                        </span>
                      </button>

                      {/* Volume controls */}
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button
                          type="button"
                          onClick={toggleMute}
                          aria-label={
                            isMuted
                              ? "Unmute video"
                              : "Mute video"
                          }
                          className="rounded-lg p-2 text-white hover:bg-white/10"
                        >
                          {isMuted || volume === 0 ? (
                            <VolumeX size={20} />
                          ) : (
                            <Volume2 size={20} />
                          )}
                        </button>

                        <label className="flex items-center gap-2 text-sm text-white">
                          <span className="hidden sm:inline">
                            Volume
                          </span>

                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={volume}
                            onChange={handleVolumeChange}
                            aria-label="Video volume"
                            className="w-20 cursor-pointer accent-indigo-500 sm:w-28"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <MonitorPlay
                      size={48}
                      className="text-indigo-300"
                    />

                    <p className="mt-4 font-semibold">
                      Select a lecture to start learning
                    </p>
                  </div>
                )}
              </div>

              {/* Lecture details */}
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                    LESSON {currentIndex + 1}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    {selectedLecture?.videoAvailable
                      ? "Video lesson"
                      : "Video pending"}
                  </span>
                </div>

                <h1 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {selectedLecture?.title || "Module lectures"}
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-2">
                    <BookOpen size={16} />
                    {lectures.length} lessons
                  </span>

                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    {completedCount} completed
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all"
                    style={{
                      width: `${progressPercentage}%`,
                    }}
                  />
                </div>

                {/* Lesson notes */}
                <div className="mt-7 border-t border-slate-100 pt-6">
                  <div className="flex items-center gap-2">
                    <FileText
                      size={19}
                      className="text-indigo-600"
                    />

                    <h2 className="text-lg font-bold">
                      Lesson notes
                    </h2>
                  </div>

                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600">
                    {selectedLecture?.notes ||
                      "No notes have been added for this lecture yet."}
                  </p>
                </div>

                {/* Previous / Next */}
                <div className="mt-8 flex flex-col justify-between gap-3 border-t border-slate-100 pt-6 sm:flex-row">
                  <button
                    onClick={goToPreviousLecture}
                    disabled={currentIndex <= 0}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ArrowLeft size={17} />
                    Previous lesson
                  </button>

                  <button
                    onClick={goToNextLecture}
                    disabled={
                      currentIndex < 0 ||
                      currentIndex >= lectures.length - 1
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next lesson
                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            </section>

            {/* Lecture sidebar */}
            <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:sticky xl:top-24">
              <div className="border-b border-slate-100 p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                    <BookOpen size={22} />
                  </div>

                  <div>
                    <h2 className="font-bold">
                      Module content
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      {lectures.length} lessons in this module
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex justify-between text-xs">
                  <span className="text-slate-500">
                    Your progress
                  </span>

                  <span className="font-bold text-indigo-600">
                    {progressPercentage}%
                  </span>
                </div>

                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all"
                    style={{
                      width: `${progressPercentage}%`,
                    }}
                  />
                </div>
              </div>

              {/* Lecture list */}
              <div className="max-h-[650px] overflow-y-auto p-3">
                {lectures.map((lecture, index) => {
                  const isSelected =
                    lecture._id === selectedLecture?._id;

                  const isCompleted =
                    completedLectureIds.includes(lecture._id);

                  return (
                    <button
                      key={lecture._id}
                      onClick={() => selectLecture(lecture._id)}
                      className={`mb-2 flex w-full items-start gap-3 rounded-xl border p-3 text-left transition ${
                        isSelected
                          ? "border-indigo-200 bg-indigo-50"
                          : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          isCompleted
                            ? "bg-emerald-100 text-emerald-700"
                            : isSelected
                              ? "bg-indigo-600 text-white"
                              : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 size={18} />
                        ) : (
                          <span className="text-sm font-bold">
                            {index + 1}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-sm font-semibold leading-5 ${
                            isSelected
                              ? "text-indigo-800"
                              : "text-slate-800"
                          }`}
                        >
                          {lecture.title}
                        </p>

                        <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                          <CirclePlay size={14} />

                          <span>
                            {lecture.videoAvailable
                              ? "Video lesson"
                              : "Video pending"}
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <ArrowRight
                          size={16}
                          className="mt-1 shrink-0 text-indigo-600"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="border-t border-slate-100 bg-slate-50 p-4">
                <p className="text-center text-xs leading-5 text-slate-500">
                  Select a lesson to watch its video and read the notes.
                </p>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
};

export default ModuleLecturesPage;
