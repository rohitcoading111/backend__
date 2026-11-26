import ChatMessages from "../component/ChatMessages";
import ChatInput from "../component/ChatInput";
import CourseGenerator from "../component/CourseGenerator";
import useAIChat from "../hooks/useAIChat";
import { useSelector } from "react-redux";
import { useState } from "react";

const suggestions = [
    {
        icon: "📚",
        title: "Course Management",
        question: "What services does LearnHub provide?",
    },
    {
        icon: "🎥",
        title: "Live Classes",
        question: "How do live classes work on LearnHub?",
    },
    {
        icon: "🎓",
        title: "Student Learning",
        question: "How can students enroll in courses?",
    },
    {
        icon: "🏢",
        title: "Organization",
        question: "What can an organization administrator do?",
    },
];

const AIChat = () => {
    const user = useSelector((state) => state.auth.user);
    const [showCourseGenerator, setShowCourseGenerator] = useState(false);
    const {
        messages,
        loading,
        error,
        sendMessage,
    } = useAIChat();

    const handleSuggestion = (question) => {
        sendMessage(question);
    };

    return (
        <div className="min-h-screen bg-[#0B1020] text-white flex flex-col">

            {/* Header */}
            <header className="h-[76px] border-b border-slate-800/80 flex items-center justify-between px-5 md:px-10">

                <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xl shadow-lg shadow-violet-500/20">
                        ✦
                    </div>

                    <div>
                        <h1 className="font-bold text-lg tracking-tight">
                            LearnHub <span className="text-violet-400">AI</span>
                        </h1>

                        <p className="text-xs text-slate-400">
                            Your intelligent learning companion
                        </p>
                    </div>

                </div>

                <div className="flex items-center gap-3">
                    {user?.role === "INSTRUCTOR" && (
                        <button
                            type="button"
                            aria-expanded={showCourseGenerator}
                            onClick={() => setShowCourseGenerator((visible) => !visible)}
                            className="rounded-xl border border-violet-500/40 px-3 py-2 text-xs font-semibold text-violet-300 transition hover:bg-violet-500/10"
                        >
                            {showCourseGenerator ? "Close course builder" : "Create course with AI"}
                        </button>
                    )}
                    <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-2">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                        <span className="text-xs font-medium text-emerald-400">
                            Online
                        </span>
                    </div>
                </div>

            </header>

            {showCourseGenerator && user?.role === "INSTRUCTOR" && (
                <div className="px-5 pt-5 md:px-10">
                    <CourseGenerator />
                </div>
            )}

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col min-h-0">

                {messages.length === 0 ? (

                    <div className="flex-1 flex items-center justify-center px-5 py-12">

                        <div className="max-w-3xl w-full text-center">

                            <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-400/20 flex items-center justify-center text-4xl shadow-2xl shadow-violet-900/20 mb-8">
                                ✦
                            </div>

                            <p className="text-sm font-semibold text-violet-400 mb-4 tracking-widest uppercase">
                                LearnHub Intelligence
                            </p>

                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                                How can I help you
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400">
                                    today?
                                </span>
                            </h2>

                            <p className="text-slate-400 mt-5 max-w-xl mx-auto leading-7 text-sm md:text-base">
                                Ask me anything about LearnHub, courses,
                                live classes, student learning and platform features.
                            </p>

                            {/* Suggestions */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-10 text-left">

                                {suggestions.map((item) => (
                                    <button
                                        key={item.title}
                                        onClick={() => handleSuggestion(item.question)}
                                        disabled={loading}
                                        className="group p-4 rounded-2xl bg-slate-800/50 border border-slate-700/70 hover:border-violet-500/60 hover:bg-slate-800 transition-all duration-300 text-left"
                                    >
                                        <div className="flex items-center justify-between">

                                            <div>
                                                <span className="text-xl">
                                                    {item.icon}
                                                </span>

                                                <h3 className="font-semibold text-sm mt-3 text-slate-200 group-hover:text-white">
                                                    {item.title}
                                                </h3>

                                                <p className="text-xs text-slate-500 mt-1">
                                                    Explore LearnHub features
                                                </p>
                                            </div>

                                            <span className="text-slate-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all">
                                                →
                                            </span>

                                        </div>
                                    </button>
                                ))}

                            </div>

                        </div>

                    </div>

                ) : (

                    <ChatMessages />

                )}

                {error && (
                    <div className="max-w-4xl mx-auto w-full px-5 pb-3">
                        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                            {error}
                        </p>
                    </div>
                )}

                <ChatInput
                    onSend={sendMessage}
                    loading={loading}
                />

            </main>

        </div>
    );
};

export default AIChat;
