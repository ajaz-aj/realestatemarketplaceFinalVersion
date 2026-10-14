import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ProfileDefault from "../assets/Profile.jpg";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        setCurrentUser(JSON.parse(userStr));
      } else {
        setCurrentUser(null);
      }
    } catch {
      setCurrentUser(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    setUserMenuOpen(false);
    setIsOpen(false);
    navigate("/LogIn");
  };

  const handleListProperty = () => {
    setIsOpen(false);
    setUserMenuOpen(false);
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
  };

  const NavItem = [
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "Rentals", path: "/rentals" },
    { name: "Invest", path: "/invest" },
    { name: "Find Agent", path: "/findagent" },
  ];

  return (
    <nav
      className={`h-20 w-full flex items-center justify-between px-4 sm:px-8 md:px-12 shadow-sm transition-colors duration-300 z-50 ${
        location.pathname === "/"
          ? "absolute top-0 left-0 bg-transparent text-white"
          : "bg-[#0A0A0A] border-b border-white/10 text-white"
      }`}
    >
      {/* Logo */}
      <NavLink to="/" className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wider text-white">
        LUXE<span className="text-[#d4af37]">REALTY</span>
      </NavLink>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex gap-6 items-center">
        {NavItem.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "text-[#d4af37] font-semibold text-sm tracking-wide"
                : "text-gray-300 font-medium text-sm tracking-wide hover:text-white transition-colors"
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* Desktop Profile & Sign In */}
      <div className="hidden md:flex font-semibold items-center gap-3 relative">
        {currentUser ? (
          <div className="relative">
            <div className="flex items-center gap-3">
              <button
                onClick={handleListProperty}
                className="px-3.5 py-1.5 rounded-full border border-[#d4af37]/40 text-[#d4af37] text-xs font-semibold hover:bg-[#d4af37] hover:text-black transition cursor-pointer"
              >
                + List Property
              </button>

              {currentUser.role === "agent" && (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-3.5 py-1.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37] text-xs font-semibold hover:bg-[#d4af37] hover:text-black transition"
                >
                  Agent Portal
                </button>
              )}

              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2.5 rounded-full bg-white/10 border border-white/20 px-3 py-1.5 backdrop-blur-md hover:bg-white/20 transition cursor-pointer"
              >
                <img
                  src={currentUser.profileImage || ProfileDefault}
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover border border-white/30"
                  onError={(e) => {
                    e.target.src = ProfileDefault;
                  }}
                />
                <span className="text-sm font-medium text-white max-w-[120px] truncate">
                  {currentUser.fullName || "User"}
                </span>
              </button>
            </div>

            {/* Dropdown Menu */}
            {userMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#141414] border border-white/10 shadow-2xl py-2 z-50 text-sm font-normal"
                onClick={() => setUserMenuOpen(false)}
              >
                <div className="px-4 py-2 border-b border-white/10">
                  <p className="font-semibold text-white truncate">{currentUser.fullName}</p>
                  <p className="text-xs text-gray-400 capitalize">{currentUser.role || "Member"}</p>
                </div>
                {currentUser.role === "agent" && (
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="w-full text-left px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 transition"
                  >
                    Agent Dashboard
                  </button>
                )}
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full text-left px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 transition"
                >
                  My Profile & Saved
                </button>
                <button
                  onClick={handleListProperty}
                  className="w-full text-left px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 transition"
                >
                  List a Property
                </button>
                <div className="border-t border-white/10 mt-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-white/5 transition"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={handleListProperty}
              className="px-3.5 py-1.5 rounded-full border border-white/20 text-gray-300 hover:border-[#d4af37] hover:text-[#d4af37] text-xs font-semibold transition cursor-pointer"
            >
              + List Property
            </button>
            <NavLink
              to="/LogIn"
              className="text-gray-300 hover:text-white text-sm px-3 py-1.5 transition"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/SignUp"
              className="bg-[#d4af37] text-black px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#b8952b] transition shadow-md"
            >
              Register
            </NavLink>
          </div>
        )}
      </div>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-2 text-white focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#111111] flex flex-col shadow-2xl z-50 p-6 gap-3 border-t border-white/10 lg:hidden">
          {NavItem.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-[#d4af37] font-semibold text-base py-1"
                  : "text-gray-300 font-medium text-base py-1 hover:text-white"
              }
            >
              {item.name}
            </NavLink>
          ))}

          <hr className="my-2 border-white/10" />

          {currentUser ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 py-2">
                <img
                  src={currentUser.profileImage || ProfileDefault}
                  alt="Profile"
                  className="h-10 w-10 rounded-full object-cover border border-white/20"
                />
                <div>
                  <p className="font-semibold text-white">{currentUser.fullName}</p>
                  <p className="text-xs text-gray-400 capitalize">{currentUser.role || "Member"}</p>
                </div>
              </div>

              {currentUser.role === "agent" && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/dashboard");
                  }}
                  className="text-left py-2 text-[#d4af37] font-semibold"
                >
                  Agent Dashboard
                </button>
              )}

              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate("/profile");
                }}
                className="text-left py-2 text-gray-300 hover:text-white"
              >
                Profile & Saved Homes
              </button>

              <button
                onClick={handleListProperty}
                className="text-left py-2 text-[#d4af37] font-semibold"
              >
                + List a Property
              </button>

              <button
                onClick={handleLogout}
                className="text-left py-2 text-red-400 font-semibold"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleListProperty}
                className="text-left py-2 text-[#d4af37] font-semibold flex items-center justify-between"
              >
                <span>+ List a Property</span>
                <span className="text-xs bg-[#d4af37]/20 text-[#d4af37] px-2.5 py-0.5 rounded-full font-medium">Agent Portal</span>
              </button>
              <NavLink
                to="/LogIn"
                onClick={() => setIsOpen(false)}
                className="text-gray-300 text-center py-2.5 rounded-xl border border-white/20 font-semibold"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/SignUp"
                onClick={() => setIsOpen(false)}
                className="bg-[#d4af37] text-black text-center py-2.5 rounded-xl font-semibold shadow-md"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;