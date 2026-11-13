import { useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatWindow = ({
  messages,
  currentUserId,
  userRole,
  isConnected,
  isJoined,
  isChatEnabled,
  isLoading,
  isLoadingMore,
  hasMore,
  error,
  onSendMessage,
  onPauseChat,
  onResumeChat,
  onLoadMore,
  onClose,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <div
      className={`z-50 flex flex-col overflow-hidden bg-white shadow-2xl ${
        isFullScreen
          ? "fixed inset-0"
          : "fixed bottom-5 right-5 h-[500px] w-[360px] max-h-[80vh] max-w-[calc(100vw-24px)] rounded-2xl border border-gray-200"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="min-w-0 flex-1">
          <ChatHeader
            isConnected={isConnected}
            isJoined={isJoined}
            isChatEnabled={isChatEnabled}
            userRole={userRole}
            onPauseChat={onPauseChat}
            onResumeChat={onResumeChat}
          />
        </div>

        <div className="flex shrink-0 items-center gap-1 pr-3">
          <button
            type="button"
            onClick={() => setIsFullScreen((prev) => !prev)}
            title={isFullScreen ? "Exit full screen" : "Full screen"}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            {isFullScreen ? "↙" : "↗"}
          </button>

          <button
            type="button"
            onClick={onClose}
            title="Close chat"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="border-b border-red-100 bg-red-50 px-4 py-2 text-xs text-red-600">
          {error}
        </div>
      )}

      {/* Messages */}
      <MessageList
        messages={messages}
        currentUserId={currentUserId}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        hasMore={hasMore}
        onLoadMore={onLoadMore}
      />

      {/* Input */}
      <MessageInput
        onSendMessage={onSendMessage}
        isChatEnabled={isChatEnabled}
        isJoined={isJoined}
        isConnected={isConnected}
      />
    </div>
  );
};

export default ChatWindow;
