import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaApple,
  FaArrowLeft,
  FaBriefcase,
} from "react-icons/fa";

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import bg from "../assets/SignUpBg.jpg";
import API_URL from "../Services/Api";

export default function SignUp() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlRole = searchParams.get("role");
  const redirectParam = searchParams.get("redirect");

  // ==========================================
  // ROLE TOGGLE — "user" or "agent"
  // ==========================================

  const [role, setRole] = useState(urlRole === "agent" ? "agent" : "user");

  useEffect(() => {
    if (urlRole === "agent") {
      setRole("agent");
    }
  }, [urlRole]);

  // ==========================================
  // FORM STATE
  // ==========================================

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ==========================================
  // SIGN UP
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!agreeTerms) {
      setError("Please agree with Terms & Conditions");
      return;
    }

    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.email ||
      !formData.password
    ) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role, // ✅ send role to backend
        }),
      });

      const data = await response.json();
      console.log("Register response:", data);

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      if (redirectParam && (role === "agent" || data.data?.user?.role === "agent")) {
        navigate(redirectParam);
      } else if (role === "agent") {
        navigate("/dashboard");
      } else {
        navigate("/profile");
      }

    } catch (error) {
      console.error("Registration error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-8 sm:py-12"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="relative w-full rounded-2xl sm:rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl p-6 sm:p-8 md:p-10"
        >
          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 text-gray-400 transition hover:text-yellow-500"
          >
            <FaArrowLeft className="text-xs sm:text-sm" />
            <span className="text-xs sm:text-sm font-medium uppercase tracking-wider">
              Back
            </span>
          </button>

          {/* Heading */}
          <h1 className="mt-8 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center tracking-tight">
            {role === "agent" ? "Agent Registration" : "Create An Account"}
          </h1>

          <p className="text-center text-yellow-500 mt-2 text-xs sm:text-sm leading-relaxed">
            {role === "agent"
              ? "Register as an accredited agent to list and manage exclusive luxury properties."
              : "Apply For Exclusive Access To High-Performance Real Estate Portfolios."}
          </p>

          {redirectParam && role === "agent" && (
            <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs text-center font-medium">
              ✦ Only verified agents can list properties. Complete registration below to continue to the listing form.
            </div>
          )}

          {/* ==========================================
              ROLE TOGGLE — User / Agent
          ========================================== */}
          <div className="mt-6 flex items-center justify-center">
            <div className="relative flex items-center bg-black/60 rounded-full p-1 w-64 border border-white/10">

              {/* Sliding Background */}
              <div
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-yellow-600 transition-all duration-300
                  ${role === "user" ? "left-1" : "left-[calc(50%+3px)]"}`}
              />

              {/* User Button */}
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`relative z-10 flex items-center justify-center gap-2 w-1/2 py-2 rounded-full text-sm font-semibold transition-colors duration-300
                  ${role === "user" ? "text-white" : "text-gray-400 hover:text-white"}`}
              >
                <FaUser className="text-xs" />
                User
              </button>

              {/* Agent Button */}
              <button
                type="button"
                onClick={() => setRole("agent")}
                className={`relative z-10 flex items-center justify-center gap-2 w-1/2 py-2 rounded-full text-sm font-semibold transition-colors duration-300
                  ${role === "agent" ? "text-white" : "text-gray-400 hover:text-white"}`}
              >
                <FaBriefcase className="text-xs" />
                Agent
              </button>

            </div>
          </div>

          {/* Role Label */}
          <p className="text-center text-gray-400 text-xs mt-2">
            {role === "user"
              ? "Signing up as a Property Buyer / Renter"
              : "Signing up as a Real Estate Agent"}
          </p>

          {/* Inputs */}
          <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">

            {/* Name */}
            <div>
              <label className="text-yellow-500 uppercase text-xs sm:text-sm tracking-wider">
                Full Name
              </label>
              <div className="mt-1.5 sm:mt-2 flex items-center rounded-lg bg-black/70 px-4">
                <FaUser className="text-white text-sm sm:text-base shrink-0" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter Your Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-transparent p-3 sm:p-4 text-sm sm:text-base outline-none text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="text-yellow-500 uppercase text-xs sm:text-sm tracking-wider">
                Phone Number
              </label>
              <div className="mt-1.5 sm:mt-2 flex items-center rounded-lg bg-black/70 px-4">
                <FaPhoneAlt className="text-white text-sm sm:text-base shrink-0" />
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent p-3 sm:p-4 text-sm sm:text-base outline-none text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-yellow-500 uppercase text-xs sm:text-sm tracking-wider">
                Email Address
              </label>
              <div className="mt-1.5 sm:mt-2 flex items-center rounded-lg bg-black/70 px-4">
                <FaEnvelope className="text-white text-sm sm:text-base shrink-0" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent p-3 sm:p-4 text-sm sm:text-base outline-none text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-yellow-500 uppercase text-xs sm:text-sm tracking-wider">
                Password
              </label>
              <div className="mt-1.5 sm:mt-2 flex items-center rounded-lg bg-black/70 px-4">
                <FaLock className="text-white text-sm sm:text-base shrink-0" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-transparent p-3 sm:p-4 text-sm sm:text-base outline-none text-white placeholder:text-gray-400"
                />
              </div>
            </div>

          </div>

          {/* Checkbox */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 mt-6 sm:mt-8">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="h-4 w-4 accent-yellow-500 cursor-pointer"
            />
            <p className="text-white text-xs sm:text-sm">
              Agree With Terms & Conditions
            </p>
          </div>

          {/* Error */}
          {error && (
            <p className="mt-4 text-center text-red-400 text-sm">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 sm:mt-8 w-full rounded-xl bg-yellow-600 py-3.5 sm:py-4 text-lg sm:text-xl font-semibold text-white hover:bg-yellow-700 transition-colors duration-300 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Creating Account..."
              : `Sign Up As ${role === "user" ? "User" : "Agent"}`}
          </button>

          {/* Login */}
          <p className="mt-6 sm:mt-8 text-center text-white text-xs sm:text-sm">
            Already Have An Account?
            <span
              onClick={() => {
                const params = new URLSearchParams();
                if (role) params.set("role", role);
                if (redirectParam) params.set("redirect", redirectParam);
                const qs = params.toString();
                navigate(`/LogIn${qs ? `?${qs}` : ""}`);
              }}
              className="text-yellow-500 cursor-pointer ml-1 font-medium hover:underline"
            >
              Login
            </span>
          </p>

          {/* Divider */}
          <div className="flex items-center gap-4 mt-6 sm:mt-8">
            <div className="h-px flex-1 bg-gray-500"></div>
            <span className="text-white text-xs sm:text-sm uppercase tracking-wider text-gray-300">
              Continue With
            </span>
            <div className="h-px flex-1 bg-gray-500"></div>
          </div>

          {/* Social */}
          <div className="mt-6 sm:mt-8 flex justify-center gap-6 sm:gap-8">
            <button
              type="button"
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-white flex items-center justify-center hover:scale-110 transition duration-300 shadow-md"
            >
              <FaGoogle size={20} className="sm:w-[22px] sm:h-[22px] text-red-500" />
            </button>
            <button
              type="button"
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-white flex items-center justify-center hover:scale-110 transition duration-300 shadow-md"
            >
              <FaApple size={22} className="sm:w-6 sm:h-6 text-black" />
            </button>
          </div>

        </form>
      </div>
    </section>
  );
}

