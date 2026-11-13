
import { useEffect, useRef } from "react";

const formatMessageTime = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const MessageList = ({
  messages = [],
  currentUserId,
  isLoading = false,
  isLoadingMore = false,
  hasMore = false,
  onLoadMore,
}) => {
  const bottomRef = useRef(null);

  // Scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-gray-400">
        Loading chat messages...
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">

      {/* Load older messages */}
      {hasMore && (
        <button
          type="button"
          onClick={onLoadMore}
          disabled={isLoadingMore}
          className="self-center rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-200 disabled:opacity-50"
        >
          {isLoadingMore ? "Loading..." : "Load older messages"}
        </button>
      )}

      {/* Empty state */}
      {messages.length === 0 ? (
        <div className="flex flex-1 items-center justify-center text-sm text-gray-400">
          No messages yet. Start the conversation!
        </div>
      ) : (
        messages.map((msg) => {
          const isOwnMessage =
            String(msg.senderId) === String(currentUserId);

          return (
            <div
              key={msg._id}
              className={`flex w-full ${
                isOwnMessage ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  isOwnMessage
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-xs font-semibold">
                    {isOwnMessage ? "You" : msg.senderName}
                  </span>

                  {!isOwnMessage && (
                    <span className="text-[10px] uppercase opacity-60">
                      {msg.senderRole}
                    </span>
                  )}
                </div>

                <p className="break-words text-sm">
                  {msg.message}
                </p>

                <div
                  className={`mt-2 text-right text-[10px] ${
                    isOwnMessage
                      ? "text-blue-100"
                      : "text-gray-500"
                  }`}
                >
                  {formatMessageTime(msg.createdAt)}
                </div>
              </div>
            </div>
          );
        })
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
