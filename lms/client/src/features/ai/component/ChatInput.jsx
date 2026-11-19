import { useState } from "react";

const ChatInput = ({ onSend, loading }) => {
    const [question, setQuestion] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!question.trim() || loading) return;

        onSend(question.trim());

        setQuestion("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 border-t p-4"
        >
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask LearnHub AI anything..."
                disabled={loading}
                className="flex-1 rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
            />

            <button
                type="submit"
                disabled={!question.trim() || loading}
                className="rounded-xl bg-blue-600 px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
                Send
            </button>
        </form>
    );
};

export default ChatInput;
