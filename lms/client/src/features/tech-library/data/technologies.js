
export const technologyCategories = [
  {
    name: "Frontend Development",
    technologies: [
      { name: "React", icon: "⚛️", slug: "react", description: "Components, props, state, hooks, rendering and React architecture." },
      { name: "React DOM", icon: "🧩", slug: "react-dom", description: "React rendering and browser DOM integration." },
      { name: "Tailwind CSS", icon: "🎨", slug: "tailwind-css", description: "Utility-first styling, responsive design and customization." },
      { name: "Framer Motion", icon: "✨", slug: "framer-motion", description: "Animations, transitions and motion design." },
      { name: "Lenis", icon: "🧭", slug: "lenis", description: "Smooth scrolling and scroll experiences." },
      { name: "Lucide React", icon: "🖌️", slug: "lucide-react", description: "Icons and visual elements for React interfaces." },
      { name: "React Markdown", icon: "📄", slug: "react-markdown", description: "Rendering Markdown content inside React." },
      { name: "Remark GFM", icon: "📋", slug: "remark-gfm", description: "Markdown tables, task lists and GitHub-flavored syntax." },
    ],
  },
  {
    name: "State Management & Forms",
    technologies: [
      { name: "Redux Toolkit", icon: "🔄", slug: "redux-toolkit", description: "Slices, reducers, actions and state management." },
      { name: "React Redux", icon: "🔗", slug: "react-redux", description: "Connecting React components to Redux." },
      { name: "React Hook Form", icon: "📝", slug: "react-hook-form", description: "Form management, validation and submission." },
    ],
  },
  {
    name: "Routing & API Integration",
    technologies: [
      { name: "React Router DOM", icon: "🛣️", slug: "react-router-dom", description: "Routing, nested routes, navigation and layouts." },
      { name: "Axios", icon: "📡", slug: "axios", description: "HTTP requests, interceptors and API integration." },
      { name: "React Helmet Async", icon: "🔍", slug: "react-helmet-async", description: "Dynamic metadata and page SEO." },
      { name: "Socket.IO Client", icon: "🔌", slug: "socket-io-client", description: "Realtime client communication and event handling." },
    ],
  },
  {
    name: "Development Tools",
    technologies: [
      { name: "Vite", icon: "⚡", slug: "vite", description: "Development server, builds and frontend tooling." },
      { name: "npm", icon: "📦", slug: "npm", description: "Packages, dependencies and scripts." },
      { name: "ES Modules", icon: "📚", slug: "es-modules", description: "Imports, exports and modular JavaScript." },
      { name: "OXLint", icon: "🧹", slug: "oxlint", description: "Linting and static code analysis." },
      { name: "Rollup Plugin Visualizer", icon: "📊", slug: "rollup-plugin-visualizer", description: "Bundle visualization and dependency analysis." },
    ],
  },
  {
    name: "Backend Development",
    technologies: [
      { name: "Node.js", icon: "🟢", slug: "node-js", description: "Runtime, event loop, modules and backend JavaScript." },
      { name: "Express.js", icon: "🚀", slug: "express-js", description: "Routes, middleware, controllers and REST APIs." },
      { name: "Express Validator", icon: "✅", slug: "express-validator", description: "Validation and sanitization of requests." },
      { name: "Multer", icon: "📂", slug: "multer", description: "File uploads and multipart form data." },
      { name: "CORS", icon: "🌍", slug: "cors", description: "Cross-origin resource sharing." },
      { name: "Cookie Parser", icon: "🍪", slug: "cookie-parser", description: "Cookie parsing and cookie-based workflows." },
      { name: "Express Rate Limit", icon: "🚦", slug: "express-rate-limit", description: "Rate limiting and request protection." },
      { name: "Nodemon", icon: "🔄", slug: "nodemon", description: "Automatically restarting Node.js during development." },
      { name: "dotenv", icon: "🔐", slug: "dotenv", description: "Environment variables and application configuration." },
    ],
  },
  {
    name: "Database & Caching",
    technologies: [
      { name: "MongoDB", icon: "🍃", slug: "mongodb", description: "Documents, CRUD, aggregation and database indexes." },
      { name: "Mongoose", icon: "🧬", slug: "mongoose", description: "Schemas, models, validation and queries." },
      { name: "Redis", icon: "⚡", slug: "redis", description: "Caching, TTL, data structures and optimization." },
      { name: "ioredis", icon: "🔴", slug: "ioredis", description: "Redis client integration with Node.js." },
    ],
  },
  {
    name: "Authentication & Security",
    technologies: [
      { name: "bcrypt", icon: "🔒", slug: "bcrypt", description: "Password hashing and password security." },
      { name: "bcryptjs", icon: "🔐", slug: "bcryptjs", description: "Password hashing implementation in JavaScript." },
      { name: "jsonwebtoken", icon: "🎟️", slug: "jsonwebtoken", description: "JWT creation, verification and token-based authentication." },
      { name: "Passport", icon: "🛂", slug: "passport", description: "Authentication middleware and strategies." },
      { name: "Passport Google OAuth 2.0", icon: "🔑", slug: "passport-google-oauth", description: "Google authentication using Passport." },
    ],
  },
  {
    name: "Realtime & Live Streaming",
    technologies: [
      { name: "Socket.IO", icon: "🔌", slug: "socket-io", description: "Realtime events, rooms and bidirectional communication." },
      { name: "LiveKit Client", icon: "📹", slug: "livekit-client", description: "Realtime audio, video and room connectivity." },
      { name: "LiveKit Server SDK", icon: "🖥️", slug: "livekit-server-sdk", description: "Server-side rooms, tokens and session management." },
      { name: "LiveKit Components React", icon: "🎙️", slug: "livekit-components-react", description: "React components for realtime video applications." },
    ],
  },
  {
    name: "Media & File Management",
    technologies: [
      { name: "ImageKit", icon: "🖼️", slug: "imagekit", description: "Media uploads, delivery and image/video optimization." },
    ],
  },
  {
    name: "Payments & Integrations",
    technologies: [
      { name: "Razorpay", icon: "💳", slug: "razorpay", description: "Payment orders, verification and payment integration." },
      { name: "Google APIs", icon: "🧩", slug: "google-apis", description: "Google API integrations and service access." },
      { name: "Google OAuth", icon: "🔑", slug: "google-oauth", description: "OAuth authentication integration." },
      { name: "Twilio", icon: "📱", slug: "twilio", description: "Communication APIs and integrations." },
    ],
  },
  {
    name: "Generative AI",
    technologies: [
      { name: "LangChain", icon: "🦜", slug: "langchain", description: "LLM integrations, workflows and AI application building." },
      { name: "LangChain Core", icon: "🧠", slug: "langchain-core", description: "Core abstractions and runnable components." },
      { name: "LangChain Groq", icon: "⚡", slug: "langchain-groq", description: "Groq models integration through LangChain." },
      { name: "Groq SDK", icon: "🚀", slug: "groq-sdk", description: "Direct Groq API integration." },
      { name: "Text Splitters", icon: "✂️", slug: "text-splitters", description: "Splitting documents for AI workflows." },
      { name: "Pinecone", icon: "🌲", slug: "pinecone", description: "Vector database and similarity search." },
    ],
  },
  {
    name: "Testing & Performance",
    technologies: [
      { name: "Node Test Runner", icon: "🧪", slug: "node-test-runner", description: "Built-in Node.js testing framework." },
      { name: "Autocannon", icon: "🏎️", slug: "autocannon", description: "HTTP load testing and performance benchmarking." },
    ],
  },
];
