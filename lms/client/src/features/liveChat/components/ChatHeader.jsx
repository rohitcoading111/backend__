
import { useId } from "react";

const ChatHeader = ({
  isConnected,
  isJoined,
  isChatEnabled,
  userRole,
  chatCooldownSeconds,
  onSetCooldown,
  onPauseChat,
  onResumeChat,
}) => {
  const cooldownSelectId = useId();
  const isInstructor = userRole === "INSTRUCTOR";

  const getConnectionStatus = () => {
    if (!isConnected) return "Disconnected";
    if (!isJoined) return "Joining...";
    return "Connected";
  };

  return (
    <div className="bg-white">
      <div className="flex items-center gap-3 px-4 py-3 pr-24">
        <div className="min-w-0">
          <h2 className="truncate text-[15px] font-semibold tracking-tight text-gray-900">
            Live Class Chat
          </h2>

          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                isConnected && isJoined
                  ? "bg-emerald-500"
                  : "bg-gray-300"
              }`}
            />

            <span className="text-xs text-gray-500">
              {getConnectionStatus()}
            </span>

            {isJoined && (
              <>
                <span className="h-1 w-1 rounded-full bg-gray-300" />
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    isChatEnabled
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-orange-50 text-orange-700"
                  }`}
                >
                  {isChatEnabled ? "Chat Active" : "Chat Paused"}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {isInstructor && isJoined && isConnected && (
        <div className="flex items-center gap-2 border-t border-gray-100 bg-gray-50/80 px-4 py-3">
          <label
            htmlFor={cooldownSelectId}
            className="shrink-0 text-[11px] font-semibold uppercase tracking-wide text-gray-500"
          >
            Cooldown
          </label>
          <select
            id={cooldownSelectId}
            value={chatCooldownSeconds}
            onChange={(event) =>
              onSetCooldown(Number(event.target.value))
            }
            className="h-10 min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value={0}>No cooldown</option>
            <option value={5}>5 seconds</option>
            <option value={10}>10 seconds</option>
            <option value={15}>15 seconds</option>
            <option value={30}>30 seconds</option>
            <option value={60}>1 minute</option>
            <option value={300}>5 minutes</option>
          </select>

          <button
            type="button"
            onClick={isChatEnabled ? onPauseChat : onResumeChat}
            className={`h-10 shrink-0 rounded-xl px-3 text-xs font-semibold text-white shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              isChatEnabled
                ? "bg-orange-500 hover:bg-orange-600 focus-visible:ring-orange-400"
                : "bg-emerald-600 hover:bg-emerald-700 focus-visible:ring-emerald-400"
            }`}
          >
            {isChatEnabled ? "Pause Chat" : "Resume Chat"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
