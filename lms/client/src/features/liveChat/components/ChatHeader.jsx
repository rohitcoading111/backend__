
const ChatHeader = ({
  isConnected,
  isJoined,
  isChatEnabled,
  userRole,
  onPauseChat,
  onResumeChat,
}) => {
  const isInstructor = userRole === "INSTRUCTOR";

  const getConnectionStatus = () => {
    if (!isConnected) return "Disconnected";
    if (!isJoined) return "Joining...";
    return "Connected";
  };

  return (
    <div className="flex items-center justify-between gap-4 border-b border-gray-200 bg-white px-4 py-3">
      {/* Chat information */}
      <div>
        <h2 className="text-base font-semibold text-gray-900">
          Live Class Chat
        </h2>

        <div className="mt-1 flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              isConnected && isJoined
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          />

          <span className="text-xs text-gray-500">
            {getConnectionStatus()}
          </span>

          {isJoined && (
            <>
              <span className="text-gray-300">•</span>

              <span
                className={`text-xs font-medium ${
                  isChatEnabled ? "text-green-600" : "text-orange-600"
                }`}
              >
                {isChatEnabled ? "Chat Active" : "Chat Paused"}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Instructor controls */}
      {isInstructor && isJoined && isConnected && (
        <button
          type="button"
          onClick={isChatEnabled ? onPauseChat : onResumeChat}
          className={`rounded-lg px-4 py-2 text-xs font-semibold text-white transition ${
            isChatEnabled
              ? "bg-orange-500 hover:bg-orange-600"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isChatEnabled ? "Pause Chat" : "Resume Chat"}
        </button>
      )}
    </div>
  );
};

export default ChatHeader;
