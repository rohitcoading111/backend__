
import { useEffect, useState } from "react";
import { Room, RoomEvent } from "livekit-client";

function useLiveRoom(token, liveKitUrl) {
  const [room, setRoom] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const [isScreenShareEnabled, setIsScreenShareEnabled] = useState(false);

  const [error, setError] = useState(null);

  const isScreenShareSupported =
  typeof navigator !== "undefined" &&
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getDisplayMedia === "function";

  useEffect(() => {
    if (!token || !liveKitUrl) return;

    let isMounted = true;
    const liveRoom = new Room();

    setRoom(liveRoom);
    setError(null);

    const handleConnected = () => {
      if (isMounted) setIsConnected(true);
    };

    const handleDisconnected = () => {
      if (!isMounted) return;

      setIsConnected(false);
      setIsMicEnabled(false);
      setIsCameraEnabled(false);
      setIsScreenShareEnabled(false);
    };

    liveRoom.on(RoomEvent.Connected, handleConnected);
    liveRoom.on(RoomEvent.Disconnected, handleDisconnected);

    const connectToRoom = async () => {
      try {
        await liveRoom.connect(liveKitUrl, token);

        if (!isMounted) return;

        setError(null);

        try {
          await liveRoom.localParticipant.setCameraEnabled(true);

          if (isMounted) setIsCameraEnabled(true);
        } catch (cameraError) {
          if (isMounted) {
            setIsCameraEnabled(false);
            setError(`Camera: ${cameraError.message}`);
          }
        }

        try {
          await liveRoom.localParticipant.setMicrophoneEnabled(true);

          if (isMounted) setIsMicEnabled(true);
        } catch (micError) {
          if (isMounted) {
            setIsMicEnabled(false);
            setError(`Microphone: ${micError.message}`);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(`Connection: ${err.message}`);
          setIsConnected(false);
        }
      }
    };

    connectToRoom();

    return () => {
      isMounted = false;

      liveRoom.off(RoomEvent.Connected, handleConnected);
      liveRoom.off(RoomEvent.Disconnected, handleDisconnected);

      liveRoom.disconnect();
    };
  }, [token, liveKitUrl]);

  const toggleMic = async () => {
    if (!room || !isConnected) return;

    try {
      const enabled = !isMicEnabled;

      await room.localParticipant.setMicrophoneEnabled(enabled);
      setIsMicEnabled(enabled);
    } catch (err) {
      setError(`Microphone: ${err.message}`);
    }
  };

  const toggleCamera = async () => {
    if (!room || !isConnected) return;

    try {
      const enabled = !isCameraEnabled;

      await room.localParticipant.setCameraEnabled(enabled);
      setIsCameraEnabled(enabled);
    } catch (err) {
      setError(`Camera: ${err.message}`);
    }
  };

const toggleScreenShare = async () => {
  if (!room || !isConnected) return;

  if (!isScreenShareSupported) {
    setError("Screen sharing is not supported on this browser/device.");
    return;
  }

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
  isScreenShareSupported,
  toggleMic,
  toggleCamera,
  toggleScreenShare,
  error,
};
}

export default useLiveRoom;
