import {
  createAICourse,
  streamAIResponse,
} from "../services/ai/ai.service.js";

export const streamAIController = async (req, res) => {
  try {
    // 1. Get question from frontend
    const { question } = req.body ?? {};
    const normalizedQuestion =
      typeof question === "string" ? question.trim() : "";

    // 2. Validate question
    if (!normalizedQuestion && !req.file) {
      return res.status(400).json({
        success: false,
        message: "Please provide a question or attach an image.",
      });
    }

    // 3. Set streaming response headers
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("X-Accel-Buffering", "no");

    // 4. Generate and send AI response chunks
    for await (const chunk of streamAIResponse(
      normalizedQuestion || "Please describe the attached image.",
      { image: req.file ?? null }
    )) {
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

export const createAICourseController = async (req, res) => {
  const prompt = req.body?.prompt;

  if (
    typeof prompt !== "string" ||
    !prompt.trim() ||
    prompt.trim().length > 2000
  ) {
    return res.status(400).json({
      success: false,
      message: "Course prompt must be between 1 and 2000 characters.",
    });
  }

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload a course thumbnail.",
    });
  }

  try {
    const course = await createAICourse({
      prompt: prompt.trim(),
      instructorId: req.user.id,
      organizationId: req.organizationId ?? null,
      thumbnail: req.file,
    });

    return res.status(201).json({
      success: true,
      message: "AI course created successfully as a draft.",
      data: { course },
    });
  } catch (error) {
    console.error("AI Course Generation Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "AI course generation failed.",
    });
  }
};
