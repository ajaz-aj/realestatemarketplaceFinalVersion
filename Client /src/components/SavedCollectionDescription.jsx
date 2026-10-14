import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function SavedCollectionDescription() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full pb-6 sm:pb-8 gap-4 sm:gap-6">
      
      {/* Title & Subtitle */}
      <div className="flex flex-col gap-1 w-full sm:w-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Saved Collections
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm">
          Keep Your Favourite Luxury Properties Organized And Revisit Them Anytime
        </p>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2 rounded-full border border-gray-600 text-white bg-transparent hover:bg-gray-800 transition-colors duration-300 text-xs sm:text-sm font-medium cursor-pointer shrink-0"
      >
        <FaArrowLeft className="text-xs" /> Back
      </button>
      
    </div>
  );
}

export default SavedCollectionDescription;