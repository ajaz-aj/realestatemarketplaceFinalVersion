import React, { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import EditProfileModal from "./EditProfileModal";
import API_URL from "../Services/Api";

function ProfileCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${API_URL}/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.data) {
          setUser(data.data);
          localStorage.setItem("user", JSON.stringify(data.data));
        }
      })
      .catch(() => {});
  }, []);

  const handleProfileUpdated = (updatedUser) => {
    setUser(updatedUser);
  };

  const fullName = user?.fullName || "Mohammed Ajaz";
  const email = user?.email || "ajazm1724@gmail.com";
  const phone = user?.phone || "+91 7994209657";
  const role = user?.role ? (user.role.toUpperCase() + " MEMBER") : "ELITE MEMBER";
  const address = user?.address || "890 Ocean View Boulevard, Miami, FL 33131, United States";

  return (
    <div className="mx-auto w-full max-w-full sm:max-w-sm rounded-2xl border border-[#3a2e20] bg-[#0a0a0a] p-5 sm:p-6 relative flex flex-col text-white font-sans shadow-xl">
      {/* Edit Icon */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute top-5 right-5 sm:top-6 sm:right-6 text-orange-500 hover:text-orange-400 transition p-1"
        aria-label="Edit Profile"
      >
        <FaPen className="text-xs sm:text-sm" />
      </button>

      {/* Profile Image & Badge */}
      <div className="flex flex-col items-center mt-3 sm:mt-4">
        <div className="relative">
          <img
            src={user?.profileImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"}
            alt={fullName}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[#d4af37] shadow-md"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
            }}
          />
          <span className="absolute -bottom-2.5 sm:-bottom-3 left-1/2 transform -translate-x-1/2 bg-black border border-[#d4af37] text-[#d4af37] text-[10px] sm:text-xs px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
            {role}
          </span>
        </div>

        <h2 className="mt-5 sm:mt-6 text-xl sm:text-2xl font-serif tracking-wide text-center">
          {fullName}
        </h2>
        <p className="text-[10px] text-gray-500 tracking-widest uppercase mt-1.5 sm:mt-2">
          Verified Account
        </p>
      </div>

      <div className="mt-6 sm:mt-8">
        <h3 className="text-xs sm:text-sm font-bold uppercase mb-4 sm:mb-6 tracking-wide text-[#d4af37]">
          Contact Information
        </h3>

        <div className="space-y-4 sm:space-y-5 text-sm">
          {/* Email */}
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5 sm:mb-1">
              Email Address
            </p>
            <p className="text-xs sm:text-sm text-gray-300 break-all">{email}</p>
          </div>

          {/* Phone */}
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5 sm:mb-1">
              Contact Number
            </p>
            <p className="text-xs sm:text-sm text-gray-300">{phone}</p>
          </div>

          {/* Address */}
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5 sm:mb-1">
              Home Address
            </p>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {address}
            </p>
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={isModalOpen}
        user={user}
        onClose={() => setIsModalOpen(false)}
        onUpdated={handleProfileUpdated}
      />
    </div>
  );
}

export default ProfileCard;