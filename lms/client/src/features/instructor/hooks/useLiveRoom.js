
import { useEffect, useState } from "react";
import { Room, RoomEvent, Track } from "livekit-client";

function useLiveRoom(token, liveKitUrl) {
  const [room, setRoom] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const [isScreenShareEnabled, setIsScreenShareEnabled] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token || !liveKitUrl) return;

    const liveRoom = new Room();

    const connectToRoom = async () => {
      try {
        await liveRoom.connect(liveKitUrl, token);

        setRoom(liveRoom);
        setIsConnected(true);
        setError(null);

        // Camera
        try {
          await liveRoom.localParticipant.setCameraEnabled(true);
          setIsCameraEnabled(true);
        } catch (cameraError) {
          console.error("Camera error:", cameraError);
          setIsCameraEnabled(false);
          setError(`Camera: ${cameraError.message}`);
        }

        // Microphone
        try {
          await liveRoom.localParticipant.setMicrophoneEnabled(true);
          setIsMicEnabled(true);
        } catch (micError) {
          console.error("Microphone error:", micError);
          setIsMicEnabled(false);
          setError(`Microphone: ${micError.message}`);
        }

      } catch (err) {
        console.error("LiveKit connection error:", err);
        setError(`Connection: ${err.message}`);
      }
    };

    connectToRoom();

    liveRoom.on(RoomEvent.Disconnected, () => {
      setIsConnected(false);
      setIsScreenShareEnabled(false);
    });

    return () => {
      liveRoom.disconnect();
    };
  }, [token, liveKitUrl]);

  // Toggle microphone
  const toggleMic = async () => {
    if (!room) return;

    try {
      const enabled = !isMicEnabled;

      await room.localParticipant.setMicrophoneEnabled(enabled);
      setIsMicEnabled(enabled);
    } catch (err) {
      setError(`Microphone: ${err.message}`);
    }
  };

  // Toggle camera
  const toggleCamera = async () => {
    if (!room) return;

    try {
      const enabled = !isCameraEnabled;

      await room.localParticipant.setCameraEnabled(enabled);
      setIsCameraEnabled(enabled);
    } catch (err) {
      setError(`Camera: ${err.message}`);
    }
  };

  // Toggle screen sharing
  const toggleScreenShare = async () => {
    if (!room) return;

    try {
      const enabled = !isScreenShareEnabled;

      await room.localParticipant.setScreenShareEnabled(enabled);

      setIsScreenShareEnabled(enabled);
    } catch (err) {
      console.error("Screen share error:", err);
      setError(`Screen Share: ${err.message}`);
    }
  };

  

  return {
    room,
    isConnected,

    isMicEnabled,
    isCameraEnabled,
    isScreenShareEnabled,

    toggleMic,
    toggleCamera,
    toggleScreenShare,

    error,
  };
}

export default useLiveRoom;
