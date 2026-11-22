
import React from "react";

const categories = [
  {
    name: "Frontend Development",
    technologies: [
      { name: "React", icon: "⚛️", description: "Components, props, state, hooks, rendering and React architecture." },
      { name: "React DOM", icon: "🧩", description: "React rendering and browser DOM integration." },
      { name: "Tailwind CSS", icon: "🎨", description: "Utility-first styling, responsive design and customization." },
      { name: "Framer Motion", icon: "✨", description: "Animations, transitions and motion design." },
      { name: "Lenis", icon: "🧭", description: "Smooth scrolling and scroll experiences." },
      { name: "Lucide React", icon: "🖌️", description: "Icons and visual elements for React interfaces." },
      { name: "React Markdown", icon: "📄", description: "Rendering Markdown content inside React." },
      { name: "Remark GFM", icon: "📋", description: "Markdown tables, task lists and GitHub-flavored syntax." },
    ],
  },
  {
    name: "State Management & Forms",
    technologies: [
      { name: "Redux Toolkit", icon: "🔄", description: "Slices, reducers, actions and state management." },
      { name: "React Redux", icon: "🔗", description: "Connecting React components to Redux." },
      { name: "React Hook Form", icon: "📝", description: "Form management, validation and submission." },
    ],
  },
  {
    name: "Routing & API Integration",
    technologies: [
      { name: "React Router DOM", icon: "🛣️", description: "Routing, nested routes, navigation and layouts." },
      { name: "Axios", icon: "📡", description: "HTTP requests, interceptors and API integration." },
      { name: "React Helmet Async", icon: "🔍", description: "Dynamic metadata and page SEO." },
      { name: "Socket.IO Client", icon: "🔌", description: "Realtime client communication and event handling." },
    ],
  },
  {
    name: "Development Tools",
    technologies: [
      { name: "Vite", icon: "⚡", description: "Development server, builds and frontend tooling." },
      { name: "npm", icon: "📦", description: "Packages, dependencies and scripts." },
      { name: "ES Modules", icon: "📚", description: "Imports, exports and modular JavaScript." },
      { name: "OXLint", icon: "🧹", description: "Linting and static code analysis." },
      { name: "Rollup Plugin Visualizer", icon: "📊", description: "Bundle visualization and dependency analysis." },
    ],
  },
  {
    name: "Backend Development",
    technologies: [
      { name: "Node.js", icon: "🟢", description: "Runtime, event loop, modules and backend JavaScript." },
      { name: "Express.js", icon: "🚀", description: "Routes, middleware, controllers and REST APIs." },
      { name: "Express Validator", icon: "✅", description: "Validation and sanitization of requests." },
      { name: "Multer", icon: "📂", description: "File uploads and multipart form data." },
      { name: "CORS", icon: "🌍", description: "Cross-origin resource sharing." },
      { name: "Cookie Parser", icon: "🍪", description: "Cookie parsing and cookie-based workflows." },
      { name: "Express Rate Limit", icon: "🚦", description: "Rate limiting and request protection." },
      { name: "Nodemon", icon: "🔄", description: "Automatically restarting Node.js during development." },
      { name: "dotenv", icon: "🔐", description: "Environment variables and application configuration." },
    ],
  },
  {
    name: "Database & Caching",
    technologies: [
      { name: "MongoDB", icon: "🍃", description: "Documents, CRUD, aggregation and database indexes." },
      { name: "Mongoose", icon: "🧬", description: "Schemas, models, validation and queries." },
      { name: "Redis", icon: "⚡", description: "Caching, TTL, data structures and optimization." },
      { name: "ioredis", icon: "🔴", description: "Redis client integration with Node.js." },
    ],
  },
  {
    name: "Authentication & Security",
    technologies: [
      { name: "bcrypt", icon: "🔒", description: "Password hashing and password security." },
      { name: "bcryptjs", icon: "🔐", description: "Password hashing implementation in JavaScript." },
      { name: "jsonwebtoken", icon: "🎟️", description: "JWT creation, verification and token-based authentication." },
      { name: "Passport", icon: "🛂", description: "Authentication middleware and strategies." },
      { name: "Passport Google OAuth 2.0", icon: "🔑", description: "Google authentication using Passport." },
    ],
  },
  {
    name: "Realtime & Live Streaming",
    technologies: [
      { name: "Socket.IO", icon: "🔌", description: "Realtime events, rooms and bidirectional communication." },
      { name: "LiveKit Client", icon: "📹", description: "Realtime audio, video and room connectivity." },
      { name: "LiveKit Server SDK", icon: "🖥️", description: "Server-side rooms, tokens and session management." },
      { name: "LiveKit Components React", icon: "🎙️", description: "React components for realtime video applications." },
    ],
  },
  {
    name: "Media & File Management",
    technologies: [
      { name: "ImageKit", icon: "🖼️", description: "Media uploads, delivery and image/video optimization." },
      { name: "Multer", icon: "📂", description: "Handling uploaded files on backend requests." },
    ],
  },
  {
    name: "Payments & Integrations",
    technologies: [
      { name: "Razorpay", icon: "💳", description: "Payment orders, verification and payment integration." },
      { name: "Google APIs", icon: "🧩", description: "Google API integrations and service access." },
      { name: "Google OAuth", icon: "🔑", description: "OAuth authentication integration." },
      { name: "Twilio", icon: "📱", description: "Communication APIs and integrations." },
    ],
  },
  {
    name: "Generative AI",
    technologies: [
      { name: "LangChain", icon: "🦜", description: "LLM integrations, workflows and AI application building." },
      { name: "LangChain Core", icon: "🧠", description: "Core abstractions and runnable components." },
      { name: "LangChain Groq", icon: "⚡", description: "Groq models integration through LangChain." },
      { name: "Groq SDK", icon: "🚀", description: "Direct Groq API integration." },
      { name: "Text Splitters", icon: "✂️", description: "Splitting documents for AI workflows." },
      { name: "Pinecone", icon: "🌲", description: "Vector database and similarity search." },
    ],
  },
  {
    name: "Testing & Performance",
    technologies: [
      { name: "Node Test Runner", icon: "🧪", description: "Built-in Node.js testing framework." },
      { name: "Autocannon", icon: "🏎️", description: "HTTP load testing and performance benchmarking." },
      { name: "Rollup Plugin Visualizer", icon: "📊", description: "Analyzing application bundle composition." },
    ],
  },
];

const TechLibraryPage = () => {
  const totalTechnologies = categories.reduce(
    (total, category) => total + category.technologies.length,
    0
  );

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-12 dark:bg-gray-950 sm:px-10">
      <div className="mx-auto max-w-7xl">

        <header className="mb-14 text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            LearnHub Developer Library
          </span>

          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Technology Library
          </h1>

          <p className="mx-auto max-w-3xl text-gray-600 dark:text-gray-400">
            Explore the technologies, frameworks, libraries and tools
            powering modern web development.
          </p>

          <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
            {totalTechnologies} technologies across {categories.length} categories
          </p>
        </header>

        {categories.map((category) => (
          <section key={category.name} className="mb-14">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {category.name}
              </h2>

              <div className="mt-3 h-1 w-16 rounded-full bg-blue-600" />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {category.technologies.map((tech) => (
                <article
                  key={tech.name}
                  className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-2xl dark:bg-gray-800">
                    {tech.icon}
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {tech.name}
                  </h3>

                  <p className="mb-5 flex-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {tech.description}
                  </p>

                  <button
                    type="button"
                    className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-600 dark:bg-white dark:text-gray-900 dark:hover:bg-blue-400"
                  >
                    Explore →
                  </button>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
};

export default TechLibraryPage;
