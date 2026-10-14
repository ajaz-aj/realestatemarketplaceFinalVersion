import React from "react";
import { useLocation } from "react-router-dom";
import { useSavedProperties } from "./SavedContext";
import PropertyCardMarketplace from "./PropertyCardMarketplace"; 

function GridSystemForItem({ properties = [] }) {
  const { savedProperties } = useSavedProperties();
  const location = useLocation();

  const isSavedCollectionPage = location.pathname === "/savedcollectionitems";
  const dataToDisplay = isSavedCollectionPage ? savedProperties : properties;

  return (
    <div className="w-full text-white">
      {dataToDisplay.length === 0 && isSavedCollectionPage ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <p className="text-gray-400 text-sm sm:text-base md:text-lg">
            You haven't saved any properties yet. Browse the marketplace and tap the bookmark icon on any property to save it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full">
          {dataToDisplay.map((property, idx) => (
            <PropertyCardMarketplace
              key={property._id || property.id || idx}
              property={property}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default GridSystemForItem;