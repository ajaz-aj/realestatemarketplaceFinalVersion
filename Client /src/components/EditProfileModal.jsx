import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import API_URL from "../Services/Api";

function EditProfileModal({ isOpen, onClose, user, onUpdated }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      let updatedUser = { ...user, ...formData };

      if (token) {
        const res = await fetch(`${API_URL}/users/profile`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to update profile");
        }
        if (data.data) {
          updatedUser = data.data;
        }
      }

      localStorage.setItem("user", JSON.stringify(updatedUser));
      if (onUpdated) onUpdated(updatedUser);

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 700);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 backdrop-blur-md">
      {/* Modal Container */}
      <div className="w-full max-w-2xl rounded-2xl bg-[#151921] border border-white/10 p-6 sm:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <h2 className="text-xl font-semibold text-white">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-900/50 border border-red-500 text-red-200 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 p-3 rounded-lg bg-emerald-900/50 border border-emerald-500 text-emerald-200 text-sm">
            Profile updated successfully!
          </div>
        )}

        {/* Form Grid */}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Full Name */}
            <div>
              <label className="mb-2 block text-xs tracking-wider text-gray-400 uppercase">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full rounded-lg bg-[#0B0D12] border border-gray-800 px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="mb-2 block text-xs tracking-wider text-gray-400 uppercase">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg bg-[#0B0D12] border border-gray-800 px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="mb-2 block text-xs tracking-wider text-gray-400 uppercase">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg bg-[#0B0D12] border border-gray-800 px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            {/* Home Address */}
            <div>
              <label className="mb-2 block text-xs tracking-wider text-gray-400 uppercase">
                Home Address
              </label>
              <textarea
                rows="3"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full resize-none rounded-lg bg-[#0B0D12] border border-gray-800 px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-[#d4af37]"
              ></textarea>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-gray-700 text-gray-300 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-lg bg-[#d4af37] font-semibold text-black hover:bg-[#b8952b] transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;