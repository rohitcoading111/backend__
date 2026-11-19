const ChatMessage = ({ message }) => {
    const isAI = message.role === "assistant";

    return (
        <div
            className={`flex w-full mb-4 ${
                isAI ? "justify-start" : "justify-end"
            }`}
        >
            <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    isAI
                        ? "bg-gray-100 text-gray-900"
                        : "bg-blue-600 text-white"
                }`}
            >
                <p className="text-sm font-semibold mb-1">
                    {isAI ? "LearnHub AI" : "You"}
                </p>

                <p className="text-sm whitespace-pre-wrap break-words">
                    {message.content}
                </p>
            </div>
        </div>
    );
};

export default ChatMessage;
