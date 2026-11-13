
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Track } from "livekit-client";
import {
  Mic,
  MicOff,
  MonitorOff,
  MonitorUp,
  LogOut,
  PhoneOff,
  Video,
  VideoOff,
  MessageCircle,
} from "lucide-react";

import { endLiveSessionThunk } from "../thunks/liveSessionThunk";
import useLiveRoom from "../hooks/useLiveRoom";

import useLiveChat from "../../liveChat/hooks/useLiveChat";
import ChatWindow from "../../liveChat/components/ChatWindow";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black";

function ControlButton({
  onClick,
  disabled,
  highlighted = false,
  pressed,
  icon: Icon,
  label,
  ariaLabel,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || label}
      aria-pressed={pressed}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-3 py-2.5 text-sm font-medium transition-all duration-300 active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:active:scale-100 sm:px-5 sm:py-3 ${focusRing} ${
        highlighted
          ? "bg-white text-black hover:bg-white/85"
          : "border border-white/20 text-white hover:border-white hover:bg-white/10"
      }`}
    >
      <Icon size={18} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function StreamCard({ title, live, children }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-black">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <h2 className="text-sm font-medium text-white/80">{title}</h2>
        <span className="inline-flex items-center gap-2 text-xs text-white/40">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              live ? "bg-white" : "border border-white/50"
            }`}
          />
          {live ? "On" : "Off"}
        </span>
      </div>
      {children}
    </section>
  );
}

function LiveRoom() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const [isEnding, setIsEnding] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);

  const { session, token, liveKitUrl } = location.state || {};

  const {
    room,
    isConnected,
    isMicEnabled,
    isCameraEnabled,
    isScreenShareEnabled,
    toggleMic,
    toggleCamera,
    toggleScreenShare,
    error,
  } = useLiveRoom(token, liveKitUrl);

  // Live chat
  const {
    messages,
    isConnected: isChatConnected,
    isJoined,
    isChatEnabled,
    isLoading: isChatLoading,
    isLoadingMore,
    hasMore,
    error: chatError,
    sendMessage,
    pauseChat,
    resumeChat,
    loadMoreMessages,
  } = useLiveChat(session?._id);

  const currentUserId = user?._id || user?.id;
  const userRole = user?.role;

  const videoRef = useRef(null);
  const screenRef = useRef(null);

  // Attach instructor camera track
  useEffect(() => {
    if (!room || !isConnected || !isCameraEnabled) return;

    const publication = room.localParticipant.getTrackPublication(
      Track.Source.Camera
    );

    const track = publication?.track;

    if (!track || !videoRef.current) return;

    track.attach(videoRef.current);

    return () => {
      track.detach(videoRef.current);
    };
  }, [room, isConnected, isCameraEnabled]);

  // Attach instructor screen-share track
  useEffect(() => {
    if (!room || !isConnected || !isScreenShareEnabled) return;

    const publication = room.localParticipant.getTrackPublication(
      Track.Source.ScreenShare
    );

    const track = publication?.track;

    if (!track || !screenRef.current) return;

    track.attach(screenRef.current);

    return () => {
      track.detach(screenRef.current);
    };
  }, [room, isConnected, isScreenShareEnabled]);

  if (!token || !liveKitUrl) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-black px-6 text-center text-white">
        <span className="rounded-full border border-white/15 p-4 text-white/60">
          <VideoOff size={26} />
        </span>

        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            Live session details missing
          </h1>
          <p className="mt-2 text-sm text-white/40">
            Start the session again from your dashboard.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/instructor-dashboard")}
          className={`rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-white/85 active:scale-[0.97] motion-reduce:active:scale-100 ${focusRing}`}
        >
          Back to dashboard
        </button>
      </div>
    );
  }

  const handleEndLive = async () => {
    if (!session?._id || isEnding) return;

    const confirmed = window.confirm(
      "Are you sure you want to end this live class?"
    );

    if (!confirmed) return;

    try {
      setIsEnding(true);

      await dispatch(endLiveSessionThunk(session._id)).unwrap();

      room?.disconnect();

      navigate("/instructor-dashboard");
    } catch (error) {
      console.error("End live error:", error);
      alert(error || "Failed to end live session");
      setIsEnding(false);
    }
  };

  const handleLeaveRoom = () => {
    const confirmed = window.confirm(
      "Leave the live room without ending the session? Your camera and microphone will disconnect, but the live session will remain active."
    );

    if (!confirmed) return;

    room?.disconnect();
    navigate("/organization-instructor-dashboard", {
      state: { activeSection: "live-classes" },
    });
  };

  return (
    <div className="min-h-screen bg-black px-5 pb-36 pt-6 text-white antialiased sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Live classroom
            </h1>
            <p className="mt-1 truncate text-sm text-white/40">
              {session?.course?.title || "Live session"}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {/* Chat button */}
            <button
              type="button"
              onClick={() => setIsChatOpen((previous) => !previous)}
              aria-label={isChatOpen ? "Close live chat" : "Open live chat"}
              aria-expanded={isChatOpen}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition ${
                isChatOpen
                  ? "border-white bg-white text-black"
                  : "border-white/40 bg-white/10 text-white hover:border-white hover:bg-white/20"
              }`}
            >
              <MessageCircle size={16} />
              <span>{isChatOpen ? "Hide Chat" : "Live Chat"}</span>
            </button>

            {/* LiveKit connection status */}
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 text-xs font-medium">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isConnected
                    ? "animate-pulse bg-white motion-reduce:animate-none"
                    : "border border-white"
                }`}
              />
              {isConnected ? "Connected" : "Connecting"}
            </span>
          </div>
        </header>

        {/* Error */}
        {error && (
          <p
            role="alert"
            className="mb-6 rounded-xl border border-white/20 bg-white/[0.04] px-4 py-3 text-center text-sm text-white/80"
          >
            {error}
          </p>
        )}

        {/* Stage */}
        <div className="flex min-w-0 flex-col gap-6 lg:flex-row">
          <div
            className={`grid min-w-0 flex-1 gap-6 ${
              isScreenShareEnabled
                ? "lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start"
                : isChatOpen
                  ? ""
                  : "mx-auto max-w-4xl"
            }`}
          >
            {isScreenShareEnabled && (
              <StreamCard title="Screen sharing" live>
                <div className="aspect-video bg-white/[0.03]">
                  <video
                    ref={screenRef}
                    autoPlay
                    playsInline
                    muted
                    className="h-full w-full object-contain"
                  />
                </div>
              </StreamCard>
            )}

            <StreamCard
              title="Instructor camera"
              live={isCameraEnabled && isConnected}
            >
              <div className="flex aspect-video items-center justify-center bg-white/[0.03]">
                {isCameraEnabled && isConnected ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-white/40">
                    <span className="rounded-full border border-white/15 p-3">
                      <VideoOff size={22} />
                    </span>
                    <p className="text-sm">Camera is off</p>
                  </div>
                )}
              </div>
            </StreamCard>
          </div>

          {isChatOpen && (
            <ChatWindow
              embedded
              messages={messages}
              currentUserId={currentUserId}
              userRole={userRole}
              isConnected={isChatConnected}
              isJoined={isJoined}
              isChatEnabled={isChatEnabled}
              isLoading={isChatLoading}
              isLoadingMore={isLoadingMore}
              hasMore={hasMore}
              error={chatError}
              onSendMessage={sendMessage}
              onPauseChat={pauseChat}
              onResumeChat={resumeChat}
              onLoadMore={loadMoreMessages}
              onClose={() => setIsChatOpen(false)}
            />
          )}
        </div>
      </div>

      {/* Floating controls */}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30 flex justify-center px-2 sm:bottom-6 sm:px-4">
        <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-1 rounded-full border border-white/15 bg-black/70 p-1.5 shadow-[0_24px_60px_-20px_rgba(255,255,255,0.18)] backdrop-blur-xl sm:gap-2 sm:p-2">
          <ControlButton
            onClick={toggleMic}
            disabled={!isConnected}
            highlighted={!isMicEnabled}
            pressed={!isMicEnabled}
            icon={isMicEnabled ? Mic : MicOff}
            label={isMicEnabled ? "Mute" : "Unmute"}
            ariaLabel={isMicEnabled ? "Mute microphone" : "Unmute microphone"}
          />

          <ControlButton
            onClick={toggleCamera}
            disabled={!isConnected}
            highlighted={!isCameraEnabled}
            pressed={!isCameraEnabled}
            icon={isCameraEnabled ? Video : VideoOff}
            label={isCameraEnabled ? "Stop video" : "Start video"}
            ariaLabel={isCameraEnabled ? "Turn camera off" : "Turn camera on"}
          />

          <ControlButton
            onClick={toggleScreenShare}
            disabled={!isConnected}
            highlighted={isScreenShareEnabled}
            pressed={isScreenShareEnabled}
            icon={isScreenShareEnabled ? MonitorOff : MonitorUp}
            label={isScreenShareEnabled ? "Stop sharing" : "Share screen"}
          />

          <span className="mx-1 hidden h-6 w-px bg-white/15 sm:block" />

          <button
            type="button"
            onClick={handleLeaveRoom}
            disabled={isEnding}
            aria-label="Leave live room without ending the session"
            title="Leave room without ending the live session"
            className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-3 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10 active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:active:scale-100 sm:px-5 sm:py-3 ${focusRing}`}
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Leave room</span>
          </button>

          <button
            type="button"
            onClick={handleEndLive}
            disabled={!isConnected || isEnding}
            className={`inline-flex items-center justify-center gap-2 rounded-full border border-white px-3 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:active:scale-100 sm:px-5 sm:py-3 ${focusRing}`}
          >
            <PhoneOff size={18} />
            <span className="hidden sm:inline">
              {isEnding ? "Ending" : "End live"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LiveRoom;
