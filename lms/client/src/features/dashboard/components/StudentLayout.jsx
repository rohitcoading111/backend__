
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { logoutUser } from "../../auth/authThunk/authThunks.js";

import Sidebar from "./Sidebar.jsx";
import DashboardHeader from "./DashboardHeader.jsx";

function StudentLayout() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  const initials = user?.name
    ? user.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase()
    : "S";

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await dispatch(logoutUser()).unwrap();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Sidebar
        user={user}
        initials={initials}
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
        loggingOut={loggingOut}
        activeSection={activeSection}
        onNavigate={setActiveSection}
      />

      <div className="min-h-screen lg:pl-[260px]">
        <DashboardHeader
          user={user}
          initials={initials}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <Outlet context={{ activeSection }} />
        </main>
      </div>
    </div>
  );
}

export default StudentLayout;
