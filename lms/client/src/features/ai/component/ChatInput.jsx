
import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";

const ChatInput = ({ onSend, loading }) => {
    const [question, setQuestion] = useState("");
    const [image, setImage] = useState(null);
    const [attachmentError, setAttachmentError] = useState("");
    const imageInputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if ((!question.trim() && !image) || loading) return;

        onSend(question.trim(), image);
        setQuestion("");
        setImage(null);
        setAttachmentError("");
        if (imageInputRef.current) {
            imageInputRef.current.value = "";
        }
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

                        <div className="flex min-w-0 items-center gap-3">
                            <input
                                ref={imageInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                aria-label="Choose an image to send to LearnHub AI"
                                className="hidden"
                                disabled={loading}
                                onChange={(event) => {
                                    const file = event.target.files?.[0] || null;
                                    setAttachmentError("");

                                    if (file && file.size > 5 * 1024 * 1024) {
                                        setImage(null);
                                        setAttachmentError("Image must be 5 MB or smaller.");
                                        event.target.value = "";
                                        return;
                                    }

                                    setImage(file);
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => imageInputRef.current?.click()}
                                disabled={loading}
                                aria-label="Attach image"
                                title="Attach image"
                                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-700 hover:text-violet-300 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ImagePlus size={20} />
                            </button>
                            <p className="truncate text-xs text-slate-500">
                                {image ? image.name : "Shift + Enter for a new line"}
                            </p>
                            {image && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImage(null);
                                        if (imageInputRef.current) {
                                            imageInputRef.current.value = "";
                                        }
                                    }}
                                    aria-label="Remove attached image"
                                    className="flex-shrink-0 text-slate-500 hover:text-white"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={(!question.trim() && !image) || loading}
                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            ↑
                        </button>

                    </div>

                </form>

                {attachmentError && (
                    <p role="alert" className="mt-2 text-xs text-red-400">
                        {attachmentError}
                    </p>
                )}

                <p className="text-center text-[11px] text-slate-500 mt-3">
                    LearnHub AI can make mistakes. Verify important information.
                </p>

            </div>

        </div>
    );
};

export default ChatInput;
