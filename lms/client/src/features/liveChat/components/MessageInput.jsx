
import { useRef, useState } from "react";
import { Send } from "lucide-react";

const MessageInput = ({
  onSendMessage,
  isChatEnabled,
  isJoined,
  isConnected,
  remainingCooldownMs,
  isSending,
}) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const isDisabled =
    !isConnected || !isJoined || !isChatEnabled;
  const cooldownSecondsRemaining = Math.ceil(
    remainingCooldownMs / 1000
  );
  const isSendDisabled =
    isDisabled ||
    isSending ||
    cooldownSecondsRemaining > 0 ||
    !message.trim();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || isSendDisabled) return;

    const sent = onSendMessage(trimmedMessage);

    if (sent) {
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "";
      }
    }
  };

  const handleMessageChange = (e) => {
    const textarea = e.currentTarget;
    setMessage(textarea.value);
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 128)}px`;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const getPlaceholder = () => {
    if (!isConnected) return "Connecting...";
    if (!isJoined) return "Joining chat...";
    if (!isChatEnabled) return "Chat paused";

    return "Write a message...";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="shrink-0 border-t border-gray-200 bg-white p-3 sm:p-4"
    >
      <div className="flex min-w-0 items-end gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm transition focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
          placeholder={getPlaceholder()}
          disabled={isDisabled}
          maxLength={1000}
          rows={1}
          className="max-h-32 min-h-10 min-w-0 flex-1 resize-none overflow-y-auto rounded-xl border-0 bg-transparent px-2 py-2 text-sm leading-5 text-gray-800 outline-none placeholder:text-gray-400 focus:ring-0 disabled:cursor-not-allowed disabled:bg-gray-50"
        />

        <button
          type="submit"
          disabled={isSendDisabled}
          aria-busy={isSending}
          className="inline-flex h-10 w-20 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-blue-600 px-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700 active:bg-blue-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          {isSending ? (
            "Sending..."
          ) : cooldownSecondsRemaining > 0 ? (
            `Wait ${cooldownSecondsRemaining}s`
          ) : (
            <>
              <Send size={14} aria-hidden="true" />
              <span>Send</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-1 flex items-center justify-between gap-2 px-1 text-[11px] text-gray-400">
        <span className="hidden min-w-0 truncate sm:block">
          Press Enter to send · Shift + Enter for a new line
        </span>
        <span className="ml-auto shrink-0">{message.length}/1000</span>
      </div>
      {cooldownSecondsRemaining > 0 && (
        <p
          aria-live="polite"
          className="mt-2 text-xs font-medium text-blue-600"
        >
          You can send another message in {cooldownSecondsRemaining}{" "}
          {cooldownSecondsRemaining === 1 ? "second" : "seconds"}.
        </p>
      )}
    </form>
  );
};

export default MessageInput;
