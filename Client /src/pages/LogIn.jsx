import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaApple,
  FaArrowLeft,
  FaUser,
  FaBriefcase,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import bg from "../assets/SignUpBg.jpg";
import API_URL from "../Services/Api";

export default function LogIn() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlRole = searchParams.get("role");
  const redirectParam = searchParams.get("redirect");

  const [role, setRole] = useState(urlRole === "agent" ? "agent" : "user");

  useEffect(() => {
    if (urlRole === "agent") {
      setRole("agent");
    }
  }, [urlRole]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      const loggedInUser = data.data?.user;
      const isAgent = loggedInUser?.role === "agent" || role === "agent" || loggedInUser?.role === "admin";

      if (redirectParam && isAgent) {
        navigate(redirectParam);
      } else if (isAgent) {
        navigate("/dashboard");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-16"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="relative w-full rounded-3xl border border-white/10 bg-[#111111]/90 backdrop-blur-xl shadow-2xl p-6 sm:p-10"
        >
          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 flex items-center gap-2 text-gray-400 hover:text-[#d4af37] transition"
          >
            <FaArrowLeft className="text-xs sm:text-sm" />
            <span className="text-xs sm:text-sm font-medium uppercase tracking-wider">
              Back
            </span>
          </button>

          {/* Heading */}
          <h1 className="mt-6 text-2xl sm:text-3xl font-serif font-bold text-white text-center tracking-tight">
            Welcome Back
          </h1>

          <p className="text-center text-[#d4af37] mt-1 text-xs sm:text-sm font-medium">
            Sign In To Experience Luxe Realty
          </p>

          {redirectParam && (
            <div className="mt-4 p-3 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs text-center font-medium">
              ✦ Admin / Agent authentication required to list and post properties. Log in below to proceed directly to the listing portal.
            </div>
          )}

          {/* Role Toggle */}
          <div className="mt-6 flex items-center justify-center">
            <div className="relative flex items-center bg-black/70 rounded-full p-1 w-64 border border-white/10">
              <div
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-[#d4af37] transition-all duration-300 ${
                  role === "user" ? "left-1" : "left-[calc(50%+3px)]"
                }`}
              />

              <button
                type="button"
                onClick={() => setRole("user")}
                className={`relative z-10 flex items-center justify-center gap-2 w-1/2 py-2 rounded-full text-xs font-semibold transition-colors duration-300 ${
                  role === "user" ? "text-black font-bold" : "text-gray-400 hover:text-white"
                }`}
              >
                <FaUser className="text-xs" />
                User
              </button>

              <button
                type="button"
                onClick={() => setRole("agent")}
                className={`relative z-10 flex items-center justify-center gap-2 w-1/2 py-2 rounded-full text-xs font-semibold transition-colors duration-300 ${
                  role === "agent" ? "text-black font-bold" : "text-gray-400 hover:text-white"
                }`}
              >
                <FaBriefcase className="text-xs" />
                Agent
              </button>
            </div>
          </div>

          <p className="text-center text-gray-400 text-xs mt-2">
            {role === "user"
              ? "Access buyers & investors portal"
              : "Access registered broker dashboard"}
          </p>

          {/* Inputs */}
          <div className="mt-6 space-y-4">
            <div>
              <label className="text-[#d4af37] uppercase text-xs tracking-wider font-semibold block mb-1">
                Email Address
              </label>
              <div className="flex items-center rounded-xl bg-black/60 border border-white/10 px-4 focus-within:border-[#d4af37] transition">
                <FaEnvelope className="text-gray-400 text-sm shrink-0" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent p-3 text-sm outline-none text-white placeholder:text-gray-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[#d4af37] uppercase text-xs tracking-wider font-semibold block mb-1">
                Password
              </label>
              <div className="flex items-center rounded-xl bg-black/60 border border-white/10 px-4 focus-within:border-[#d4af37] transition">
                <FaLock className="text-gray-400 text-sm shrink-0" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-transparent p-3 text-sm outline-none text-white placeholder:text-gray-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 p-2.5 rounded-lg bg-red-950/70 border border-red-500/40 text-red-200 text-xs text-center">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-[#d4af37] py-3.5 text-base font-bold text-black hover:bg-[#b8952b] transition duration-200 disabled:opacity-50 shadow-lg uppercase tracking-wider text-xs"
          >
            {loading ? "Authenticating..." : `Sign In As ${role === "user" ? "User" : "Agent"}`}
          </button>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-gray-400 text-xs sm:text-sm">
            Don't have an account?{" "}
            <span
              onClick={() => {
                const params = new URLSearchParams();
                if (role) params.set("role", role);
                if (redirectParam) params.set("redirect", redirectParam);
                const qs = params.toString();
                navigate(`/SignUp${qs ? `?${qs}` : ""}`);
              }}
              className="text-[#d4af37] cursor-pointer font-semibold hover:underline"
            >
              Sign Up
            </span>
          </p>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="h-px flex-1 bg-white/10"></div>
            <span className="text-gray-500 text-xs uppercase tracking-wider">
              Quick Connect
            </span>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>

          {/* Social */}
          <div className="flex justify-center gap-4">
            <button
              type="button"
              className="h-11 w-11 rounded-full bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/20 transition"
              title="Sign in with Google"
            >
              <FaGoogle size={16} className="text-red-400" />
            </button>
            <button
              type="button"
              className="h-11 w-11 rounded-full bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/20 transition"
              title="Sign in with Apple"
            >
              <FaApple size={18} className="text-white" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}