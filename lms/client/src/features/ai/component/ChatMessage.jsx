import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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

               <div className="prose prose-invert prose-sm max-w-none
    prose-headings:text-white
    prose-p:text-slate-200
    prose-strong:text-white
    prose-li:text-slate-200
    prose-a:text-violet-400">

    <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {message.content}
    </ReactMarkdown>

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
