
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Track } from "livekit-client";

import useLiveRoom from "../hooks/useLiveRoom";

function LiveRoom() {
  const location = useLocation();

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
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        Live session details missing.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            Live Classroom
          </h1>

          <p className="text-gray-400">
            {session?.course?.title || "Live Session"}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            isConnected
              ? "bg-green-500/20 text-green-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {isConnected ? "Connected" : "Connecting..."}
        </span>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">

        {/* Screen Share Preview */}
        {isScreenShareEnabled && (
          <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
            <div className="px-4 py-3 border-b border-gray-700">
              <h2 className="font-semibold">
                Screen Sharing
              </h2>
            </div>

            <div className="aspect-video">
              <video
                ref={screenRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}

        {/* Camera Preview */}
        <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700">

          <div className="px-4 py-3 border-b border-gray-700">
            <h2 className="font-semibold">
              Instructor Camera
            </h2>
          </div>

          <div className="aspect-video flex items-center justify-center">

            {isCameraEnabled && isConnected ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-gray-400">
                Camera is off
              </p>
            )}

          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-center">
            {error}
          </p>
        )}

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4">

          <button
            onClick={toggleMic}
            disabled={!isConnected}
            className={`px-6 py-3 rounded-lg font-medium disabled:opacity-50 ${
              isMicEnabled
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isMicEnabled ? "Mute Mic" : "Unmute Mic"}
          </button>

          <button
            onClick={toggleCamera}
            disabled={!isConnected}
            className={`px-6 py-3 rounded-lg font-medium disabled:opacity-50 ${
              isCameraEnabled
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isCameraEnabled
              ? "Turn Camera Off"
              : "Turn Camera On"}
          </button>

          <button
            onClick={toggleScreenShare}
            disabled={!isConnected}
            className={`px-6 py-3 rounded-lg font-medium disabled:opacity-50 ${
              isScreenShareEnabled
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isScreenShareEnabled
              ? "Stop Sharing"
              : "Share Screen"}
          </button>

        </div>
      </div>
    </div>
  );
}

export default LiveRoom;
