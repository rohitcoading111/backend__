import { tavily } from "@tavily/core";
import config from "../../config/config.js";

const tavilyClient = tavily({
    apiKey: config.TAVILY_API_KEY,
});