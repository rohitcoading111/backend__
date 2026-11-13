
import { useState } from "react";

const MessageInput = ({
  onSendMessage,
  isChatEnabled,
  isJoined,
  isConnected,
}) => {
  const [message, setMessage] = useState("");

  const isDisabled =
    !isConnected || !isJoined || !isChatEnabled;

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || isDisabled) return;

    const sent = onSendMessage(trimmedMessage);

    if (sent) {
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const getPlaceholder = () => {
    if (!isConnected) return "Connecting to chat...";
    if (!isJoined) return "Joining chat...";
    if (!isChatEnabled) return "Chat is paused by instructor";

    return "Write a message...";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-gray-200 bg-white p-4"
    >
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={getPlaceholder()}
            disabled={isDisabled}
            maxLength={1000}
            rows={1}
            className="max-h-32 min-h-11 w-full resize-y rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
          />

          <p className="mt-1 text-right text-xs text-gray-400">
            {message.length}/1000
          </p>
        </div>

        <button
          type="submit"
          disabled={isDisabled || !message.trim()}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </div>

      <p className="mt-2 text-xs text-gray-400">
        Press Enter to send · Shift + Enter for a new line
      </p>
    </form>
  );
};

export default MessageInput;
