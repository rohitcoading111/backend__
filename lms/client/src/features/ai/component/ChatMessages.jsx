
import { useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";

const ChatMessages = () => {
    const { messages, loading } = useSelector(
        (state) => state.ai
    );

    return (
        <div className="flex-1 overflow-y-auto px-4 md:px-10 py-8">

            <div className="max-w-4xl mx-auto">

                {messages.map((message) => (
                    <ChatMessage
                        key={message.id}
                        message={message}
                    />
                ))}

                {loading && (
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white">
                            ✦
                        </div>

                        <div className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 flex gap-1.5 items-center">
                            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" />
                            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce [animation-delay:150ms]" />
                            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce [animation-delay:300ms]" />
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
};

export default ChatMessages;
