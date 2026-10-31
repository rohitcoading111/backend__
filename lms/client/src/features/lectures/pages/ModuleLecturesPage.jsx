
import { useParams, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

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
  GraduationCap,
  Maximize2,
  Minimize2,
  Clock3,
  Sparkles,
  Gauge,
} from "lucide-react";

import useModuleLectures from "../hooks/useModuleLectures.js";

const ModuleLecturesPage = () => {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const playerRef = useRef(null);

  // Video states
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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
    completionLoading,
    completionError,
  } = useModuleLectures(moduleId);

  // Reset player state when lecture changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setPlaybackRate(1);
  }, [selectedLecture?._id]);

  // Fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement === playerRef.current
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

  // Play / Pause
  const togglePlayPause = async () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch (err) {
        console.error("Unable to play video:", err);
        setIsPlaying(false);
      }
    } else {
      video.pause();
    }
  };

  // Volume
  const handleVolumeChange = (event) => {
    const newVolume = Number(event.target.value);
    const video = videoRef.current;

    if (!video) return;

    video.volume = newVolume;
    video.muted = newVolume === 0;

    setVolume(newVolume);
    setIsMuted(video.muted);
  };

  // Mute
  const toggleMute = () => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  // Playback speed
  const handlePlaybackRate = (event) => {
    const rate = Number(event.target.value);

    if (!videoRef.current) return;

    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  };

  // Video progress
  const handleSeek = (event) => {
    const video = videoRef.current;

    if (!video || !duration) return;

    const newTime = Number(event.target.value);

    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (!Number.isFinite(time)) return "00:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  // Fullscreen
  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (playerRef.current) {
        await playerRef.current.requestFullscreen();
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  };

  // Back to modules
  const handleBack = () => {
    navigate(`/courses/${courseId}/modules`);
  };

  // Loading state
  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <div className="flex flex-col items-center gap-4">
          <LoaderCircle
            className="animate-spin text-white"
            size={35}
          />
          <p className="text-sm text-neutral-400">
            Loading lectures...
          </p>
        </div>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] p-6 text-white">

        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-white/[0.06] blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-white/[0.05] blur-[120px]" />

        <div className="relative w-full max-w-md rounded-[28px] border border-white/10 bg-[#090909] p-8 text-center shadow-[0_0_40px_rgba(255,255,255,0.04)]">

          <BookOpen className="mx-auto text-neutral-300" size={40} />

          <h1 className="mt-5 text-xl font-semibold">
            Unable to load lectures
          </h1>

          <p className="mt-3 text-sm leading-6 text-neutral-500">
            {error}
          </p>

          <button
            type="button"
            onClick={refreshLectures}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
          >
            <RefreshCw size={16} />
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#050505] text-white antialiased">

      {/* PAGE BACKGROUND LIGHTING */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute -left-64 top-[10%] h-[650px] w-[650px] rounded-full bg-white/[0.045] blur-[150px]" />

        <div className="absolute -right-64 top-[35%] h-[650px] w-[650px] rounded-full bg-neutral-400/[0.05] blur-[160px]" />

        <div className="absolute left-1/2 top-[-350px] h-[550px] w-[900px] -translate-x-1/2 rounded-full bg-white/[0.035] blur-[150px]" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#050505_100%)]" />
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-black/75 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

          <div className="flex min-w-0 items-center gap-3">

            <button
              type="button"
              onClick={handleBack}
              aria-label="Back to modules"
              className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-neutral-300 transition hover:bg-white hover:text-black"
            >
              <ArrowLeft size={19} />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
                <GraduationCap size={21} />
              </div>

              <div>
                <span className="text-base font-bold tracking-tight">
                  LearnHub
                </span>
                <p className="hidden text-[9px] uppercase tracking-[0.18em] text-neutral-500 sm:block">
                  Learning studio
                </p>
              </div>
            </div>
          </div>

          <div className="hidden text-right sm:block">
            <p className="text-[10px] font-medium tracking-[0.15em] text-neutral-500">
              MODULE PROGRESS
            </p>

            <p className="mt-1 text-sm font-semibold text-white">
              {completedCount} / {lectures.length} completed
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-xs font-medium text-neutral-300 transition hover:bg-white hover:text-black sm:px-4 sm:text-sm"
          >
            Dashboard
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">

        {/* BREADCRUMBS */}
        <div className="mb-7 flex flex-wrap items-center gap-2 text-xs text-neutral-500 sm:text-sm">

          <button
            type="button"
            onClick={handleBack}
            className="transition hover:text-white"
          >
            Courses
          </button>

          <ArrowRight size={13} />

          <span>Modules</span>

          <ArrowRight size={13} />

          <span className="font-semibold text-white">
            Lectures
          </span>
        </div>

        {/* EMPTY STATE */}
        {lectures.length === 0 ? (
          <div className="relative isolate overflow-hidden rounded-[28px] border border-white/10 bg-[#090909] px-6 py-20 text-center">

            <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-white/[0.06] blur-[100px]" />
            <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-white/[0.05] blur-[100px]" />

            <div className="relative z-10">
              <BookOpen
                className="mx-auto text-neutral-300"
                size={42}
              />

              <h1 className="mt-5 text-2xl font-semibold">
                No lectures yet
              </h1>

              <p className="mt-3 text-sm text-neutral-500">
                Your instructor hasn't added lectures to this module.
              </p>

              <button
                type="button"
                onClick={handleBack}
                className="mt-7 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
              >
                Back to modules
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">

            {/* MAIN CONTENT */}
            <section className="min-w-0">

              {/* VIDEO PLAYER OUTER LIGHTING */}
              <div className="relative isolate rounded-[28px]">

                {/* FOUR SIDE LIGHT SOURCES */}
                <div className="pointer-events-none absolute -inset-5 -z-10 rounded-[38px]">

                  <div className="absolute -left-5 -top-5 h-40 w-40 rounded-full bg-white/[0.10] blur-[70px]" />

                  <div className="absolute -right-5 -top-5 h-40 w-40 rounded-full bg-neutral-300/[0.10] blur-[70px]" />

                  <div className="absolute -bottom-5 -left-5 h-40 w-40 rounded-full bg-neutral-400/[0.09] blur-[70px]" />

                  <div className="absolute -bottom-5 -right-5 h-40 w-40 rounded-full bg-white/[0.10] blur-[70px]" />

                </div>

                {/* VIDEO FRAME */}
                <div
                  ref={playerRef}
                  className="group/player relative aspect-video overflow-hidden rounded-[24px] border border-white/20 bg-[#080808] shadow-[0_0_35px_rgba(255,255,255,0.055),0_25px_80px_rgba(0,0,0,0.7)]"
                >

                  {/* PLAYER BORDER LIGHT */}
                  <div className="pointer-events-none absolute inset-0 z-20 rounded-[24px] ring-1 ring-inset ring-white/[0.06]" />

                  {/* VIDEO LOADING */}
                  {videoLoading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#080808] text-white">

                      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04]">
                        <div className="absolute inset-0 animate-pulse rounded-2xl bg-white/[0.06]" />

                        <LoaderCircle
                          size={30}
                          className="relative animate-spin text-white"
                        />
                      </div>

                      <p className="text-sm font-medium text-neutral-400">
                        Preparing your video...
                      </p>
                    </div>
                  ) : videoError ? (
                    /* VIDEO ERROR */
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080808] px-6 text-center text-white">

                      <MonitorPlay
                        size={45}
                        className="text-neutral-300"
                      />

                      <h2 className="mt-5 text-lg font-semibold">
                        Video unavailable
                      </h2>

                      <p className="mt-3 max-w-md text-sm leading-6 text-neutral-500">
                        {videoError}
                      </p>

                      {selectedLecture?.videoAvailable && (
                        <button
                          type="button"
                          onClick={retryVideo}
                          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
                        >
                          <RefreshCw size={16} />
                          Retry video
                        </button>
                      )}
                    </div>
                  ) : videoUrl ? (
                    <div
                      className="absolute inset-0 overflow-hidden rounded-[24px] bg-black"
                      onContextMenu={(event) => event.preventDefault()}
                    >

                      {/* VIDEO ELEMENT */}
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
                        onContextMenu={(event) => event.preventDefault()}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onLoadedMetadata={(event) => {
                          setDuration(event.currentTarget.duration || 0);
                        }}
                        onTimeUpdate={(event) => {
                          setCurrentTime(event.currentTarget.currentTime);
                        }}
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

                      {/* CENTER PLAY BUTTON */}
                      {!isPlaying && (
                        <button
                          type="button"
                          onClick={togglePlayPause}
                          aria-label="Play video"
                          className="absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white shadow-[0_0_35px_rgba(255,255,255,0.12)] backdrop-blur-xl transition hover:scale-110 hover:bg-white hover:text-black"
                        >
                          <Play size={26} fill="currentColor" />
                        </button>
                      )}

                      {/* BOTTOM GRADIENT */}
                      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-36 bg-linear-to-t from-black/95 via-black/50 to-transparent" />

                      {/* CUSTOM CONTROLS */}
                      <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-4 pt-8 sm:px-6 sm:pb-5">

                        {/* PROGRESS BAR */}
                        <div className="mb-4 flex items-center gap-3">

                          <span className="shrink-0 text-[10px] tabular-nums text-neutral-300 sm:text-xs">
                            {formatTime(currentTime)}
                          </span>

                          <input
                            type="range"
                            min="0"
                            max={duration || 0}
                            step="0.1"
                            value={currentTime}
                            onChange={handleSeek}
                            aria-label="Video progress"
                            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/25 accent-white"
                            style={{
                              background: `linear-gradient(to right, white ${
                                duration ? (currentTime / duration) * 100 : 0
                              }%, rgba(255,255,255,0.25) ${
                                duration ? (currentTime / duration) * 100 : 0
                              }%)`,
                            }}
                          />

                          <span className="shrink-0 text-[10px] tabular-nums text-neutral-400 sm:text-xs">
                            {formatTime(duration)}
                          </span>
                        </div>

                        {/* CONTROL BAR */}
                        <div className="flex items-center justify-between gap-2">

                          {/* LEFT CONTROLS */}
                          <div className="flex items-center gap-2 sm:gap-4">

                            <button
                              type="button"
                              onClick={togglePlayPause}
                              aria-label={isPlaying ? "Pause video" : "Play video"}
                              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition hover:scale-105 hover:bg-neutral-200"
                            >
                              {isPlaying ? (
                                <Pause size={19} fill="currentColor" />
                              ) : (
                                <Play size={19} fill="currentColor" />
                              )}
                            </button>

                            <div className="flex items-center gap-2">

                              <button
                                type="button"
                                onClick={toggleMute}
                                aria-label={isMuted ? "Unmute video" : "Mute video"}
                                className="rounded-full p-2 text-white transition hover:bg-white/10"
                              >
                                {isMuted || volume === 0 ? (
                                  <VolumeX size={19} />
                                ) : (
                                  <Volume2 size={19} />
                                )}
                              </button>

                              <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value={volume}
                                onChange={handleVolumeChange}
                                aria-label="Video volume"
                                className="hidden w-20 cursor-pointer accent-white sm:block"
                              />
                            </div>

                          </div>

                          {/* RIGHT CONTROLS */}
                          <div className="flex items-center gap-2 sm:gap-3">

                            {/* PLAYBACK SPEED */}
                            <label className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-2.5 py-2 text-xs text-white backdrop-blur">
                              <Gauge size={15} />

                              <select
                                value={playbackRate}
                                onChange={handlePlaybackRate}
                                aria-label="Playback speed"
                                className="cursor-pointer bg-transparent text-xs font-medium text-white outline-none"
                              >
                                <option className="bg-black" value="0.5">0.5x</option>
                                <option className="bg-black" value="0.75">0.75x</option>
                                <option className="bg-black" value="1">1x</option>
                                <option className="bg-black" value="1.25">1.25x</option>
                                <option className="bg-black" value="1.5">1.5x</option>
                                <option className="bg-black" value="2">2x</option>
                              </select>
                            </label>

                            {/* FULLSCREEN */}
                            <button
                              type="button"
                              onClick={toggleFullscreen}
                              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                              className="rounded-full p-2.5 text-white transition hover:bg-white/10"
                            >
                              {isFullscreen ? (
                                <Minimize2 size={19} />
                              ) : (
                                <Maximize2 size={19} />
                              )}
                            </button>

                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* NO VIDEO SELECTED */
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080808] text-white">

                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                        <MonitorPlay
                          size={32}
                          className="text-neutral-300"
                        />
                      </div>

                      <p className="mt-5 text-sm font-medium text-neutral-400">
                        Select a lecture to start learning
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* LECTURE DETAILS */}
              <div className="relative isolate mt-8 overflow-hidden rounded-[26px] border border-white/10 bg-[#080808] p-5 shadow-[0_0_30px_rgba(255,255,255,0.025)] sm:p-7">

                <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-white/[0.045] blur-[85px]" />

                <div className="relative z-10">

                  <div className="flex flex-wrap items-center gap-2">

                    <span className="rounded-full border border-white/15 bg-white text-black px-3 py-1.5 text-[10px] font-bold tracking-wider">
                      LESSON {currentIndex + 1}
                    </span>

                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-medium text-neutral-400">
                      {selectedLecture?.videoAvailable
                        ? "VIDEO LESSON"
                        : "VIDEO PENDING"}
                    </span>

                  </div>

                  <h1 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
                    {selectedLecture?.title || "Module lectures"}
                  </h1>

                  <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-neutral-500">

                    <span className="flex items-center gap-2">
                      <BookOpen size={16} />
                      {lectures.length} lessons
                    </span>

                    <span className="flex items-center gap-2">
                      <CheckCircle2 size={16} />
                      {completedCount} completed
                    </span>

                  </div>

                  {/* PROGRESS */}
                  <div className="mt-6">

                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="text-neutral-500">
                        Your learning progress
                      </span>

                      <span className="font-semibold text-white">
                        {progressPercentage}%
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-white transition-all duration-500"
                        style={{
                          width: `${progressPercentage}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* LESSON NOTES */}
                  <div className="mt-8 border-t border-white/10 pt-7">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
                        <FileText size={19} />
                      </div>

                      <h2 className="text-lg font-semibold">
                        Lesson notes
                      </h2>

                    </div>

                    <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-neutral-400">
                      {selectedLecture?.notes ||
                        "No notes have been added for this lecture yet."}
                    </p>
                  </div>

                  {/* MARK COMPLETED */}
                  <div className="mt-7">

                    <button
                      type="button"
                      onClick={markLectureCompleted}
                      disabled={
                        !selectedLecture ||
                        completionLoading ||
                        completedLectureIds.includes(selectedLecture._id)
                      }
                      className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
                        selectedLecture &&
                        completedLectureIds.includes(selectedLecture._id)
                          ? "border border-white/15 bg-white/[0.06] text-neutral-300 cursor-not-allowed"
                          : "bg-white text-black hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
                      }`}
                    >
                      {completionLoading ? (
                        <>
                          <LoaderCircle size={17} className="animate-spin" />
                          Saving...
                        </>
                      ) : selectedLecture &&
                        completedLectureIds.includes(selectedLecture._id) ? (
                        <>
                          <CheckCircle2 size={17} />
                          Completed
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={17} />
                          Mark as Completed
                        </>
                      )}
                    </button>

                    {completionError && (
                      <p className="mt-3 text-sm text-red-400">
                        {completionError}
                      </p>
                    )}
                  </div>

                  {/* PREVIOUS / NEXT */}
                  <div className="mt-8 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">

                    <button
                      type="button"
                      onClick={goToPreviousLecture}
                      disabled={currentIndex <= 0}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-neutral-300 transition hover:border-white/40 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white/[0.03] disabled:hover:text-neutral-300"
                    >
                      <ArrowLeft size={17} />
                      Previous lesson
                    </button>

                    <button
                      type="button"
                      onClick={goToNextLecture}
                      disabled={
                        currentIndex < 0 ||
                        currentIndex >= lectures.length - 1
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      Next lesson
                      <ArrowRight size={17} />
                    </button>

                  </div>
                </div>
              </div>
            </section>

            {/* LECTURE SIDEBAR */}
            <aside className="relative isolate overflow-hidden rounded-[26px] border border-white/10 bg-[#080808] shadow-[0_0_30px_rgba(255,255,255,0.025)] xl:sticky xl:top-24">

              {/* SIDEBAR LIGHTING */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/[0.06] blur-[90px]" />

              {/* SIDEBAR HEADER */}
              <div className="relative z-10 border-b border-white/10 p-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
                    <BookOpen size={21} />
                  </div>

                  <div>
                    <h2 className="font-semibold">
                      Module content
                    </h2>

                    <p className="mt-1 text-xs text-neutral-500">
                      {lectures.length} lessons in this module
                    </p>
                  </div>

                </div>

                {/* SIDEBAR PROGRESS */}
                <div className="mt-6 flex justify-between text-xs">

                  <span className="text-neutral-500">
                    Your progress
                  </span>

                  <span className="font-semibold text-white">
                    {progressPercentage}%
                  </span>

                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-white transition-all duration-500"
                    style={{
                      width: `${progressPercentage}%`,
                    }}
                  />
                </div>
              </div>

              {/* LECTURE LIST */}
              <div className="relative z-10 max-h-[650px] overflow-y-auto p-3">

                {lectures.map((lecture, index) => {

                  const isSelected =
                    lecture._id === selectedLecture?._id;

                  const isCompleted =
                    completedLectureIds.includes(lecture._id);

                  return (
                    <button
                      key={lecture._id}
                      type="button"
                      onClick={() => selectLecture(lecture._id)}
                      className={`group/item mb-2 flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition duration-300 ${
                        isSelected
                          ? "border-white/25 bg-white/[0.08] shadow-[0_0_20px_rgba(255,255,255,0.035)]"
                          : "border-transparent hover:border-white/10 hover:bg-white/[0.035]"
                      }`}
                    >

                      {/* LESSON NUMBER / STATUS */}
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
                          isCompleted
                            ? "bg-white text-black"
                            : isSelected
                              ? "bg-white text-black"
                              : "border border-white/10 bg-white/[0.04] text-neutral-400"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 size={19} />
                        ) : (
                          <span className="text-sm font-semibold">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        )}
                      </div>

                      {/* LESSON DETAILS */}
                      <div className="min-w-0 flex-1">

                        <p
                          className={`text-sm font-semibold leading-5 ${
                            isSelected
                              ? "text-white"
                              : "text-neutral-300"
                          }`}
                        >
                          {lecture.title || "Untitled lecture"}
                        </p>

                        <div className="mt-2 flex items-center gap-2 text-[11px] text-neutral-500">

                          <CirclePlay size={13} />

                          <span>
                            {lecture.videoAvailable
                              ? "Video lesson"
                              : "Video pending"}
                          </span>

                          {isCompleted && (
                            <span className="text-white">
                              · Completed
                            </span>
                          )}

                        </div>
                      </div>

                      {isSelected && (
                        <ArrowRight
                          size={16}
                          className="mt-1 shrink-0 text-white"
                        />
                      )}

                    </button>
                  );
                })}
              </div>

              {/* SIDEBAR FOOTER */}
              <div className="relative z-10 border-t border-white/10 bg-white/[0.02] p-4">
                <p className="text-center text-xs leading-5 text-neutral-500">
                  Select a lesson to watch its video and read the notes.
                </p>
              </div>

            </aside>
          </div>
        )}

        {/* FOOTER */}
        <footer className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 text-xs text-neutral-600 sm:flex-row">

          <p>
            © {new Date().getFullYear()} LearnHub. All rights reserved.
          </p>

          <p className="tracking-[0.18em]">
            LEARN. CONNECT. GROW.
          </p>

        </footer>
      </main>
    </main>
  );
};

export default ModuleLecturesPage;
