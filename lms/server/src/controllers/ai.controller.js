import { streamAIResponse } from "../services/ai/ai.service.js";

export const streamAIController = async (req, res) => {
    try {
        // 1. Get question from frontend
        const { question } = req.body;

        // 2. Validate question
        if (!question || typeof question !== "string" || !question.trim()) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid question.",
            });
        }

        // 3. Set streaming response headers
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.setHeader("Transfer-Encoding", "chunked");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("X-Accel-Buffering", "no");

        // 4. Generate and send AI response chunks
        for await (const chunk of streamAIResponse(question.trim(), {
    userId: req.user?.id,
    role: req.user?.role,
    organizationId: req.organizationId ?? null,
})) {
    res.write(chunk);
}
        // 5. End response
        res.end();

    } catch (error) {
        console.error("AI Controller Error:", error);

        if (res.headersSent) {
            return res.end();
        }

        return res.status(500).json({
            success: false,
            message: "AI response generation failed.",
        });
    }
};
