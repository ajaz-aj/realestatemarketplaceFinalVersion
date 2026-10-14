import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function DiscoveredCollectionsHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4 md:gap-0 pb-6 md:pb-8">
      
      {/* Title & Subtitle */}
      <div className="flex flex-col gap-1 w-full md:w-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
          Discovered Collections
        </h1>
        <p className="text-[#9ca3af] text-xs sm:text-sm">
          Explore Curated Luxury Properties Selected Just For You.
        </p>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2 rounded-full border border-gray-600 text-white bg-transparent hover:bg-gray-800 transition-colors duration-300 text-xs sm:text-sm font-medium cursor-pointer"
      >
        <FaArrowLeft className="text-xs" /> Back
      </button>
      
    </div>
  );
}

export default DiscoveredCollectionsHeader;