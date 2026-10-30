
import { useEffect, useState } from "react";
import { Room, RoomEvent } from "livekit-client";

function useLiveRoom(token, liveKitUrl) {
  const [room, setRoom] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
const [isMicEnabled, setIsMicEnabled] = useState(false);
const [isCameraEnabled, setIsCameraEnabled] = useState(false);
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

    // Camera permission
    try {
      await liveRoom.localParticipant.setCameraEnabled(true);
      setIsCameraEnabled(true);
    } catch (cameraError) {
      console.error("Camera error:", cameraError);
      setIsCameraEnabled(false);
      setError(`Camera: ${cameraError.message}`);
    }

    // Microphone permission
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
    });

    return () => {
      liveRoom.disconnect();
    };
  }, [token, liveKitUrl]);

  const toggleMic = async () => {
    if (!room) return;

    const enabled = !isMicEnabled;

    await room.localParticipant.setMicrophoneEnabled(enabled);
    setIsMicEnabled(enabled);
  };

  const toggleCamera = async () => {
    if (!room) return;

    const enabled = !isCameraEnabled;

    await room.localParticipant.setCameraEnabled(enabled);
    setIsCameraEnabled(enabled);
  };

  return {
    room,
    isConnected,
    isMicEnabled,
    isCameraEnabled,
    toggleMic,
    toggleCamera,
    error,
  };
}

export default useLiveRoom;
