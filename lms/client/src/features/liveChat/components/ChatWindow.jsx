
import { useState } from "react";
import { Maximize2, Minimize2, X } from "lucide-react";

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
  chatCooldownSeconds = 0,
  remainingCooldownMs = 0,
  isSending = false,
  onSendMessage,
  onSetCooldown,
  onPauseChat,
  onResumeChat,
  onLoadMore,
  onClose,
  embedded = false,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleClose = () => {
    setIsFullScreen(false);
    onClose?.();
  };

  return (
    <div
      className={`z-50 flex flex-col overflow-hidden bg-white shadow-2xl ${
        isFullScreen
          ? "fixed inset-0"
          : embedded
            ? "relative h-[42vh] min-h-[260px] max-h-[360px] w-full min-w-0 shrink-0 border-t border-gray-200 lg:h-auto lg:min-h-0 lg:max-h-none lg:w-[360px] lg:max-w-[40%] lg:border-l lg:border-t-0"
            : "fixed bottom-5 right-5 h-[500px] w-[360px] max-h-[80vh] max-w-[calc(100vw-24px)] rounded-2xl border border-gray-200"
      }`}
    >
      {/* HEADER */}
      <div className="relative shrink-0 border-b border-gray-200">
        <div className="min-w-0">
          <ChatHeader
            isConnected={isConnected}
            isJoined={isJoined}
            isChatEnabled={isChatEnabled}
            userRole={userRole}
            chatCooldownSeconds={chatCooldownSeconds}
            onSetCooldown={onSetCooldown}
            onPauseChat={onPauseChat}
            onResumeChat={onResumeChat}
          />
        </div>

        <div className="absolute right-3 top-2 flex items-center gap-1">
          {/* FULLSCREEN BUTTON */}
          <button
            type="button"
            onClick={() => setIsFullScreen((prev) => !prev)}
            title={isFullScreen ? "Exit full screen" : "Full screen"}
            aria-label={isFullScreen ? "Exit full screen" : "Full screen"}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            {isFullScreen ? (
              <Minimize2 size={18} />
            ) : (
              <Maximize2 size={18} />
            )}
          </button>

          {/* CLOSE BUTTON */}
          <button
            type="button"
            onClick={handleClose}
            title="Close chat"
            aria-label="Close chat"
            className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="shrink-0 border-b border-red-100 bg-red-50 px-4 py-2 text-xs text-red-600">
          {error}
        </div>
      )}

      {/* MESSAGE LIST */}
      <MessageList
        messages={messages}
        currentUserId={currentUserId}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        hasMore={hasMore}
        onLoadMore={onLoadMore}
      />

      {/* MESSAGE INPUT */}
      <MessageInput
        onSendMessage={onSendMessage}
        isChatEnabled={isChatEnabled}
        isJoined={isJoined}
        isConnected={isConnected}
        remainingCooldownMs={remainingCooldownMs}
        isSending={isSending}
      />
    </div>
  );
};

export default ChatWindow;
