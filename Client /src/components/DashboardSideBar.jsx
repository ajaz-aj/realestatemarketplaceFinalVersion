import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBuilding,
  FaUsers,
  FaChartLine,
  FaCalendarCheck,
  FaComments,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import API_URL from "../Services/Api";

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const [unreadChatCount, setUnreadChatCount] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
    navigate("/LogIn");
  };

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await fetch(`${API_URL}/chat/conversations`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.data)) {
            const total = data.data.reduce((acc, c) => acc + (c.unreadByAgent || 0), 0);
            setUnreadChatCount(total);
          }
        }
      } catch {
        // ignore
      }
    };
    fetchUnread();
    const interval = setInterval(fetchUnread, 3000);
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Properties",
      path: "/dashboard/properties",
      icon: <FaBuilding />,
    },
    {
      name: "Leads",
      path: "/dashboard/leads",
      icon: <FaUsers />,
    },
    {
      name: "Live Chat",
      path: "/dashboard/chat",
      icon: <FaComments />,
      badge: unreadChatCount > 0 ? unreadChatCount : null,
    },
    {
      name: "Analytics",
      path: "/dashboard/analytics",
      icon: <FaChartLine />,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-65 bg-[#111111] border-r border-white/10 flex flex-col z-50">

      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-white/10">

        <Link
          to="/"
          className="text-xl font-semibold tracking-widest text-[#d4af37] hover:opacity-80 transition"
        >
          LUXE REALTY
        </Link>

      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">

        {menuItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/dashboard"}
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-3 rounded-lg transition
              ${
                isActive
                  ? "bg-[#d4af37] text-black font-semibold shadow-md"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >

            <div className="flex items-center gap-4">
              <span className="text-lg">
                {item.icon}
              </span>
              <span>{item.name}</span>
            </div>

            {item.badge && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#d4af37] text-black shadow-sm">
                {item.badge}
              </span>
            )}

          </NavLink>

        ))}

      </nav>

      {/* Bottom menu */}
      <div className="p-4 border-t border-white/10 space-y-2">

        <NavLink
          to="/profile"
          className="flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition"
        >
          <FaCog />
          <span>Settings</span>
        </NavLink>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition cursor-pointer"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
};

export default DashboardSidebar;