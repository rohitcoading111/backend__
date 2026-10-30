
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
    toggleMic,
    toggleCamera,
    error,
  } = useLiveRoom(token, liveKitUrl);

  const videoRef = useRef(null);

  // Attach local camera track to video element
  useEffect(() => {
    if (!room || !isCameraEnabled) return;

    const publication =
      room.localParticipant.getTrackPublication(
        Track.Source.Camera
      );

    const track = publication?.track;

    if (!track || !videoRef.current) return;

    track.attach(videoRef.current);

    return () => {
      track.detach(videoRef.current);
    };
  }, [room, isCameraEnabled]);

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

      {/* Camera Preview */}
      <div className="max-w-5xl mx-auto">

        <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center border border-gray-700">

          {isCameraEnabled && isConnected ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center text-gray-400">
              <p className="text-lg">
                {isCameraEnabled
                  ? "Connecting camera..."
                  : "Camera is off"}
              </p>
            </div>
          )}

        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 mt-4 text-center">
            {error}
          </p>
        )}

        {/* Controls */}
        <div className="flex justify-center gap-4 mt-6">

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

        </div>

      </div>
    </div>
  );
}

export default LiveRoom;
