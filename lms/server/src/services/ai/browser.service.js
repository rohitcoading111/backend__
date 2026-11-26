import { tavily } from "@tavily/core";
import config from "../../config/config.js";

const tavilyClient = tavily({
    apiKey: config.TAVILY_API_KEY,
});

export const searchWeb = async (query) => {
    const response = await tavilyClient.search(query, {
        maxResults: 5,
        searchDepth: "basic",
    });

    return response.results;
};