
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logoutUser } from "../../auth/authThunk/authThunks.js";

import Sidebar from "./Sidebar.jsx";
import DashboardHeader from "./DashboardHeader.jsx";
import Dashboard from "../pages/Dashboard.jsx";

function StudentLayout() {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  // User initials
  const initials = user?.name
    ? user.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase()
    : "S";

  // Sidebar navigation
  const handleNavigation = (section) => {
    setActiveSection(section);
    setSidebarOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Logout
  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      await dispatch(logoutUser()).unwrap();

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white antialiased">

      {/* Sidebar */}
      <Sidebar
        user={user}
        initials={initials}
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
        loggingOut={loggingOut}
        activeSection={activeSection}
        onNavigate={handleNavigation}
      />

      {/* Main Layout */}
      <div className="min-h-screen lg:pl-[260px]">

        {/* Header */}
        <DashboardHeader
          user={user}
          initials={initials}
          activeSection={activeSection}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Dashboard Content */}
        <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
          <Dashboard
            activeSection={activeSection}
            onNavigate={handleNavigation}
          />
        </main>

      </div>
    </div>
  );
}

export default StudentLayout;
