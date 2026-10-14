import { useState } from "react";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaBuilding,
  FaCoins,
  FaPaperPlane,
  FaCheckCircle,
  FaShieldAlt,
  FaClock,
  FaAward,
  FaSpinner,
  FaExclamationCircle,
} from "react-icons/fa";
import API_URL from "../Services/Api";

function HomeLeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "Luxury Villa",
    budget: "₹2 Cr - ₹5 Cr",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const propertyTypes = [
    "Luxury Villa",
    "Penthouse Suite",
    "Waterfront Estate",
    "High-Rise Apartment",
    "Commercial Real Estate",
    "Private Island / Estate",
  ];

  const budgetRanges = [
    "Under ₹1 Cr",
    "₹1 Cr - ₹2 Cr",
    "₹2 Cr - ₹5 Cr",
    "₹5 Cr - ₹10 Cr",
    "₹10 Cr+",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Please provide your full name.");
      return;
    }
    if (!formData.phone.trim()) {
      setError("Please provide your contact phone number.");
      return;
    }
    if (!formData.email.trim()) {
      setError("Please provide your email address.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        property: {
          name: `${formData.propertyType} Inquiry`,
          price: formData.budget,
        },
        budget: formData.budget,
        source: "Home Consultation",
        priority: "High",
        stage: "New",
        status: "New",
        notes: `VIP Inquiry via Homepage Consultation Form. Property Preference: ${formData.propertyType}. Budget: ${formData.budget}. Message: ${formData.message.trim() || "No additional message."}`,
        followUp: "Today",
        lastContact: "Just Now",
        isOnline: true,
      };

      const res = await fetch(`${API_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit inquiry. Please try again.");
      }

      setSubmittedName(formData.name.trim());
      setSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        propertyType: "Luxury Villa",
        budget: "₹2 Cr - ₹5 Cr",
        message: "",
      });
    } catch (err) {
      console.error("Home lead form submission error:", err);
      setError(err.message || "Network error. Please verify the server is reachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="consultation-form"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#070707] text-white overflow-hidden"
    >
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ==========================================
              LEFT COLUMN — Context & Prestige Value Props
          ========================================== */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-wider mb-5">
              <span>✦</span> Private Client Advisory
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
              Begin Your Private Acquisition Journey
            </h2>

            {/* Subheading */}
            <p className="mt-5 text-gray-400 text-sm sm:text-base leading-relaxed">
              Connect directly with our dedicated real estate partners. Whether you are acquiring a flagship trophy estate or seeking discreet portfolio guidance, our advisory desk provides confidential, priority service.
            </p>

            {/* Feature Highlights */}
            <div className="mt-8 sm:mt-10 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#151515] border border-white/10 flex items-center justify-center shrink-0 text-[#d4af37]">
                  <FaShieldAlt size={16} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Discreet & Confidential</h4>
                  <p className="text-gray-500 text-xs mt-0.5">Strict privacy protocols for high-net-worth acquisitions and off-market inventory.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#151515] border border-white/10 flex items-center justify-center shrink-0 text-[#d4af37]">
                  <FaClock size={16} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Rapid Agent Response</h4>
                  <p className="text-gray-500 text-xs mt-0.5">Inquiries are instantly routed to registered broker desks for priority follow-up.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#151515] border border-white/10 flex items-center justify-center shrink-0 text-[#d4af37]">
                  <FaAward size={16} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Curated Portfolio Access</h4>
                  <p className="text-gray-500 text-xs mt-0.5">Exclusive viewings of certified luxury villas, penthouses, and prime commercial assets.</p>
                </div>
              </div>
            </div>
          </div>

          {/* ==========================================
              RIGHT COLUMN — Glassmorphic Lead Capture Form
          ========================================== */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-[#111111]/90 border border-white/10 backdrop-blur-xl p-6 sm:p-10 shadow-2xl">
              
              {/* Form Title */}
              <div className="mb-6 pb-5 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    Request A Private Consultation
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">
                    Complete the details below to receive a curated portfolio dossier.
                  </p>
                </div>
                <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  Online
                </span>
              </div>

              {/* SUCCESS VIEW */}
              {success ? (
                <div className="py-10 text-center flex flex-col items-center">
                  <FaCheckCircle className="text-5xl sm:text-6xl text-[#d4af37] mb-4 animate-bounce" />
                  <h4 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                    Inquiry Received, {submittedName}!
                  </h4>
                  <p className="text-gray-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-6">
                    Your request has been logged and immediately routed to our senior advisory desk. An advisor will contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#c49f2b] text-black font-semibold text-sm transition cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                /* FORM INPUTS */
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Error Notification */}
                  {error && (
                    <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs sm:text-sm">
                      <FaExclamationCircle className="shrink-0 text-red-400" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#d4af37] text-xs font-semibold uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <div className="flex items-center rounded-xl bg-black/60 border border-white/10 px-3.5 focus-within:border-[#d4af37] transition">
                        <FaUser className="text-gray-500 text-xs shrink-0" />
                        <input
                          type="text"
                          name="name"
                          placeholder="e.g. Rahul Singhal"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-transparent p-3 text-sm text-white placeholder-gray-600 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#d4af37] text-xs font-semibold uppercase tracking-wider mb-1.5">
                        Phone Number *
                      </label>
                      <div className="flex items-center rounded-xl bg-black/60 border border-white/10 px-3.5 focus-within:border-[#d4af37] transition">
                        <FaPhone className="text-gray-500 text-xs shrink-0" />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full bg-transparent p-3 text-sm text-white placeholder-gray-600 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[#d4af37] text-xs font-semibold uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <div className="flex items-center rounded-xl bg-black/60 border border-white/10 px-3.5 focus-within:border-[#d4af37] transition">
                      <FaEnvelope className="text-gray-500 text-xs shrink-0" />
                      <input
                        type="email"
                        name="email"
                        placeholder="rahul.singhal@luxurydwellings.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent p-3 text-sm text-white placeholder-gray-600 outline-none"
                      />
                    </div>
                  </div>

                  {/* Property Type & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#d4af37] text-xs font-semibold uppercase tracking-wider mb-1.5">
                        Interested Property
                      </label>
                      <div className="flex items-center rounded-xl bg-black/60 border border-white/10 px-3.5 focus-within:border-[#d4af37] transition">
                        <FaBuilding className="text-gray-500 text-xs shrink-0" />
                        <select
                          name="propertyType"
                          value={formData.propertyType}
                          onChange={handleChange}
                          className="w-full bg-transparent p-3 text-sm text-white outline-none cursor-pointer"
                        >
                          {propertyTypes.map((t) => (
                            <option key={t} value={t} className="bg-[#111111] text-white">
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#d4af37] text-xs font-semibold uppercase tracking-wider mb-1.5">
                        Estimated Budget
                      </label>
                      <div className="flex items-center rounded-xl bg-black/60 border border-white/10 px-3.5 focus-within:border-[#d4af37] transition">
                        <FaCoins className="text-gray-500 text-xs shrink-0" />
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full bg-transparent p-3 text-sm text-white outline-none cursor-pointer"
                        >
                          {budgetRanges.map((b) => (
                            <option key={b} value={b} className="bg-[#111111] text-white">
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[#d4af37] text-xs font-semibold uppercase tracking-wider mb-1.5">
                      Specific Requirements / Notes (Optional)
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="e.g. Sea-facing villa with private pool in North Goa, ready for occupancy by Q4."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-black/60 border border-white/10 p-3.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#d4af37] transition resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89324] hover:from-[#e5c148] hover:to-[#cfa72d] text-black font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#d4af37]/20 transition active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin" /> Submitting Request...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane size={14} /> Request VIP Consultation
                      </>
                    )}
                  </button>

                  <p className="text-center text-gray-500 text-xs mt-2">
                    By submitting, you agree to receive confidential property briefs. Your data is protected by bank-grade encryption.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HomeLeadForm;
