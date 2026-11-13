
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  connectLiveChat,
  disconnectLiveChat,
} from "../services/socket";

import chatService from "../services/chatService";

const normalizeMessage = (message) => ({
  _id: message._id,
  senderId: message.senderId || message.sender?._id,
  senderName: message.senderName || message.sender?.name || "User",
  senderRole: message.senderRole,
  avatar: message.avatar || message.sender?.avatar || null,
  message: message.message,
  createdAt: message.createdAt,
});

const mergeMessages = (currentMessages, newMessages) => {
  const messageMap = new Map();

  [...currentMessages, ...newMessages].forEach((message) => {
    messageMap.set(String(message._id), message);
  });

  return Array.from(messageMap.values()).sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
};

const useLiveChat = (liveSessionId) => {
  // Existing Redux authentication
  const accessToken = useSelector(
    (state) => state.auth.accessToken
  );

  // Chat states
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [isChatEnabled, setIsChatEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [nextCursor, setNextCursor] = useState(null);
  const [error, setError] = useState(null);

  // Load initial chat history
  const loadChatHistory = useCallback(async () => {
    if (!liveSessionId) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await chatService.getChatHistory(
        liveSessionId,
        { limit: 50 }
      );

      const data = response.data;

      setMessages(
        (data.messages || []).map(normalizeMessage)
      );

      setHasMore(data.hasMore);
      setNextCursor(data.nextCursor);
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Unable to load chat history"
      );
    } finally {
      setIsLoading(false);
    }
  }, [liveSessionId]);

  // Load older messages
  const loadMoreMessages = useCallback(async () => {
    if (!liveSessionId || !hasMore || !nextCursor) return;

    try {
      setIsLoadingMore(true);

      const response = await chatService.getChatHistory(
        liveSessionId,
        {
          limit: 50,
          before: nextCursor,
        }
      );

      const data = response.data;

      setMessages((current) =>
        mergeMessages(
          current,
          (data.messages || []).map(normalizeMessage)
        )
      );

      setHasMore(data.hasMore);
      setNextCursor(data.nextCursor);
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Unable to load older messages"
      );
    } finally {
      setIsLoadingMore(false);
    }
  }, [liveSessionId, hasMore, nextCursor]);

  // Connect socket and manage chat events
  useEffect(() => {
    if (!accessToken || !liveSessionId) return;

    let socket;

    try {
      socket = connectLiveChat(accessToken);
    } catch (error) {
      setError(error.message);
      return;
    }

    const handleConnect = () => {
      setIsConnected(true);
      setIsJoined(false);

      // Join room after connection or reconnection
      socket.emit("chat:join", { liveSessionId });
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      setIsJoined(false);
    };

    const handleJoined = (data) => {
      setIsJoined(true);
      setIsChatEnabled(data.isChatEnabled);
      setError(null);
    };

    const handleNewMessage = (message) => {
      setMessages((current) =>
        mergeMessages(current, [normalizeMessage(message)])
      );
    };

    const handleChatStatus = (data) => {
      setIsChatEnabled(data.isChatEnabled);
    };

    const handleChatError = (data) => {
      setError(data.message || "Chat error occurred");
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("chat:joined", handleJoined);
    socket.on("chat:new-message", handleNewMessage);
    socket.on("chat:status", handleChatStatus);
    socket.on("chat:error", handleChatError);

    // Handle an already-connected socket
    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("chat:joined", handleJoined);
      socket.off("chat:new-message", handleNewMessage);
      socket.off("chat:status", handleChatStatus);
      socket.off("chat:error", handleChatError);

      disconnectLiveChat();
    };
  }, [accessToken, liveSessionId]);

  // Load history when session changes
  useEffect(() => {
    setMessages([]);
    setIsJoined(false);
    setIsChatEnabled(true);
    setHasMore(false);
    setNextCursor(null);

    loadChatHistory();
  }, [loadChatHistory]);

  // Send message
  const sendMessage = useCallback(
    (message) => {
      const socket = connectLiveChat(accessToken);

      if (!socket.connected || !isJoined) {
        setError("Please join the live chat first");
        return false;
      }

      if (!isChatEnabled) {
        setError("Chat is currently paused");
        return false;
      }

      if (typeof message !== "string" || !message.trim()) {
        setError("Message cannot be empty");
        return false;
      }

      socket.emit("chat:send", {
        liveSessionId,
        message: message.trim(),
      });

      setError(null);
      return true;
    },
    [accessToken, liveSessionId, isJoined, isChatEnabled]
  );

  // Pause chat (instructor only - backend verifies permission)
  const pauseChat = useCallback(() => {
    const socket = connectLiveChat(accessToken);

    if (!socket.connected || !isJoined) return;

    socket.emit("chat:pause", { liveSessionId });
  }, [accessToken, liveSessionId, isJoined]);

  // Resume chat (instructor only - backend verifies permission)
  const resumeChat = useCallback(() => {
    const socket = connectLiveChat(accessToken);

    if (!socket.connected || !isJoined) return;

    socket.emit("chat:resume", { liveSessionId });
  }, [accessToken, liveSessionId, isJoined]);

  return {
    messages,
    isConnected,
    isJoined,
    isChatEnabled,
    isLoading,
    isLoadingMore,
    hasMore,
    error,
    sendMessage,
    pauseChat,
    resumeChat,
    loadMoreMessages,
    loadChatHistory,
  };
};

export default useLiveChat;
