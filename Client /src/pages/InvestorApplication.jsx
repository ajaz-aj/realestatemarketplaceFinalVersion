import React, { useState } from "react";
import { FaCheckCircle, FaSpinner, FaExclamationCircle } from "react-icons/fa";
import API_URL from "../Services/Api";

function InvestorApplication({ onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    citizenship: "",
    accredited: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!formData.phone.trim()) {
      setError("Please enter your contact phone number.");
      return;
    }
    if (!formData.accredited) {
      setError("Please confirm that you are an accredited investor.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        citizenship: formData.citizenship || "Not specified",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        property: {
          name: "Investor Club Membership",
          price: "Institutional Assets",
        },
        budget: "₹5 Cr+",
        source: "Investor Club",
        priority: "High",
        stage: "New",
        status: "New",
        notes: `Investor Club Application. Citizenship: ${formData.citizenship || "Not specified"}. Accredited Status: Confirmed.`,
        followUp: "Today",
        lastContact: "Just Now",
        isOnline: true,
      };

      const response = await fetch(`${API_URL}/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit application. Please try again.");
      }

      setSuccess(true);
      setTimeout(() => {
        if (onClose) onClose();
      }, 2500);
    } catch (err) {
      console.error("Investor application error:", err);
      setError(err.message || "Network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-4 sm:py-6 overflow-y-auto">
      {/* Modal */}
      <div className="relative max-h-[90vh] sm:max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-[20px] sm:rounded-[24px] bg-[#0c0d0f] px-4 sm:px-8 md:px-12 py-6 sm:py-10 shadow-2xl my-auto border border-white/10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 sm:right-8 sm:top-7 text-2xl sm:text-3xl font-bold text-gray-400 transition hover:text-white"
        >
          ×
        </button>

        {/* Header */}
        <div className="mb-6 sm:mb-10 text-center pr-6 sm:pr-0">
          <div className="inline-block px-3 py-1 rounded-full bg-[#d88b18]/15 border border-[#d88b18]/30 text-[#d88b18] text-xs font-semibold uppercase tracking-wider mb-2">
            Elite Access Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white md:text-4xl tracking-tight font-serif">
            Investor Club Application
          </h1>

          <p className="mx-auto mt-2 sm:mt-3 max-w-3xl text-xs sm:text-sm leading-relaxed text-[#9b876d] md:text-base">
            Access To Exclusive Institutional-Grade Real Estate Opportunities.
            Our Vetting Process Ensures A Peer Network Of High-Net-Worth
            Individuals And Family Offices.
          </p>
        </div>

        {/* Success View */}
        {success ? (
          <div className="rounded-[16px] sm:rounded-[20px] border border-[#d88b18]/40 bg-[#171d25] p-8 sm:p-12 text-center flex flex-col items-center">
            <FaCheckCircle className="text-5xl sm:text-6xl text-[#d88b18] mb-4 animate-bounce" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif mb-2">
              Application Submitted Successfully!
            </h2>
            <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-4">
              Welcome to the Luxe Realty Investor Club. Your application has been registered as a priority prospect in our Agent Dashboard. A private portfolio manager will reach out shortly.
            </p>
            <div className="text-xs text-gray-500 font-medium">
              Closing window in a moment...
            </div>
          </div>
        ) : (
          /* Form Container */
          <form
            onSubmit={handleSubmit}
            className="rounded-[16px] sm:rounded-[20px] border border-[#24476b] bg-[#171d25] p-4 sm:p-6 md:p-7"
          >
            {/* Section Heading */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-2xl font-semibold text-white">
                Personal Identification
              </h2>
              <span className="text-xs text-gray-400">All fields required</span>
            </div>

            <div className="my-4 sm:my-7 h-px bg-[#554b3b]" />

            {/* Error Message */}
            {error && (
              <div className="mb-6 flex items-center gap-2.5 p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs sm:text-sm">
                <FaExclamationCircle className="shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Inputs */}
            <div className="grid grid-cols-1 gap-x-10 gap-y-5 sm:gap-y-8 md:grid-cols-2">
              
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium uppercase tracking-wide text-[#b09b80]"
                >
                  Full Name *
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="e.g. Vikram Malhotra"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="h-11 sm:h-12 w-full rounded-lg bg-[#080a0d] px-4 sm:px-5 text-sm sm:text-base text-white outline-none placeholder:text-gray-500 focus:ring-1 focus:ring-[#d88b18] border border-white/5"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium uppercase tracking-wide text-[#b09b80]"
                >
                  Email Address *
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="vikram@malhotraholdings.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-11 sm:h-12 w-full rounded-lg bg-[#080a0d] px-4 sm:px-5 text-sm sm:text-base text-white outline-none placeholder:text-gray-500 focus:ring-1 focus:ring-[#d88b18] border border-white/5"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium uppercase tracking-wide text-[#b09b80]"
                >
                  Phone Number *
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98200 12345"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="h-11 sm:h-12 w-full rounded-lg bg-[#080a0d] px-4 sm:px-5 text-sm sm:text-base text-white outline-none placeholder:text-gray-500 focus:ring-1 focus:ring-[#d88b18] border border-white/5"
                />
              </div>

              {/* Citizenship */}
              <div>
                <label
                  htmlFor="citizenship"
                  className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium uppercase tracking-wide text-[#b09b80]"
                >
                  Citizenship
                </label>

                <select
                  id="citizenship"
                  name="citizenship"
                  value={formData.citizenship}
                  onChange={handleChange}
                  className="h-11 sm:h-12 w-full rounded-lg bg-[#080a0d] px-4 sm:px-5 text-sm sm:text-base text-gray-300 outline-none focus:ring-1 focus:ring-[#d88b18] border border-white/5"
                >
                  <option value="">Select Citizenship</option>
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 sm:my-8 h-px bg-[#554b3b]" />

            {/* Checkbox */}
            <div className="flex items-start gap-3">
              <input
                id="accredited"
                name="accredited"
                type="checkbox"
                checked={formData.accredited}
                onChange={handleChange}
                className="mt-1 h-4 w-4 sm:h-5 sm:w-5 shrink-0 cursor-pointer accent-[#d88b18]"
              />

              <label
                htmlFor="accredited"
                className="cursor-pointer text-xs sm:text-sm leading-relaxed text-white md:text-base select-none"
              >
                I Confirm That I Am An Accredited Investor As Defined Under Applicable Security Laws
              </label>
            </div>

            {/* Continue / Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mx-auto mt-6 sm:mt-8 flex items-center justify-center gap-2 h-11 sm:h-12 w-full max-w-2xl rounded-xl bg-[#d48716] text-base sm:text-lg font-semibold text-white transition hover:bg-[#ed9a20] active:scale-[0.99] disabled:opacity-60 cursor-pointer shadow-lg shadow-[#d48716]/20"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin text-lg" />
                  Submitting Application...
                </>
              ) : (
                "Join The Investor Club"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default InvestorApplication;