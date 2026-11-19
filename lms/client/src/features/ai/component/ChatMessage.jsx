
const ChatMessage = ({ message }) => {
    const isAI = message.role === "assistant";

    return (
        <div className={`flex gap-3 mb-7 ${isAI ? "justify-start" : "justify-end"}`}>

            {isAI && (
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
                    ✦
                </div>
            )}

            <div className={`max-w-[85%] md:max-w-[75%] ${isAI ? "" : "flex flex-col items-end"}`}>

                <p className="text-xs font-semibold text-slate-400 mb-2 px-1">
                    {isAI ? "LearnHub AI" : "You"}
                </p>

                <div className={`px-5 py-4 rounded-2xl text-sm leading-7 whitespace-pre-wrap break-words ${
                    isAI
                        ? "bg-slate-800/80 border border-slate-700/70 text-slate-100 rounded-tl-sm"
                        : "bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-tr-sm shadow-lg shadow-violet-900/20"
                }`}>
                    {message.content}
                </div>

            </div>

            {!isAI && (
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-slate-700 flex items-center justify-center text-white text-sm font-semibold">
                    U
                </div>
            )}

        </div>
    );
};

export default ChatMessage;
