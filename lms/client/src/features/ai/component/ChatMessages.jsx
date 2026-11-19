import { useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";

const ChatMessages = () => {
    const { messages, loading } = useSelector(
        (state) => state.ai
    );

    return (
        <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 && (
                <div className="flex h-full items-center justify-center text-gray-400">
                    <p>Start a conversation with LearnHub AI</p>
                </div>
            )}

            {messages.map((message) => (
                <ChatMessage
                    key={message.id}
                    message={message}
                />
            ))}

            {loading && (
                <p className="text-sm text-gray-400">
                    LearnHub AI is thinking...
                </p>
            )}
        </div>
    );
};

export default ChatMessages;
