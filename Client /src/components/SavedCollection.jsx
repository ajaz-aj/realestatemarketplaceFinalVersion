import React from "react";
import { useNavigate } from "react-router-dom";
import { useSavedProperties } from "./SavedContext";
import PropertyCardMarketplace from "./PropertyCardMarketplace";

function SavedCollection() {
  const { savedProperties } = useSavedProperties();
  const navigate = useNavigate();

  return (
    <div className="w-full text-white">
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Saved Collection</h1>
        <button 
          onClick={() => { navigate("/savedcollectionitems"); }}
          className="text-xs sm:text-sm font-semibold text-gray-300 hover:text-white transition-colors shrink-0"
        >
          View All
        </button>
      </div>
      
      {savedProperties.length === 0 ? (
        <p className="text-gray-400 text-sm sm:text-base md:text-lg text-center py-8">
          You haven't saved any properties yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {savedProperties.map((property) => (
            <PropertyCardMarketplace key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedCollection;