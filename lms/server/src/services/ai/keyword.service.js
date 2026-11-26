export const shouldSearchWeb = (question) => {
   const keywords = [
    // Time-sensitive queries
    "latest",
    "today",
    "current",
    "currently",
    "recent",
    "now",
    "this week",
    "this month",
    "yesterday",
    "2026",
    "2025",

    // Search / discovery
    "search",
    "find",
    "look up",
    "lookup",
    "google",
    "on the internet",
    "online",
    "on web",
    "web search",

    // Questions about people / entities
    "who is",
    "who are",
    "tell me about",
    "information about",
    "info about",
    "biography",
    "bio of",
    "profile of",

    // Questions about facts / explanations
    "what is",
    "what are",
    "what happened",
    "why is",
    "why are",
    "how does",
    "how do",
    "explain",

    // News / events
    "news",
    "breaking",
    "headline",
    "headlines",
    "announcement",
    "announced",
    "released",
    "launch",
    "launched",
    "release date",

    // Technology
    "technology",
    "tech",
    "ai model",
    "artificial intelligence",
    "software update",
    "version",
    "github",
    "documentation",

    // Prices / finance / market
    "price",
    "pricing",
    "cost",
    "stock",
    "share price",
    "market",
    "bitcoin",
    "crypto",
    "cryptocurrency",
    "exchange rate",
    "currency",

    // Weather / location-related
    "weather",
    "temperature",
    "forecast",

    // Comparisons / recommendations
    "best",
    "top",
    "compare",
    "comparison",
    "review",
    "reviews",
    "rating",
    "rank",

    // General updates
    "update",
    "updates",
    "status",
    "trend",
    "trending",
];

    return keywords.some((keyword) =>
        question.toLowerCase().includes(keyword)
    );
};