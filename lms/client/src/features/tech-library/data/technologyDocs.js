export const technologyDocs = {
  react: {
    title: "React",
    slug: "react",
    description: "A JavaScript library for building component-based user interfaces.",

    overview: "React helps developers build interactive and reusable UI components. It uses declarative rendering and state-driven updates.",

    concepts: [
      { title: "Components", description: "Reusable building blocks of a React UI." },
      { title: "JSX", description: "HTML-like syntax written inside JavaScript." },
      { title: "Props", description: "Data passed from a parent component to a child." },
      { title: "State", description: "Data managed by a component that can change over time." },
      { title: "Hooks", description: "Functions such as useState and useEffect for React features." },
    ],

    examples: [
      {
        title: "Functional Component",
        language: "jsx",
        code: `function Welcome() {
  return <h1>Hello React!</h1>;
}

export default Welcome;`,
      },
      {
        title: "Props",
        language: "jsx",
        code: `function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}

export default function App() {
  return <Greeting name="Developer" />;
}`,
      },
      {
        title: "State",
        language: "jsx",
        code: `import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

export default Counter;`,
      },
    ],

    bestPractices: [
      "Keep components reusable.",
      "Never mutate state directly.",
      "Use meaningful names.",
      "Use keys when rendering lists.",
    ],
  },

  "react-dom": {
    title: "React DOM",
    slug: "react-dom",
    description: "React's package for rendering React components into the browser DOM.",

    overview: "React DOM connects React applications with the browser DOM. It provides APIs such as createRoot to render a React application.",

    concepts: [
      { title: "createRoot", description: "Creates a root for rendering a React application." },
      { title: "DOM Rendering", description: "Displays React elements inside a browser DOM container." },
      { title: "Root", description: "The entry point React uses to manage UI rendering." },
    ],

    examples: [
      {
        title: "Create React Root",
        language: "jsx",
        code: `import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(
  document.getElementById("root")
);

root.render(<App />);`,
      },
    ],

    bestPractices: [
      "Use createRoot for modern React applications.",
      "Render into the intended DOM container.",
      "Avoid unnecessary multiple roots in a typical application.",
    ],
  },

  "tailwind-css": {
    title: "Tailwind CSS",
    slug: "tailwind-css",
    description: "A utility-first CSS framework for rapidly building interfaces.",

    overview: "Tailwind CSS provides utility classes that allow developers to style interfaces directly within markup without creating separate CSS rules for every design.",

    concepts: [
      { title: "Utility Classes", description: "Small classes for specific styling properties." },
      { title: "Responsive Design", description: "Responsive prefixes such as sm:, md: and lg:." },
      { title: "Flexbox", description: "Utilities for flexible layouts." },
      { title: "Grid", description: "Utilities for CSS Grid layouts." },
      { title: "Dark Mode", description: "Utilities for dark-themed interfaces." },
    ],

    examples: [
      {
        title: "Basic Styling",
        language: "jsx",
        code: `<div className="rounded-xl bg-blue-600 p-5 text-white">
  Hello Tailwind
</div>`,
      },
      {
        title: "Responsive Layout",
        language: "jsx",
        code: `<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  <div className="rounded-lg bg-white p-4 shadow">Card 1</div>
  <div className="rounded-lg bg-white p-4 shadow">Card 2</div>
  <div className="rounded-lg bg-white p-4 shadow">Card 3</div>
</div>`,
      },
    ],

    bestPractices: [
      "Use consistent spacing and layout patterns.",
      "Keep utility classes readable.",
      "Extract reusable components for repeated UI.",
      "Use responsive utilities intentionally.",
    ],
  },

  "framer-motion": {
    title: "Framer Motion",
    slug: "framer-motion",
    description: "A motion library for animations in React applications.",

    overview: "Framer Motion provides declarative animation APIs for React components, including transitions, interactive animation and layout movement.",

    concepts: [
      { title: "motion Components", description: "Animated React components such as motion.div." },
      { title: "initial", description: "Defines the initial animation state." },
      { title: "animate", description: "Defines the animation target state." },
      { title: "transition", description: "Controls duration, easing and timing." },
    ],

    examples: [
      {
        title: "Basic Animation",
        language: "jsx",
        code: `import { motion } from "framer-motion";

function AnimatedBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Hello Animation
    </motion.div>
  );
}

export default AnimatedBox;`,
      },
    ],

    bestPractices: [
      "Keep animations purposeful.",
      "Avoid excessive movement.",
      "Use transitions that improve feedback and readability.",
    ],
  },
};