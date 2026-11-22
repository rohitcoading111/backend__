export const technologyDocs = {
  react: {
    title: "React",
    slug: "react",
    category: "Frontend",
    description:
      "React is a JavaScript library for building interactive user interfaces using reusable components.",
    overview: `React is a declarative UI library. Developers build interfaces using components, manage state, respond to user interactions and compose complex applications from smaller UI units.`,
    sections: [
      {
        title: "What is React?",
        content: [
          "React is a UI library developed by Meta.",
          "React uses components to organize interfaces.",
          "React supports declarative UI development.",
          "React is commonly used for SPA development.",
          "React can be used with routing, APIs and state management libraries.",
        ],
      },
      {
        title: "React Features",
        content: [
          "Component-based architecture",
          "Declarative rendering",
          "State management",
          "Props",
          "Hooks",
          "Context",
          "Concurrent rendering capabilities",
          "Reusable UI",
          "Ecosystem integration",
        ],
      },
      {
        title: "Installation",
        code: `npm create vite@latest my-react-app
cd my-react-app
npm install
npm run dev`,
        language: "bash",
      },
      {
        title: "React Project Structure",
        code: `src/
├── components/
├── pages/
├── hooks/
├── services/
├── context/
├── assets/
├── App.jsx
└── main.jsx`,
        language: "text",
      },
      {
        title: "Creating a Component",
        code: `function Welcome() {
  return <h1>Welcome to React</h1>;
}

export default Welcome;`,
        language: "jsx",
      },
      {
        title: "Using a Component",
        code: `import Welcome from "./Welcome";

function App() {
  return (
    <main>
      <Welcome />
    </main>
  );
}

export default App;`,
        language: "jsx",
      },
      {
        title: "JSX",
        content: [
          "JSX allows writing UI-like syntax inside JavaScript.",
          "JSX is transformed into JavaScript by tooling.",
          "JSX expressions can use JavaScript inside curly braces.",
          "JSX attributes use conventions such as className.",
          "JSX requires valid element nesting.",
        ],
        code: `const name = "React";

function App() {
  return <h1>Hello {name}</h1>;
}`,
        language: "jsx",
      },
      {
        title: "Props",
        content: [
          "Props pass data from parent components to child components.",
          "Props are read-only inputs.",
          "Props can contain strings, numbers, objects, arrays and functions.",
        ],
        code: `function User({ name, role }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
}

function App() {
  return (
    <User
      name="Alex"
      role="Developer"
    />
  );
}`,
        language: "jsx",
      },
      {
        title: "State",
        content: [
          "State stores data that can change over time.",
          "Updating state schedules React to render the component.",
          "State should be updated through its setter.",
          "State updates should not mutate existing state directly.",
        ],
        code: `import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>

      <button
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
    </div>
  );
}`,
        language: "jsx",
      },
      {
        title: "Event Handling",
        code: `function Button() {
  function handleClick() {
    alert("Clicked");
  }

  return (
    <button onClick={handleClick}>
      Click
    </button>
  );
}`,
        language: "jsx",
      },
      {
        title: "Conditional Rendering",
        code: `function Status({ loggedIn }) {
  return loggedIn
    ? <h1>Welcome</h1>
    : <h1>Please login</h1>;
}`,
        language: "jsx",
      },
      {
        title: "Rendering Lists",
        code: `function Users({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}`,
        language: "jsx",
      },
      {
        title: "Controlled Input",
        code: `import { useState } from "react";

function Input() {
  const [value, setValue] = useState("");

  return (
    <input
      value={value}
      onChange={event =>
        setValue(event.target.value)
      }
    />
  );
}`,
        language: "jsx",
      },
      {
        title: "Component Composition",
        code: `function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

function App() {
  return (
    <Card>
      <h1>Hello</h1>
    </Card>
  );
}`,
        language: "jsx",
      },
      {
        title: "React Best Practices",
        content: [
          "Keep components focused.",
          "Use reusable components.",
          "Keep state close to where it is needed.",
          "Use stable list keys.",
          "Avoid unnecessary state.",
          "Avoid unnecessary renders.",
          "Keep side effects inside appropriate hooks.",
          "Use meaningful component names.",
          "Keep API logic separate from UI.",
          "Use error handling.",
        ],
      },
      {
        title: "Common Mistakes",
        content: [
          "Mutating state directly.",
          "Using array indexes as keys for dynamic lists.",
          "Calling hooks conditionally.",
          "Using effects for unnecessary derived state.",
          "Creating overly large components.",
          "Ignoring loading and error states.",
          "Using unstable dependencies in effects.",
        ],
      },
    ],
  },
    "react-router-dom": {
    title: "React Router DOM",
    slug: "react-router-dom",
    category: "Frontend",
    description:
      "React Router DOM enables client-side routing and navigation in React applications.",
    overview:
      "React Router lets users navigate between pages without full-page reloads.",

    sections: [
      {
        title: "Installation",
        code: `npm install react-router-dom`,
        language: "bash",
      },
      {
        title: "Basic Setup",
        code: `import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}`,
        language: "jsx",
      },
      {
        title: "Link Navigation",
        code: `import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}`,
        language: "jsx",
      },
      {
        title: "useNavigate",
        code: `import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/dashboard");
  }

  return (
    <button onClick={handleLogin}>
      Login
    </button>
  );
}`,
        language: "jsx",
      },
      {
        title: "Dynamic Routes",
        code: `<Routes>
  <Route path="/users/:id" element={<User />} />
</Routes>`,
        language: "jsx",
      },
      {
        title: "useParams",
        code: `import { useParams } from "react-router-dom";

function User() {
  const { id } = useParams();

  return <h1>User ID: {id}</h1>;
}`,
        language: "jsx",
      },
      {
        title: "Nested Routes",
        code: `import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}`,
        language: "jsx",
      },
      {
        title: "Outlet",
        code: `import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <Outlet />
    </div>
  );
}`,
        language: "jsx",
      },
      {
        title: "Navigate",
        code: `import { Navigate } from "react-router-dom";

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}`,
        language: "jsx",
      },
      {
        title: "useLocation",
        code: `import { useLocation } from "react-router-dom";

function CurrentPage() {
  const location = useLocation();

  return <p>{location.pathname}</p>;
}`,
        language: "jsx",
      },
      {
        title: "Query Parameters",
        code: `import { useSearchParams } from "react-router-dom";

function Search() {
  const [params, setParams] = useSearchParams();

  const search = params.get("q") || "";

  return (
    <div>
      <input
        value={search}
        onChange={event =>
          setParams({ q: event.target.value })
        }
      />
    </div>
  );
}`,
        language: "jsx",
      },
      {
        title: "404 Route",
        code: `<Routes>
  <Route path="/" element={<Home />} />
  <Route path="*" element={<NotFound />} />
</Routes>`,
        language: "jsx",
      },
      {
        title: "Lazy Route",
        code: `import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Dashboard = lazy(
  () => import("./pages/Dashboard")
);

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
      </Routes>
    </Suspense>
  );
}`,
        language: "jsx",
      },
      {
        title: "Router Best Practices",
        content: [
          "Use Link for navigation.",
          "Use useNavigate for programmatic navigation.",
          "Use Outlet for nested layouts.",
          "Use dynamic routes for resource IDs.",
          "Use route-level lazy loading where appropriate.",
          "Handle unknown routes.",
          "Implement authorization on the server as well as frontend route guards.",
        ],
      },
    ],
  },
   "@reduxjs/toolkit": {
    title: "Redux Toolkit",
    slug: "redux-toolkit",
    category: "Frontend",
    description:
      "Redux Toolkit simplifies Redux state management with slices, reducers, actions and async workflows.",
    overview:
      "Redux Toolkit is the recommended way to write Redux logic. It reduces boilerplate and provides convenient APIs for creating stores, reducers and async logic.",

    sections: [
      {
        title: "Installation",
        code: `npm install @reduxjs/toolkit react-redux`,
        language: "bash",
      },
      {
        title: "Create a Slice",
        code: `import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    reset(state) {
      state.value = 0;
    },
  },
});

export const {
  increment,
  decrement,
  reset,
} = counterSlice.actions;

export default counterSlice.reducer;`,
        language: "js",
      },
      {
        title: "Configure Store",
        code: `import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});`,
        language: "js",
      },
      {
        title: "Provider Setup",
        code: `import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}`,
        language: "jsx",
      },
      {
        title: "useSelector",
        code: `import { useSelector } from "react-redux";

function CounterValue() {
  const count = useSelector(
    state => state.counter.value
  );

  return <h1>{count}</h1>;
}`,
        language: "jsx",
      },
      {
        title: "useDispatch",
        code: `import { useDispatch } from "react-redux";
import { increment } from "./counterSlice";

function IncrementButton() {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(increment())}>
      Increment
    </button>
  );
}`,
        language: "jsx",
      },
      {
        title: "Complete Counter",
        code: `import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  reset,
} from "./counterSlice";

function Counter() {
  const count = useSelector(
    state => state.counter.value
  );

  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>

      <button onClick={() => dispatch(increment())}>
        +
      </button>

      <button onClick={() => dispatch(decrement())}>
        -
      </button>

      <button onClick={() => dispatch(reset())}>
        Reset
      </button>
    </div>
  );
}`,
        language: "jsx",
      },
      {
        title: "Multiple Slices",
        code: `import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;`,
        language: "js",
      },
      {
        title: "createAsyncThunk",
        code: `import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const response = await axios.get(
      "/api/users"
    );

    return response.data;
  }
);`,
        language: "js",
      },
      {
        title: "Async Slice",
        code: `import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./userThunks";

const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, state => {
        state.loading = false;
        state.error = "Failed to fetch users";
      });
  },
});

export default userSlice.reducer;`,
        language: "js",
      },
      {
        title: "Dispatch Async Thunk",
        code: `import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./userThunks";

function Users() {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    state => state.users
  );

  return (
    <div>
      <button onClick={() => dispatch(fetchUsers())}>
        Load Users
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {data.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}`,
        language: "jsx",
      },
      {
        title: "Redux Toolkit Best Practices",
        content: [
          "Use configureStore.",
          "Use createSlice for feature state.",
          "Use useSelector to read state.",
          "Use useDispatch to dispatch actions.",
          "Use createAsyncThunk for suitable async workflows.",
          "Split state into logical slices.",
          "Avoid putting unnecessary local UI state into Redux.",
          "Keep selectors focused.",
        ],
      },
    ],
  },
   "react-redux": {
    title: "React Redux",
    slug: "react-redux",
    category: "Frontend",
    description:
      "React Redux connects React components with a Redux store using Provider, useSelector and useDispatch.",
    overview:
      "React Redux is the official React binding for Redux. It allows components to subscribe to store state and dispatch actions.",

    sections: [
      {
        title: "Installation",
        code: `npm install react-redux`,
        language: "bash",
      },
      {
        title: "Provider",
        content:
          "Provider makes the Redux store available to nested React components through context.",
        code: `import { Provider } from "react-redux";
import { store } from "./store";

function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}`,
        language: "jsx",
      },
      {
        title: "useSelector",
        content:
          "useSelector reads data from the Redux store. The component re-renders when its selected state changes.",
        code: `import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector(
    state => state.auth.user
  );

  return <h1>{user?.name}</h1>;
}`,
        language: "jsx",
      },
      {
        title: "useDispatch",
        content:
          "useDispatch returns the dispatch function used to send actions to the Redux store.",
        code: `import { useDispatch } from "react-redux";
import { logout } from "./authSlice";

function LogoutButton() {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(logout())}>
      Logout
    </button>
  );
}`,
        language: "jsx",
      },
      {
        title: "Reading Multiple Values",
        code: `import { useSelector } from "react-redux";

function Dashboard() {
  const isAuthenticated = useSelector(
    state => state.auth.isAuthenticated
  );

  const cartItems = useSelector(
    state => state.cart.items
  );

  return (
    <div>
      <p>{isAuthenticated ? "Logged In" : "Guest"}</p>
      <p>Cart: {cartItems.length}</p>
    </div>
  );
}`,
        language: "jsx",
      },
      {
        title: "Dispatching Actions",
        code: `const dispatch = useDispatch();

dispatch(increment());
dispatch(addToCart(product));
dispatch(logout());`,
        language: "js",
      },
      {
        title: "Typed Hooks Pattern",
        content:
          "In larger applications, reusable custom hooks can centralize selector and dispatch usage. In TypeScript projects, define useAppDispatch and useAppSelector with store types.",
        code: `// TypeScript example
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch =
  useDispatch.withTypes<AppDispatch>();

export const useAppSelector =
  useSelector.withTypes<RootState>();`,
        language: "ts",
      },
      {
        title: "Best Practices",
        content: [
          "Use Provider once near the application root.",
          "Use useSelector for state access.",
          "Use useDispatch for dispatching actions.",
          "Select only the state your component needs.",
          "Avoid unnecessarily selecting the entire store.",
          "Use typed hooks in TypeScript applications.",
          "Keep component-specific UI state in local React state when appropriate.",
        ],
      },
    ],
  },
   "tailwind-css": {
    title: "Tailwind CSS",
    slug: "tailwind-css",
    category: "Frontend",
    description:
      "Tailwind CSS is a utility-first CSS framework for building modern responsive interfaces.",
    overview:
      "Tailwind CSS provides utility classes for styling layout, spacing, typography, colors, responsive designs and states without writing traditional CSS for every component.",

    sections: [
      {
        title: "Installation",
        content:
          "Tailwind CSS 4 supports a CSS-first setup. For Vite projects, use the official Vite plugin.",
        code: `npm install tailwindcss @tailwindcss/vite`,
        language: "bash",
      },
      {
        title: "Vite Configuration",
        code: `import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});`,
        language: "js",
      },
      {
        title: "CSS Setup",
        code: `@import "tailwindcss";`,
        language: "css",
      },
      {
        title: "Basic Styling",
        code: `<div className="p-6 bg-blue-500 text-white rounded-xl">
  Hello Tailwind
</div>`,
        language: "jsx",
      },
      {
        title: "Spacing",
        code: `<div className="p-4 m-2 mt-6 px-8 py-3">
  Spacing Example
</div>`,
        language: "jsx",
      },
      {
        title: "Flexbox",
        code: `<div className="flex items-center justify-between gap-4">
  <div>Left</div>
  <div>Right</div>
</div>`,
        language: "jsx",
      },
      {
        title: "Grid",
        code: `<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>`,
        language: "jsx",
      },
      {
        title: "Responsive Design",
        code: `<div className="text-sm md:text-lg lg:text-2xl">
  Responsive Text
</div>`,
        language: "jsx",
      },
      {
        title: "Hover and Focus",
        code: `<button className="bg-blue-500 hover:bg-blue-700 focus:ring-2 focus:ring-blue-300">
  Click Me
</button>`,
        language: "jsx",
      },
      {
        title: "Dark Mode",
        code: `<div className="bg-white text-black dark:bg-gray-900 dark:text-white">
  Dark Mode Content
</div>`,
        language: "jsx",
      },
      {
        title: "Conditional Classes",
        code: `const active = true;

<button className={active
  ? "bg-green-500 text-white"
  : "bg-gray-200 text-black"
}>
  Status
</button>`,
        language: "jsx",
      },
      {
        title: "Custom Values",
        code: `<div className="w-[350px] h-[200px] text-[18px]">
  Custom Dimensions
</div>`,
        language: "jsx",
      },
      {
        title: "Common Utilities",
        content: [
          "p-4 / px-4 / py-4: padding",
          "m-4 / mx-auto: margin",
          "w-full / h-screen: dimensions",
          "flex / grid: layouts",
          "items-center / justify-center: alignment",
          "rounded-lg / rounded-xl: border radius",
          "shadow-md: shadows",
          "font-bold / text-lg: typography",
          "bg-* / text-*: colors",
          "border / ring-*: borders and outlines",
          "hidden / block: display",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Use responsive prefixes for different screen sizes.",
          "Use reusable components for repeated UI patterns.",
          "Avoid unnecessarily huge class strings.",
          "Use consistent spacing and typography.",
          "Use Tailwind CSS 4 CSS-first configuration where appropriate.",
          "Use conditional class utilities carefully.",
        ],
      },
    ],
  },
    "framer-motion": {
    title: "Framer Motion",
    slug: "framer-motion",
    category: "Frontend",
    description:
      "Framer Motion is a React animation library for declarative animations, transitions and interactive motion effects.",
    overview:
      "Framer Motion allows React developers to create animations using component props, variants, gestures, transitions and scroll-based effects.",

    sections: [
      {
        title: "Installation",
        code: `npm install framer-motion`,
        language: "bash",
      },
      {
        title: "Basic Animation",
        code: `import { motion } from "framer-motion";

function Box() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Hello Animation
    </motion.div>
  );
}`,
        language: "jsx",
      },
      {
        title: "Initial and Animate",
        content:
          "initial defines the starting state and animate defines the target animation state.",
        code: ` <motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
>
  Content
</motion.div>`,
        language: "jsx",
      },
      {
        title: "Transition",
        code: `<motion.div
  animate={{ x: 100 }}
  transition={{
    duration: 0.5,
    ease: "easeInOut",
  }}
/>`,
        language: "jsx",
      },
      {
        title: "Hover Animation",
        code: `<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click Me
</motion.button>`,
        language: "jsx",
      },
      {
        title: "Variants",
        content:
          "Variants define reusable animation states that can be shared between parent and child motion components.",
        code: `const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

function Card() {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      Card Content
    </motion.div>
  );
}`,
        language: "jsx",
      },
      {
        title: "Stagger Children",
        code: `const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function List() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {[1, 2, 3].map(value => (
        <motion.div
          key={value}
          variants={item}
        >
          Item {value}
        </motion.div>
      ))}
    </motion.div>
  );
}`,
        language: "jsx",
      },
      {
        title: "Exit Animation",
        content:
          "AnimatePresence allows components to animate when removed from the React tree.",
        code: `import { AnimatePresence, motion } from "framer-motion";

function Modal({ open }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Modal Content
        </motion.div>
      )}
    </AnimatePresence>
  );
}`,
        language: "jsx",
      },
      {
        title: "Scroll Animation",
        code: `import { motion } from "framer-motion";

function Section() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      Scroll Content
    </motion.div>
  );
}`,
        language: "jsx",
      },
      {
        title: "Layout Animation",
        code: `<motion.div layout>
  Animated Layout
</motion.div>`,
        language: "jsx",
      },
      {
        title: "Drag",
        code: `<motion.div
  drag
  dragConstraints={{
    left: -100,
    right: 100,
    top: -100,
    bottom: 100,
  }}
>
  Drag Me
</motion.div>`,
        language: "jsx",
      },
      {
        title: "Common Properties",
        content: [
          "initial: initial animation state",
          "animate: target animation state",
          "exit: animation before removal",
          "transition: animation timing and behavior",
          "whileHover: hover interaction",
          "whileTap: press interaction",
          "whileInView: viewport-based animation",
          "variants: reusable animation definitions",
          "layout: layout transition animations",
          "drag: draggable interaction",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Prefer reusable variants for repeated animations.",
          "Avoid excessive animation on large component trees.",
          "Use AnimatePresence for exit animations.",
          "Use viewport options for scroll-based animation.",
          "Respect reduced-motion preferences.",
          "Keep animation durations appropriate for the interaction.",
        ],
      },
    ],
  },
    "lenis": {
    title: "Lenis",
    slug: "lenis",
    category: "Frontend",
    description:
      "Lenis is a smooth scrolling library that creates fluid and customizable scrolling experiences.",
    overview:
      "Lenis improves scrolling behavior by smoothing scroll movement. It is commonly used in portfolios, landing pages and animation-focused websites.",

    sections: [
      {
        title: "Installation",
        code: `npm install lenis`,
        language: "bash",
      },
      {
        title: "Basic Setup",
        code: `import Lenis from "lenis";
import "lenis/dist/lenis.css";

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);`,
        language: "js",
      },
      {
        title: "React Integration",
        code: `import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}

export default SmoothScroll;`,
        language: "jsx",
      },
      {
        title: "Scroll to Element",
        code: `lenis.scrollTo("#contact", {
  duration: 1.5,
});`,
        language: "js",
      },
      {
        title: "Scroll to Top",
        code: `lenis.scrollTo(0, {
  duration: 1,
});`,
        language: "js",
      },
      {
        title: "Stop and Start Scrolling",
        code: `lenis.stop();

// Resume scrolling
lenis.start();`,
        language: "js",
      },
      {
        title: "Useful Options",
        code: `const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
  wheelMultiplier: 1,
});`,
        language: "js",
      },
      {
        title: "Useful Methods",
        content: [
          "raf(time): updates the scroll animation frame.",
          "scrollTo(target): scrolls to a target.",
          "start(): resumes scrolling.",
          "stop(): stops scrolling.",
          "destroy(): destroys the Lenis instance.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Initialize Lenis only once for the intended scrolling context.",
          "Clean up the instance in React useEffect.",
          "Avoid creating multiple animation loops.",
          "Test touch scrolling on mobile devices.",
          "Respect reduced-motion preferences.",
          "Use Lenis only when smooth scrolling adds value.",
        ],
      },
    ],
  },
    "lucide-react": {
    title: "Lucide React",
    slug: "lucide-react",
    category: "Frontend",
    description:
      "Lucide React provides customizable SVG icons for React applications.",
    overview:
      "Lucide React is an icon library offering consistent, lightweight SVG icons that can be customized through props such as size, color and strokeWidth.",

    sections: [
      {
        title: "Installation",
        code: `npm install lucide-react`,
        language: "bash",
      },
      {
        title: "Import Icons",
        code: `import {
  Home,
  Search,
  User,
  Settings,
} from "lucide-react";`,
        language: "jsx",
      },
      {
        title: "Basic Usage",
        code: `import { Home } from "lucide-react";

function HomeButton() {
  return (
    <button>
      <Home />
      Home
    </button>
  );
}`,
        language: "jsx",
      },
      {
        title: "Icon Customization",
        code: `<Search
  size={24}
  color="blue"
  strokeWidth={2}
/>`,
        language: "jsx",
      },
      {
        title: "Icons in Navigation",
        code: `import {
  LayoutDashboard,
  BookOpen,
  Settings,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Courses",
    icon: BookOpen,
  },
  {
    label: "Settings",
    icon: Settings,
  },
];

function Navigation() {
  return (
    <nav>
      {navItems.map(item => {
        const Icon = item.icon;

        return (
          <div key={item.label}>
            <Icon size={20} />
            {item.label}
          </div>
        );
      })}
    </nav>
  );
}`,
        language: "jsx",
      },
      {
        title: "Conditional Icons",
        code: `import { Eye, EyeOff } from "lucide-react";

const Icon = visible ? Eye : EyeOff;

<Icon size={20} />`,
        language: "jsx",
      },
      {
        title: "Common Props",
        content: [
          "size: icon dimensions.",
          "color: icon stroke color.",
          "strokeWidth: stroke thickness.",
          "className: custom styling.",
          "absoluteStrokeWidth: maintains consistent stroke width.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Import only the icons you need.",
          "Use consistent icon sizing across the UI.",
          "Use className for Tailwind styling.",
          "Use icons with labels where clarity is needed.",
          "Avoid using icons alone for actions when their meaning is unclear.",
        ],
      },
    ],
  },
    "axios": {
    title: "Axios",
    slug: "axios",
    category: "Frontend",
    description:
      "Axios is a promise-based HTTP client for making API requests from browsers and Node.js.",
    overview:
      "Axios simplifies HTTP communication by providing request methods, interceptors, automatic JSON handling, configurable headers and centralized API configuration.",

    sections: [
      {
        title: "Installation",
        code: `npm install axios`,
        language: "bash",
      },
      {
        title: "GET Request",
        code: `import axios from "axios";

async function getUsers() {
  const response = await axios.get("/api/users");

  return response.data;
}`,
        language: "js",
      },
      {
        title: "POST Request",
        code: `const response = await axios.post(
  "/api/users",
  {
    name: "John",
    email: "john@example.com",
  }
);`,
        language: "js",
      },
      {
        title: "PUT and PATCH",
        code: `await axios.put("/api/users/1", userData);

await axios.patch("/api/users/1", {
  name: "Updated Name",
});`,
        language: "js",
      },
      {
        title: "DELETE Request",
        code: `await axios.delete("/api/users/1");`,
        language: "js",
      },
      {
        title: "Axios Instance",
        content:
          "Create a reusable Axios instance to centralize the base URL, timeout and common configuration.",
        code: `import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;`,
        language: "js",
      },
      {
        title: "Using Axios Instance",
        code: `import api from "./api";

export const getCourses = async () => {
  const response = await api.get("/courses");

  return response.data;
};`,
        language: "js",
      },
      {
        title: "Request Interceptor",
        content:
          "Request interceptors run before requests are sent. They are useful for attaching common headers or handling request configuration.",
        code: `api.interceptors.request.use(
  config => {
    // Attach required request configuration
    return config;
  },
  error => Promise.reject(error)
);`,
        language: "js",
      },
      {
        title: "Response Interceptor",
        code: `api.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);`,
        language: "js",
      },
      {
        title: "Error Handling",
        code: `try {
  const response = await api.get("/courses");
  return response.data;
} catch (error) {
  if (error.response) {
    console.log(error.response.status);
    console.log(error.response.data);
  } else if (error.request) {
    console.log("No response received");
  } else {
    console.log(error.message);
  }
}`,
        language: "js",
      },
      {
        title: "Query Parameters",
        code: `const response = await api.get("/courses", {
  params: {
    page: 1,
    limit: 10,
    category: "development",
  },
});`,
        language: "js",
      },
      {
        title: "Uploading Files",
        code: `const formData = new FormData();

formData.append("file", file);

await api.post("/upload", formData);`,
        language: "js",
      },
      {
        title: "HTTP Methods",
        content: [
          "axios.get(): retrieves data.",
          "axios.post(): creates data.",
          "axios.put(): replaces data.",
          "axios.patch(): updates partial data.",
          "axios.delete(): deletes data.",
          "axios.request(): custom request configuration.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Use a centralized Axios instance.",
          "Separate API services from React components.",
          "Use interceptors for common request and response logic.",
          "Handle network errors and HTTP errors.",
          "Avoid duplicating API configuration.",
          "Never expose secret credentials in frontend environment variables.",
          "Use secure authentication strategies for token handling.",
        ],
      },
    ],
  },
    "react-helmet-async": {
    title: "React Helmet Async",
    slug: "react-helmet-async",
    category: "Frontend",
    description:
      "React Helmet Async manages document head metadata dynamically in React applications.",
    overview:
      "React Helmet Async allows components to update document metadata such as page titles, descriptions, meta tags and link tags. It is useful for page-specific SEO metadata in React applications.",

    sections: [
      {
        title: "Installation",
        code: `npm install react-helmet-async`,
        language: "bash",
      },
      {
        title: "HelmetProvider Setup",
        code: `import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <MainApp />
    </HelmetProvider>
  );
}`,
        language: "jsx",
      },
      {
        title: "Page Title",
        code: `import { Helmet } from "react-helmet-async";

function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home | LearnHub</title>
      </Helmet>

      <h1>Home Page</h1>
    </>
  );
}`,
        language: "jsx",
      },
      {
        title: "Meta Description",
        code: `<Helmet>
  <title>Courses | LearnHub</title>

  <meta
    name="description"
    content="Explore programming courses on LearnHub."
  />
</Helmet>`,
        language: "jsx",
      },
      {
        title: "Dynamic Metadata",
        code: `function CoursePage({ course }) {
  return (
    <>
      <Helmet>
        <title>{course.title} | LearnHub</title>

        <meta
          name="description"
          content={course.description}
        />
      </Helmet>

      <h1>{course.title}</h1>
    </>
  );
}`,
        language: "jsx",
      },
      {
        title: "Open Graph Metadata",
        code: `<Helmet>
  <meta property="og:title" content="LearnHub" />

  <meta
    property="og:description"
    content="Learn modern technologies."
  />

  <meta
    property="og:type"
    content="website"
  />

  <meta
    property="og:image"
    content="https://example.com/image.jpg"
  />
</Helmet>`,
        language: "jsx",
      },
      {
        title: "Canonical Link",
        code: `<Helmet>
  <link
    rel="canonical"
    href="https://example.com/courses"
  />
</Helmet>`,
        language: "jsx",
      },
      {
        title: "Common Features",
        content: [
          "title: changes the document title.",
          "meta: adds metadata.",
          "link: adds link elements such as canonical URLs.",
          "script: manages script tags when appropriate.",
          "htmlAttributes: manages HTML element attributes.",
          "bodyAttributes: manages body attributes.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Use unique titles for important pages.",
          "Add descriptive meta descriptions.",
          "Use canonical URLs where appropriate.",
          "Use social metadata for shareable pages.",
          "Avoid duplicate metadata across routes.",
          "Metadata alone does not guarantee SEO indexing.",
          "For SEO-critical content, server-rendering or static rendering can be more effective than client-only metadata.",
        ],
      },
    ],
  },
    "react-hook-form": {
    title: "React Hook Form",
    slug: "react-hook-form",
    category: "Frontend",
    description:
      "React Hook Form is a library for performant, flexible and extensible form handling in React.",
    overview:
      "React Hook Form simplifies form registration, validation, submission and error management while minimizing unnecessary re-renders.",

    sections: [
      {
        title: "Installation",
        code: `npm install react-hook-form`,
        language: "bash",
      },
      {
        title: "Basic Form",
        code: `import { useForm } from "react-hook-form";

function LoginForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />

      <input {...register("password")} />

      <button type="submit">Submit</button>
    </form>
  );
}`,
        language: "jsx",
      },
      {
        title: "Register Fields",
        content:
          "register connects input elements with React Hook Form and tracks their values.",
        code: `const { register } = useForm();

<input {...register("username")} />
<input {...register("email")} />
<input {...register("password")} />`,
        language: "jsx",
      },
      {
        title: "Validation",
        code: `const { register, handleSubmit } = useForm();

<input
  {...register("email", {
    required: "Email is required",
    pattern: {
      value: /^[^@]+@[^@]+\\.[^@]+$/,
      message: "Invalid email",
    },
  })}
/>`,
        language: "jsx",
      },
      {
        title: "Displaying Errors",
        code: `const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();

<input
  {...register("email", {
    required: "Email is required",
  })}
/>

{errors.email && (
  <p>{errors.email.message}</p>
)}`,
        language: "jsx",
      },
      {
        title: "Submit Handling",
        code: `const { handleSubmit } = useForm();

const onSubmit = async data => {
  await api.post("/auth/login", data);
};

<form onSubmit={handleSubmit(onSubmit)}>
  {/* fields */}
</form>`,
        language: "jsx",
      },
      {
        title: "Default Values",
        code: `const { register } = useForm({
  defaultValues: {
    name: "",
    email: "",
  },
});`,
        language: "jsx",
      },
      {
        title: "Watch Values",
        code: `const { watch } = useForm();

const email = watch("email");

console.log(email);`,
        language: "jsx",
      },
      {
        title: "Reset Form",
        code: `const { reset } = useForm();

reset({
  name: "",
  email: "",
});`,
        language: "jsx",
      },
      {
        title: "Controller",
        content:
          "Controller connects controlled or third-party input components that don't work directly with register.",
        code: `import { Controller, useForm } from "react-hook-form";

const { control } = useForm();

<Controller
  name="category"
  control={control}
  render={({ field }) => (
    <select {...field}>
      <option value="">Select</option>
      <option value="tech">Tech</option>
    </select>
  )}
/>`,
        language: "jsx",
      },
      {
        title: "Useful APIs",
        content: [
          "useForm(): initializes form management.",
          "register(): registers input fields.",
          "handleSubmit(): handles valid form submission.",
          "formState.errors: contains validation errors.",
          "formState.isSubmitting: submission status.",
          "watch(): observes field values.",
          "getValues(): reads form values.",
          "setValue(): updates a field value.",
          "reset(): resets form values.",
          "Controller: integrates controlled inputs.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Use register for standard HTML inputs.",
          "Use validation rules for field validation.",
          "Use Controller for controlled components when needed.",
          "Keep submission logic separate from UI where appropriate.",
          "Disable submit buttons while submitting.",
          "Validate important data on the backend as well.",
        ],
      },
    ],
  },
    "react-markdown": {
    title: "React Markdown",
    slug: "react-markdown",
    category: "Frontend",
    description:
      "React Markdown renders Markdown content as React components without directly using dangerouslySetInnerHTML.",
    overview:
      "React Markdown converts Markdown syntax into React elements. It is commonly used for documentation, blog content, chat responses and rich text rendering.",

    sections: [
      {
        title: "Installation",
        code: `npm install react-markdown`,
        language: "bash",
      },
      {
        title: "Basic Usage",
        code: `import ReactMarkdown from "react-markdown";

function MarkdownContent() {
  const content = "# Hello\\n\\nThis is Markdown.";

  return <ReactMarkdown>{content}</ReactMarkdown>;
}`,
        language: "jsx",
      },
      {
        title: "Headings and Text",
        code: `const content = \`
# Heading 1

## Heading 2

**Bold text**

*Italic text*

This is a paragraph.
\`;

<ReactMarkdown>{content}</ReactMarkdown>`,
        language: "jsx",
      },
      {
        title: "Lists",
        code: `const content = \`
- React
- Node.js
- MongoDB

1. First
2. Second
3. Third
\`;

<ReactMarkdown>{content}</ReactMarkdown>`,
        language: "jsx",
      },
      {
        title: "Code Blocks",
        code: `const content = \`
\`\`\`js
const greeting = "Hello";
console.log(greeting);
\`\`\`
\`;

<ReactMarkdown>{content}</ReactMarkdown>`,
        language: "jsx",
      },
      {
        title: "Custom Components",
        code: `<ReactMarkdown
  components={{
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold">
        {children}
      </h1>
    ),
    p: ({ children }) => (
      <p className="leading-7 text-gray-600">
        {children}
      </p>
    ),
  }}
>
  {content}
</ReactMarkdown>`,
        language: "jsx",
      },
      {
        title: "GitHub Flavored Markdown",
        content:
          "Remark GFM adds support for GitHub Flavored Markdown features such as tables, task lists, strikethrough and autolinks.",
        code: `npm install remark-gfm`,
        language: "bash",
      },
      {
        title: "Using Remark GFM",
        code: `import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

<ReactMarkdown remarkPlugins={[remarkGfm]}>
  {content}
</ReactMarkdown>`,
        language: "jsx",
      },
      {
        title: "Markdown Table",
        code: `const content = \`
| Name | Role |
|---|---|
| Alex | Developer |
| Sam | Designer |
\`;

<ReactMarkdown remarkPlugins={[remarkGfm]}>
  {content}
</ReactMarkdown>`,
        language: "jsx",
      },
      {
        title: "Useful Features",
        content: [
          "Render headings and paragraphs.",
          "Render lists and blockquotes.",
          "Render inline code and code blocks.",
          "Customize rendered HTML-like elements with React components.",
          "Use remark plugins to extend Markdown processing.",
          "Use remark-gfm for GitHub Flavored Markdown.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Avoid rendering untrusted raw HTML without carefully configured sanitization.",
          "Use plugins only when required.",
          "Customize components for consistent UI.",
          "Use remark-gfm when tables or task lists are needed.",
          "For syntax highlighting, integrate an appropriate code-highlighting library if available.",
        ],
      },
    ],
  },
   "remark-gfm": {
    title: "Remark GFM",
    slug: "remark-gfm",
    category: "Frontend",
    description:
      "Remark GFM extends Markdown processing with GitHub Flavored Markdown features.",
    overview:
      "Remark GFM is a plugin for the remark ecosystem that adds support for GitHub Flavored Markdown syntax such as tables, task lists, strikethrough and autolinks.",

    sections: [
      {
        title: "Installation",
        code: `npm install remark-gfm`,
        language: "bash",
      },
      {
        title: "Basic Setup",
        content:
          "Remark GFM is generally used with React Markdown to enable GitHub Flavored Markdown features.",
        code: `import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {content}
    </ReactMarkdown>
  );
}`,
        language: "jsx",
      },
      {
        title: "Markdown Tables",
        code: `const content = \`
| Technology | Type |
|---|---|
| React | Frontend |
| Node.js | Backend |
\`;

<ReactMarkdown remarkPlugins={[remarkGfm]}>
  {content}
</ReactMarkdown>`,
        language: "jsx",
      },
      {
        title: "Task Lists",
        code: `const content = \`
- [x] Setup React
- [x] Setup Tailwind
- [ ] Build dashboard
\`;

<ReactMarkdown remarkPlugins={[remarkGfm]}>
  {content}
</ReactMarkdown>`,
        language: "jsx",
      },
      {
        title: "Strikethrough",
        code: `const content = \`
~~Old content~~

Updated content
\`;

<ReactMarkdown remarkPlugins={[remarkGfm]}>
  {content}
</ReactMarkdown>`,
        language: "jsx",
      },
      {
        title: "Autolinks",
        content:
          "GFM can automatically recognize certain URL patterns and render them as links.",
        code: `const content = \`
Visit www.example.com
\`;

<ReactMarkdown remarkPlugins={[remarkGfm]}>
  {content}
</ReactMarkdown>`,
        language: "jsx",
      },
      {
        title: "Footnotes",
        code: `const content = \`
Some text with a footnote[^1].

[^1]: Footnote content.
\`;

<ReactMarkdown remarkPlugins={[remarkGfm]}>
  {content}
</ReactMarkdown>`,
        language: "jsx",
      },
      {
        title: "Supported Features",
        content: [
          "Tables.",
          "Task lists.",
          "Strikethrough.",
          "Autolinks.",
          "Footnotes.",
          "Extended Markdown syntax supported by GFM.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Use remark-gfm with React Markdown.",
          "Install only plugins required by your application.",
          "Test complex Markdown content before rendering.",
          "Customize rendered components for consistent styling.",
        ],
      },
    ],
  }, 
    "socket.io-client": {
    title: "Socket.IO Client",
    slug: "socket.io-client",
    category: "Frontend",
    description:
      "Socket.IO Client enables real-time bidirectional communication between frontend applications and Socket.IO servers.",
    overview:
      "Socket.IO provides event-based communication between client and server. It supports reconnection, event acknowledgements and transport fallbacks.",

    sections: [
      {
        title: "Installation",
        code: `npm install socket.io-client`,
        language: "bash",
      },
      {
        title: "Create Socket Instance",
        code: `import { io } from "socket.io-client";

export const socket = io(
  import.meta.env.VITE_SOCKET_URL,
  {
    autoConnect: false,
  }
);`,
        language: "js",
      },
      {
        title: "Connect and Disconnect",
        code: `socket.connect();

socket.disconnect();`,
        language: "js",
      },
      {
        title: "Connection Events",
        code: `socket.on("connect", () => {
  console.log("Connected:", socket.id);
});

socket.on("disconnect", reason => {
  console.log("Disconnected:", reason);
});`,
        language: "js",
      },
      {
        title: "Emit Event",
        code: `socket.emit("message", {
  text: "Hello Server",
});`,
        language: "js",
      },
      {
        title: "Listen for Events",
        code: `socket.on("new-message", message => {
  console.log(message);
});`,
        language: "js",
      },
      {
        title: "React Integration",
        code: `import { useEffect, useState } from "react";
import { socket } from "./socket";

function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.connect();

    const handleMessage = message => {
      setMessages(prev => [...prev, message]);
    };

    socket.on("new-message", handleMessage);

    return () => {
      socket.off("new-message", handleMessage);
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      {messages.map((message, index) => (
        <p key={index}>{message.text}</p>
      ))}
    </div>
  );
}`,
        language: "jsx",
      },
      {
        title: "Send Chat Message",
        code: `socket.emit("send-message", {
  roomId: "room-123",
  text: "Hello",
});`,
        language: "js",
      },
      {
        title: "Join Room",
        code: `socket.emit("join-room", roomId);`,
        language: "js",
      },
      {
        title: "Event Acknowledgement",
        code: `socket.timeout(5000).emit(
  "send-message",
  message,
  (error, response) => {
    if (error) {
      console.log("Timeout");
      return;
    }

    console.log(response);
  }
);`,
        language: "js",
      },
      {
        title: "Custom Hook",
        code: `import { useEffect } from "react";
import { socket } from "./socket";

export function useSocketEvent(event, callback) {
  useEffect(() => {
    socket.on(event, callback);

    return () => {
      socket.off(event, callback);
    };
  }, [event, callback]);
}`,
        language: "jsx",
      },
      {
        title: "Useful APIs",
        content: [
          "io(): creates a socket connection.",
          "connect(): connects to the server.",
          "disconnect(): closes the connection.",
          "emit(): sends an event.",
          "on(): registers an event listener.",
          "off(): removes an event listener.",
          "once(): listens for an event once.",
          "timeout(): configures acknowledgement timeout.",
          "socket.id: current connection ID.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Keep socket instances centralized.",
          "Remove event listeners during cleanup.",
          "Avoid duplicate event subscriptions.",
          "Use rooms for grouped communication when supported by the server.",
          "Authenticate socket connections on the backend.",
          "Validate incoming events on the server.",
          "Do not treat socket room membership as authorization.",
          "Handle connection and reconnection states.",
        ],
      },
    ],
  },
    "livekit-client": {
    title: "LiveKit Client",
    slug: "livekit-client",
    category: "Frontend",
    description:
      "LiveKit Client enables real-time audio, video and data communication in web applications.",
    overview:
      "LiveKit uses rooms, participants and media tracks to provide real-time communication. Clients connect to rooms using a server URL and an access token generated by the backend.",

    sections: [
      {
        title: "Installation",
        code: `npm install livekit-client`,
        language: "bash",
      },
      {
        title: "Import LiveKit",
        code: `import {
  Room,
  RoomEvent,
} from "livekit-client";`,
        language: "js",
      },
      {
        title: "Connect to a Room",
        code: `const room = new Room();

await room.connect(
  LIVEKIT_URL,
  ACCESS_TOKEN
);`,
        language: "js",
      },
      {
        title: "Disconnect",
        code: `await room.disconnect();`,
        language: "js",
      },
      {
        title: "Room Events",
        code: `room.on(RoomEvent.Connected, () => {
  console.log("Connected to room");
});

room.on(RoomEvent.Disconnected, () => {
  console.log("Disconnected");
});`,
        language: "js",
      },
      {
        title: "Participants",
        code: `const localParticipant =
  room.localParticipant;

const remoteParticipants =
  room.remoteParticipants;`,
        language: "js",
      },
      {
        title: "Enable Camera and Microphone",
        code: `await room.localParticipant
  .setCameraEnabled(true);

await room.localParticipant
  .setMicrophoneEnabled(true);`,
        language: "js",
      },
      {
        title: "Disable Camera and Microphone",
        code: `await room.localParticipant
  .setCameraEnabled(false);

await room.localParticipant
  .setMicrophoneEnabled(false);`,
        language: "js",
      },
      {
        title: "Listen for Participants",
        code: `room.on(
  RoomEvent.ParticipantConnected,
  participant => {
    console.log(
      "Joined:",
      participant.identity
    );
  }
);

room.on(
  RoomEvent.ParticipantDisconnected,
  participant => {
    console.log(
      "Left:",
      participant.identity
    );
  }
);`,
        language: "js",
      },
      {
        title: "Track Events",
        code: `room.on(
  RoomEvent.TrackSubscribed,
  (track, publication, participant) => {
    console.log(
      track,
      participant.identity
    );
  }
);`,
        language: "js",
      },
      {
        title: "Publish Data",
        code: `const encoder = new TextEncoder();

await room.localParticipant.publishData(
  encoder.encode("Hello participants"),
  {
    reliable: true,
  }
);`,
        language: "js",
      },
      {
        title: "Important Concepts",
        content: [
          "Room: A real-time communication session.",
          "Participant: A user connected to a room.",
          "LocalParticipant: The current user.",
          "RemoteParticipant: Another connected user.",
          "Track: Audio, video or other media.",
          "TrackPublication: Published track information.",
          "TrackSubscription: Receiving another participant's track.",
          "Access Token: Token used to authorize room access.",
        ],
      },
      {
        title: "Important APIs",
        content: [
          "Room(): creates a room instance.",
          "connect(): connects to a LiveKit server.",
          "disconnect(): leaves the room.",
          "setCameraEnabled(): enables or disables camera.",
          "setMicrophoneEnabled(): enables or disables microphone.",
          "publishData(): sends data to participants.",
          "RoomEvent: provides room lifecycle and track events.",
          "localParticipant: accesses the current participant.",
          "remoteParticipants: accesses remote participants.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Generate access tokens on the backend.",
          "Never expose LiveKit API secrets in the frontend.",
          "Handle connection and disconnection events.",
          "Clean up room connections when components unmount.",
          "Handle camera and microphone permissions.",
          "Use appropriate participant permissions.",
          "Avoid creating multiple room connections unnecessarily.",
        ],
      },
    ],
  },
    "@livekit/components-react": {
    title: "LiveKit Components React",
    slug: "livekit-components-react",
    category: "Frontend",
    description:
      "LiveKit Components React provides reusable React components and hooks for building real-time audio and video experiences.",
    overview:
      "It provides UI components and hooks for connecting rooms, displaying participants, rendering tracks and controlling audio and video in React applications.",

    sections: [
      {
        title: "Installation",
        code: `npm install @livekit/components-react @livekit/components-styles livekit-client`,
        language: "bash",
      },
      {
        title: "Import Styles",
        code: `import "@livekit/components-styles";`,
        language: "js",
      },
      {
        title: "Important Components",
        content: [
          "LiveKitRoom: manages room connection context.",
          "VideoConference: ready-made video conference interface.",
          "RoomAudioRenderer: renders subscribed audio tracks.",
          "ParticipantTile: displays participant media.",
          "TrackLoop: renders track collections.",
          "ControlBar: provides media controls in supported setups.",
        ],
      },
      {
        title: "LiveKitRoom",
        code: `import {
  LiveKitRoom,
} from "@livekit/components-react";

function LiveClass({ serverUrl, token }) {
  return (
    <LiveKitRoom
      serverUrl={serverUrl}
      token={token}
      connect={true}
      audio={true}
      video={true}
    >
      <div>
        Live Class
      </div>
    </LiveKitRoom>
  );
}`,
        language: "jsx",
      },
      {
        title: "Video Conference UI",
        code: `import {
  LiveKitRoom,
  VideoConference,
} from "@livekit/components-react";

function LiveClass({ serverUrl, token }) {
  return (
    <LiveKitRoom
      serverUrl={serverUrl}
      token={token}
      connect={true}
    >
      <VideoConference />
    </LiveKitRoom>
  );
}`,
        language: "jsx",
      },
      {
        title: "Render Audio",
        code: `import {
  RoomAudioRenderer,
} from "@livekit/components-react";

function AudioRenderer() {
  return <RoomAudioRenderer />;
}`,
        language: "jsx",
      },
      {
        title: "Participant Hook",
        code: `import {
  useLocalParticipant,
} from "@livekit/components-react";

function MediaControls() {
  const {
    localParticipant,
  } = useLocalParticipant();

  console.log(localParticipant);

  return null;
}`,
        language: "jsx",
      },
      {
        title: "Room Context Hook",
        code: `import {
  useRoomContext,
} from "@livekit/components-react";

function RoomInfo() {
  const room = useRoomContext();

  console.log(room.name);

  return null;
}`,
        language: "jsx",
      },
      {
        title: "Participant Loop",
        code: `import {
  useParticipants,
} from "@livekit/components-react";

function ParticipantsList() {
  const participants = useParticipants();

  return (
    <div>
      {participants.map(participant => (
        <p key={participant.identity}>
          {participant.identity}
        </p>
      ))}
    </div>
  );
}`,
        language: "jsx",
      },
      {
        title: "Important Hooks",
        content: [
          "useRoomContext(): accesses the room context.",
          "useParticipants(): returns room participants.",
          "useLocalParticipant(): accesses local participant state.",
          "useTracks(): retrieves track references.",
          "useConnectionState(): tracks connection status.",
          "useParticipantContext(): accesses participant context.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Fetch room tokens from your backend.",
          "Keep API secrets on the backend.",
          "Use VideoConference for rapid prototyping.",
          "Build custom participant layouts when UI requirements are specific.",
          "Handle connection state and permission errors.",
          "Avoid mounting multiple unnecessary room instances.",
          "Use proper cleanup when leaving live sessions.",
        ],
      },
    ],
  },
    "vite": {
    title: "Vite",
    slug: "vite",
    category: "Frontend / Tooling",
    description:
      "Vite is a modern frontend build tool that provides a fast development server and optimized production builds.",
    overview:
      "Vite uses native ES modules during development and bundles the application for production. It provides fast startup, Hot Module Replacement and a plugin-based ecosystem.",

    sections: [
      {
        title: "Installation",
        code: `npm create vite@latest`,
        language: "bash",
      },
      {
        title: "Create React Project",
        code: `npm create vite@latest my-app -- --template react

cd my-app
npm install
npm run dev`,
        language: "bash",
      },
      {
        title: "Common Commands",
        code: `npm run dev
npm run build
npm run preview`,
        language: "bash",
      },
      {
        title: "Project Structure",
        code: `my-app/
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js`,
        language: "text",
      },
      {
        title: "Vite Configuration",
        code: `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});`,
        language: "js",
      },
      {
        title: "Environment Variables",
        code: `// .env

VITE_API_URL=http://localhost:5000/api`,
        language: "bash",
      },
      {
        title: "Access Environment Variables",
        code: `const apiUrl = import.meta.env.VITE_API_URL;

console.log(apiUrl);`,
        language: "js",
      },
      {
        title: "Built-in Environment Properties",
        code: `import.meta.env.MODE
import.meta.env.DEV
import.meta.env.PROD
import.meta.env.BASE_URL`,
        language: "js",
      },
      {
        title: "Aliases",
        code: `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});`,
        language: "js",
      },
      {
        title: "HMR",
        content:
          "Hot Module Replacement updates changed modules during development without unnecessarily reloading the entire application.",
      },
      {
        title: "Production Build",
        code: `npm run build`,
        language: "bash",
      },
      {
        title: "Preview Production Build",
        code: `npm run preview`,
        language: "bash",
      },
      {
        title: "Important Concepts",
        content: [
          "Dev Server: Runs the application during development.",
          "HMR: Updates changed modules instantly.",
          "Build: Creates optimized production assets.",
          "Plugins: Extend Vite functionality.",
          "import.meta.env: Accesses environment variables.",
          "vite.config.js: Configures Vite.",
          "Rollup: Used in Vite's production build pipeline.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Keep environment-specific configuration in env files.",
          "Only expose variables prefixed with VITE_ that are safe for the frontend.",
          "Never store backend secrets in frontend environment variables.",
          "Use aliases for cleaner imports.",
          "Check production builds before deployment.",
          "Use plugins only when necessary.",
        ],
      },
    ],
  },
    "oxlint": {
    title: "Oxlint",
    slug: "oxlint",
    category: "Frontend / Tooling",
    description:
      "Oxlint is a fast JavaScript and TypeScript linter designed to detect code quality issues, bugs and rule violations.",
    overview:
      "Oxlint analyzes JavaScript, TypeScript and supported framework code to identify problems and enforce coding rules. It is built with performance in mind.",

    sections: [
      {
        title: "Installation",
        code: `npm install -D oxlint`,
        language: "bash",
      },
      {
        title: "Run Linter",
        code: `npx oxlint`,
        language: "bash",
      },
      {
        title: "Lint Specific Files",
        code: `npx oxlint src/`,
        language: "bash",
      },
      {
        title: "Fix Automatically",
        code: `npx oxlint --fix`,
        language: "bash",
      },
      {
        title: "Configuration",
        code: `// .oxlintrc.json

{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "rules": {
    "no-unused-vars": "error",
    "no-console": "warn"
  }
}`,
        language: "json",
      },
      {
        title: "Package Scripts",
        code: `{
  "scripts": {
    "lint": "oxlint",
    "lint:fix": "oxlint --fix"
  }
}`,
        language: "json",
      },
      {
        title: "Run Through npm",
        code: `npm run lint
npm run lint:fix`,
        language: "bash",
      },
      {
        title: "Rule Severity",
        content: [
          "off: disables a rule.",
          "warn: reports a warning.",
          "error: reports an error.",
        ],
      },
      {
        title: "Common Use Cases",
        content: [
          "Detect unused variables.",
          "Identify potential programming errors.",
          "Maintain consistent code quality.",
          "Automate linting in development workflows.",
          "Run linting before commits or CI pipelines.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Run linting regularly during development.",
          "Use auto-fix when supported.",
          "Treat important lint errors seriously.",
          "Integrate linting into CI pipelines.",
          "Keep configuration consistent across the project.",
        ],
      },
    ],
  },
    "rollup-plugin-visualizer": {
    title: "Rollup Plugin Visualizer",
    slug: "rollup-plugin-visualizer",
    category: "Frontend / Tooling",
    description:
      "Rollup Plugin Visualizer analyzes and visualizes bundle sizes to help developers optimize production builds.",
    overview:
      "It generates visual reports showing modules and dependencies included in your build. It helps identify large dependencies, duplicate packages and optimization opportunities.",

    sections: [
      {
        title: "Installation",
        code: `npm install -D rollup-plugin-visualizer`,
        language: "bash",
      },
      {
        title: "Integration with Vite",
        code: `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: "stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});`,
        language: "js",
      },
      {
        title: "Generate Report",
        code: `npm run build`,
        language: "bash",
      },
      {
        title: "Report Output",
        content:
          "After building, the plugin generates stats.html containing an interactive bundle analysis report. Open it in your browser to inspect the bundle.",
      },
      {
        title: "Configuration Options",
        content: [
          "filename: specifies report output filename.",
          "open: automatically opens the report.",
          "gzipSize: displays compressed gzip size.",
          "brotliSize: displays compressed Brotli size.",
          "template: controls report visualization format.",
          "sourcemap: controls source map analysis.",
        ],
      },
      {
        title: "What to Analyze",
        content: [
          "Large npm dependencies.",
          "Duplicate modules.",
          "Unexpected package inclusion.",
          "Heavy libraries affecting initial loading.",
          "Bundle size before and after optimization.",
        ],
      },
      {
        title: "Optimization Techniques",
        content: [
          "Use dynamic imports for lazy loading.",
          "Split routes into separate chunks.",
          "Remove unnecessary dependencies.",
          "Use tree-shaking compatible imports.",
          "Replace unnecessarily large libraries.",
          "Analyze bundle size after every major optimization.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Run analysis during production builds.",
          "Compare reports before and after optimization.",
          "Avoid optimizing blindly without measuring.",
          "Use lazy loading for heavy features.",
          "Keep generated reports out of unnecessary deployments.",
        ],
      },
    ],
  },
   "node.js": {
    title: "Node.js",
    slug: "nodejs",
    category: "Backend",
    description:
      "Node.js is a JavaScript runtime built on Chrome's V8 engine for executing JavaScript outside the browser.",
    overview:
      "Node.js uses an event-driven, non-blocking I/O model that makes it suitable for network applications, APIs and real-time systems.",

    sections: [
      {
        title: "Installation",
        content:
          "Install Node.js from its official website. npm is included with Node.js.",
      },
      {
        title: "Verify Installation",
        code: `node -v
npm -v`,
        language: "bash",
      },
      {
        title: "Create Project",
        code: `mkdir my-backend
cd my-backend
npm init -y`,
        language: "bash",
      },
      {
        title: "Run JavaScript",
        code: `console.log("Hello Node.js");`,
        language: "js",
      },
      {
        title: "Execute File",
        code: `node index.js`,
        language: "bash",
      },
      {
        title: "Modules",
        code: `// CommonJS
const fs = require("fs");

// ES Modules
import fs from "node:fs";`,
        language: "js",
      },
      {
        title: "File System",
        code: `import fs from "node:fs";

fs.writeFileSync(
  "data.txt",
  "Hello Node.js"
);

const data = fs.readFileSync(
  "data.txt",
  "utf8"
);

console.log(data);`,
        language: "js",
      },
      {
        title: "HTTP Server",
        code: `import http from "node:http";

const server = http.createServer(
  (req, res) => {
    res.end("Hello Server");
  }
);

server.listen(5000, () => {
  console.log("Server running");
});`,
        language: "js",
      },
      {
        title: "Asynchronous Operations",
        code: `import fs from "node:fs/promises";

async function readFile() {
  const data = await fs.readFile(
    "data.txt",
    "utf8"
  );

  console.log(data);
}

readFile();`,
        language: "js",
      },
      {
        title: "Environment Variables",
        code: `// Modern Node.js versions

const port = process.env.PORT || 5000;`,
        language: "js",
      },
      {
        title: "Package Management",
        code: `npm install package-name
npm uninstall package-name
npm update
npm run script-name`,
        language: "bash",
      },
      {
        title: "Important Modules",
        content: [
          "fs: File system operations.",
          "path: Path utilities.",
          "http: HTTP server creation.",
          "os: Operating system information.",
          "crypto: Cryptographic utilities.",
          "events: Event-driven programming.",
          "stream: Stream-based data handling.",
          "process: Process and runtime information.",
        ],
      },
      {
        title: "Important Concepts",
        content: [
          "V8 Engine: Executes JavaScript.",
          "Event Loop: Coordinates asynchronous callbacks and tasks.",
          "Non-blocking I/O: Allows I/O operations without blocking the main execution flow.",
          "Event-driven Architecture: Uses events and listeners.",
          "Modules: Organize reusable code.",
          "Streams: Process data incrementally.",
          "Buffer: Handles binary data.",
          "npm: Manages JavaScript packages.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Avoid blocking the event loop.",
          "Use asynchronous APIs where appropriate.",
          "Handle errors properly.",
          "Keep secrets in environment variables.",
          "Use streams for large data processing.",
          "Keep dependencies updated.",
          "Use a consistent module system.",
          "Avoid exposing sensitive error details in production.",
        ],
      },
    ],
  },
    "express.js": {
    title: "Express.js",
    slug: "expressjs",
    category: "Backend",
    description:
      "Express.js is a web framework for Node.js used to build REST APIs, web applications and backend services.",
    overview:
      "Express simplifies HTTP request handling through routing, middleware, controllers and response methods. It provides a flexible foundation for building backend applications.",

    sections: [
      {
        title: "Installation",
        code: `npm init -y
npm install express`,
        language: "bash",
      },
      {
        title: "Basic Server",
        code: `import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.listen(5000, () => {
  console.log("Server running");
});`,
        language: "js",
      },
      {
        title: "HTTP Routes",
        code: `app.get("/users", handler);
app.post("/users", handler);
app.put("/users/:id", handler);
app.patch("/users/:id", handler);
app.delete("/users/:id", handler);`,
        language: "js",
      },
      {
        title: "Request and Response",
        code: `app.get("/users/:id", (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    success: true,
    userId: id,
  });
});`,
        language: "js",
      },
      {
        title: "Query Parameters",
        code: `// GET /users?page=1&limit=10

app.get("/users", (req, res) => {
  const { page, limit } = req.query;

  res.json({ page, limit });
});`,
        language: "js",
      },
      {
        title: "Middleware",
        code: `const logger = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};

app.use(logger);`,
        language: "js",
      },
      {
        title: "Router",
        code: `import { Router } from "express";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);

export default router;`,
        language: "js",
      },
      {
        title: "Route Integration",
        code: `import userRouter from "./routes/user.routes.js";

app.use("/api/users", userRouter);`,
        language: "js",
      },
      {
        title: "Controller Pattern",
        code: `export const getUsers = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Users fetched",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};`,
        language: "js",
      },
      {
        title: "Error Middleware",
        code: `app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});`,
        language: "js",
      },
      {
        title: "Static Files",
        code: `app.use(
  "/uploads",
  express.static("uploads")
);`,
        language: "js",
      },
      {
        title: "Common Middleware",
        content: [
          "express.json(): parses JSON request bodies.",
          "express.urlencoded(): parses URL-encoded data.",
          "express.static(): serves static files.",
          "Custom middleware: executes application-defined logic.",
          "Error middleware: handles application errors.",
        ],
      },
      {
        title: "Important APIs",
        content: [
          "express(): creates an application.",
          "Router(): creates modular routes.",
          "app.use(): registers middleware.",
          "app.get(): handles GET requests.",
          "app.post(): handles POST requests.",
          "req.params: accesses route parameters.",
          "req.query: accesses query parameters.",
          "req.body: accesses request body.",
          "res.json(): sends JSON.",
          "res.status(): sets HTTP status.",
          "next(): passes execution to the next middleware.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Separate routes, controllers and services.",
          "Validate incoming request data.",
          "Use centralized error handling.",
          "Protect routes with authentication and authorization middleware.",
          "Avoid putting business logic directly inside routes.",
          "Use appropriate HTTP status codes.",
          "Never expose sensitive server errors in production.",
          "Apply security middleware and rate limiting where appropriate.",
        ],
      },
    ],
  },
    "mongodb": {
    title: "MongoDB",
    slug: "mongodb",
    category: "Backend / Database",
    description:
      "MongoDB is a NoSQL document database that stores data in flexible BSON documents organized into collections.",
    overview:
      "MongoDB is designed for document-based data storage. It supports CRUD operations, indexes, aggregation pipelines, transactions and flexible document structures.",

    sections: [
      {
        title: "Installation and Setup",
        content:
          "MongoDB can be used through MongoDB Atlas (cloud) or a local MongoDB installation. Create a database and connect your application using a connection URI.",
      },
      {
        title: "Connection URI",
        code: `mongodb://127.0.0.1:27017/myDatabase

mongodb+srv://username:password@cluster.mongodb.net/myDatabase`,
        language: "text",
      },
      {
        title: "Database Structure",
        content: [
          "Database: contains collections.",
          "Collection: stores related documents.",
          "Document: stores data in BSON format.",
          "Field: stores individual values inside documents.",
          "ObjectId: commonly used as a document identifier.",
        ],
      },
      {
        title: "Insert Documents",
        code: `db.users.insertOne({
  name: "John",
  email: "john@example.com",
  age: 22
});

db.users.insertMany([
  { name: "Aman", age: 21 },
  { name: "Riya", age: 23 }
]);`,
        language: "js",
      },
      {
        title: "Find Documents",
        code: `db.users.find();

db.users.findOne({
  email: "john@example.com"
});

db.users.find({
  age: { $gte: 18 }
});`,
        language: "js",
      },
      {
        title: "Update Documents",
        code: `db.users.updateOne(
  { email: "john@example.com" },
  { $set: { age: 23 } }
);

db.users.updateMany(
  { active: false },
  { $set: { active: true } }
);`,
        language: "js",
      },
      {
        title: "Delete Documents",
        code: `db.users.deleteOne({
  email: "john@example.com"
});

db.users.deleteMany({
  active: false
});`,
        language: "js",
      },
      {
        title: "Query Operators",
        code: `// Comparison
$eq, $ne, $gt, $gte, $lt, $lte

// Logical
$and, $or, $not, $nor

// Membership
$in, $nin

// Array
$all, $elemMatch

// Existence
$exists`,
        language: "js",
      },
      {
        title: "Projection",
        code: `db.users.find(
  { active: true },
  { name: 1, email: 1, _id: 0 }
);`,
        language: "js",
      },
      {
        title: "Sorting and Pagination",
        code: `db.users.find()
  .sort({ createdAt: -1 })
  .skip(10)
  .limit(10);`,
        language: "js",
      },
      {
        title: "Indexes",
        code: `db.users.createIndex({
  email: 1
});

db.users.createIndex({
  createdAt: -1
});

db.users.getIndexes();`,
        language: "js",
      },
      {
        title: "Aggregation Pipeline",
        code: `db.orders.aggregate([
  {
    $match: {
      status: "completed"
    }
  },
  {
    $group: {
      _id: "$userId",
      totalAmount: {
        $sum: "$amount"
      }
    }
  },
  {
    $sort: {
      totalAmount: -1
    }
  }
]);`,
        language: "js",
      },
      {
        title: "Relationships",
        content: [
          "Embedding: stores related data inside the same document.",
          "Referencing: stores identifiers linking separate documents.",
          "Embedding is useful when data is commonly read together.",
          "Referencing is useful for reusable entities or independently managed data.",
        ],
      },
      {
        title: "Important Operators",
        content: [
          "$set: updates field values.",
          "$unset: removes fields.",
          "$inc: increments numeric values.",
          "$push: adds an element to an array.",
          "$pull: removes matching array elements.",
          "$match: filters aggregation documents.",
          "$group: groups documents.",
          "$project: selects or transforms fields.",
          "$lookup: joins data from another collection.",
          "$unwind: expands array elements.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Create indexes for frequently queried fields.",
          "Avoid unnecessary indexes because they increase write costs.",
          "Design schemas around application access patterns.",
          "Use projection to return only required fields.",
          "Use pagination for large datasets.",
          "Avoid unbounded arrays in documents.",
          "Use transactions when multiple database operations must succeed together.",
          "Never expose database credentials publicly.",
          "Analyze slow queries before optimizing.",
        ],
      },
    ],
  },
    "mongoose": {
    title: "Mongoose",
    slug: "mongoose",
    category: "Backend / Database",
    description:
      "Mongoose is an ODM library for MongoDB and Node.js that provides schemas, models, validation and query utilities.",
    overview:
      "Mongoose allows developers to define structured schemas for MongoDB documents, create models and perform database operations using a convenient JavaScript API.",

    sections: [
      {
        title: "Installation",
        code: `npm install mongoose`,
        language: "bash",
      },
      {
        title: "Database Connection",
        code: `import mongoose from "mongoose";

await mongoose.connect(process.env.MONGO_URI);

console.log("MongoDB connected");`,
        language: "js",
      },
      {
        title: "Create Schema",
        code: `import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: Number,
  },
  {
    timestamps: true,
  }
);`,
        language: "js",
      },
      {
        title: "Create Model",
        code: `const User = mongoose.model(
  "User",
  userSchema
);

export default User;`,
        language: "js",
      },
      {
        title: "Create Documents",
        code: `const user = await User.create({
  name: "Aman",
  email: "aman@example.com",
  age: 21,
});`,
        language: "js",
      },
      {
        title: "Read Documents",
        code: `const users = await User.find();

const user = await User.findOne({
  email: "aman@example.com",
});

const userById = await User.findById(id);`,
        language: "js",
      },
      {
        title: "Update Documents",
        code: `await User.findByIdAndUpdate(
  id,
  { age: 22 },
  { new: true, runValidators: true }
);

await User.updateOne(
  { email: "aman@example.com" },
  { $set: { age: 22 } }
);`,
        language: "js",
      },
      {
        title: "Delete Documents",
        code: `await User.findByIdAndDelete(id);

await User.deleteOne({
  email: "aman@example.com",
});`,
        language: "js",
      },
      {
        title: "Schema Validation",
        code: `const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 18,
    max: 100,
  },
  role: {
    type: String,
    enum: ["STUDENT", "INSTRUCTOR"],
  },
});`,
        language: "js",
      },
      {
        title: "Middleware",
        code: `userSchema.pre("save", function () {
  console.log("Before saving");
});

userSchema.post("save", function (doc) {
  console.log("Saved:", doc._id);
});`,
        language: "js",
      },
      {
        title: "Populate",
        code: `const courses = await Course.find()
  .populate("instructor", "name email");`,
        language: "js",
      },
      {
        title: "Lean Queries",
        code: `const users = await User.find()
  .lean();`,
        language: "js",
      },
      {
        title: "Indexes",
        code: `userSchema.index({
  email: 1,
});

userSchema.index({
  createdAt: -1,
});`,
        language: "js",
      },
      {
        title: "Aggregation",
        code: `const result = await User.aggregate([
  {
    $match: {
      active: true,
    },
  },
  {
    $group: {
      _id: "$role",
      total: {
        $sum: 1,
      },
    },
  },
]);`,
        language: "js",
      },
      {
        title: "Transactions",
        code: `const session = await mongoose.startSession();

try {
  await session.withTransaction(async () => {
    await User.create(
      [{ name: "Aman" }],
      { session }
    );
  });
} finally {
  await session.endSession();
}`,
        language: "js",
      },
      {
        title: "Important Concepts",
        content: [
          "Schema: defines document structure and validation.",
          "Model: provides database operations for a collection.",
          "Document: an instance of a model.",
          "Populate: replaces referenced IDs with related documents.",
          "Middleware: executes logic around model operations.",
          "Validation: checks data before database operations.",
          "Lean: returns plain JavaScript objects instead of Mongoose documents.",
          "Aggregation: processes documents through pipeline stages.",
          "Session: enables transaction-related operations.",
        ],
      },
      {
        title: "Important Methods",
        content: [
          "create(): creates documents.",
          "find(): retrieves multiple documents.",
          "findOne(): retrieves a single matching document.",
          "findById(): retrieves a document by ID.",
          "findByIdAndUpdate(): updates a document by ID.",
          "findByIdAndDelete(): deletes a document by ID.",
          "updateOne(): updates a matching document.",
          "deleteMany(): deletes matching documents.",
          "populate(): resolves references.",
          "aggregate(): executes aggregation pipelines.",
          "lean(): returns plain objects.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Validate data at application boundaries as well as in schemas.",
          "Use runValidators when applicable to update operations.",
          "Create indexes according to real query patterns.",
          "Use lean() for read-only queries where appropriate.",
          "Avoid unnecessary populate chains.",
          "Use transactions when multiple related operations need atomicity.",
          "Handle duplicate-key errors separately from validation errors.",
          "Do not assume unique is a normal validation rule; it relies on a database index.",
        ],
      },
    ],
  },
    "redis": {
    title: "Redis",
    slug: "redis",
    category: "Backend / Database",
    description:
      "Redis is an in-memory data store used for caching, session management, rate limiting, queues and fast data access.",
    overview:
      "Redis stores data in memory and supports different data structures such as strings, hashes, lists, sets and sorted sets. It is frequently used alongside databases to improve application performance.",

    sections: [
      {
        title: "Installation",
        content:
          "Redis can be run locally or through a hosted Redis-compatible service. Connect your Node.js application using a Redis client.",
      },
      {
        title: "Install Node.js Client",
        code: `npm install ioredis`,
        language: "bash",
      },
      {
        title: "Connection",
        code: `import Redis from "ioredis";

const redis = new Redis(
  process.env.REDIS_URL
);

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", error => {
  console.error("Redis error:", error);
});`,
        language: "js",
      },
      {
        title: "Set and Get",
        code: `await redis.set("name", "Aman");

const name = await redis.get("name");

console.log(name);`,
        language: "js",
      },
      {
        title: "Expiration (TTL)",
        code: `await redis.set(
  "otp",
  "123456",
  "EX",
  300
);

await redis.expire("user:123", 600);

const ttl = await redis.ttl("otp");`,
        language: "js",
      },
      {
        title: "Delete Keys",
        code: `await redis.del("name");

await redis.unlink("user:123");`,
        language: "js",
      },
      {
        title: "Hashes",
        code: `await redis.hset("user:1", {
  name: "Aman",
  role: "STUDENT",
});

const user = await redis.hgetall("user:1");`,
        language: "js",
      },
      {
        title: "Lists",
        code: `await redis.lpush(
  "notifications",
  "New course"
);

const items = await redis.lrange(
  "notifications",
  0,
  -1
);`,
        language: "js",
      },
      {
        title: "Sets",
        code: `await redis.sadd(
  "online-users",
  "user-1"
);

const users = await redis.smembers(
  "online-users"
);`,
        language: "js",
      },
      {
        title: "Sorted Sets",
        code: `await redis.zadd(
  "leaderboard",
  100,
  "user-1"
);

const ranking = await redis.zrevrange(
  "leaderboard",
  0,
  9,
  "WITHSCORES"
);`,
        language: "js",
      },
      {
        title: "Caching Pattern",
        code: `const cacheKey = "courses:published";

const cached = await redis.get(cacheKey);

if (cached) {
  return JSON.parse(cached);
}

const courses = await Course.find({
  status: "PUBLISHED",
});

await redis.set(
  cacheKey,
  JSON.stringify(courses),
  "EX",
  300
);

return courses;`,
        language: "js",
      },
      {
        title: "Cache Invalidation",
        code: `await redis.del(
  "courses:published"
);`,
        language: "js",
      },
      {
        title: "Rate Limiting Concept",
        code: `const key = "rate:user:123";

const count = await redis.incr(key);

if (count === 1) {
  await redis.expire(key, 60);
}

// Apply application-level limit checks
// using the counter and time window.`,
        language: "js",
      },
      {
        title: "Pub/Sub",
        code: `// Publisher
await redis.publish(
  "updates",
  "New notification"
);

// Subscriber setup is separate
// and listens to subscribed channels.`,
        language: "js",
      },
      {
        title: "Useful CLI Commands",
        code: `redis-cli
PING
SET key value
GET key
DEL key
TTL key
EXISTS key
KEYS pattern
FLUSHDB`,
        language: "bash",
      },
      {
        title: "Important Data Structures",
        content: [
          "String: stores simple values, counters and cached JSON.",
          "Hash: stores field-value pairs.",
          "List: stores ordered elements.",
          "Set: stores unique elements.",
          "Sorted Set: stores elements ordered by scores.",
          "Stream: supports append-only event data.",
        ],
      },
      {
        title: "Important Commands",
        content: [
          "GET / SET: retrieve or store string values.",
          "DEL: deletes keys.",
          "EXPIRE: sets key expiration.",
          "TTL: checks remaining expiration time.",
          "INCR: increments a counter.",
          "HSET / HGETALL: manages hash data.",
          "LPUSH / LRANGE: manages lists.",
          "SADD / SMEMBERS: manages sets.",
          "ZADD / ZREVRANGE: manages sorted sets.",
          "PUBLISH / SUBSCRIBE: supports Pub/Sub messaging.",
        ],
      },
      {
        title: "Common Use Cases",
        content: [
          "API response caching.",
          "Authentication session storage.",
          "Rate limiting.",
          "OTP expiration.",
          "Online user tracking.",
          "Real-time counters.",
          "Temporary application data.",
          "Distributed coordination where suitable.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Set TTL for temporary and cache data.",
          "Design cache keys consistently.",
          "Invalidate caches when underlying data changes.",
          "Avoid expensive KEYS operations in production.",
          "Monitor memory usage.",
          "Handle Redis connection failures gracefully.",
          "Never store sensitive data without appropriate security protections.",
          "Use Redis only where its performance or data structures justify it.",
        ],
      },
    ],
  },
    "bcrypt": {
    title: "bcrypt / bcryptjs",
    slug: "bcrypt",
    category: "Backend / Security",
    description:
      "bcrypt is a password hashing algorithm and library used to securely hash and verify passwords.",
    overview:
      "bcrypt uses a computationally expensive hashing process and a salt to make stored password hashes more resistant to password-guessing attacks. Applications store hashes instead of plain-text passwords.",

    sections: [
      {
        title: "Installation",
        code: `npm install bcrypt`,
        language: "bash",
      },
      {
        title: "Import",
        code: `import bcrypt from "bcrypt";`,
        language: "js",
      },
      {
        title: "Hash Password",
        code: `const saltRounds = 10;

const hashedPassword = await bcrypt.hash(
  password,
  saltRounds
);`,
        language: "js",
      },
      {
        title: "Verify Password",
        code: `const isMatch = await bcrypt.compare(
  enteredPassword,
  hashedPassword
);

if (isMatch) {
  console.log("Password matched");
}`,
        language: "js",
      },
      {
        title: "Using bcryptjs",
        code: `npm install bcryptjs

import bcrypt from "bcryptjs";

const hash = await bcrypt.hash(
  password,
  10
);

const isMatch = await bcrypt.compare(
  password,
  hash
);`,
        language: "js",
      },
      {
        title: "Registration Pattern",
        code: `const hashedPassword = await bcrypt.hash(
  password,
  10
);

const user = await User.create({
  email,
  password: hashedPassword,
});`,
        language: "js",
      },
      {
        title: "Login Pattern",
        code: `const user = await User.findOne({
  email,
});

if (!user) {
  throw new Error("Invalid credentials");
}

const isMatch = await bcrypt.compare(
  password,
  user.password
);

if (!isMatch) {
  throw new Error("Invalid credentials");
}`,
        language: "js",
      },
      {
        title: "Salt Rounds",
        content:
          "Salt rounds control the computational cost of bcrypt hashing. Higher values increase the time required to hash and verify passwords. Choose a value based on your server's performance and current security guidance.",
      },
      {
        title: "Important Methods",
        content: [
          "hash(): hashes a password.",
          "compare(): compares a submitted password with a stored hash.",
          "genSalt(): generates a salt.",
          "hashSync(): synchronous hashing.",
          "compareSync(): synchronous password comparison.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Never store plain-text passwords.",
          "Hash passwords before storing them.",
          "Use asynchronous hashing in server applications.",
          "Never decrypt bcrypt hashes; bcrypt is not reversible encryption.",
          "Use compare() to verify passwords.",
          "Avoid unnecessarily high hashing costs that can overload your server.",
          "Use generic login error messages.",
          "Never log passwords or password hashes unnecessarily.",
        ],
      },
    ],
  },
    "jwt": {
    title: "JWT (JSON Web Token)",
    slug: "jwt",
    category: "Backend / Authentication",
    description:
      "JWT is a compact token format used to transmit authentication and authorization information between client and server.",
    overview:
      "JWTs contain encoded claims and can be cryptographically signed. Backend servers verify the token's signature and claims to validate requests. JWTs are commonly used in authentication systems with access tokens and refresh tokens.",

    sections: [
      {
        title: "Installation",
        code: `npm install jsonwebtoken`,
        language: "bash",
      },
      {
        title: "Import",
        code: `import jwt from "jsonwebtoken";`,
        language: "js",
      },
      {
        title: "Generate Token",
        code: `const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "15m" }
);`,
        language: "js",
      },
      {
        title: "Verify Token",
        code: `const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET
);

console.log(decoded.userId);`,
        language: "js",
      },
      {
        title: "Decode Token",
        code: `const decoded = jwt.decode(token);

console.log(decoded);`,
        language: "js",
      },
      {
        title: "Authentication Middleware",
        code: `import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};`,
        language: "js",
      },
      {
        title: "Token Payload",
        code: `{
  "userId": "user_id",
  "role": "STUDENT",
  "iat": 1234567890,
  "exp": 1234567890
}`,
        language: "json",
      },
      {
        title: "Access Token & Refresh Token",
        content:
          "Access tokens are short-lived tokens used to authenticate requests. Refresh tokens are longer-lived credentials used to obtain new access tokens without requiring the user to log in again. Their storage, rotation and revocation strategy should be designed carefully.",
      },
      {
        title: "Common Methods",
        content: [
          "jwt.sign(): creates and signs a token.",
          "jwt.verify(): validates signature and claims.",
          "jwt.decode(): reads token contents without validating authenticity.",
        ],
      },
      {
        title: "Common JWT Claims",
        content: [
          "sub: subject or user identifier.",
          "exp: expiration timestamp.",
          "iat: issued-at timestamp.",
          "iss: token issuer.",
          "aud: intended audience.",
        ],
      },
      {
        title: "JWT Security",
        content: [
          "Never store sensitive information in JWT payloads because JWT payloads are not inherently encrypted.",
          "Always verify tokens instead of trusting decoded data.",
          "Set token expiration.",
          "Use strong secret keys stored in environment variables.",
          "Restrict accepted signing algorithms.",
          "Use secure, HttpOnly cookies where appropriate.",
          "Implement refresh-token rotation and revocation strategies where required.",
          "Use generic authentication errors.",
        ],
      },
      {
        title: "Common Errors",
        content: [
          "TokenExpiredError: token has expired.",
          "JsonWebTokenError: token is malformed or invalid.",
          "NotBeforeError: token is not yet valid.",
        ],
      },
    ],
  },
    "passport-jwt": {
    title: "Passport.js (passport-jwt)",
    slug: "passport-jwt",
    category: "Backend / Authentication",
    description:
      "Passport.js is an authentication middleware for Node.js that supports multiple authentication strategies.",
    overview:
      "Passport.js separates authentication logic into strategies. passport-jwt is used to authenticate API requests using JWTs without relying on server-side sessions.",

    sections: [
      {
        title: "Installation",
        code: `npm install passport passport-jwt`,
        language: "bash",
      },
      {
        title: "Import",
        code: `import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";`,
        language: "js",
      },
      {
        title: "Configure JWT Strategy",
        code: `passport.use(
  new JwtStrategy(
    {
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(
          payload.userId
        );

        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);`,
        language: "js",
      },
      {
        title: "Initialize Passport",
        code: `app.use(passport.initialize());`,
        language: "js",
      },
      {
        title: "Protect Route",
        code: `router.get(
  "/profile",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    res.json({
      user: req.user,
    });
  }
);`,
        language: "js",
      },
      {
        title: "JWT Extraction",
        content: [
          "ExtractJwt.fromAuthHeaderAsBearerToken(): extracts JWT from Authorization Bearer header.",
          "ExtractJwt.fromHeader(): extracts token from a specific header.",
          "ExtractJwt.fromBodyField(): extracts token from request body.",
          "ExtractJwt.fromUrlQueryParameter(): extracts token from a query parameter.",
          "ExtractJwt.fromExtractors(): combines multiple token extractors.",
        ],
      },
      {
        title: "Strategy Options",
        content: [
          "jwtFromRequest: defines how the token is extracted.",
          "secretOrKey: secret or public key used to verify the token.",
          "issuer: validates token issuer.",
          "audience: validates token audience.",
          "algorithms: restricts accepted signing algorithms.",
          "ignoreExpiration: controls expiration verification.",
        ],
      },
      {
        title: "How It Works",
        content: [
          "1. Client sends a request containing a JWT.",
          "2. Passport extracts the token.",
          "3. passport-jwt verifies the token.",
          "4. Strategy callback receives the token payload.",
          "5. Callback identifies the user.",
          "6. Passport attaches the authenticated user to req.user.",
        ],
      },
      {
        title: "Sessionless Authentication",
        code: `passport.authenticate("jwt", {
  session: false,
})`,
        language: "js",
      },
      {
        title: "Best Practices",
        content: [
          "Use session: false for stateless JWT API authentication.",
          "Never trust a JWT without signature verification.",
          "Restrict allowed signing algorithms.",
          "Validate issuer and audience when applicable.",
          "Keep secrets in environment variables.",
          "Combine authentication with authorization middleware.",
          "Use short-lived access tokens and a secure refresh-token strategy.",
        ],
      },
    ],
  },
   "imagekit": {
    title: "ImageKit",
    slug: "imagekit",
    category: "Backend / Media",
    description:
      "ImageKit is a media platform for uploading, optimizing, transforming and delivering images and videos.",
    overview:
      "ImageKit provides media storage and delivery with CDN-based URLs, image and video transformations, upload APIs and optimization. It is commonly integrated with Node.js backends and React frontends.",

    sections: [
      {
        title: "Installation",
        code: `npm install imagekit`,
        language: "bash",
      },
      {
        title: "Environment Variables",
        code: `IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id`,
        language: "bash",
      },
      {
        title: "Initialize ImageKit",
        code: `import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export default imagekit;`,
        language: "js",
      },
      {
        title: "Upload File",
        code: `const result = await imagekit.upload({
  file: fileBuffer,
  fileName: "profile-image.jpg",
  folder: "/users",
});

console.log(result.url);
console.log(result.fileId);`,
        language: "js",
      },
      {
        title: "Upload from Base64",
        code: `const result = await imagekit.upload({
  file: base64Data,
  fileName: "course-thumbnail.png",
  folder: "/courses",
});`,
        language: "js",
      },
      {
        title: "Upload from Frontend",
        code: `// Backend generates upload authentication parameters.
// Frontend uses these parameters to upload directly
// to ImageKit instead of sending large files
// through the backend.`,
        language: "js",
      },
      {
        title: "Generate Authentication Parameters",
        code: `const authenticationParameters =
  imagekit.getAuthenticationParameters();

res.json(authenticationParameters);`,
        language: "js",
      },
      {
        title: "Image Transformation",
        code: `const imageUrl =
  "https://ik.imagekit.io/your_id/image.jpg";

const optimizedUrl =
  imageUrl + "?tr=w-500,h-300,fo-auto,q-80";`,
        language: "js",
      },
      {
        title: "Video Transformation",
        code: `const videoUrl =
  "https://ik.imagekit.io/your_id/video.mp4";

// Transformation parameters can be added
// through ImageKit's URL-based transformation system.`,
        language: "js",
      },
      {
        title: "Important Upload Response Fields",
        content: [
          "fileId: unique identifier of uploaded media.",
          "url: delivery URL of the media.",
          "name: uploaded file name.",
          "filePath: path of the uploaded file.",
          "size: file size.",
          "fileType: media type.",
        ],
      },
      {
        title: "Delete Media",
        code: `await imagekit.deleteFile(fileId);`,
        language: "js",
      },
      {
        title: "Common Use Cases",
        content: [
          "Profile images.",
          "Course thumbnails.",
          "Lecture videos.",
          "Document uploads.",
          "Media optimization.",
          "CDN-based delivery.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Never expose the private key in frontend code.",
          "Use backend-generated authentication parameters for secure direct uploads.",
          "Validate file types and sizes on the backend.",
          "Store fileId alongside media URLs when deletion or management is required.",
          "Use transformations to reduce bandwidth.",
          "Use appropriate access controls for private media.",
          "Never rely on frontend validation alone.",
        ],
      },
    ],
  },
     "livekit-server-sdk": {
    title: "LiveKit Server SDK",
    slug: "livekit-server-sdk",
    category: "Backend / Real-time",
    description:
      "LiveKit Server SDK enables Node.js backends to manage live rooms, generate participant tokens and interact with LiveKit APIs.",
    overview:
      "The LiveKit Server SDK is used on the backend for room management, access-token generation, participant permissions and server-side operations. It works alongside LiveKit client SDKs.",

    sections: [
      {
        title: "Installation",
        code: `npm install livekit-server-sdk`,
        language: "bash",
      },
      {
        title: "Environment Variables",
        code: `LIVEKIT_URL=https://your-livekit-server
LIVEKIT_API_KEY=your_api_key
LIVEKIT_API_SECRET=your_api_secret`,
        language: "bash",
      },
      {
        title: "Import",
        code: `import {
  AccessToken,
  LiveKitAPI,
} from "livekit-server-sdk";`,
        language: "js",
      },
      {
        title: "Generate Participant Token",
        code: `const token = new AccessToken(
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_API_SECRET,
  {
    identity: userId,
    ttl: "1h",
  }
);

token.addGrant({
  roomJoin: true,
  room: roomName,
});

const jwt = await token.toJwt();`,
        language: "js",
      },
      {
        title: "Participant Permissions",
        code: `token.addGrant({
  roomJoin: true,
  room: roomName,
  canPublish: true,
  canSubscribe: true,
  canPublishData: true,
});`,
        language: "js",
      },
      {
        title: "Create Room",
        code: `const api = new LiveKitAPI(
  process.env.LIVEKIT_URL,
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_API_SECRET
);

const room = await api.room.createRoom({
  name: "classroom-101",
  emptyTimeout: 600,
  maxParticipants: 50,
});`,
        language: "js",
      },
      {
        title: "List Rooms",
        code: `const rooms = await api.room.listRooms();`,
        language: "js",
      },
      {
        title: "Delete Room",
        code: `await api.room.deleteRoom(roomName);`,
        language: "js",
      },
      {
        title: "Room Management",
        content: [
          "createRoom(): creates a room.",
          "listRooms(): lists existing rooms.",
          "deleteRoom(): deletes a room.",
          "Room APIs can also be used for participant management and moderation.",
        ],
      },
      {
        title: "Token Concepts",
        content: [
          "identity: unique participant identity.",
          "room: restricts access to a specific room.",
          "roomJoin: permission to join a room.",
          "canPublish: permission to publish audio, video or other tracks.",
          "canSubscribe: permission to subscribe to tracks.",
          "canPublishData: permission to publish data packets.",
          "ttl: token validity duration.",
        ],
      },
      {
        title: "LearnHub Integration",
        code: `// Typical LearnHub flow

// 1. Instructor creates a live session.
// 2. Backend validates instructor and course ownership.
// 3. Backend creates session metadata.
// 4. Student requests permission to join.
// 5. Backend validates enrollment.
// 6. Backend generates a LiveKit token.
// 7. Frontend connects to the LiveKit room.`,
        language: "js",
      },
      {
        title: "Best Practices",
        content: [
          "Never expose LiveKit API secrets to frontend code.",
          "Generate participant tokens on the backend.",
          "Validate course ownership and enrollment before generating tokens.",
          "Give participants only the permissions they need.",
          "Use unique participant identities.",
          "Set appropriate token expiration.",
          "Validate room access before issuing a token.",
          "Handle room lifecycle through backend services.",
        ],
      },
    ],
  },
    "razorpay": {
    title: "Razorpay",
    slug: "razorpay",
    category: "Backend / Payments",
    description:
      "Razorpay is a payment gateway used to accept, process and manage online payments in web applications.",
    overview:
      "Razorpay provides APIs for creating payment orders, integrating checkout, verifying payment signatures, handling webhooks and managing refunds. Node.js applications commonly integrate it through the Razorpay SDK.",

    sections: [
      {
        title: "Installation",
        code: `npm install razorpay`,
        language: "bash",
      },
      {
        title: "Environment Variables",
        code: `RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret`,
        language: "bash",
      },
      {
        title: "Initialize Razorpay",
        code: `import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default razorpay;`,
        language: "js",
      },
      {
        title: "Create Order",
        code: `const order = await razorpay.orders.create({
  amount: 49900,
  currency: "INR",
  receipt: "receipt_123",
});

console.log(order.id);`,
        language: "js",
      },
      {
        title: "Order Fields",
        content: [
          "amount: amount in the smallest currency unit, such as paise.",
          "currency: currency code, such as INR.",
          "receipt: unique receipt identifier.",
          "notes: optional metadata.",
        ],
      },
      {
        title: "Frontend Checkout",
        code: `const options = {
  key: process.env.REACT_APP_RAZORPAY_KEY_ID,
  amount: order.amount,
  currency: order.currency,
  order_id: order.id,
  name: "LearnHub",
};

const checkout = new window.Razorpay(options);

checkout.open();`,
        language: "js",
      },
      {
        title: "Verify Payment Signature",
        code: `import crypto from "crypto";

const expectedSignature = crypto
  .createHmac(
    "sha256",
    process.env.RAZORPAY_KEY_SECRET
  )
  .update(
    orderId + "|" + paymentId
  )
  .digest("hex");

const isValid =
  expectedSignature === signature;`,
        language: "js",
      },
      {
        title: "Payment Verification",
        content:
          "After checkout, the backend receives the order ID, payment ID and signature. It validates the signature using the secret key before treating the payment as verified. The backend should independently validate the payment and order details before granting access.",
      },
      {
        title: "Fetch Payment",
        code: `const payment =
  await razorpay.payments.fetch(paymentId);

console.log(payment.status);
console.log(payment.amount);`,
        language: "js",
      },
      {
        title: "Capture Payment",
        code: `const capturedPayment =
  await razorpay.payments.capture(
    paymentId,
    amount,
    currency
  );`,
        language: "js",
      },
      {
        title: "Refund",
        code: `const refund =
  await razorpay.payments.refund(paymentId, {
    amount: 5000,
  });`,
        language: "js",
      },
      {
        title: "Webhooks",
        content: [
          "Webhooks notify your backend about payment events.",
          "Examples include payment.captured, payment.failed and refund.processed.",
          "Verify webhook signatures.",
          "Use idempotency or event-processing safeguards to avoid duplicate processing.",
          "Do not rely only on frontend checkout callbacks.",
        ],
      },
      {
        title: "LearnHub Payment Flow",
        code: `// 1. Student selects a course.
// 2. Backend checks enrollment and existing payments.
// 3. Backend creates or reuses a Razorpay order.
// 4. Frontend opens checkout.
// 5. Student completes payment.
// 6. Frontend sends payment details to backend.
// 7. Backend verifies the signature.
// 8. Backend verifies payment status and amount.
// 9. Enrollment is created.
// 10. Webhooks handle asynchronous payment events.`,
        language: "js",
      },
      {
        title: "Best Practices",
        content: [
          "Never expose the Razorpay secret key.",
          "Create orders from the backend.",
          "Verify payment signatures on the backend.",
          "Validate the payment amount, currency and associated order.",
          "Never grant course access solely on frontend success.",
          "Use webhooks for reliable asynchronous updates.",
          "Make enrollment creation idempotent.",
          "Maintain payment records and audit trails.",
          "Handle failed, pending, captured and refunded states correctly.",
        ],
      },
    ],
  },
    "google-oauth": {
    title: "Google APIs / Google OAuth",
    slug: "google-oauth",
    category: "Backend / Authentication & APIs",
    description:
      "Google OAuth enables users to authenticate using Google accounts and allows applications to access Google APIs with permission.",
    overview:
      "Google OAuth 2.0 is an authorization framework commonly used for Google Sign-In and delegated access to Google services. Applications use credentials, redirect flows, authorization codes and tokens to authenticate users or access permitted resources.",

    sections: [
      {
        title: "Installation",
        code: `npm install google-auth-library`,
        language: "bash",
      },
      {
        title: "Google Cloud Setup",
        content: [
          "Create a project in Google Cloud Console.",
          "Configure the OAuth consent screen.",
          "Create OAuth client credentials.",
          "Configure authorized redirect URIs.",
          "Store client credentials securely.",
        ],
      },
      {
        title: "Environment Variables",
        code: `GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5000/auth/google/callback`,
        language: "bash",
      },
      {
        title: "Import",
        code: `import { OAuth2Client } from "google-auth-library";`,
        language: "js",
      },
      {
        title: "Initialize OAuth Client",
        code: `const oauthClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);`,
        language: "js",
      },
      {
        title: "Generate Authorization URL",
        code: `const authUrl = oauthClient.generateAuthUrl({
  access_type: "offline",
  scope: [
    "openid",
    "email",
    "profile",
  ],
});`,
        language: "js",
      },
      {
        title: "Exchange Authorization Code",
        code: `const { tokens } =
  await oauthClient.getToken(code);

oauthClient.setCredentials(tokens);`,
        language: "js",
      },
      {
        title: "Verify Google ID Token",
        code: `const ticket =
  await oauthClient.verifyIdToken({
    idToken,
    audience:
      process.env.GOOGLE_CLIENT_ID,
  });

const payload =
  ticket.getPayload();

const googleId = payload.sub;
const email = payload.email;
const name = payload.name;`,
        language: "js",
      },
      {
        title: "OAuth Scopes",
        content: [
          "openid: enables OpenID Connect identity.",
          "email: allows access to user's email claim.",
          "profile: provides basic profile information.",
          "Additional Google API scopes must be requested only when needed.",
        ],
      },
      {
        title: "Authentication Flow",
        code: `// 1. User clicks Google Sign-In.
// 2. Backend or frontend initiates OAuth flow.
// 3. User authenticates with Google.
// 4. Google redirects with authorization code.
// 5. Backend exchanges code for tokens.
// 6. Backend validates identity.
// 7. Backend finds or creates application user.
// 8. Backend issues application authentication tokens.`,
        language: "js",
      },
      {
        title: "Common OAuth Concepts",
        content: [
          "Client ID: identifies your OAuth application.",
          "Client Secret: confidential credential used by backend applications.",
          "Authorization Code: temporary code exchanged for tokens.",
          "Access Token: allows access to authorized resources.",
          "Refresh Token: allows obtaining new access tokens when permitted.",
          "Scope: defines requested permissions.",
          "Redirect URI: destination after authorization.",
        ],
      },
      {
        title: "Google OAuth vs Application JWT",
        content: [
          "Google OAuth verifies identity or grants access to Google services.",
          "Your application JWT authenticates users within your own application.",
          "Google tokens and your application's tokens serve different purposes.",
          "After Google authentication, your backend can issue its own access and refresh tokens.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Never expose the Google Client Secret in frontend code.",
          "Validate ID tokens and their audience.",
          "Use HTTPS in production.",
          "Use state validation to protect OAuth flows against CSRF.",
          "Request only the scopes you actually need.",
          "Use secure storage for tokens.",
          "Never trust user identity from an unverified token.",
          "Handle account linking carefully to prevent account takeover.",
        ],
      },
    ],
  },
    "twilio": {
    title: "Twilio",
    slug: "twilio",
    category: "Backend / Communication APIs",
    description:
      "Twilio provides APIs for SMS, voice, messaging and communication services that developers can integrate into applications.",
    overview:
      "Twilio enables applications to communicate with users through programmable APIs. Node.js backends commonly use Twilio for SMS notifications, OTP workflows, alerts and messaging integrations.",

    sections: [
      {
        title: "Installation",
        code: `npm install twilio`,
        language: "bash",
      },
      {
        title: "Environment Variables",
        code: `TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_number`,
        language: "bash",
      },
      {
        title: "Initialize Twilio",
        code: `import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export default client;`,
        language: "js",
      },
      {
        title: "Send SMS",
        code: `const message = await client.messages.create({
  body: "Your notification message",
  from: process.env.TWILIO_PHONE_NUMBER,
  to: recipientNumber,
});

console.log(message.sid);`,
        language: "js",
      },
      {
        title: "Message Status",
        code: `console.log(message.sid);
console.log(message.status);
console.log(message.to);
console.log(message.dateCreated);`,
        language: "js",
      },
      {
        title: "Send WhatsApp Message",
        code: `const message = await client.messages.create({
  body: "Hello from LearnHub!",
  from: "whatsapp:+14155238886",
  to: "whatsapp:+919XXXXXXXXX",
});`,
        language: "js",
      },
      {
        title: "Message Statuses",
        content: [
          "queued: message is waiting to be processed.",
          "sent: message has been sent to the carrier.",
          "delivered: delivery confirmation received.",
          "failed: message delivery failed.",
          "undelivered: message could not be delivered.",
        ],
      },
      {
        title: "OTP Workflow",
        code: `// 1. Generate a temporary verification code.
// 2. Store its hashed value with an expiration.
// 3. Send the code to the user.
// 4. User submits the code.
// 5. Backend verifies the code.
// 6. Expire or invalidate the code after use.`,
        language: "js",
      },
      {
        title: "Twilio Verify",
        content:
          "Twilio Verify is a dedicated verification service that manages verification workflows, including sending and checking verification codes. It can reduce the need to implement OTP delivery and verification logic manually.",
      },
      {
        title: "Common Use Cases",
        content: [
          "SMS notifications.",
          "Phone number verification.",
          "OTP authentication.",
          "WhatsApp messaging.",
          "Appointment reminders.",
          "Transactional alerts.",
          "Communication workflows.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Never expose Twilio credentials in frontend code.",
          "Use environment variables for credentials.",
          "Implement rate limits on OTP requests.",
          "Set OTP expiration.",
          "Prevent OTP reuse.",
          "Avoid logging sensitive verification codes.",
          "Validate recipient numbers.",
          "Handle message failures and retries carefully.",
          "Use Twilio Verify for managed verification workflows.",
        ],
      },
    ],
  },
    "langchain": {
    title: "LangChain",
    slug: "langchain",
    category: "Backend / AI",
    description:
      "LangChain is a framework for building LLM-powered applications using models, prompts, tools, retrieval and structured workflows.",
    overview:
      "LangChain helps developers integrate LLMs into applications. It provides model integrations, prompt templates, tool calling, output parsing, retrieval workflows and components for building AI-powered features.",

    sections: [
      {
        title: "Installation",
        code: `npm install langchain @langchain/core`,
        language: "bash",
      },
      {
        title: "Model Provider Installation",
        code: `npm install @langchain/openai`,
        language: "bash",
      },
      {
        title: "Environment Variables",
        code: `OPENAI_API_KEY=your_api_key`,
        language: "bash",
      },
      {
        title: "Import Model",
        code: `import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "gpt-4.1-mini",
  temperature: 0.7,
});`,
        language: "js",
      },
      {
        title: "Basic Model Invocation",
        code: `const response = await model.invoke(
  "Explain REST APIs simply."
);

console.log(response.content);`,
        language: "js",
      },
      {
        title: "Prompt Templates",
        code: `import { ChatPromptTemplate } from "@langchain/core/prompts";

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful tutor."],
  ["human", "Explain {topic} simply."],
]);

const messages = await prompt.formatMessages({
  topic: "MongoDB",
});`,
        language: "js",
      },
      {
        title: "Prompt + Model Chain",
        code: `const chain = prompt.pipe(model);

const result = await chain.invoke({
  topic: "Node.js",
});

console.log(result.content);`,
        language: "js",
      },
      {
        title: "Runnable Sequence",
        code: `const chain = prompt.pipe(model);

const result = await chain.invoke({
  topic: "React",
});`,
        language: "js",
      },
      {
        title: "Structured Output",
        code: `import { z } from "zod";

const schema = z.object({
  title: z.string(),
  summary: z.string(),
});

const structuredModel =
  model.withStructuredOutput(schema);

const result = await structuredModel.invoke(
  "Summarize Node.js."
);`,
        language: "js",
      },
      {
        title: "Tool Calling Concepts",
        content: [
          "Tools allow an LLM to interact with defined functions.",
          "Tool schemas describe the function's inputs.",
          "The model may request a tool call based on the conversation.",
          "Your application executes the function and returns the result.",
          "Tool execution should be validated and permission-controlled.",
        ],
      },
      {
        title: "Runnable Concepts",
        content: [
          "Runnable: common interface for executable components.",
          "pipe(): connects components together.",
          "invoke(): executes a component with one input.",
          "batch(): processes multiple inputs.",
          "stream(): streams output where supported.",
          "RunnableSequence: sequential composition of components.",
        ],
      },
      {
        title: "Typical AI Workflow",
        code: `// Input
//    |
// Prompt Template
//    |
// LLM
//    |
// Output Parser
//    |
// Application Response`,
        language: "text",
      },
      {
        title: "Common Use Cases",
        content: [
          "AI chatbots.",
          "Document question answering.",
          "RAG applications.",
          "AI-powered search.",
          "Tool-using agents.",
          "Structured AI responses.",
          "Content generation.",
          "AI-powered educational platforms.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Keep API keys on the backend.",
          "Validate model outputs.",
          "Use structured outputs when predictable data is required.",
          "Handle model errors and timeouts.",
          "Track token usage and costs.",
          "Limit prompt and input sizes.",
          "Never blindly trust LLM-generated tool arguments.",
          "Apply authorization checks to every tool.",
          "Use LangChain only when its abstractions provide value.",
        ],
      },
    ],
  },
    "langgraph": {
    title: "LangGraph",
    slug: "langgraph",
    category: "Backend / AI",
    description:
      "LangGraph is a framework for building stateful AI agents and workflows using graphs, nodes, edges and shared state.",
    overview:
      "LangGraph enables developers to build complex AI workflows with state management, conditional routing, tool execution, loops, persistence and human-in-the-loop patterns. It is useful for agentic systems that need more control than simple linear chains.",

    sections: [
      {
        title: "Installation",
        code: `npm install @langchain/langgraph @langchain/core`,
        language: "bash",
      },
      {
        title: "Core Concepts",
        content: [
          "State: shared data passed throughout the graph.",
          "Node: a function that performs a workflow step.",
          "Edge: connects one node to another.",
          "Conditional Edge: selects the next node based on state.",
          "START: entry point of a graph.",
          "END: termination point of a graph.",
          "Checkpointing: persists graph state across executions.",
        ],
      },
      {
        title: "Import",
        code: `import {
  StateGraph,
  START,
  END,
} from "@langchain/langgraph";`,
        language: "js",
      },
      {
        title: "Define State",
        code: `import { StateGraph, START, END, Annotation } from "@langchain/langgraph";

const GraphState = Annotation.Root({
  message: Annotation({
    reducer: (_, next) => next,
    default: () => "",
  }),
});`,
        language: "js",
      },
      {
        title: "Create Nodes",
        code: `const greetingNode = async (state) => {
  return {
    message: "Hello from LangGraph!",
  };
};`,
        language: "js",
      },
      {
        title: "Build Graph",
        code: `const graph = new StateGraph(GraphState)
  .addNode("greeting", greetingNode)
  .addEdge(START, "greeting")
  .addEdge("greeting", END);

const app = graph.compile();`,
        language: "js",
      },
      {
        title: "Invoke Graph",
        code: `const result = await app.invoke({
  message: "",
});

console.log(result.message);`,
        language: "js",
      },
      {
        title: "Conditional Routing",
        code: `const routeNode = async (state) => {
  return {
    message: state.message,
  };
};

const decideRoute = (state) => {
  if (state.message === "admin") {
    return "admin";
  }

  return "student";
};

// Routing functions can be connected
// using addConditionalEdges().`,
        language: "js",
      },
      {
        title: "Conditional Edges",
        code: `graph.addConditionalEdges(
  "router",
  decideRoute,
  {
    admin: "adminNode",
    student: "studentNode",
  }
);`,
        language: "js",
      },
      {
        title: "Workflow Loop",
        content:
          "LangGraph supports cyclic workflows. Nodes can route back to previous nodes, allowing iterative execution, agent reasoning loops and repeated tool operations until a condition is satisfied.",
      },
      {
        title: "Checkpointing",
        content:
          "Checkpointing saves graph state at execution boundaries. It can support persistent conversations, resumable workflows, recovery and human-in-the-loop interactions. Production persistence typically uses an appropriate checkpoint backend.",
      },
      {
        title: "Tool-Based Agent Concepts",
        content: [
          "An agent node calls an LLM.",
          "The LLM can request a tool.",
          "A tool node executes the requested operation.",
          "The result updates graph state.",
          "The graph routes back to the agent.",
          "The workflow continues until completion or another routing condition.",
        ],
      },
      {
        title: "Typical Agent Flow",
        code: `// START
//   |
// Agent
//   |
// Conditional Routing
//   |
// Tool Execution
//   |
// Agent
//   |
// END`,
        language: "text",
      },
      {
        title: "Common Use Cases",
        content: [
          "AI agents.",
          "Multi-step AI workflows.",
          "Tool-calling systems.",
          "Persistent chat assistants.",
          "Human approval workflows.",
          "Research agents.",
          "AI automation.",
          "Multi-agent coordination.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Keep graph state structured and minimal.",
          "Make nodes focused on single responsibilities.",
          "Use conditional routing for explicit control flow.",
          "Handle errors and retries carefully.",
          "Persist state when resumability is required.",
          "Validate tool inputs and outputs.",
          "Apply authorization checks to tools.",
          "Set limits on loops and execution time.",
          "Use human approval for sensitive actions.",
        ],
      },
    ],
  },
    "groq": {
    title: "Groq SDK",
    slug: "groq",
    category: "Backend / AI",
    description:
      "Groq provides an API and SDK for running large language models with fast inference.",
    overview:
      "The Groq SDK allows developers to interact with supported LLMs through API requests. It supports chat completions, streaming, structured application workflows and integration with frameworks such as LangChain.",

    sections: [
      {
        title: "Installation",
        code: `npm install groq-sdk`,
        language: "bash",
      },
      {
        title: "Environment Variables",
        code: `GROQ_API_KEY=your_api_key`,
        language: "bash",
      },
      {
        title: "Initialize SDK",
        code: `import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});`,
        language: "js",
      },
      {
        title: "Chat Completion",
        code: `const completion =
  await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "Explain Node.js simply.",
      },
    ],
    model: "llama-3.3-70b-versatile",
  });

console.log(
  completion.choices[0].message.content
);`,
        language: "js",
      },
      {
        title: "System Message",
        code: `const messages = [
  {
    role: "system",
    content: "You are a helpful programming tutor.",
  },
  {
    role: "user",
    content: "Explain React hooks.",
  },
];`,
        language: "js",
      },
      {
        title: "Streaming",
        code: `const stream =
  await groq.chat.completions.create({
    messages,
    model: "llama-3.3-70b-versatile",
    stream: true,
  });

for await (const chunk of stream) {
  const content =
    chunk.choices[0]?.delta?.content;

  if (content) {
    process.stdout.write(content);
  }
}`,
        language: "js",
      },
      {
        title: "Important Parameters",
        content: [
          "model: selects the model.",
          "messages: conversation history and instructions.",
          "temperature: controls response randomness.",
          "max_tokens: limits generated output.",
          "stream: enables streamed responses.",
          "top_p: controls nucleus sampling.",
        ],
      },
      {
        title: "LangChain Integration",
        code: `npm install @langchain/groq`,
        language: "bash",
      },
      {
        title: "Using Groq with LangChain",
        code: `import { ChatGroq } from "@langchain/groq";

const model = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0,
});

const response = await model.invoke(
  "Explain Express middleware."
);

console.log(response.content);`,
        language: "js",
      },
      {
        title: "Common Use Cases",
        content: [
          "AI chatbots.",
          "AI coding assistants.",
          "Content generation.",
          "AI-powered educational tools.",
          "Streaming chat applications.",
          "LLM-powered APIs.",
          "LangChain model integration.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Never expose API keys in frontend code.",
          "Keep API requests on the backend.",
          "Handle rate limits and API failures.",
          "Limit token usage.",
          "Use streaming for interactive experiences where appropriate.",
          "Choose models according to task requirements.",
          "Validate generated output before using it in application logic.",
          "Monitor API usage and costs.",
        ],
      },
    ],
  },
    "pinecone": {
    title: "Pinecone",
    slug: "pinecone",
    category: "Backend / AI / Database",
    description:
      "Pinecone is a vector database used to store, index and retrieve vector embeddings for semantic search and AI applications.",
    overview:
      "Pinecone stores vector representations of data and enables similarity searches. AI applications use it to retrieve semantically relevant information from documents, knowledge bases and other datasets.",

    sections: [
      {
        title: "Installation",
        code: `npm install @pinecone-database/pinecone`,
        language: "bash",
      },
      {
        title: "Environment Variables",
        code: `PINECONE_API_KEY=your_api_key`,
        language: "bash",
      },
      {
        title: "Initialize Client",
        code: `import { Pinecone } from "@pinecone-database/pinecone";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});`,
        language: "js",
      },
      {
        title: "List Indexes",
        code: `const indexes = await pinecone.listIndexes();

console.log(indexes);`,
        language: "js",
      },
      {
        title: "Create Index",
        code: `await pinecone.createIndex({
  name: "knowledge-base",
  dimension: 1536,
  metric: "cosine",
  spec: {
    serverless: {
      cloud: "aws",
      region: "us-east-1",
    },
  },
});`,
        language: "js",
      },
      {
        title: "Connect to Index",
        code: `const index = pinecone.index(
  "knowledge-base"
);`,
        language: "js",
      },
      {
        title: "Upsert Vectors",
        code: `await index.upsert([
  {
    id: "doc-1",
    values: embedding,
    metadata: {
      text: "Node.js is a JavaScript runtime.",
      category: "backend",
    },
  },
]);`,
        language: "js",
      },
      {
        title: "Query Vectors",
        code: `const result = await index.query({
  vector: queryEmbedding,
  topK: 5,
  includeMetadata: true,
});

console.log(result.matches);`,
        language: "js",
      },
      {
        title: "Delete Vectors",
        code: `await index.deleteOne("doc-1");`,
        language: "js",
      },
      {
        title: "Metadata Filtering",
        code: `const result = await index.query({
  vector: queryEmbedding,
  topK: 5,
  filter: {
    category: { $eq: "backend" },
  },
  includeMetadata: true,
});`,
        language: "js",
      },
      {
        title: "Vector Embeddings",
        content:
          "Embeddings are numerical representations of text, images or other data. Similar content can have vectors that are close together according to a similarity metric. Pinecone stores and retrieves these vectors, but an embedding model is generally needed to generate them.",
      },
      {
        title: "Important Concepts",
        content: [
          "Vector: numerical representation of data.",
          "Dimension: number of values in a vector.",
          "Index: structure used to store and query vectors.",
          "Namespace: logical partition within an index.",
          "Metadata: additional information attached to vectors.",
          "Similarity metric: method used to compare vectors.",
          "Upsert: inserts or updates vectors.",
          "TopK: number of matches returned.",
        ],
      },
      {
        title: "RAG Workflow",
        code: `// 1. Collect documents.
// 2. Split documents into chunks.
// 3. Generate embeddings.
// 4. Store vectors and metadata.
// 5. Embed the user's query.
// 6. Search similar vectors.
// 7. Retrieve relevant chunks.
// 8. Pass retrieved context to an LLM.
// 9. Generate a grounded response.`,
        language: "js",
      },
      {
        title: "Common Use Cases",
        content: [
          "Semantic search.",
          "RAG systems.",
          "AI chatbots over documents.",
          "Knowledge bases.",
          "Recommendation systems.",
          "Similarity matching.",
          "AI-powered search engines.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Use the same embedding model and dimensions for stored vectors and query vectors.",
          "Choose chunk sizes according to the content and retrieval task.",
          "Store useful metadata for filtering.",
          "Use namespaces or other isolation mechanisms appropriately.",
          "Avoid storing unnecessary sensitive information.",
          "Evaluate retrieval quality independently from LLM response quality.",
          "Monitor storage, query performance and usage.",
          "Keep embedding generation separate from vector storage logic.",
        ],
      },
    ],
  },
    "pinecone": {
    title: "Pinecone",
    slug: "pinecone",
    category: "Backend / AI / Database",
    description:
      "Pinecone is a vector database used to store, index and retrieve vector embeddings for semantic search and AI applications.",
    overview:
      "Pinecone stores vector representations of data and enables similarity searches. AI applications use it to retrieve semantically relevant information from documents, knowledge bases and other datasets.",

    sections: [
      {
        title: "Installation",
        code: `npm install @pinecone-database/pinecone`,
        language: "bash",
      },
      {
        title: "Environment Variables",
        code: `PINECONE_API_KEY=your_api_key`,
        language: "bash",
      },
      {
        title: "Initialize Client",
        code: `import { Pinecone } from "@pinecone-database/pinecone";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});`,
        language: "js",
      },
      {
        title: "List Indexes",
        code: `const indexes = await pinecone.listIndexes();

console.log(indexes);`,
        language: "js",
      },
      {
        title: "Create Index",
        code: `await pinecone.createIndex({
  name: "knowledge-base",
  dimension: 1536,
  metric: "cosine",
  spec: {
    serverless: {
      cloud: "aws",
      region: "us-east-1",
    },
  },
});`,
        language: "js",
      },
      {
        title: "Connect to Index",
        code: `const index = pinecone.index(
  "knowledge-base"
);`,
        language: "js",
      },
      {
        title: "Upsert Vectors",
        code: `await index.upsert([
  {
    id: "doc-1",
    values: embedding,
    metadata: {
      text: "Node.js is a JavaScript runtime.",
      category: "backend",
    },
  },
]);`,
        language: "js",
      },
      {
        title: "Query Vectors",
        code: `const result = await index.query({
  vector: queryEmbedding,
  topK: 5,
  includeMetadata: true,
});

console.log(result.matches);`,
        language: "js",
      },
      {
        title: "Delete Vectors",
        code: `await index.deleteOne("doc-1");`,
        language: "js",
      },
      {
        title: "Metadata Filtering",
        code: `const result = await index.query({
  vector: queryEmbedding,
  topK: 5,
  filter: {
    category: { $eq: "backend" },
  },
  includeMetadata: true,
});`,
        language: "js",
      },
      {
        title: "Vector Embeddings",
        content:
          "Embeddings are numerical representations of text, images or other data. Similar content can have vectors that are close together according to a similarity metric. Pinecone stores and retrieves these vectors, but an embedding model is generally needed to generate them.",
      },
      {
        title: "Important Concepts",
        content: [
          "Vector: numerical representation of data.",
          "Dimension: number of values in a vector.",
          "Index: structure used to store and query vectors.",
          "Namespace: logical partition within an index.",
          "Metadata: additional information attached to vectors.",
          "Similarity metric: method used to compare vectors.",
          "Upsert: inserts or updates vectors.",
          "TopK: number of matches returned.",
        ],
      },
      {
        title: "RAG Workflow",
        code: `// 1. Collect documents.
// 2. Split documents into chunks.
// 3. Generate embeddings.
// 4. Store vectors and metadata.
// 5. Embed the user's query.
// 6. Search similar vectors.
// 7. Retrieve relevant chunks.
// 8. Pass retrieved context to an LLM.
// 9. Generate a grounded response.`,
        language: "js",
      },
      {
        title: "Common Use Cases",
        content: [
          "Semantic search.",
          "RAG systems.",
          "AI chatbots over documents.",
          "Knowledge bases.",
          "Recommendation systems.",
          "Similarity matching.",
          "AI-powered search engines.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Use the same embedding model and dimensions for stored vectors and query vectors.",
          "Choose chunk sizes according to the content and retrieval task.",
          "Store useful metadata for filtering.",
          "Use namespaces or other isolation mechanisms appropriately.",
          "Avoid storing unnecessary sensitive information.",
          "Evaluate retrieval quality independently from LLM response quality.",
          "Monitor storage, query performance and usage.",
          "Keep embedding generation separate from vector storage logic.",
        ],
      },
    ],
  },
   "web3-js": {
    title: "Web3.js",
    slug: "web3-js",
    category: "Backend / Web3",
    description:
      "Web3.js is a JavaScript library for interacting with Ethereum-compatible blockchain networks through RPC APIs and smart contracts.",
    overview:
      "Web3.js provides JavaScript interfaces for communicating with blockchain nodes, reading blockchain data and interacting with smart contracts. It can be used in frontend and backend applications.",

    sections: [
      {
        title: "Installation",
        code: `npm install web3`,
        language: "bash",
      },
      {
        title: "Importing Web3",
        code: `import { Web3 } from "web3";`,
        language: "js",
      },
      {
        title: "Connecting to a Blockchain",
        code: `const web3 = new Web3(
  process.env.ETH_RPC_URL
);`,
        language: "js",
      },
      {
        title: "Getting Block Number",
        code: `const blockNumber =
  await web3.eth.getBlockNumber();

console.log(blockNumber);`,
        language: "js",
      },
      {
        title: "Getting ETH Balance",
        code: `const balance = await web3.eth.getBalance(
  "0xWalletAddress"
);

console.log(
  web3.utils.fromWei(balance, "ether")
);`,
        language: "js",
      },
      {
        title: "Working with Contract ABI",
        code: `const abi = [
  {
    inputs: [],
    name: "name",
    outputs: [
      { type: "string", name: "" }
    ],
    stateMutability: "view",
    type: "function",
  },
];

const contract = new web3.eth.Contract(
  abi,
  contractAddress
);`,
        language: "js",
      },
      {
        title: "Reading Contract Data",
        code: `const tokenName =
  await contract.methods.name().call();

console.log(tokenName);`,
        language: "js",
      },
      {
        title: "Important Concepts",
        content: [
          "Web3 instance: interface for blockchain communication.",
          "RPC: protocol used to communicate with blockchain nodes.",
          "ABI: defines smart contract functions and events.",
          "Contract: JavaScript abstraction for an on-chain contract.",
          "Gas: computational cost of blockchain operations.",
          "Wei: smallest denomination of Ether.",
          "Transaction: operation submitted to the blockchain.",
        ],
      },
      {
        title: "Common Use Cases",
        content: [
          "Blockchain data retrieval.",
          "Smart contract integration.",
          "Token data reading.",
          "Web3 application development.",
          "Blockchain-based backend services.",
        ],
      },
      {
        title: "Web3.js vs Ethers.js",
        content: [
          "Both libraries provide APIs for blockchain interaction.",
          "Both support contract interaction and blockchain data retrieval.",
          "Ethers.js is often preferred in modern JavaScript Web3 projects for its API and wallet tooling.",
          "Choose a library based on your existing project, ecosystem and compatibility requirements.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Use trusted RPC providers.",
          "Never expose private keys in frontend code.",
          "Validate blockchain addresses.",
          "Handle RPC errors and network failures.",
          "Use test networks for development.",
          "Verify contract addresses and ABI definitions.",
        ],
      },
    ],
  },
   "kafka": {
    title: "Apache Kafka",
    slug: "kafka",
    category: "Backend / Distributed Systems",
    description:
      "Apache Kafka is a distributed event streaming platform used to build scalable, fault-tolerant and real-time data pipelines and event-driven systems.",
    overview:
      "Kafka allows applications to publish, store and consume events through topics. It is widely used for asynchronous communication, event-driven architectures, streaming pipelines and distributed systems.",

    sections: [
      {
        title: "Installation",
        code: `npm install kafkajs`,
        language: "bash",
      },
      {
        title: "Environment Variables",
        code: `KAFKA_BROKER=localhost:9092`,
        language: "bash",
      },
      {
        title: "Initialize Kafka",
        code: `import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "learnhub-service",
  brokers: [
    process.env.KAFKA_BROKER,
  ],
});`,
        language: "js",
      },
      {
        title: "Creating a Producer",
        code: `const producer = kafka.producer();

await producer.connect();

await producer.send({
  topic: "user-events",
  messages: [
    {
      key: "user-1",
      value: JSON.stringify({
        event: "USER_REGISTERED",
      }),
    },
  ],
});`,
        language: "js",
      },
      {
        title: "Creating a Consumer",
        code: `const consumer = kafka.consumer({
  groupId: "user-event-consumer",
});

await consumer.connect();

await consumer.subscribe({
  topic: "user-events",
  fromBeginning: false,
});

await consumer.run({
  eachMessage: async ({
    topic,
    partition,
    message,
  }) => {
    console.log({
      topic,
      partition,
      value: message.value?.toString(),
    });
  },
});`,
        language: "js",
      },
      {
        title: "Creating a Topic",
        code: `const admin = kafka.admin();

await admin.connect();

await admin.createTopics({
  topics: [
    {
      topic: "user-events",
      numPartitions: 3,
      replicationFactor: 1,
    },
  ],
});

await admin.disconnect();`,
        language: "js",
      },
      {
        title: "Producer vs Consumer",
        content: [
          "Producer: publishes messages to Kafka topics.",
          "Consumer: reads messages from Kafka topics.",
          "Consumer Group: multiple consumers coordinating to consume topic partitions.",
          "Broker: Kafka server that stores and manages messages.",
          "Topic: logical category where events are stored.",
          "Partition: subdivision of a topic that enables parallelism.",
          "Offset: position of a message within a partition.",
        ],
      },
      {
        title: "Kafka Architecture",
        content:
          "Kafka organizes events into topics. Topics are divided into partitions and stored across brokers. Producers publish messages while consumers read them. Consumer groups allow processing to scale horizontally, while offsets help track message consumption.",
      },
      {
        title: "Event-Driven Architecture",
        code: `// Service A
await producer.send({
  topic: "payment-events",
  messages: [
    {
      value: JSON.stringify({
        type: "PAYMENT_COMPLETED",
        paymentId: "payment-123",
      }),
    },
  ],
});

// Service B independently consumes
// payment-events and processes the event.`,
        language: "js",
      },
      {
        title: "Common Use Cases",
        content: [
          "Microservices communication.",
          "Event-driven architectures.",
          "Real-time analytics.",
          "Log aggregation.",
          "Data pipelines.",
          "Background processing.",
          "Distributed event processing.",
        ],
      },
      {
        title: "Kafka vs Redis Pub/Sub",
        content: [
          "Kafka is designed for durable event streaming and replayable event logs.",
          "Redis Pub/Sub is generally designed for lightweight real-time message broadcasting without durable message history.",
          "Kafka supports partition-based scaling and consumer groups.",
          "The right choice depends on durability, throughput, replay and operational complexity.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Design meaningful topic names.",
          "Use message keys when ordering by entity matters.",
          "Handle duplicate messages because consumers may process events more than once.",
          "Design consumers to be idempotent.",
          "Monitor consumer lag.",
          "Use retries and dead-letter topics where appropriate.",
          "Avoid putting unnecessarily large payloads in messages.",
          "Manage offsets and delivery semantics carefully.",
          "Use replication and appropriate partition strategies in production.",
        ],
      },
    ],
  },
    "docker": {
    title: "Docker",
    slug: "docker",
    category: "DevOps / Infrastructure",
    description:
      "Docker is a containerization platform that allows applications to run in isolated, portable and consistent environments.",
    overview:
      "Docker packages an application along with its dependencies into a container. Containers help developers run applications consistently across development, testing and production environments.",

    sections: [
      {
        title: "What is Docker?",
        content:
          "Docker is a platform used to build, package and run applications inside containers. Instead of configuring an application separately on every machine, developers can package the application and its dependencies into a reusable container image.",
      },
      {
        title: "Important Concepts",
        content: [
          "Docker Image: a packaged blueprint used to create containers.",
          "Docker Container: a running instance of an image.",
          "Dockerfile: instructions used to build an image.",
          "Docker Engine: runtime responsible for building and running containers.",
          "Docker Hub: registry used to store and share images.",
          "Volume: persistent storage used by containers.",
          "Port Mapping: exposes container ports to the host machine.",
          "Docker Compose: manages multiple services together.",
        ],
      },
      {
        title: "Basic Commands",
        code: `# Check Docker version
docker --version

# Check running containers
docker ps

# Check all containers
docker ps -a

# Check downloaded images
docker images

# Download an image
docker pull nginx

# Run a container
docker run nginx

# Run in detached mode
docker run -d nginx

# Stop a container
docker stop container_id

# Remove a container
docker rm container_id

# Remove an image
docker rmi image_name`,
        language: "bash",
      },
      {
        title: "Running Containers with Port Mapping",
        code: `docker run -d -p 8080:80 nginx`,
        language: "bash",
      },
      {
        title: "Understanding Port Mapping",
        content:
          "The -p flag maps a host port to a container port. In -p 8080:80, port 8080 on your computer forwards traffic to port 80 inside the container. You can access the containerized application through your host machine's port 8080.",
      },
      {
        title: "Dockerfile",
        code: `FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]`,
        language: "dockerfile",
      },
      {
        title: "Building an Image",
        code: `docker build -t my-node-app .`,
        language: "bash",
      },
      {
        title: "Running Your Application",
        code: `docker run -p 5000:5000 my-node-app`,
        language: "bash",
      },
      {
        title: "Dockerfile Instructions",
        content: [
          "FROM: defines the base image.",
          "WORKDIR: sets the working directory.",
          "COPY: copies files into the image.",
          "RUN: executes commands during image building.",
          "EXPOSE: documents the intended container port.",
          "CMD: defines the default command when the container starts.",
          "ENV: defines environment variables.",
          "ENTRYPOINT: defines the primary executable for the container.",
        ],
      },
      {
        title: "Docker Volumes",
        code: `# Create a volume
docker volume create app-data

# Inspect volumes
docker volume ls

# Run container using a volume
docker run -d \
  -v app-data:/data \
  nginx`,
        language: "bash",
      },
      {
        title: "Docker Compose",
        code: `services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      NODE_ENV: development`,
        language: "yaml",
      },
      {
        title: "Docker Compose Commands",
        code: `# Start services
docker compose up

# Start in background
docker compose up -d

# Stop services
docker compose down

# Rebuild services
docker compose up --build

# View logs
docker compose logs`,
        language: "bash",
      },
      {
        title: "Why Docker is Used",
        content: [
          "Consistent development and production environments.",
          "Simplified application deployment.",
          "Application isolation.",
          "Easy dependency management.",
          "Microservices deployment.",
          "CI/CD integration.",
          "Scalable infrastructure workflows.",
        ],
      },
      {
        title: "Docker in a MERN Application",
        content:
          "In a MERN application, Docker can containerize the frontend, backend and MongoDB services. Docker Compose can manage multiple services, their networking, environment configuration and persistent storage.",
      },
      {
        title: "Best Practices",
        content: [
          "Use lightweight base images when appropriate.",
          "Use .dockerignore to exclude unnecessary files.",
          "Avoid embedding secrets inside Docker images.",
          "Use multi-stage builds for production applications.",
          "Run containers with minimal privileges.",
          "Use persistent volumes for data that must survive container removal.",
          "Pin and maintain base image versions.",
          "Understand the difference between images, containers and volumes.",
        ],
      },
    ],
  },
    "docker-compose": {
    title: "Docker Compose",
    slug: "docker-compose",
    category: "DevOps / Infrastructure",
    description:
      "Docker Compose is a tool for defining, configuring and running multiple Docker containers together using a YAML configuration file.",
    overview:
      "Docker Compose simplifies multi-container applications. Instead of manually starting each container, you define services, networks, volumes and configurations in a compose.yaml file and manage them using a single command.",

    sections: [
      {
        title: "What is Docker Compose?",
        content:
          "Docker Compose is used to orchestrate multiple containers on a single host. It is particularly useful for local development environments involving frontend, backend, databases, Redis and other services.",
      },
      {
        title: "Basic compose.yaml",
        code: `services:
  app:
    image: nginx
    ports:
      - "8080:80"`,
        language: "yaml",
      },
      {
        title: "Start Services",
        code: `# Start containers
docker compose up

# Start in background
docker compose up -d

# Stop and remove containers
docker compose down`,
        language: "bash",
      },
      {
        title: "Building an Application",
        code: `services:
  backend:
    build: .
    ports:
      - "5000:5000"`,
        language: "yaml",
      },
      {
        title: "Environment Variables",
        code: `services:
  backend:
    build: .
    environment:
      NODE_ENV: development
      PORT: 5000`,
        language: "yaml",
      },
      {
        title: "Using env File",
        code: `services:
  backend:
    build: .
    env_file:
      - .env`,
        language: "yaml",
      },
      {
        title: "MongoDB with Docker Compose",
        code: `services:
  backend:
    build: .
    ports:
      - "5000:5000"
    depends_on:
      - mongodb

  mongodb:
    image: mongo
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:`,
        language: "yaml",
      },
      {
        title: "Service Networking",
        content:
          "Services inside the same Docker Compose network can communicate using their service names. For example, a backend service can connect to MongoDB using mongodb as the hostname instead of localhost.",
      },
      {
        title: "Connecting Backend to MongoDB",
        code: `MONGO_URI=mongodb://mongodb:27017/learnhub`,
        language: "bash",
      },
      {
        title: "Useful Commands",
        code: `# View running services
docker compose ps

# View logs
docker compose logs

# View logs of one service
docker compose logs backend

# Rebuild services
docker compose up --build

# Restart a service
docker compose restart backend

# Stop services
docker compose stop

# Remove containers and networks
docker compose down

# Remove containers and volumes
docker compose down -v`,
        language: "bash",
      },
      {
        title: "Important Concepts",
        content: [
          "Service: a container configuration inside Compose.",
          "Build: builds an image from a Dockerfile.",
          "Ports: maps host ports to container ports.",
          "Volumes: persist or share data.",
          "Environment: configures application runtime variables.",
          "Depends_on: controls startup dependency ordering, but does not guarantee service readiness.",
          "Network: allows services to communicate.",
        ],
      },
      {
        title: "Common Use Cases",
        content: [
          "Running MERN applications locally.",
          "Running MongoDB and backend together.",
          "Running Redis alongside Node.js.",
          "Local microservices environments.",
          "Development and testing environments.",
          "Managing multi-container applications.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Use service names for container-to-container communication.",
          "Keep secrets out of committed Compose files.",
          "Use named volumes for persistent database data.",
          "Use healthchecks where service readiness matters.",
          "Avoid unnecessary container privileges.",
          "Use separate configurations for development and production when needed.",
          "Remember that depends_on alone does not guarantee a database is ready.",
        ],
      },
    ],
  },
     "express-validator": {
    title: "Express Validator",
    slug: "express-validator",
    category: "Backend Development",
    description:
      "Express Validator is a middleware library used to validate and sanitize HTTP request data in Express applications.",
    overview:
      "Express Validator provides validation chains and middleware to validate request bodies, query parameters, route parameters and sanitize user input before it reaches application logic.",

    sections: [
      {
        title: "Installation",
        code: `npm install express-validator`,
        language: "bash",
      },
      {
        title: "Basic Validation",
        code: `import {
  body,
  validationResult,
} from "express-validator";

app.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email"),

    body("password")
      .isLength({ min: 8 })
      .withMessage(
        "Password must be at least 8 characters"
      ),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    res.json({
      message: "Validation successful",
    });
  }
);`,
        language: "js",
      },
      {
        title: "Common Validators",
        code: `body("email").isEmail();

body("age").isInt({ min: 18 });

body("username").isLength({
  min: 3,
  max: 20,
});

body("password").isStrongPassword();

body("website").isURL();

body("phone").isMobilePhone("en-IN");`,
        language: "js",
      },
      {
        title: "Validation and Sanitization",
        code: `body("email")
  .trim()
  .normalizeEmail()
  .isEmail();

body("username")
  .trim()
  .escape();`,
        language: "js",
      },
      {
        title: "Reusable Validation Middleware",
        code: `import {
  body,
  validationResult,
} from "express-validator";

export const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Minimum 8 characters required"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    next();
  },
];`,
        language: "js",
      },
      {
        title: "Using Validator in Routes",
        code: `import {
  registerValidator,
} from "../validators/auth.validator.js";

router.post(
  "/register",
  registerValidator,
  registerController
);`,
        language: "js",
      },
      {
        title: "Validating Route Parameters",
        code: `import { param } from "express-validator";

export const courseIdValidator = [
  param("courseId")
    .isMongoId()
    .withMessage("Invalid course ID"),
];`,
        language: "js",
      },
      {
        title: "Validating Query Parameters",
        code: `import { query } from "express-validator";

export const searchValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 }),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 }),
];`,
        language: "js",
      },
      {
        title: "Important Methods",
        content: [
          "body(): validates request body fields.",
          "param(): validates route parameters.",
          "query(): validates query parameters.",
          "check(): checks fields across request locations.",
          "validationResult(): extracts validation errors.",
          "isEmail(): validates email format.",
          "isMongoId(): validates MongoDB ID format.",
          "trim(): removes surrounding whitespace.",
          "escape(): sanitizes HTML-sensitive characters.",
          "normalizeEmail(): normalizes email values.",
          "optional(): skips validation for optional fields.",
        ],
      },
      {
        title: "Common Use Cases",
        content: [
          "Registration and login validation.",
          "Course creation and updates.",
          "Payment request validation.",
          "MongoDB ID validation.",
          "Search and pagination validation.",
          "File metadata and form input validation.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Validate input before executing controller logic.",
          "Keep validators in dedicated files.",
          "Validate route parameters, body and query independently where appropriate.",
          "Return structured validation errors.",
          "Do not rely on frontend validation alone.",
          "Sanitize input where appropriate for the context.",
          "Validation is not a replacement for authorization or database constraints.",
          "Avoid treating sanitization as a substitute for context-aware output encoding.",
        ],
      },
    ],
  },
    "multer": {
    title: "Multer",
    slug: "multer",
    category: "Backend Development",
    description:
      "Multer is Express middleware used to handle multipart/form-data requests, especially file uploads.",
    overview:
      "Multer processes multipart form data and makes uploaded files accessible through req.file or req.files. It is commonly used in Node.js applications for image, document and other file uploads.",
    sections: [
      {
        title: "Installation",
        code: `npm install multer`,
        language: "bash",
      },
      {
        title: "Basic Setup",
        code: `import multer from "multer";

const upload = multer({
  dest: "uploads/",
});`,
        language: "js",
      },
      {
        title: "Single File Upload",
        code: `router.post(
  "/upload",
  upload.single("image"),
  (req, res) => {
    console.log(req.file);
    console.log(req.body);

    res.json({
      message: "File uploaded",
    });
  }
);`,
        language: "js",
      },
      {
        title: "Multiple File Upload",
        code: `router.post(
  "/upload",
  upload.array("images", 5),
  (req, res) => {
    console.log(req.files);

    res.json({
      message: "Files uploaded",
    });
  }
);`,
        language: "js",
      },
      {
        title: "Multiple Fields Upload",
        code: `const uploadFields = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "documents", maxCount: 3 },
]);

router.post(
  "/profile",
  uploadFields,
  (req, res) => {
    console.log(req.files.avatar);
    console.log(req.files.documents);

    res.json({
      message: "Uploads received",
    });
  }
);`,
        language: "js",
      },
      {
        title: "Memory Storage",
        code: `const upload = multer({
  storage: multer.memoryStorage(),
});`,
        language: "js",
      },
      {
        title: "Disk Storage",
        code: `const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
});`,
        language: "js",
      },
      {
        title: "File Size Limits",
        code: `const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 5,
  },
});`,
        language: "js",
      },
      {
        title: "File Type Filtering",
        code: `const upload = multer({
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file type"));
    }
  },
});`,
        language: "js",
      },
      {
        title: "Multer Error Handling",
        code: `router.post(
  "/upload",
  (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }

      next();
    });
  },
  uploadController
);`,
        language: "js",
      },
      {
        title: "Important Methods",
        content: [
          "single(fieldName): handles one file.",
          "array(fieldName, maxCount): handles multiple files from one field.",
          "fields(fieldsArray): handles uploads from multiple fields.",
          "none(): handles multipart text fields without files.",
          "any(): accepts files from any field; use cautiously.",
          "diskStorage(): stores files on disk.",
          "memoryStorage(): stores files in memory.",
          "fileFilter(): controls which files are accepted.",
          "limits: restricts file sizes and upload counts.",
        ],
      },
      {
        title: "Request Properties",
        content: [
          "req.file: uploaded file when using single().",
          "req.files: uploaded files when using array() or fields().",
          "req.body: text fields included in multipart requests.",
          "originalname: original file name.",
          "mimetype: reported MIME type.",
          "size: file size in bytes.",
          "filename: stored filename when using disk storage.",
          "path: file path when using disk storage.",
          "buffer: file contents when using memory storage.",
        ],
      },
      {
        title: "Common Use Cases",
        content: [
          "Profile picture uploads.",
          "Course thumbnail uploads.",
          "Document uploads.",
          "Multiple image uploads.",
          "Multipart form processing.",
          "Temporary upload processing before cloud storage.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Always restrict upload sizes.",
          "Validate file types and actual file content.",
          "Never trust original filenames.",
          "Avoid unrestricted any() middleware.",
          "Use temporary storage when files are uploaded to cloud providers.",
          "Avoid memory storage for large uploads.",
          "Do not expose uploaded files without access control when they are private.",
          "Use error handling for Multer upload failures.",
          "Multer only handles multipart/form-data requests.",
        ],
      },
    ],
  },
   "cors": {
    title: "CORS",
    slug: "cors",
    category: "Backend Development / Security",
    description:
      "CORS (Cross-Origin Resource Sharing) is a browser security mechanism that controls whether a web application can access resources from a different origin.",
    overview:
      "CORS allows servers to specify which origins, methods and headers browsers can allow when accessing cross-origin resources. It is commonly configured in Express applications when frontend and backend run on different origins.",

    sections: [
      {
        title: "What is CORS?",
        content:
          "Browsers enforce the Same-Origin Policy. When a frontend tries to access an API hosted on a different origin, the browser may restrict the request. CORS is a server-side mechanism that allows specific cross-origin requests.",
      },
      {
        title: "Installation",
        code: `npm install cors`,
        language: "bash",
      },
      {
        title: "Basic Setup",
        code: `import cors from "cors";
import express from "express";

const app = express();

app.use(cors());`,
        language: "js",
      },
      {
        title: "Allow a Specific Origin",
        code: `app.use(
  cors({
    origin: "http://localhost:5173",
  })
);`,
        language: "js",
      },
      {
        title: "Multiple Allowed Origins",
        code: `const allowedOrigins = [
  "http://localhost:5173",
  "https://learnhubcloud.in",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error("Origin not allowed"));
    },
  })
);`,
        language: "js",
      },
      {
        title: "Credentials Support",
        code: `app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);`,
        language: "js",
      },
      {
        title: "Frontend Axios Configuration",
        code: `axios.defaults.withCredentials = true;

// Or for a specific request:
await axios.get("/api/profile", {
  withCredentials: true,
});`,
        language: "js",
      },
      {
        title: "Custom CORS Configuration",
        code: `app.use(
  cors({
    origin: "https://learnhubcloud.in",
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
    credentials: true,
  })
);`,
        language: "js",
      },
      {
        title: "Preflight Requests",
        content:
          "Browsers sometimes send an OPTIONS request before the actual request to check whether the server permits the requested method and headers. This is called a preflight request. The server responds with the appropriate CORS headers to indicate whether the request is permitted.",
      },
      {
        title: "Important Concepts",
        content: [
          "Origin: scheme, host and port combination.",
          "Same-Origin Policy: browser restriction on cross-origin interactions.",
          "Access-Control-Allow-Origin: specifies permitted origins.",
          "Access-Control-Allow-Methods: specifies permitted methods.",
          "Access-Control-Allow-Headers: specifies permitted request headers.",
          "Access-Control-Allow-Credentials: allows browser credentialed requests when configured appropriately.",
          "Preflight: browser OPTIONS request used to check permissions.",
        ],
      },
      {
        title: "Common CORS Errors",
        content: [
          "Origin is not allowed by the server.",
          "Credentials are enabled but wildcard origin is used.",
          "Requested headers are not permitted.",
          "Requested HTTP method is not permitted.",
          "Preflight OPTIONS request is not handled correctly.",
          "Frontend and backend origins are configured incorrectly.",
        ],
      },
      {
        title: "Common Use Cases",
        content: [
          "React frontend connecting to Express backend.",
          "Separate frontend and backend deployments.",
          "Cookie-based authentication across origins.",
          "API access from approved web applications.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Allow only trusted origins in production.",
          "Avoid wildcard origins when credentialed requests are required.",
          "Configure methods and headers deliberately.",
          "CORS is not authentication or authorization.",
          "CORS primarily controls browser behavior; it does not prevent non-browser clients from making requests.",
          "Keep development and production origin configurations separate.",
        ],
      },
    ],
  },
    "cookie-parser": {
    title: "Cookie Parser",
    slug: "cookie-parser",
    category: "Backend Development / Authentication",
    description:
      "Cookie Parser is Express middleware that parses cookies attached to incoming HTTP requests and makes them accessible through req.cookies.",
    overview:
      "Cookie Parser parses the Cookie header from incoming requests and exposes cookie values through the Express request object. It is commonly used in authentication systems, session management and cookie-based workflows.",

    sections: [
      {
        title: "Installation",
        code: `npm install cookie-parser`,
        language: "bash",
      },
      {
        title: "Basic Setup",
        code: `import cookieParser from "cookie-parser";
import express from "express";

const app = express();

app.use(cookieParser());`,
        language: "js",
      },
      {
        title: "Reading Cookies",
        code: `app.get("/profile", (req, res) => {
  console.log(req.cookies);

  res.json({
    cookies: req.cookies,
  });
});`,
        language: "js",
      },
      {
        title: "Setting a Cookie",
        code: `app.get("/set-cookie", (req, res) => {
  res.cookie("username", "developer", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 1000,
  });

  res.json({
    message: "Cookie set",
  });
});`,
        language: "js",
      },
      {
        title: "Cookie Options",
        content: [
          "httpOnly: prevents client-side JavaScript from reading the cookie.",
          "secure: sends the cookie only over HTTPS.",
          "sameSite: controls cross-site cookie behavior.",
          "maxAge: sets cookie lifetime in milliseconds.",
          "path: specifies the URL path where the cookie is available.",
          "domain: specifies the domain associated with the cookie.",
        ],
      },
      {
        title: "Clearing Cookies",
        code: `app.post("/logout", (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  res.json({
    message: "Logged out",
  });
});`,
        language: "js",
      },
      {
        title: "Signed Cookies",
        code: `app.use(
  cookieParser(process.env.COOKIE_SECRET)
);

app.get("/signed-cookie", (req, res) => {
  res.cookie("user", "developer", {
    signed: true,
    httpOnly: true,
  });

  res.json({
    message: "Signed cookie created",
  });
});

// Read signed cookies:
console.log(req.signedCookies);`,
        language: "js",
      },
      {
        title: "Cookie-Based Authentication",
        code: `// After successful authentication:
res.cookie("refreshToken", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
});

res.json({
  message: "Login successful",
});`,
        language: "js",
      },
      {
        title: "Important Concepts",
        content: [
          "req.cookies: parsed unsigned cookies.",
          "req.signedCookies: parsed signed cookies.",
          "res.cookie(): sets a cookie in the response.",
          "res.clearCookie(): clears a cookie.",
          "httpOnly: limits JavaScript access to cookies.",
          "Signed cookies: detect cookie value modification using a signature.",
          "Cookie Parser: parses cookies; it does not itself implement authentication or session management.",
        ],
      },
      {
        title: "Common Use Cases",
        content: [
          "Refresh token storage.",
          "Cookie-based authentication.",
          "Session-related workflows.",
          "Remembering application preferences.",
          "Reading client-provided cookie values.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Use httpOnly for sensitive authentication cookies.",
          "Use secure in production with HTTPS.",
          "Configure sameSite according to your authentication architecture.",
          "Set an appropriate cookie path and expiration.",
          "Use CSRF protections where required.",
          "Avoid storing sensitive information directly inside cookies.",
          "Cookie Parser only parses cookie values; it does not encrypt them.",
          "Signed cookies provide integrity checking, not encryption.",
        ],
      },
    ],
  },
   "express-rate-limit": {
    title: "Express Rate Limit",
    slug: "express-rate-limit",
    category: "Backend Development / Security",
    description:
      "Express Rate Limit is middleware that limits repeated requests to Express routes and helps protect APIs against abuse.",
    overview:
      "Express Rate Limit provides configurable request limits based on client IP addresses or custom keys. It is useful for protecting login endpoints, APIs and resource-intensive routes from excessive requests.",

    sections: [
      {
        title: "Installation",
        code: `npm install express-rate-limit`,
        language: "bash",
      },
      {
        title: "Basic Setup",
        code: `import express from "express";
import { rateLimit } from "express-rate-limit";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.use(limiter);`,
        language: "js",
      },
      {
        title: "Protect Specific Routes",
        code: `const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: {
    message: "Too many login attempts",
  },
});

app.use("/api/auth/login", loginLimiter);`,
        language: "js",
      },
      {
        title: "Custom Rate Limit Response",
        code: `const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,

  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many requests. Try again later.",
    });
  },
});`,
        language: "js",
      },
      {
        title: "Custom Key Generator",
        code: `const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 50,

  keyGenerator: (req) => {
    return req.ip;
  },
});`,
        language: "js",
      },
      {
        title: "Apply to API Routes",
        code: `app.use("/api", apiLimiter);

app.use("/api/auth", authLimiter);

app.use("/api/auth/login", loginLimiter);`,
        language: "js",
      },
      {
        title: "Important Concepts",
        content: [
          "windowMs: duration of the rate-limit window.",
          "limit: maximum requests allowed during the window.",
          "429: HTTP status code for Too Many Requests.",
          "keyGenerator: determines how clients are identified.",
          "handler: custom response when the limit is exceeded.",
          "standardHeaders: sends modern rate-limit headers.",
          "Store: maintains request counters.",
        ],
      },
      {
        title: "Common Use Cases",
        content: [
          "Protect login and registration endpoints.",
          "Limit OTP or password-reset requests.",
          "Prevent API abuse.",
          "Protect expensive API operations.",
          "Limit public API traffic.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Use stricter limits for login, OTP and password-reset endpoints.",
          "Apply general limits to public APIs.",
          "Avoid unnecessarily strict limits on normal user operations.",
          "Use an external store such as Redis when operating across multiple server instances.",
          "Configure trusted proxies correctly when deployed behind reverse proxies.",
          "Monitor rate-limit violations.",
          "Do not rely on rate limiting alone as your security mechanism.",
        ],
      },
    ],
  },
   "nodemon": {
    title: "Nodemon",
    slug: "nodemon",
    category: "Backend Development / Development Tools",
    description:
      "Nodemon is a development utility that automatically restarts Node.js applications when files change.",
    overview:
      "Nodemon monitors files in a Node.js project and automatically restarts the server when changes are detected. It removes the need to manually stop and restart the server during development.",

    sections: [
      {
        title: "Installation",
        code: `npm install -D nodemon`,
        language: "bash",
      },
      {
        title: "Basic Usage",
        code: `npx nodemon server.js`,
        language: "bash",
      },
      {
        title: "Using package.json Scripts",
        code: `{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}`,
        language: "json",
      },
      {
        title: "Run Development Server",
        code: `npm run dev`,
        language: "bash",
      },
      {
        title: "Watching Specific Files",
        code: `npx nodemon --watch src server.js`,
        language: "bash",
      },
      {
        title: "Ignoring Files",
        code: `npx nodemon --ignore uploads/ server.js`,
        language: "bash",
      },
      {
        title: "nodemon.json Configuration",
        code: `{
  "watch": ["src"],
  "ext": "js,json",
  "ignore": ["node_modules", "uploads"],
  "exec": "node src/server.js"
}`,
        language: "json",
      },
      {
        title: "Using nodemon.json",
        code: `npx nodemon`,
        language: "bash",
      },
      {
        title: "Common Use Cases",
        content: [
          "Automatically restarting Express servers.",
          "Monitoring backend code during development.",
          "Watching configuration and source files.",
          "Improving backend development workflow.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Install Nodemon as a development dependency.",
          "Use npm scripts instead of repeatedly running commands manually.",
          "Avoid watching unnecessary directories.",
          "Exclude generated files and uploads where appropriate.",
          "Use node directly in production rather than Nodemon.",
          "Keep Nodemon configuration in nodemon.json when project settings become complex.",
        ],
      },
    ],
  },
    "dotenv": {
    title: "dotenv",
    slug: "dotenv",
    category: "Backend Development / Configuration",
    description:
      "dotenv is a Node.js package that loads environment variables from a .env file into process.env.",
    overview:
      "dotenv helps manage environment-specific configuration such as database URLs, API keys, JWT secrets and application ports. It allows developers to keep configuration separate from application code.",

    sections: [
      {
        title: "Installation",
        code: `npm install dotenv`,
        language: "bash",
      },
      {
        title: "Create .env File",
        code: `PORT=5000
MONGO_URI=mongodb://localhost:27017/learnhub
JWT_SECRET=your_secret_key
NODE_ENV=development`,
        language: "bash",
      },
      {
        title: "Basic Setup",
        code: `import dotenv from "dotenv";

dotenv.config();

console.log(process.env.PORT);`,
        language: "js",
      },
      {
        title: "Using Environment Variables",
        code: `const port = process.env.PORT || 5000;

const mongoUri = process.env.MONGO_URI;

const jwtSecret = process.env.JWT_SECRET;`,
        language: "js",
      },
      {
        title: "Initialize at Application Entry",
        code: `import dotenv from "dotenv";
dotenv.config();

import express from "express";

const app = express();

app.listen(process.env.PORT || 5000);`,
        language: "js",
      },
      {
        title: "Using dotenv with Config Files",
        code: `// config/env.js
import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};`,
        language: "js",
      },
      {
        title: "Environment Variables",
        content: [
          "process.env: Node.js object containing environment variables.",
          "dotenv.config(): loads variables from .env.",
          ".env: file used for local configuration.",
          "NODE_ENV: commonly identifies development, test or production environments.",
          "Environment-specific configuration: allows different settings for different environments.",
        ],
      },
      {
        title: "Common Use Cases",
        content: [
          "MongoDB connection strings.",
          "JWT secrets.",
          "API keys.",
          "Payment gateway credentials.",
          "Server configuration.",
          "Third-party service credentials.",
        ],
      },
      {
        title: "Best Practices",
        content: [
          "Never commit .env files containing secrets to Git.",
          "Add .env to .gitignore.",
          "Create a .env.example with variable names but no real secrets.",
          "Validate required environment variables at startup.",
          "Avoid exposing server secrets to frontend code.",
          "Use production environment configuration or secret management systems in deployment.",
          "Load dotenv once at the application entry point.",
        ],
      },
    ],
  },
"react-dom": {
  title: "React DOM",
  description: "React rendering and browser DOM integration.",
  overview:
    "React DOM is the package responsible for rendering React components into the browser DOM. It connects React's component tree with actual browser elements and provides APIs for rendering, updating and managing UI within web applications.",
  sections: [
    {
      title: "1. What is React DOM?",
      content: [
        "React DOM acts as the bridge between React and the browser's DOM.",
        "It allows React applications to render components inside HTML elements, update the UI efficiently and manage DOM interactions."
      ]
    },
    {
      title: "2. Installation",
      code: "npm install react react-dom",
      language: "bash"
    },
    {
      title: "3. createRoot()",
      content: [
        "createRoot() creates a React root inside a DOM container. It is the modern entry point for rendering React applications."
      ],
      code: `import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(<App />);`,
      language: "jsx"
    },
    {
      title: "4. render()",
      content: [
        "The root.render() method displays the React component tree inside the root container."
      ],
      code: `root.render(<App />);`,
      language: "jsx"
    },
    {
      title: "5. React DOM vs React",
      content: [
        "React provides the component model, state, hooks and UI logic.",
        "React DOM handles rendering React components into the browser DOM.",
        "React can also be used with other rendering environments, while React DOM specifically targets web browsers."
      ]
    },
    {
      title: "6. Important APIs",
      content: [
        "createRoot() — creates a root for rendering React components.",
        "root.render() — renders the component tree.",
        "root.unmount() — removes the React tree from its root.",
        "flushSync() — can force React to flush updates synchronously in specific situations."
      ]
    },
    {
      title: "7. Unmounting a Root",
      code: `root.unmount();`,
      language: "jsx"
    },
    {
      title: "8. flushSync()",
      content: [
        "flushSync() forces React to synchronously update the DOM. It should be used sparingly because it can negatively affect performance."
      ],
      code: `import { flushSync } from "react-dom";

flushSync(() => {
  setState(true);
});`,
      language: "jsx"
    },
    {
      title: "9. When is React DOM used?",
      content: [
        "Rendering React applications in the browser.",
        "Connecting React components with HTML containers.",
        "Updating the browser UI.",
        "Managing the lifecycle of a React root.",
        "Using browser-specific React APIs."
      ]
    }
  ]
},
"redux-toolkit": {
  title: "Redux Toolkit",
  description: "Slices, reducers, actions and state management.",
  overview:
    "Redux Toolkit (RTK) is the official recommended way to write Redux logic. It simplifies store configuration, state updates, reducer creation and asynchronous operations while reducing boilerplate code.",
  sections: [
    {
      title: "1. What is Redux Toolkit?",
      content: [
        "Redux Toolkit is the official toolset for efficient Redux development.",
        "It provides APIs to simplify global state management in React applications.",
        "It reduces repetitive Redux code and makes state management easier to maintain."
      ]
    },
    {
      title: "2. Installation",
      code: "npm install @reduxjs/toolkit react-redux",
      language: "bash"
    },
    {
      title: "3. createSlice()",
      content: [
        "createSlice() creates reducers, actions and slice-level state logic together.",
        "It uses Immer internally, allowing developers to write mutation-like code while maintaining immutable state updates."
      ],
      code: `import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    }
  }
});

export const { increment, decrement, reset } =
  counterSlice.actions;

export default counterSlice.reducer;`,
      language: "jsx"
    },
    {
      title: "4. configureStore()",
      content: [
        "configureStore() creates and configures the Redux store.",
        "It automatically combines reducers, enables Redux DevTools and includes recommended middleware."
      ],
      code: `import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});`,
      language: "jsx"
    },
    {
      title: "5. Provider",
      content: [
        "Provider makes the Redux store available to React components throughout the component tree using React Context."
      ],
      code: `import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";

<Provider store={store}>
  <App />
</Provider>`,
      language: "jsx"
    },
    {
      title: "6. useSelector()",
      content: [
        "useSelector() reads data from the Redux store.",
        "It subscribes the component to selected store data so the component can update when that data changes."
      ],
      code: `import { useSelector } from "react-redux";

const count = useSelector(
  (state) => state.counter.value
);`,
      language: "jsx"
    },
    {
      title: "7. useDispatch()",
      content: [
        "useDispatch() provides access to the Redux dispatch function.",
        "It is used to dispatch actions that trigger state updates."
      ],
      code: `import { useDispatch } from "react-redux";
import { increment } from "./counterSlice";

const dispatch = useDispatch();

dispatch(increment());`,
      language: "jsx"
    },
    {
      title: "8. Using Redux in a Component",
      code: `import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterSlice";

function Counter() {
  const count = useSelector(
    (state) => state.counter.value
  );

  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>

      <button onClick={() => dispatch(increment())}>
        Increment
      </button>

      <button onClick={() => dispatch(decrement())}>
        Decrement
      </button>
    </div>
  );
}

export default Counter;`,
      language: "jsx"
    },
    {
      title: "9. createAsyncThunk()",
      content: [
        "createAsyncThunk() handles asynchronous operations such as API requests.",
        "It automatically generates pending, fulfilled and rejected action types."
      ],
      code: `import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    return await response.json();
  }
);`,
      language: "jsx"
    },
    {
      title: "10. extraReducers",
      content: [
        "extraReducers handles actions generated outside the slice's regular reducers, such as createAsyncThunk lifecycle actions."
      ],
      code: `import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./userThunk";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch users";
      });
  }
});

export default userSlice.reducer;`,
      language: "jsx"
    },
    {
      title: "11. Important Redux Toolkit APIs",
      content: [
        "configureStore() — configures the Redux store.",
        "createSlice() — creates reducers and action creators.",
        "createReducer() — builds reducers with Immer support.",
        "createAction() — creates action creators.",
        "createAsyncThunk() — handles asynchronous logic.",
        "createSelector() — creates memoized selectors.",
        "combineSlices() — combines slices in modern Redux Toolkit."
      ]
    },
    {
      title: "12. Why Redux Toolkit?",
      content: [
        "Reduces boilerplate code.",
        "Simplifies reducer and action creation.",
        "Supports immutable updates through Immer.",
        "Includes recommended middleware by default.",
        "Integrates with Redux DevTools.",
        "Provides a structured approach to global state management.",
        "Supports asynchronous workflows."
      ]
    }
  ]
},
"socket.io-client": {
  title: "Socket.IO Client",
  description: "Realtime client communication and event handling.",
  overview:
    "Socket.IO Client is a JavaScript library that enables frontend applications to establish real-time, bidirectional communication with a Socket.IO server. It supports event-based communication, automatic reconnection, acknowledgements and connection management.",
  sections: [
    {
      title: "1. What is Socket.IO Client?",
      content: [
        "Socket.IO Client is used on the frontend to connect with a Socket.IO server.",
        "It enables real-time communication between the browser and backend without repeatedly polling for updates in traditional application workflows.",
        "It is commonly used for chat applications, notifications, live dashboards, multiplayer features and live updates."
      ]
    },
    {
      title: "2. Installation",
      code: "npm install socket.io-client",
      language: "bash"
    },
    {
      title: "3. Connecting to the Server",
      content: [
        "The io() function creates a Socket.IO client connection to the server."
      ],
      code: `import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default socket;`,
      language: "jsx"
    },
    {
      title: "4. Connection Events",
      content: [
        "Socket.IO provides events to track connection status.",
        "connect — triggered when the client successfully connects.",
        "disconnect — triggered when the connection is disconnected.",
        "connect_error — triggered when the connection attempt fails."
      ],
      code: `socket.on("connect", () => {
  console.log("Connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("Disconnected:", reason);
});

socket.on("connect_error", (error) => {
  console.log("Connection error:", error.message);
});`,
      language: "jsx"
    },
    {
      title: "5. Sending Events",
      content: [
        "emit() sends an event from the client to the server.",
        "Events can carry data such as messages, user information or application updates."
      ],
      code: `socket.emit("sendMessage", {
  message: "Hello Server!"
});`,
      language: "jsx"
    },
    {
      title: "6. Listening to Events",
      content: [
        "on() listens for events sent by the server."
      ],
      code: `socket.on("receiveMessage", (data) => {
  console.log(data);
});`,
      language: "jsx"
    },
    {
      title: "7. Removing Event Listeners",
      content: [
        "off() removes an event listener.",
        "Removing listeners is important in React components to avoid duplicate listeners and memory-related issues when components mount and unmount."
      ],
      code: `socket.off("receiveMessage");`,
      language: "jsx"
    },
    {
      title: "8. React Integration",
      content: [
        "Socket.IO Client can be integrated with React using useEffect.",
        "Listeners should be cleaned up when the component unmounts."
      ],
      code: `import { useEffect } from "react";
import socket from "./socket";

function ChatComponent() {
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      console.log(data);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("sendMessage", {
      message: "Hello!"
    });
  };

  return (
    <button onClick={sendMessage}>
      Send Message
    </button>
  );
}

export default ChatComponent;`,
      language: "jsx"
    },
    {
      title: "9. Acknowledgements",
      content: [
        "Socket.IO supports acknowledgements, allowing the sender to receive a response after an event is processed."
      ],
      code: `socket.emit("sendMessage", "Hello", (response) => {
  console.log("Server response:", response);
});`,
      language: "jsx"
    },
    {
      title: "10. Automatic Reconnection",
      content: [
        "Socket.IO Client can automatically reconnect after unexpected disconnections.",
        "Connection options can customize reconnection attempts, delays and related behavior."
      ],
      code: `const socket = io("http://localhost:5000", {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000
});`,
      language: "jsx"
    },
    {
      title: "11. Important Methods",
      content: [
        "io() — creates a client connection.",
        "emit() — sends an event.",
        "on() — listens for an event.",
        "once() — listens for an event only once.",
        "off() — removes an event listener.",
        "disconnect() — disconnects the socket.",
        "connect() — manually connects the socket."
      ]
    },
    {
      title: "12. Common Use Cases",
      content: [
        "Real-time chat applications.",
        "Live notifications.",
        "Real-time dashboards.",
        "Live class updates.",
        "Collaborative applications.",
        "Online user status.",
        "Live data synchronization."
      ]
    },
    {
      title: "13. Best Practices",
      content: [
        "Avoid registering duplicate event listeners.",
        "Clean up listeners in React useEffect.",
        "Authenticate socket connections when required.",
        "Validate incoming events on the server.",
        "Avoid exposing sensitive data through socket events.",
        "Handle connection failures and reconnections.",
        "Use rooms for targeted communication where appropriate."
      ]
    }
  ]
},
"npm": {
  title: "npm",
  description: "Packages, dependencies and scripts.",
  overview:
    "npm (Node Package Manager) is the default package manager commonly used with Node.js. It helps developers install, manage, update and share JavaScript packages, manage project dependencies and execute scripts.",
  sections: [
    {
      title: "1. What is npm?",
      content: [
        "npm is a package manager for JavaScript.",
        "It allows developers to install packages, manage dependencies, publish packages and run project scripts.",
        "npm is commonly used in frontend and backend JavaScript development."
      ]
    },
    {
      title: "2. Checking npm Version",
      code: `npm --version
node --version`,
      language: "bash"
    },
    {
      title: "3. Initializing a Project",
      content: [
        "npm init creates a package.json file interactively.",
        "npm init -y creates a package.json file using default configuration."
      ],
      code: `npm init
npm init -y`,
      language: "bash"
    },
    {
      title: "4. Installing Packages",
      content: [
        "npm install installs dependencies listed in package.json.",
        "npm install package-name installs a package.",
        "npm install package-name --save-dev installs a development dependency."
      ],
      code: `npm install
npm install axios
npm install nodemon --save-dev`,
      language: "bash"
    },
    {
      title: "5. package.json",
      content: [
        "package.json stores project metadata, scripts, dependencies, development dependencies and package configuration."
      ],
      code: `{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "axios": "^1.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}`,
      language: "json"
    },
    {
      title: "6. package-lock.json",
      content: [
        "package-lock.json records the exact dependency tree and package versions.",
        "It helps ensure consistent dependency installations across environments."
      ]
    },
    {
      title: "7. npm Scripts",
      content: [
        "npm scripts allow developers to execute predefined commands from package.json."
      ],
      code: `{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "start": "node server.js"
  }
}`,
      language: "json"
    },
    {
      title: "8. Running Scripts",
      code: `npm run dev
npm run build
npm start`,
      language: "bash"
    },
    {
      title: "9. Removing Packages",
      code: `npm uninstall axios`,
      language: "bash"
    },
    {
      title: "10. Important npm Commands",
      content: [
        "npm init — initializes a project.",
        "npm install — installs project dependencies.",
        "npm install package-name — installs a package.",
        "npm uninstall package-name — removes a package.",
        "npm update — updates packages.",
        "npm run script-name — executes a custom script.",
        "npm list — displays installed packages.",
        "npm audit — checks dependencies for known security vulnerabilities.",
        "npm ci — installs dependencies based on the lockfile, commonly used in CI environments."
      ]
    },
    {
      title: "11. Dependencies vs DevDependencies",
      content: [
        "dependencies contain packages required by the application at runtime.",
        "devDependencies contain packages primarily needed during development, testing, building or tooling."
      ]
    },
    {
      title: "12. Best Practices",
      content: [
        "Commit package-lock.json to version control.",
        "Use npm ci in automated CI environments.",
        "Avoid unnecessary dependencies.",
        "Review package security vulnerabilities.",
        "Use appropriate dependency versions.",
        "Keep dependencies updated when appropriate."
      ]
    }
  ]
},
"es-modules": {
  title: "ES Modules",
  description: "Imports, exports and modular JavaScript.",
  overview:
    "ES Modules (ESM) are the standardized JavaScript module system. They allow developers to divide applications into reusable files using import and export statements, improving maintainability, code organization and separation of concerns.",
  sections: [
    {
      title: "1. What are ES Modules?",
      content: [
        "ES Modules allow JavaScript code to be separated into independent modules.",
        "Each module can export functions, variables, classes or objects and import them into other modules.",
        "ES Modules are the standard module system supported by modern JavaScript."
      ]
    },
    {
      title: "2. Named Exports",
      content: [
        "Named exports allow multiple values to be exported from a single module.",
        "Imported names generally must match the exported names unless aliases are used."
      ],
      code: `export const username = "Alex";

export function greet() {
  console.log("Hello!");
}

export class User {
  constructor(name) {
    this.name = name;
  }
}`,
      language: "javascript"
    },
    {
      title: "3. Named Imports",
      code: `import { username, greet, User } from "./user.js";

console.log(username);
greet();

const user = new User("Alex");`,
      language: "javascript"
    },
    {
      title: "4. Default Export",
      content: [
        "A module can have one default export.",
        "Default exports allow the importing developer to choose the local name."
      ],
      code: `export default function greet() {
  console.log("Hello!");
}`,
      language: "javascript"
    },
    {
      title: "5. Default Import",
      code: `import greet from "./greet.js";

greet();`,
      language: "javascript"
    },
    {
      title: "6. Exporting Multiple Values",
      code: `const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

export { add, subtract };`,
      language: "javascript"
    },
    {
      title: "7. Import Aliases",
      content: [
        "Aliases allow imported or exported identifiers to use different names."
      ],
      code: `import { add as sum } from "./math.js";

console.log(sum(5, 3));`,
      language: "javascript"
    },
    {
      title: "8. Re-exporting Modules",
      content: [
        "Modules can re-export values from other modules, which is useful for creating centralized exports or barrel files."
      ],
      code: `export { add, subtract } from "./math.js";

export { default as User } from "./User.js";`,
      language: "javascript"
    },
    {
      title: "9. Dynamic Imports",
      content: [
        "Dynamic import() loads a module asynchronously.",
        "It is useful for lazy loading, code splitting and loading modules only when needed."
      ],
      code: `async function loadModule() {
  const module = await import("./math.js");

  console.log(module.add(2, 3));
}

loadModule();`,
      language: "javascript"
    },
    {
      title: "10. Modules in Node.js",
      content: [
        "Node.js supports ES Modules.",
        "Projects commonly enable ESM using the type field in package.json or using .mjs files."
      ],
      code: `{
  "type": "module"
}`,
      language: "json"
    },
    {
      title: "11. Modules vs CommonJS",
      content: [
        "ES Modules use import and export.",
        "CommonJS uses require() and module.exports.",
        "ES Modules are the standardized JavaScript module system.",
        "CommonJS is the traditional module system used extensively in older Node.js projects."
      ],
      code: `// ES Modules
import express from "express";
export default express;

// CommonJS
const express = require("express");
module.exports = express;`,
      language: "javascript"
    },
    {
      title: "12. Best Practices",
      content: [
        "Keep modules focused on a single responsibility.",
        "Prefer named exports when they improve clarity.",
        "Avoid unnecessary circular dependencies.",
        "Use dynamic imports when lazy loading provides a benefit.",
        "Keep import paths organized and consistent.",
        "Use centralized exports carefully."
      ]
    }
  ]
},
"socket-io-client": {
  title: "Socket.IO Client",
  description: "Realtime client communication and event handling.",
  overview:
    "Socket.IO Client is a JavaScript library that enables frontend applications to establish real-time, bidirectional communication with a Socket.IO server. It supports event-based communication, automatic reconnection, acknowledgements and connection management.",
  sections: [
    {
      title: "1. What is Socket.IO Client?",
      content: [
        "Socket.IO Client is used on the frontend to connect with a Socket.IO server.",
        "It enables real-time communication between the browser and backend.",
        "It is commonly used for chat applications, notifications, live dashboards, multiplayer features and live updates."
      ]
    },
    {
      title: "2. Installation",
      code: "npm install socket.io-client",
      language: "bash"
    },
    {
      title: "3. Connecting to the Server",
      code: `import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default socket;`,
      language: "jsx"
    },
    {
      title: "4. Connection Events",
      content: [
        "connect — triggered when the client successfully connects.",
        "disconnect — triggered when the connection is disconnected.",
        "connect_error — triggered when the connection attempt fails."
      ],
      code: `socket.on("connect", () => {
  console.log("Connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("Disconnected:", reason);
});

socket.on("connect_error", (error) => {
  console.log(error.message);
});`,
      language: "jsx"
    },
    {
      title: "5. Sending Events",
      content: [
        "emit() sends an event from the client to the server."
      ],
      code: `socket.emit("sendMessage", {
  message: "Hello Server!"
});`,
      language: "jsx"
    },
    {
      title: "6. Listening to Events",
      code: `socket.on("receiveMessage", (data) => {
  console.log(data);
});`,
      language: "jsx"
    },
    {
      title: "7. Removing Event Listeners",
      content: [
        "off() removes an event listener.",
        "Removing listeners is important in React components to avoid duplicate listeners."
      ],
      code: `socket.off("receiveMessage");`,
      language: "jsx"
    },
    {
      title: "8. React Integration",
      code: `import { useEffect } from "react";
import socket from "./socket";

function ChatComponent() {
  useEffect(() => {
    const handleMessage = (data) => {
      console.log(data);
    };

    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, []);

  const sendMessage = () => {
    socket.emit("sendMessage", {
      message: "Hello!"
    });
  };

  return (
    <button onClick={sendMessage}>
      Send Message
    </button>
  );
}

export default ChatComponent;`,
      language: "jsx"
    },
    {
      title: "9. Acknowledgements",
      content: [
        "Socket.IO supports acknowledgements, allowing the sender to receive a response after an event is processed."
      ],
      code: `socket.emit("sendMessage", "Hello", (response) => {
  console.log(response);
});`,
      language: "jsx"
    },
    {
      title: "10. Automatic Reconnection",
      content: [
        "Socket.IO Client can automatically reconnect after unexpected disconnections.",
        "Connection options can customize reconnection attempts and delays."
      ],
      code: `const socket = io("http://localhost:5000", {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000
});`,
      language: "jsx"
    },
    {
      title: "11. Important Methods",
      content: [
        "io() — creates a client connection.",
        "emit() — sends an event.",
        "on() — listens for an event.",
        "once() — listens for an event only once.",
        "off() — removes an event listener.",
        "disconnect() — disconnects the socket.",
        "connect() — manually connects the socket."
      ]
    },
    {
      title: "12. Common Use Cases",
      content: [
        "Real-time chat applications.",
        "Live notifications.",
        "Real-time dashboards.",
        "Live class updates.",
        "Collaborative applications.",
        "Online user status.",
        "Live data synchronization."
      ]
    },
    {
      title: "13. Best Practices",
      content: [
        "Avoid registering duplicate event listeners.",
        "Clean up listeners in React useEffect.",
        "Authenticate socket connections when required.",
        "Validate incoming events on the server.",
        "Avoid exposing sensitive data through socket events.",
        "Handle connection failures and reconnections.",
        "Use rooms for targeted communication where appropriate."
      ]
    }
  ]
},
"node-js": {
  title: "Node.js",
  description: "Runtime, event loop, modules and backend JavaScript.",
  overview:
    "Node.js is a JavaScript runtime built on the V8 JavaScript engine. It allows JavaScript to run outside the browser and is widely used for backend development, APIs, real-time applications and server-side tools. It uses an event-driven architecture and non-blocking I/O.",
  sections: [
    {
      title: "1. What is Node.js?",
      content: [
        "Node.js is a JavaScript runtime environment that allows developers to execute JavaScript outside the browser.",
        "It is commonly used for building backend services, REST APIs, real-time applications and CLI tools.",
        "Node.js uses the V8 engine and an event-driven, non-blocking I/O architecture."
      ]
    },
    {
      title: "2. Installing Node.js",
      content: [
        "Node.js can be installed from its official website.",
        "The installation generally includes Node.js and npm."
      ],
      code: `node --version
npm --version`,
      language: "bash"
    },
    {
      title: "3. Running JavaScript with Node.js",
      content: [
        "Node.js executes JavaScript files directly from the terminal."
      ],
      code: `console.log("Hello from Node.js");`,
      language: "javascript"
    },
    {
      title: "4. Creating a Node.js Server",
      content: [
        "Node.js provides built-in modules such as HTTP for creating servers.",
        "The HTTP module allows applications to receive requests and send responses."
      ],
      code: `const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello from Server");
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});`,
      language: "javascript"
    },
    {
      title: "5. Node.js Modules",
      content: [
        "Modules allow code to be separated into reusable files.",
        "Node.js supports CommonJS and ES Modules."
      ],
      code: `// CommonJS
const fs = require("fs");

// ES Modules
import fs from "fs";`,
      language: "javascript"
    },
    {
      title: "6. Built-in Modules",
      content: [
        "fs — file system operations.",
        "http — HTTP server functionality.",
        "path — file and directory path utilities.",
        "os — operating system information.",
        "crypto — cryptographic utilities.",
        "events — event-driven programming.",
        "stream — streaming data processing."
      ]
    },
    {
      title: "7. Event Loop",
      content: [
        "The event loop allows Node.js to handle asynchronous operations without blocking the main JavaScript execution thread for typical I/O operations.",
        "It coordinates callbacks and asynchronous work with the underlying runtime.",
        "Node.js can handle many concurrent I/O operations through its event-driven architecture."
      ]
    },
    {
      title: "8. Non-blocking I/O",
      content: [
        "Non-blocking I/O allows Node.js to initiate operations such as file reading or network requests without waiting for them to complete before continuing execution.",
        "This helps Node.js handle concurrent I/O workloads efficiently."
      ],
      code: `const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data);
});

console.log("This runs without waiting for file reading");`,
      language: "javascript"
    },
    {
      title: "9. Asynchronous Programming",
      content: [
        "Node.js supports callbacks, Promises and async/await for asynchronous programming.",
        "These patterns help handle I/O operations without blocking execution unnecessarily."
      ],
      code: `async function fetchData() {
  try {
    const result = await Promise.resolve("Data loaded");
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

fetchData();`,
      language: "javascript"
    },
    {
      title: "10. npm and package.json",
      content: [
        "npm is used to install, manage and execute JavaScript packages.",
        "package.json stores project metadata, dependencies and scripts."
      ],
      code: `npm init -y
npm install express`,
      language: "bash"
    },
    {
      title: "11. Environment Variables",
      content: [
        "Environment variables store configuration values outside application source code.",
        "They are commonly used for database URLs, configuration and credentials."
      ],
      code: `process.env.PORT
process.env.NODE_ENV`,
      language: "javascript"
    },
    {
      title: "12. Common Use Cases",
      content: [
        "REST API development.",
        "Backend applications.",
        "Real-time communication.",
        "CLI tools.",
        "Streaming applications.",
        "Microservices.",
        "Automation tools."
      ]
    },
    {
      title: "13. Best Practices",
      content: [
        "Use asynchronous APIs where appropriate.",
        "Handle errors properly.",
        "Avoid blocking the event loop with heavy synchronous operations.",
        "Keep configuration in environment variables.",
        "Organize code into reusable modules.",
        "Use logging and monitoring.",
        "Validate incoming data.",
        "Keep dependencies maintained."
      ]
    }
  ]
},
"express-js": {
  title: "Express.js",
  description: "Routes, middleware, controllers and REST APIs.",
  overview:
    "Express.js is a lightweight web framework for Node.js that simplifies server-side application development. It provides routing, middleware handling, request and response utilities, error handling and a flexible architecture for building REST APIs and web applications.",
  sections: [
    {
      title: "1. What is Express.js?",
      content: [
        "Express.js is a web framework built on top of Node.js.",
        "It simplifies server creation, routing, middleware execution and HTTP request handling.",
        "It is commonly used for building REST APIs, web applications and backend services."
      ]
    },
    {
      title: "2. Installation",
      code: `npm install express`,
      language: "bash"
    },
    {
      title: "3. Creating an Express Server",
      code: `const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});`,
      language: "javascript"
    },
    {
      title: "4. HTTP Methods",
      content: [
        "GET — retrieves data.",
        "POST — creates or submits data.",
        "PUT — replaces or updates a resource.",
        "PATCH — partially updates a resource.",
        "DELETE — removes a resource."
      ],
      code: `app.get("/users", (req, res) => {
  res.send("Get Users");
});

app.post("/users", (req, res) => {
  res.send("Create User");
});

app.put("/users/:id", (req, res) => {
  res.send("Update User");
});

app.patch("/users/:id", (req, res) => {
  res.send("Partial Update");
});

app.delete("/users/:id", (req, res) => {
  res.send("Delete User");
});`,
      language: "javascript"
    },
    {
      title: "5. Routing",
      content: [
        "Routing defines how an application responds to specific HTTP methods and URL paths.",
        "Express supports route parameters, query parameters and route handlers."
      ],
      code: `app.get("/users/:id", (req, res) => {
  const userId = req.params.id;

  res.json({ userId });
});`,
      language: "javascript"
    },
    {
      title: "6. Express Router",
      content: [
        "Express Router allows routes to be separated into modular files.",
        "It helps organize large applications into feature-based or resource-based routes."
      ],
      code: `const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Users Route");
});

module.exports = router;`,
      language: "javascript"
    },
    {
      title: "7. Middleware",
      content: [
        "Middleware functions execute during the request-response lifecycle.",
        "They can access req, res and next.",
        "Middleware can process requests, authenticate users, validate input, log requests and handle errors."
      ],
      code: `const middleware = (req, res, next) => {
  console.log("Middleware executed");

  next();
};

app.use(middleware);`,
      language: "javascript"
    },
    {
      title: "8. Built-in Middleware",
      content: [
        "express.json() — parses JSON request bodies.",
        "express.urlencoded() — parses URL-encoded request bodies.",
        "express.static() — serves static files."
      ],
      code: `app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

app.use(express.static("public"));`,
      language: "javascript"
    },
    {
      title: "9. Request and Response",
      content: [
        "req represents the incoming request.",
        "res represents the outgoing response.",
        "req.params contains route parameters.",
        "req.query contains query string parameters.",
        "req.body contains parsed request body data when appropriate middleware is configured."
      ],
      code: `app.get("/products/:id", (req, res) => {
  console.log(req.params);
  console.log(req.query);

  res.json({
    message: "Product fetched"
  });
});`,
      language: "javascript"
    },
    {
      title: "10. Controllers",
      content: [
        "Controllers contain request-handling logic.",
        "They help separate route definitions from application logic and make code easier to maintain."
      ],
      code: `const getUsers = (req, res) => {
  res.json({
    users: []
  });
};

module.exports = { getUsers };`,
      language: "javascript"
    },
    {
      title: "11. Error Handling",
      content: [
        "Express supports centralized error-handling middleware.",
        "Error handlers generally use four parameters: err, req, res and next."
      ],
      code: `app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error"
  });
});`,
      language: "javascript"
    },
    {
      title: "12. REST API Example",
      code: `const express = require("express");

const app = express();

app.use(express.json());

app.get("/api/users", (req, res) => {
  res.status(200).json({
    success: true,
    users: []
  });
});

app.post("/api/users", (req, res) => {
  res.status(201).json({
    success: true,
    message: "User created",
    data: req.body
  });
});

app.listen(5000);`,
      language: "javascript"
    },
    {
      title: "13. Common Express Ecosystem",
      content: [
        "Express Validator — request validation.",
        "Multer — multipart file uploads.",
        "Cors — cross-origin configuration.",
        "Cookie Parser — cookie parsing.",
        "Express Rate Limit — rate limiting.",
        "Mongoose — MongoDB integration.",
        "JWT — token-based authentication."
      ]
    },
    {
      title: "14. Best Practices",
      content: [
        "Separate routes, controllers and services.",
        "Use centralized error handling.",
        "Validate and sanitize request data.",
        "Configure security middleware.",
        "Use authentication and authorization middleware where required.",
        "Avoid putting business logic directly in route handlers.",
        "Use environment variables for configuration.",
        "Use appropriate HTTP status codes.",
        "Apply rate limiting to sensitive endpoints.",
        "Keep middleware ordering intentional."
      ]
    }
  ]
},
"ioredis": {
  title: "ioredis",
  description: "Redis client integration with Node.js.",
  overview:
    "ioredis is a feature-rich Redis client for Node.js. It provides asynchronous Redis operations, connection management, pipelining, transactions, Pub/Sub, Lua scripting and support for Redis Cluster and Sentinel.",
  sections: [
    {
      title: "1. What is ioredis?",
      content: [
        "ioredis is a Node.js client library used to communicate with Redis servers.",
        "It provides an API for performing Redis operations from JavaScript applications.",
        "It is commonly used for caching, session management, queues, rate limiting, Pub/Sub and temporary data storage."
      ]
    },
    {
      title: "2. Installation",
      code: `npm install ioredis`,
      language: "bash"
    },
    {
      title: "3. Connecting to Redis",
      content: [
        "Redis can be connected using a Redis URL or connection configuration.",
        "The Redis client can be reused across application services."
      ],
      code: `import Redis from "ioredis";

const redis = new Redis(
  process.env.REDIS_URL
);

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (error) => {
  console.error("Redis error:", error);
});

export default redis;`,
      language: "javascript"
    },
    {
      title: "4. Basic SET and GET",
      content: [
        "SET stores a key-value pair in Redis.",
        "GET retrieves the value associated with a key."
      ],
      code: `await redis.set("name", "LearnHub");

const name = await redis.get("name");

console.log(name);`,
      language: "javascript"
    },
    {
      title: "5. Expiration (TTL)",
      content: [
        "Redis supports expiration for keys.",
        "EX sets a key expiration time in seconds.",
        "Expiration is useful for temporary cached data, OTP-related workflows, temporary tokens and short-lived records."
      ],
      code: `await redis.set("otp", "123456", "EX", 60);

const otp = await redis.get("otp");`,
      language: "javascript"
    },
    {
      title: "6. Deleting Keys",
      code: `await redis.del("name");

await redis.del("key1", "key2");`,
      language: "javascript"
    },
    {
      title: "7. Checking Key Existence",
      content: [
        "EXISTS checks whether a key exists in Redis.",
        "It returns the number of matching keys that exist."
      ],
      code: `const exists = await redis.exists("name");

console.log(exists);`,
      language: "javascript"
    },
    {
      title: "8. Hashes",
      content: [
        "Redis hashes store multiple fields and values under a single key.",
        "They are useful for storing structured data when Redis hash operations are appropriate."
      ],
      code: `await redis.hset("user:1", {
  name: "Alex",
  role: "student"
});

const user = await redis.hgetall("user:1");

console.log(user);`,
      language: "javascript"
    },
    {
      title: "9. Lists",
      content: [
        "Redis lists store ordered collections of values.",
        "LPUSH inserts values at the beginning of a list.",
        "RPUSH inserts values at the end.",
        "LRANGE retrieves elements from a range."
      ],
      code: `await redis.rpush("tasks", "task1", "task2");

const tasks = await redis.lrange("tasks", 0, -1);

console.log(tasks);`,
      language: "javascript"
    },
    {
      title: "10. Sets",
      content: [
        "Redis sets store unique values.",
        "SADD adds values and SMEMBERS retrieves set members."
      ],
      code: `await redis.sadd("tags", "react", "node", "redis");

const tags = await redis.smembers("tags");`,
      language: "javascript"
    },
    {
      title: "11. Pipelining",
      content: [
        "Pipelining sends multiple Redis commands together to reduce network round trips.",
        "It can improve performance when multiple independent operations need to be executed."
      ],
      code: `const pipeline = redis.pipeline();

pipeline.set("key1", "value1");
pipeline.set("key2", "value2");
pipeline.get("key1");

const results = await pipeline.exec();`,
      language: "javascript"
    },
    {
      title: "12. Transactions",
      content: [
        "Redis transactions execute a group of commands using MULTI and EXEC.",
        "ioredis provides transaction support through multi()."
      ],
      code: `const result = await redis
  .multi()
  .set("key1", "value1")
  .set("key2", "value2")
  .exec();`,
      language: "javascript"
    },
    {
      title: "13. Pub/Sub",
      content: [
        "Redis Pub/Sub enables publishers to send messages to channels and subscribers to receive them.",
        "A dedicated subscriber connection is generally used for subscription workflows."
      ],
      code: `const subscriber = new Redis();

await subscriber.subscribe("notifications");

subscriber.on("message", (channel, message) => {
  console.log(channel, message);
});`,
      language: "javascript"
    },
    {
      title: "14. Caching Pattern",
      content: [
        "Redis can cache frequently requested data.",
        "Applications can first check Redis and retrieve data from the primary database only when the cache misses."
      ],
      code: `async function getData(key) {
  const cached = await redis.get(key);

  if (cached) {
    return JSON.parse(cached);
  }

  const data = await fetchDataFromDatabase();

  await redis.set(
    key,
    JSON.stringify(data),
    "EX",
    300
  );

  return data;
}`,
      language: "javascript"
    },
    {
      title: "15. Important Redis Commands",
      content: [
        "SET — stores a key-value pair.",
        "GET — retrieves a value.",
        "DEL — deletes keys.",
        "EXISTS — checks key existence.",
        "EXPIRE — sets expiration.",
        "TTL — checks remaining expiration time.",
        "HSET — stores hash fields.",
        "HGET — retrieves a hash field.",
        "HGETALL — retrieves all hash fields.",
        "LPUSH / RPUSH — inserts list elements.",
        "LRANGE — retrieves list elements.",
        "SADD — adds set members.",
        "SMEMBERS — retrieves set members.",
        "INCR — increments a numeric value."
      ]
    },
    {
      title: "16. Common Use Cases",
      content: [
        "Caching API responses.",
        "Session storage.",
        "Rate limiting.",
        "OTP expiration workflows.",
        "Temporary data storage.",
        "Pub/Sub messaging.",
        "Queue-related workflows.",
        "Reducing database load."
      ]
    },
    {
      title: "17. Best Practices",
      content: [
        "Reuse Redis connections instead of creating a new connection for every request.",
        "Use environment variables for Redis configuration.",
        "Set expiration for temporary cache entries where appropriate.",
        "Handle Redis connection errors.",
        "Avoid caching sensitive data unnecessarily.",
        "Use appropriate key naming conventions.",
        "Monitor Redis memory usage.",
        "Use pipelining when multiple independent commands can benefit from fewer round trips.",
        "Close connections gracefully during application shutdown."
      ]
    }
  ]
},
"bcryptjs": {
  title: "bcryptjs",
  description: "Password hashing implementation in JavaScript.",
  overview:
    "bcryptjs is a pure JavaScript implementation of the bcrypt password hashing algorithm. It is used to securely hash passwords and compare submitted passwords against stored hashes. It does not require native compilation.",
  sections: [
    {
      title: "1. What is bcryptjs?",
      content: [
        "bcryptjs is a JavaScript library for password hashing.",
        "It uses the bcrypt algorithm to create salted password hashes.",
        "Passwords should be hashed before storing them in a database.",
        "Hashing is one-way and is not the same as encryption."
      ]
    },
    {
      title: "2. Installation",
      code: "npm install bcryptjs",
      language: "bash"
    },
    {
      title: "3. Hashing a Password",
      content: [
        "hash() generates a bcrypt hash from a password.",
        "The salt rounds parameter controls the computational cost of hashing."
      ],
      code: `import bcrypt from "bcryptjs";

const password = "userPassword";

const hashedPassword = await bcrypt.hash(
  password,
  10
);

console.log(hashedPassword);`,
      language: "javascript"
    },
    {
      title: "4. Comparing Passwords",
      content: [
        "compare() checks whether a submitted password matches an existing bcrypt hash.",
        "It returns a boolean result."
      ],
      code: `const isMatch = await bcrypt.compare(
  password,
  hashedPassword
);

console.log(isMatch);`,
      language: "javascript"
    },
    {
      title: "5. Salt and Hashing",
      content: [
        "bcrypt incorporates salt into the hashing process.",
        "A salt helps prevent identical passwords from producing identical hashes.",
        "bcryptjs manages salt generation as part of its hashing workflow."
      ]
    },
    {
      title: "6. Async vs Sync",
      content: [
        "bcryptjs provides asynchronous and synchronous APIs.",
        "Asynchronous methods are generally preferable in server applications because synchronous hashing can block the JavaScript execution thread."
      ],
      code: `// Async
const hash = await bcrypt.hash(password, 10);

// Sync
const syncHash = bcrypt.hashSync(password, 10);`,
      language: "javascript"
    },
    {
      title: "7. Authentication Workflow",
      content: [
        "Receive the password during registration.",
        "Hash the password.",
        "Store the hash in the database instead of the plaintext password.",
        "During login, compare the submitted password with the stored hash.",
        "Continue authentication only if the comparison succeeds."
      ]
    },
    {
      title: "8. Best Practices",
      content: [
        "Never store plaintext passwords.",
        "Use asynchronous hashing in server-side request workflows.",
        "Choose an appropriate bcrypt cost factor.",
        "Never return password hashes in API responses.",
        "Keep password hashing and authentication logic appropriately separated."
      ]
    }
  ]
},
"jsonwebtoken": {
  title: "jsonwebtoken",
  description: "JWT creation, verification and token-based authentication.",
  overview:
    "jsonwebtoken is a Node.js library used to create, sign, verify and decode JSON Web Tokens. It is commonly used in authentication and authorization workflows to securely transmit claims between parties.",
  sections: [
    {
      title: "1. What is jsonwebtoken?",
      content: [
        "jsonwebtoken is a library used to work with JSON Web Tokens.",
        "It allows applications to generate signed tokens and verify their authenticity.",
        "JWTs are commonly used in authentication systems and API authorization."
      ]
    },
    {
      title: "2. Installation",
      code: "npm install jsonwebtoken",
      language: "bash"
    },
    {
      title: "3. Creating a JWT",
      content: [
        "sign() creates a signed JWT.",
        "A payload can contain claims such as a user identifier and role.",
        "Signing does not encrypt the token payload."
      ],
      code: `import jwt from "jsonwebtoken";

const token = jwt.sign(
  {
    userId: "123",
    role: "student"
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "15m"
  }
);

console.log(token);`,
      language: "javascript"
    },
    {
      title: "4. JWT Structure",
      content: [
        "A JWT commonly consists of three parts separated by dots.",
        "Header — contains metadata such as the signing algorithm.",
        "Payload — contains claims.",
        "Signature — helps verify the token's integrity."
      ]
    },
    {
      title: "5. Verifying a JWT",
      content: [
        "verify() validates the token's signature and checks supported claims such as expiration."
      ],
      code: `const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET
);

console.log(decoded);`,
      language: "javascript"
    },
    {
      title: "6. Decoding a JWT",
      content: [
        "decode() reads the token payload without verifying its signature.",
        "Decoded data must not be trusted until the token has been verified."
      ],
      code: `const decodedToken = jwt.decode(token);

console.log(decodedToken);`,
      language: "javascript"
    },
    {
      title: "7. Token Expiration",
      content: [
        "JWTs can include expiration claims.",
        "The expiresIn option can configure the token lifetime."
      ],
      code: `const token = jwt.sign(
  { userId: "123" },
  process.env.JWT_SECRET,
  {
    expiresIn: "15m"
  }
);`,
      language: "javascript"
    },
    {
      title: "8. Authentication Middleware",
      code: `import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};

export default authMiddleware;`,
      language: "javascript"
    },
    {
      title: "9. Important Methods",
      content: [
        "sign() — creates a signed JWT.",
        "verify() — validates a JWT.",
        "decode() — decodes token data without signature verification."
      ]
    },
    {
      title: "10. Common Use Cases",
      content: [
        "Authentication.",
        "API authorization.",
        "Access token generation.",
        "Token-based identity verification.",
        "Protected routes."
      ]
    },
    {
      title: "11. Best Practices",
      content: [
        "Use strong secrets or appropriate cryptographic keys.",
        "Store secrets in environment variables.",
        "Always verify tokens before trusting their payload.",
        "Use short-lived access tokens where appropriate.",
        "Never put sensitive information in JWT payloads.",
        "Validate allowed signing algorithms.",
        "Implement appropriate token revocation or refresh strategies when required."
      ]
    }
  ]
},
"passport": {
  title: "Passport",
  description: "Authentication middleware and strategies.",
  overview:
    "Passport is an authentication middleware for Node.js applications. It provides a flexible and modular authentication framework using strategies for different authentication methods such as username-password authentication, JWT, OAuth and other identity providers.",
  sections: [
    {
      title: "1. What is Passport?",
      content: [
        "Passport is an authentication middleware for Node.js.",
        "It uses strategies to authenticate users through different authentication mechanisms.",
        "Passport itself does not implement every authentication method; strategies provide the specific authentication logic."
      ]
    },
    {
      title: "2. Installation",
      code: "npm install passport",
      language: "bash"
    },
    {
      title: "3. Initializing Passport",
      content: [
        "Passport can be initialized as middleware in an Express application."
      ],
      code: `import passport from "passport";
import express from "express";

const app = express();

app.use(passport.initialize());`,
      language: "javascript"
    },
    {
      title: "4. Authentication Strategies",
      content: [
        "Passport uses strategies to authenticate requests.",
        "Different strategies support different authentication mechanisms.",
        "Examples include Local, JWT and Google OAuth strategies."
      ]
    },
    {
      title: "5. Strategy Configuration",
      content: [
        "A strategy defines how authentication credentials are validated.",
        "The strategy's verification callback determines whether the user is authenticated."
      ],
      code: `passport.use(
  new SomeStrategy(
    options,
    async (credentials, done) => {
      // Authentication logic
    }
  )
);`,
      language: "javascript"
    },
    {
      title: "6. Passport Authentication Middleware",
      content: [
        "Passport middleware can be used to protect routes.",
        "The configured strategy is selected by its name."
      ],
      code: `app.get(
  "/protected",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    res.json({
      message: "Protected route",
      user: req.user
    });
  }
);`,
      language: "javascript"
    },
    {
      title: "7. Sessions vs Stateless Authentication",
      content: [
        "Passport can support session-based authentication.",
        "It can also be used in stateless authentication workflows such as JWT authentication.",
        "For stateless JWT authentication, session: false is commonly used."
      ]
    },
    {
      title: "8. Common Passport Strategies",
      content: [
        "passport-local — username and password authentication.",
        "passport-jwt — JWT-based authentication.",
        "passport-google-oauth20 — Google OAuth 2.0 authentication.",
        "Other strategies support additional identity providers and authentication mechanisms."
      ]
    },
    {
      title: "9. Common Use Cases",
      content: [
        "User authentication.",
        "JWT-protected routes.",
        "OAuth authentication.",
        "Social login.",
        "Session-based authentication."
      ]
    },
    {
      title: "10. Best Practices",
      content: [
        "Choose an appropriate strategy for your authentication workflow.",
        "Keep authentication and authorization separate.",
        "Validate user credentials carefully.",
        "Avoid exposing sensitive user information.",
        "Configure session behavior intentionally.",
        "Use secure authentication configurations."
      ]
    }
  ]
},
"passport-google-oauth": {
  title: "Passport Google OAuth 2.0",
  description: "Google authentication using Passport.",
  overview:
    "Passport Google OAuth 2.0 is an authentication integration that allows Node.js applications to authenticate users through their Google accounts using Passport and the Google OAuth 2.0 strategy.",
  sections: [
    {
      title: "1. What is Passport Google OAuth 2.0?",
      content: [
        "It allows users to authenticate using their Google accounts.",
        "It uses OAuth 2.0 authorization flows through Google's identity services.",
        "Passport provides middleware and strategy integration for handling authentication."
      ]
    },
    {
      title: "2. Installation",
      code: "npm install passport passport-google-oauth20",
      language: "bash"
    },
    {
      title: "3. Google OAuth Credentials",
      content: [
        "Google OAuth credentials are configured through the Google Cloud Console.",
        "Applications typically configure a Client ID and Client Secret.",
        "Authorized redirect URIs must match the application's OAuth callback URL."
      ]
    },
    {
      title: "4. Environment Variables",
      code: `GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback`,
      language: "bash"
    },
    {
      title: "5. Configuring Google Strategy",
      code: `import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find or create the application user

        return done(null, profile);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);`,
      language: "javascript"
    },
    {
      title: "6. Google Authentication Route",
      code: `app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);`,
      language: "javascript"
    },
    {
      title: "7. OAuth Callback Route",
      content: [
        "Google redirects the user to the callback URL after authorization.",
        "Passport processes the OAuth response and invokes the configured strategy."
      ],
      code: `app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login"
  }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);`,
      language: "javascript"
    },
    {
      title: "8. OAuth Workflow",
      content: [
        "The user clicks Sign in with Google.",
        "The application redirects the user to Google's authorization page.",
        "The user authenticates and grants the requested permissions.",
        "Google redirects the user to the configured callback URL.",
        "Passport processes the OAuth response.",
        "The application finds or creates the user.",
        "The application establishes its own authentication mechanism."
      ]
    },
    {
      title: "9. Google Profile Data",
      content: [
        "The Google strategy can provide profile information such as the Google profile identifier, display name and email information depending on the requested scopes and available profile data.",
        "Applications should only request the permissions and information they actually need."
      ]
    },
    {
      title: "10. Common Use Cases",
      content: [
        "Google login.",
        "Google signup.",
        "Social authentication.",
        "OAuth-based account onboarding.",
        "Connecting Google identity with an application account."
      ]
    },
    {
      title: "11. Best Practices",
      content: [
        "Keep OAuth Client Secrets private.",
        "Use correctly configured callback URLs.",
        "Handle OAuth callback failures.",
        "Avoid requesting unnecessary scopes.",
        "Link Google accounts with application accounts carefully.",
        "Do not blindly trust profile data for authorization decisions.",
        "Use HTTPS in production.",
        "Generate your application's own authentication mechanism after OAuth when appropriate."
      ]
    }
  ]
},
"socket-io": {
  title: "Socket.IO",
  description: "Realtime events, rooms and bidirectional communication.",
  overview:
    "Socket.IO is a library for real-time, bidirectional and event-based communication between clients and servers. It provides event-based messaging, rooms, namespaces, reconnection handling and acknowledgements.",
  sections: [
    {
      title: "1. What is Socket.IO?",
      content: [
        "Socket.IO enables real-time communication between clients and servers.",
        "It uses event-based communication and typically uses WebSocket when available, with fallback mechanisms when necessary.",
        "It is commonly used for chat applications, notifications, live dashboards and collaborative features."
      ]
    },
    {
      title: "2. Installation",
      code: "npm install socket.io",
      language: "bash"
    },
    {
      title: "3. Creating a Socket.IO Server",
      code: `import { Server } from "socket.io";

const io = new Server(5000, {
  cors: {
    origin: "http://localhost:5173"
  }
});

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
  });
});`,
      language: "javascript"
    },
    {
      title: "4. Connection Event",
      content: [
        "The connection event is triggered when a client successfully connects to the Socket.IO server.",
        "Each connected socket has a unique socket.id."
      ],
      code: `io.on("connection", (socket) => {
  console.log(socket.id);
});`,
      language: "javascript"
    },
    {
      title: "5. Emitting Events",
      content: [
        "emit() sends an event with optional data to a target.",
        "The server can emit events to a specific connected client."
      ],
      code: `socket.emit("welcome", {
  message: "Welcome to the server"
});`,
      language: "javascript"
    },
    {
      title: "6. Listening to Events",
      content: [
        "on() listens for events sent by clients or other parts of the application."
      ],
      code: `socket.on("sendMessage", (data) => {
  console.log(data);
});`,
      language: "javascript"
    },
    {
      title: "7. Broadcasting",
      content: [
        "Broadcasting sends an event to other connected clients while excluding the sender."
      ],
      code: `socket.broadcast.emit("newUser", {
  message: "A new user connected"
});`,
      language: "javascript"
    },
    {
      title: "8. Rooms",
      content: [
        "Rooms allow sockets to be grouped together.",
        "Events can be sent to specific rooms instead of every connected client.",
        "Rooms are useful for chats, course sessions and collaborative features."
      ],
      code: `socket.join("course-101");

io.to("course-101").emit("announcement", {
  message: "Welcome to the course room"
});`,
      language: "javascript"
    },
    {
      title: "9. Sending to a Specific Client",
      code: `io.to(socketId).emit("notification", {
  message: "Hello"
});`,
      language: "javascript"
    },
    {
      title: "10. Disconnect Event",
      content: [
        "The disconnect event is triggered when a socket connection ends."
      ],
      code: `socket.on("disconnect", (reason) => {
  console.log("Disconnected:", reason);
});`,
      language: "javascript"
    },
    {
      title: "11. Acknowledgements",
      content: [
        "Acknowledgements allow the sender to receive a response after an event has been processed."
      ],
      code: `socket.on("sendMessage", (data, callback) => {
  callback({
    success: true
  });
});`,
      language: "javascript"
    },
    {
      title: "12. Namespaces",
      content: [
        "Namespaces allow separate communication channels within a single Socket.IO server.",
        "They can help organize different communication areas of an application."
      ],
      code: `const adminNamespace = io.of("/admin");

adminNamespace.on("connection", (socket) => {
  console.log("Admin connected");
});`,
      language: "javascript"
    },
    {
      title: "13. Common Use Cases",
      content: [
        "Real-time chat.",
        "Notifications.",
        "Live dashboards.",
        "Online user status.",
        "Collaborative applications.",
        "Live course updates.",
        "Room-based communication."
      ]
    },
    {
      title: "14. Best Practices",
      content: [
        "Validate incoming socket events.",
        "Authenticate socket connections.",
        "Use rooms for targeted communication.",
        "Handle disconnects and reconnects.",
        "Avoid duplicate event listeners.",
        "Do not trust client-supplied data.",
        "Use appropriate rate limiting and event validation."
      ]
    }
  ]
},
"livekit-components-react": {
  title: "LiveKit Components React",
  description: "React components for realtime video applications.",
  overview:
    "LiveKit Components React provides prebuilt React components and hooks for building real-time audio, video and interactive applications using LiveKit. It simplifies participant rendering, video tracks, room interfaces, media controls and realtime user experiences.",
  sections: [
    {
      title: "1. What is LiveKit Components React?",
      content: [
        "LiveKit Components React is a React component library for building LiveKit-powered realtime applications.",
        "It provides UI components and hooks for handling participants, audio, video, tracks and room interactions.",
        "It helps developers build realtime video interfaces without implementing every media UI component manually."
      ]
    },
    {
      title: "2. Installation",
      code: `npm install @livekit/components-react @livekit/components-styles livekit-client`,
      language: "bash"
    },
    {
      title: "3. Importing Styles",
      content: [
        "LiveKit provides component styles that can be imported to apply default styling to supported UI components."
      ],
      code: `import "@livekit/components-styles";`,
      language: "jsx"
    },
    {
      title: "4. LiveKitRoom",
      content: [
        "LiveKitRoom is a foundational component for connecting and managing the LiveKit room context within a React component tree.",
        "It provides the room context for nested LiveKit components."
      ],
      code: `import {
  LiveKitRoom
} from "@livekit/components-react";

<LiveKitRoom
  serverUrl={serverUrl}
  token={token}
  connect={true}
>
  {/* Room UI */}
</LiveKitRoom>`,
      language: "jsx"
    },
    {
      title: "5. VideoConference",
      content: [
        "VideoConference provides a ready-made conference interface with common meeting functionality.",
        "It can be used as a starting point for video conferencing experiences."
      ],
      code: `import {
  VideoConference
} from "@livekit/components-react";

<LiveKitRoom
  serverUrl={serverUrl}
  token={token}
  connect={true}
>
  <VideoConference />
</LiveKitRoom>`,
      language: "jsx"
    },
    {
      title: "6. Participant Components",
      content: [
        "Participant-related components and hooks provide access to participant information and their media tracks.",
        "They help render participant-specific UI."
      ]
    },
    {
      title: "7. Track Components",
      content: [
        "Track components render media tracks such as video and audio.",
        "They can be used to display participant media in realtime interfaces."
      ]
    },
    {
      title: "8. useTracks()",
      content: [
        "useTracks() is a hook used to retrieve track references for specified track sources.",
        "It can be used to render track-based UI."
      ],
      code: `import {
  useTracks
} from "@livekit/components-react";

import {
  Track
} from "livekit-client";

const tracks = useTracks([
  Track.Source.Camera,
  Track.Source.Microphone
]);`,
      language: "jsx"
    },
    {
      title: "9. Audio and Video Controls",
      content: [
        "LiveKit components and hooks support UI workflows for microphone, camera and media tracks.",
        "These controls can be integrated into custom meeting interfaces."
      ]
    },
    {
      title: "10. Room Context",
      content: [
        "Room context allows nested components to access room-related information and functionality.",
        "Components inside the LiveKitRoom tree can use supported hooks and components to interact with the room."
      ]
    },
    {
      title: "11. Common Use Cases",
      content: [
        "Online classrooms.",
        "Video conferencing.",
        "Live interviews.",
        "Realtime collaboration.",
        "Webinar interfaces.",
        "Audio rooms.",
        "Participant video grids."
      ]
    },
    {
      title: "12. Best Practices",
      content: [
        "Use LiveKitRoom as the room context boundary.",
        "Keep token generation on the backend.",
        "Do not expose server API secrets in frontend code.",
        "Handle connection and disconnection states.",
        "Handle participant and track changes.",
        "Use appropriate UI for loading and connection errors.",
        "Use responsive layouts for participant video grids.",
        "Use permissions and room access controls on the backend."
      ]
    }
  ]
},
"google-apis": {
  title: "Google APIs",
  description: "Integration with Google services and APIs.",
  overview:
    "Google APIs allow applications to interact with Google services programmatically. Developers can integrate services such as Google Drive, Gmail, Calendar, YouTube and other Google products using API requests, authentication and authorization.",
  sections: [
    {
      title: "1. What are Google APIs?",
      content: [
        "Google APIs allow applications to access and interact with Google services.",
        "They enable developers to integrate Google functionality into web, mobile and backend applications.",
        "APIs can provide access to resources such as files, calendars, user information and other Google services depending on permissions."
      ]
    },
    {
      title: "2. Google API Ecosystem",
      content: [
        "Google Drive API — manage files and folders.",
        "Gmail API — access email-related functionality.",
        "Google Calendar API — manage calendar events.",
        "YouTube Data API — access YouTube resources.",
        "Google Sheets API — read and modify spreadsheets.",
        "Google Maps APIs — integrate maps and location-related functionality."
      ]
    },
    {
      title: "3. Google Cloud Project",
      content: [
        "Google APIs are generally configured through a Google Cloud project.",
        "A Cloud project provides a central place to enable APIs, configure credentials, manage permissions and monitor usage."
      ]
    },
    {
      title: "4. Enabling APIs",
      content: [
        "Developers select and enable the required APIs in Google Cloud Console.",
        "An application can only use enabled APIs when the required authentication, authorization and access requirements are satisfied."
      ]
    },
    {
      title: "5. API Credentials",
      content: [
        "Google APIs can use different credential types depending on the API and use case.",
        "API keys are commonly used for certain public-data or application-restricted API requests.",
        "OAuth 2.0 credentials are used when accessing user-authorized resources.",
        "Service accounts are used for supported server-to-server and application identity workflows."
      ]
    },
    {
      title: "6. OAuth 2.0",
      content: [
        "OAuth 2.0 allows applications to obtain permission to access specific resources on behalf of a user.",
        "Users grant requested permissions through an authorization flow.",
        "Access tokens are used to access authorized API resources."
      ]
    },
    {
      title: "7. API Requests",
      content: [
        "Applications communicate with Google APIs using HTTP requests.",
        "Requests may include authentication credentials, query parameters, headers and request bodies."
      ],
      code: `const response = await fetch(
  "https://www.googleapis.com/some-api-endpoint",
  {
    headers: {
      Authorization: \`Bearer \${accessToken}\`
    }
  }
);

const data = await response.json();`,
      language: "javascript"
    },
    {
      title: "8. Using Google APIs in Node.js",
      content: [
        "Node.js applications can use HTTP clients or Google's official client libraries to interact with supported APIs.",
        "Client libraries simplify authentication, requests and API-specific operations."
      ],
      code: `npm install googleapis`,
      language: "bash"
    },
    {
      title: "9. Google API Client Library",
      content: [
        "The googleapis package provides client interfaces for many Google APIs.",
        "Developers can initialize API clients and use supported methods."
      ],
      code: `import { google } from "googleapis";

const drive = google.drive({
  version: "v3",
  auth: authClient
});

const response = await drive.files.list({
  pageSize: 10,
  fields: "files(id,name)"
});`,
      language: "javascript"
    },
    {
      title: "10. API Scopes",
      content: [
        "Scopes define the permissions an application requests.",
        "Different scopes provide different levels of access to Google resources.",
        "Applications should request only the scopes they actually need."
      ]
    },
    {
      title: "11. Rate Limits and Quotas",
      content: [
        "Google APIs may enforce quotas and rate limits.",
        "Applications should handle quota errors and retry appropriately when supported.",
        "Caching and efficient request patterns can reduce unnecessary API calls."
      ]
    },
    {
      title: "12. Common Use Cases",
      content: [
        "Google Drive integration.",
        "Calendar synchronization.",
        "Email-related integrations.",
        "Google Sheets automation.",
        "Google account integrations.",
        "Third-party service integrations.",
        "Application data synchronization."
      ]
    },
    {
      title: "13. Best Practices",
      content: [
        "Enable only the APIs that your application needs.",
        "Request minimum necessary OAuth scopes.",
        "Protect credentials and tokens.",
        "Restrict API keys where supported.",
        "Handle API errors and quotas.",
        "Avoid exposing sensitive credentials in frontend code.",
        "Use appropriate authentication methods for each API.",
        "Monitor API usage in Google Cloud Console."
      ]
    }
  ]
},
"langchain-core": {
  title: "LangChain Core",
  description: "Core abstractions, prompts, runnables and model interfaces.",
  overview:
    "LangChain Core provides the fundamental abstractions and interfaces used throughout the LangChain ecosystem. It includes components such as prompts, messages, runnables, output parsers, tools and model interfaces that help developers build modular AI applications.",
  sections: [
    {
      title: "1. What is LangChain Core?",
      content: [
        "LangChain Core provides the foundational abstractions that power the LangChain ecosystem.",
        "It defines interfaces for components such as chat models, prompts, tools, output parsers and runnables.",
        "It is designed to be modular and independent of specific model providers.",
        "Provider-specific integrations are generally provided by separate packages."
      ]
    },
    {
      title: "2. Installation",
      code: `npm install @langchain/core`,
      language: "bash"
    },
    {
      title: "3. Messages",
      content: [
        "Messages represent structured communication between users, AI models and other components.",
        "Common message types include HumanMessage, SystemMessage and AIMessage.",
        "Messages can contain text and other supported content."
      ],
      code: `import {
  HumanMessage,
  SystemMessage,
  AIMessage
} from "@langchain/core/messages";

const messages = [
  new SystemMessage("You are a helpful assistant."),
  new HumanMessage("Explain React."),
  new AIMessage("React is a UI library.")
];`,
      language: "javascript"
    },
    {
      title: "4. Prompt Templates",
      content: [
        "Prompt templates allow developers to create reusable prompts.",
        "Variables can be inserted dynamically into prompts.",
        "Prompt templates help separate prompt structure from application data."
      ],
      code: `import {
  ChatPromptTemplate
} from "@langchain/core/prompts";

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful assistant."],
  ["human", "Explain {topic}."]
]);

const result = await prompt.invoke({
  topic: "Node.js"
});`,
      language: "javascript"
    },
    {
      title: "5. Runnable Interface",
      content: [
        "Runnables are a standardized interface for executing components in LangChain.",
        "Runnable components can be invoked, streamed, batched and composed.",
        "The runnable interface allows different components to work together through a common execution model."
      ],
      code: `const result = await runnable.invoke(input);

const results = await runnable.batch(inputs);

for await (const chunk of await runnable.stream(input)) {
  console.log(chunk);
}`,
      language: "javascript"
    },
    {
      title: "6. RunnableSequence",
      content: [
        "RunnableSequence combines multiple runnable components sequentially.",
        "The output of one component becomes the input of the next component.",
        "It is useful for creating pipelines such as prompt-to-model-to-parser."
      ],
      code: `import {
  RunnableSequence
} from "@langchain/core/runnables";

const pipeline = RunnableSequence.from([
  firstRunnable,
  secondRunnable,
  thirdRunnable
]);

const result = await pipeline.invoke(input);`,
      language: "javascript"
    },
    {
      title: "7. RunnableLambda",
      content: [
        "RunnableLambda wraps a function so that it can participate in runnable pipelines.",
        "It allows custom logic to be integrated into LangChain workflows."
      ],
      code: `import {
  RunnableLambda
} from "@langchain/core/runnables";

const processData = RunnableLambda.from(
  async (input) => {
    return {
      processed: input.value.toUpperCase()
    };
  }
);`,
      language: "javascript"
    },
    {
      title: "8. Output Parsers",
      content: [
        "Output parsers convert model outputs into application-friendly formats.",
        "They can help extract structured data, parse text and enforce output formats."
      ],
      code: `import {
  StringOutputParser
} from "@langchain/core/output_parsers";

const parser = new StringOutputParser();

const result = await parser.invoke(
  modelOutput
);`,
      language: "javascript"
    },
    {
      title: "9. Tools",
      content: [
        "Tools represent functions that AI systems can potentially use.",
        "Tools define functionality, names, descriptions and input schemas.",
        "Models capable of tool calling can use tool definitions to request execution of application functions."
      ],
      code: `import {
  tool
} from "@langchain/core/tools";

import { z } from "zod";

const calculator = tool(
  async ({ a, b }) => a + b,
  {
    name: "calculator",
    description: "Add two numbers",
    schema: z.object({
      a: z.number(),
      b: z.number()
    })
  }
);`,
      language: "javascript"
    },
    {
      title: "10. Structured Output and Schemas",
      content: [
        "LangChain Core works with schemas and structured representations.",
        "Schemas help define expected inputs and outputs for components and tools.",
        "Structured interfaces make AI workflows easier to integrate with application logic."
      ]
    },
    {
      title: "11. Streaming",
      content: [
        "Runnable components can support streaming execution.",
        "Streaming allows applications to process output incrementally rather than waiting for the entire response.",
        "It is useful for AI chat interfaces and applications where progressive output improves responsiveness."
      ]
    },
    {
      title: "12. Batching",
      content: [
        "Batch execution allows multiple inputs to be processed through a runnable.",
        "It can help simplify execution of multiple independent inputs."
      ],
      code: `const results = await runnable.batch([
  input1,
  input2,
  input3
]);`,
      language: "javascript"
    },
    {
      title: "13. Common Components",
      content: [
        "Messages — structured conversation messages.",
        "Prompt Templates — reusable prompt structures.",
        "Runnables — standardized execution interfaces.",
        "Output Parsers — transform model outputs.",
        "Tools — callable functionality.",
        "Schemas — define structured inputs.",
        "Callbacks — observe execution events."
      ]
    },
    {
      title: "14. Common Use Cases",
      content: [
        "LLM application pipelines.",
        "Prompt engineering workflows.",
        "AI chat applications.",
        "Tool calling.",
        "Structured output generation.",
        "Streaming AI responses.",
        "Composable AI workflows."
      ]
    },
    {
      title: "15. Best Practices",
      content: [
        "Build reusable runnable components.",
        "Keep prompts separate from application logic.",
        "Use schemas for structured inputs.",
        "Validate AI-generated data before using it.",
        "Use appropriate output parsers.",
        "Handle model and pipeline errors.",
        "Use streaming where it improves user experience.",
        "Keep provider integrations modular."
      ]
    }
  ]
},
"text-splitters": {
  title: "Text Splitters",
  description: "Chunking documents for LLMs and retrieval workflows.",
  overview:
    "Text Splitters divide large text documents into smaller chunks that can be processed by language models. They are commonly used in document ingestion, embeddings, retrieval systems and RAG pipelines to improve context handling and retrieval relevance.",
  sections: [
    {
      title: "1. What are Text Splitters?",
      content: [
        "Text splitters divide large documents into smaller pieces of text.",
        "LLMs have context window limits, so processing extremely large documents at once may not be practical.",
        "Chunking allows documents to be processed, embedded and retrieved in smaller portions.",
        "Text splitters are commonly used in RAG pipelines."
      ]
    },
    {
      title: "2. Installation",
      code: `npm install @langchain/textsplitters`,
      language: "bash"
    },
    {
      title: "3. Recursive Character Text Splitter",
      content: [
        "RecursiveCharacterTextSplitter attempts to split text using a sequence of separators.",
        "It tries to preserve larger meaningful text units before splitting into smaller ones.",
        "It is a commonly used splitter for general-purpose document chunking."
      ],
      code: `import {
  RecursiveCharacterTextSplitter
} from "@langchain/textsplitters";

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200
});

const chunks = await splitter.splitText(
  "Your large document text..."
);

console.log(chunks);`,
      language: "javascript"
    },
    {
      title: "4. Chunk Size",
      content: [
        "Chunk size determines the approximate maximum size of individual text chunks.",
        "Smaller chunks provide more granular retrieval but may lose broader context.",
        "Larger chunks provide more context but may include irrelevant information."
      ]
    },
    {
      title: "5. Chunk Overlap",
      content: [
        "Chunk overlap allows adjacent chunks to share some text.",
        "Overlap helps preserve context when information spans chunk boundaries.",
        "Excessive overlap can increase storage and processing costs."
      ]
    },
    {
      title: "6. Splitting Documents",
      content: [
        "Document splitting is useful when processing files such as PDFs, text files and other supported document sources.",
        "Document metadata can be preserved during splitting depending on the splitter workflow."
      ],
      code: `const documents = await splitter.splitDocuments(
  loadedDocuments
);`,
      language: "javascript"
    },
    {
      title: "7. Recursive Splitting Strategy",
      content: [
        "Recursive splitting uses multiple separators in sequence.",
        "It typically attempts to preserve paragraphs, lines, sentences or smaller text units before splitting further.",
        "This approach helps maintain more natural text boundaries."
      ]
    },
    {
      title: "8. Common Use Cases",
      content: [
        "RAG applications.",
        "Document embeddings.",
        "Knowledge bases.",
        "Vector database ingestion.",
        "PDF processing.",
        "AI document search.",
        "Question-answering systems."
      ]
    },
    {
      title: "9. Best Practices",
      content: [
        "Choose chunk sizes according to the use case.",
        "Experiment with chunk overlap.",
        "Preserve document metadata.",
        "Avoid splitting text unnecessarily into extremely small chunks.",
        "Evaluate retrieval quality rather than relying only on chunk size.",
        "Use appropriate chunking strategies for structured content."
      ]
    }
  ]
},
"groq-sdk": {
  title: "Groq SDK",
  description: "Fast inference API integration with Groq.",
  overview:
    "Groq SDK is the official JavaScript SDK for interacting with the Groq API. It allows applications to send requests to supported language models, generate completions, stream responses and integrate AI inference into applications.",
  sections: [
    {
      title: "1. What is Groq SDK?",
      content: [
        "Groq SDK provides a JavaScript interface for interacting with the Groq API.",
        "It allows applications to request AI-generated responses from supported models.",
        "It supports completion workflows, streaming and other supported API capabilities."
      ]
    },
    {
      title: "2. Installation",
      code: `npm install groq-sdk`,
      language: "bash"
    },
    {
      title: "3. Environment Variables",
      code: `GROQ_API_KEY=your_api_key`,
      language: "bash"
    },
    {
      title: "4. Initializing Groq",
      content: [
        "The Groq client can be initialized using an API key.",
        "API keys should remain on the server and should not be exposed in frontend code."
      ],
      code: `import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});`,
      language: "javascript"
    },
    {
      title: "5. Chat Completions",
      content: [
        "The chat completions API accepts a collection of messages and generates a response.",
        "Messages can include system, user and assistant roles."
      ],
      code: `const completion = await groq.chat.completions.create({
  messages: [
    {
      role: "system",
      content: "You are a helpful assistant."
    },
    {
      role: "user",
      content: "Explain Node.js."
    }
  ],
  model: "your-supported-model"
});

console.log(
  completion.choices[0].message.content
);`,
      language: "javascript"
    },
    {
      title: "6. Streaming Responses",
      content: [
        "Streaming allows responses to be received incrementally.",
        "It can be used to display AI responses as they are generated."
      ],
      code: `const stream = await groq.chat.completions.create({
  messages: [
    {
      role: "user",
      content: "Explain React."
    }
  ],
  model: "your-supported-model",
  stream: true
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content;

  if (content) {
    process.stdout.write(content);
  }
}`,
      language: "javascript"
    },
    {
      title: "7. Model Selection",
      content: [
        "Groq provides access to supported models through its API.",
        "Model availability and capabilities can change over time.",
        "Applications should select models based on their supported features, performance and requirements."
      ]
    },
    {
      title: "8. Error Handling",
      content: [
        "API requests may fail because of invalid credentials, rate limits, network problems or unsupported requests.",
        "Applications should handle errors appropriately."
      ],
      code: `try {
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "Hello"
      }
    ],
    model: "your-supported-model"
  });
} catch (error) {
  console.error("Groq API error:", error);
}`,
      language: "javascript"
    },
    {
      title: "9. Common Use Cases",
      content: [
        "AI chat applications.",
        "Text generation.",
        "Streaming AI interfaces.",
        "AI assistants.",
        "Backend AI integrations.",
        "LLM-powered applications."
      ]
    },
    {
      title: "10. Best Practices",
      content: [
        "Keep API keys on the backend.",
        "Handle API errors and rate limits.",
        "Use streaming where appropriate.",
        "Validate incoming user requests.",
        "Monitor token usage and costs.",
        "Choose models according to application requirements.",
        "Avoid exposing provider credentials to clients."
      ]
    }
  ]
},
"langchain-groq": {
  title: "LangChain Groq",
  description: "Connect LangChain applications with Groq models.",
  overview:
    "LangChain Groq is a provider integration that connects LangChain applications with Groq-hosted language models. It allows developers to use Groq models through LangChain interfaces and combine them with prompts, chains, tools, output parsers and other components.",
  sections: [
    {
      title: "1. What is LangChain Groq?",
      content: [
        "LangChain Groq is an integration between LangChain and Groq's inference API.",
        "It provides a LangChain-compatible interface for supported Groq chat models.",
        "It allows Groq models to be used within LangChain pipelines and AI application workflows."
      ]
    },
    {
      title: "2. Installation",
      code: `npm install @langchain/groq @langchain/core`,
      language: "bash"
    },
    {
      title: "3. Environment Variables",
      code: `GROQ_API_KEY=your_api_key`,
      language: "bash"
    },
    {
      title: "4. Initializing ChatGroq",
      content: [
        "ChatGroq provides a LangChain chat model interface for supported Groq models.",
        "It can be initialized using a model identifier and API credentials."
      ],
      code: `import {
  ChatGroq
} from "@langchain/groq";

const model = new ChatGroq({
  model: "your-supported-model",
  apiKey: process.env.GROQ_API_KEY
});`,
      language: "javascript"
    },
    {
      title: "5. Invoking the Model",
      content: [
        "invoke() sends input to the model and returns its response.",
        "LangChain message types can be used to provide structured conversation inputs."
      ],
      code: `import {
  HumanMessage,
  SystemMessage
} from "@langchain/core/messages";

const response = await model.invoke([
  new SystemMessage("You are a helpful assistant."),
  new HumanMessage("Explain Express.js.")
]);

console.log(response.content);`,
      language: "javascript"
    },
    {
      title: "6. Prompt Templates",
      content: [
        "LangChain Groq models can be combined with prompt templates.",
        "Prompt templates allow reusable prompts with dynamically supplied values."
      ],
      code: `import {
  ChatPromptTemplate
} from "@langchain/core/prompts";

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a technical tutor."],
  ["human", "Explain {topic}."]
]);

const chain = prompt.pipe(model);

const response = await chain.invoke({
  topic: "Redis"
});`,
      language: "javascript"
    },
    {
      title: "7. Runnable Pipelines",
      content: [
        "LangChain Groq models implement LangChain runnable interfaces.",
        "They can be composed with prompts, parsers and other compatible components.",
        "Runnable pipelines help organize AI workflows into reusable components."
      ],
      code: `const chain = prompt
  .pipe(model)
  .pipe(parser);

const result = await chain.invoke(input);`,
      language: "javascript"
    },
    {
      title: "8. Streaming",
      content: [
        "LangChain Groq supports streaming workflows where supported by the configured model and integration.",
        "Streaming can be used to progressively display AI-generated content."
      ],
      code: `const stream = await model.stream(
  "Explain AI agents."
);

for await (const chunk of stream) {
  console.log(chunk.content);
}`,
      language: "javascript"
    },
    {
      title: "9. Tool Calling",
      content: [
        "Compatible Groq models can be integrated into LangChain tool-calling workflows.",
        "Tools allow models to request application functions when supported by the model and API.",
        "Tool execution is handled by the application or agent workflow."
      ]
    },
    {
      title: "10. Common Use Cases",
      content: [
        "LangChain AI applications.",
        "AI chatbots.",
        "Prompt-based pipelines.",
        "Streaming responses.",
        "Tool-calling workflows.",
        "AI assistants.",
        "LLM-powered backend services."
      ]
    },
    {
      title: "11. Best Practices",
      content: [
        "Keep API keys in server-side environment variables.",
        "Select models based on supported features.",
        "Handle rate limits and API errors.",
        "Use reusable prompt templates.",
        "Validate AI-generated outputs.",
        "Use streaming where appropriate.",
        "Keep provider integrations modular."
      ]
    }
  ]
},
};