import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaBell, FaPlus, FaSearch } from "react-icons/fa";

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const rawUser = localStorage.getItem("user");
    if (rawUser) {
      try {
        setCurrentUser(JSON.parse(rawUser));
      } catch (err) {
        console.error("Failed to parse user", err);
      }
    }
  }, []);

  const getInitials = (name) => {
    if (!name) return "AG";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const displayName = currentUser?.fullName || currentUser?.name || "Agent User";
  const displayRole = currentUser?.role === "agent" ? "Verified Real Estate Agent" : "Administrator";

  return (
    <header className="fixed top-0 right-0 z-40 ml-64 w-[calc(100%-16rem)] border-b border-gray-800 bg-[#0B0C0E]/95 backdrop-blur-md">
      <div className="flex h-20 items-center justify-between px-6">

        {/* Left - Page Title */}
        <div>
          <h1 className="text-xl font-semibold text-white">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {displayName}
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Search */}
          <div className="relative hidden md:block">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="text"
              placeholder="Search properties, leads..."
              className="h-11 w-72 rounded-lg border border-gray-800 bg-[#151619] pl-11 pr-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#B97816]"
            />
          </div>

          {/* Notification */}
          <button
            className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-gray-800 bg-[#151619] text-gray-400 transition hover:border-[#B97816] hover:text-white"
            title="Notifications"
          >
            <FaBell size={16} />

            {/* Notification dot */}
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#B97816]" />
          </button>

          {/* Add Listing */}
          <button
            onClick={() => {
              try {
                const token = localStorage.getItem("token");
                const userStr = localStorage.getItem("user");
                const user = userStr ? JSON.parse(userStr) : null;
                if (token && user && (user.role === "agent" || user.role === "admin")) {
                  navigate("/SellOrRentForm");
                } else {
                  navigate("/LogIn?role=agent&redirect=/SellOrRentForm");
                }
              } catch {
                navigate("/LogIn?role=agent&redirect=/SellOrRentForm");
              }
            }}
            className="hidden items-center gap-2 rounded-lg bg-[#B97816] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#9f6712] sm:flex shadow-md cursor-pointer"
          >
            <FaPlus size={12} />
            Add Listing
          </button>

          {/* Divider */}
          <div className="h-9 w-px bg-gray-800" />

          {/* Profile */}
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-3 cursor-pointer text-left group"
          >
            {/* Avatar */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B97816] text-sm font-bold text-white shadow group-hover:ring-2 group-hover:ring-[#d4af37]/50 transition">
              {getInitials(displayName)}
            </div>

            {/* User Info */}
            <div className="hidden text-left lg:block">
              <p className="text-sm font-medium text-white group-hover:text-[#d4af37] transition">
                {displayName}
              </p>

              <p className="text-xs text-gray-500 capitalize">
                {displayRole}
              </p>
            </div>
          </button>

        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;