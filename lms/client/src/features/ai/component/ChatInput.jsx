
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
        <div className="px-4 md:px-10 pb-6 pt-3">

            <div className="max-w-4xl mx-auto">

                <form
                    onSubmit={handleSubmit}
                    className="relative bg-slate-800/90 border border-slate-700 rounded-2xl p-3 shadow-2xl shadow-black/20 focus-within:border-violet-500/70 transition-all"
                >

                    <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                        placeholder="Message LearnHub AI..."
                        rows={2}
                        disabled={loading}
                        className="w-full resize-none bg-transparent text-slate-100 placeholder:text-slate-500 outline-none px-2 py-2 text-sm leading-6"
                    />

                    <div className="flex items-center justify-between mt-2">

                        <p className="text-xs text-slate-500 px-2">
                            Shift + Enter for a new line
                        </p>

                        <button
                            type="submit"
                            disabled={!question.trim() || loading}
                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            ↑
                        </button>

                    </div>

                </form>

                <p className="text-center text-[11px] text-slate-500 mt-3">
                    LearnHub AI can make mistakes. Verify important information.
                </p>

            </div>

        </div>
    );
};

export default ChatInput;
