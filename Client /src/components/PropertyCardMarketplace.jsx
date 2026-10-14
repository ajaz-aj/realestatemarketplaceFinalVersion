import React from "react";
import {
  FaBed,
  FaBath,
  FaHeart,
  FaRulerCombined,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSavedProperties } from "./SavedContext";
import { SERVER_URL } from "../Services/Api";

function PropertyCardMarketplace({ property }) {
  const navigate = useNavigate();
  const { toggleSaveProperty, isPropertySaved } = useSavedProperties();

  if (!property) return null;

  const propertyId = property._id || property.id;
  const saved = isPropertySaved(propertyId);

  // Safe image resolution
  let rawImage = null;
  if (Array.isArray(property.image) && property.image.length > 0) {
    rawImage = property.image[0];
  } else if (Array.isArray(property.images) && property.images.length > 0) {
    rawImage = property.images[0];
  } else if (typeof property.image === "string") {
    rawImage = property.image;
  } else if (typeof property.images === "string") {
    rawImage = property.images;
  }

  let imageUrl = rawImage;
  if (imageUrl && imageUrl.startsWith("/uploads/")) {
    imageUrl = `${SERVER_URL}${imageUrl}`;
  } else if (!imageUrl) {
    imageUrl = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";
  }

  // Safe location resolution
  let locationText = "Prime Location";
  if (typeof property.location === "object" && property.location !== null) {
    const parts = [property.location.city, property.location.state, property.location.country].filter(Boolean);
    locationText = parts.length > 0 ? parts.join(", ") : (property.location.address || "Prime Location");
  } else if (typeof property.location === "string" && property.location.trim()) {
    locationText = property.location;
  }

  // Safe price formatting
  let priceText = "Price on Request";
  if (typeof property.price === "number") {
    priceText = `₹${property.price.toLocaleString("en-IN")}`;
  } else if (property.price) {
    priceText = String(property.price);
  }

  const beds = property.beds ?? property.bedrooms ?? 3;
  const baths = property.baths ?? property.bathrooms ?? 2;
  const sqft = property.sqft ?? property.area ?? 2800;

  const badge = property.badge || (property.listingType === "rent" ? "For Rent" : property.listingType === "auction" ? "Auction" : "Featured");
  const badgeColor = property.badgeColor || (property.listingType === "rent" ? "bg-amber-600" : property.listingType === "auction" ? "bg-purple-600" : "bg-blue-600");

  const handleViewDetails = () => {
    navigate("/ViewDetails", { state: { property } });
  };

  return (
    <div className="bg-white text-black rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] transition duration-300 flex flex-col justify-between">
      <div>
        <div className="relative">
          <img
            src={imageUrl}
            alt={property.title || "Property"}
            className="w-full h-60 object-cover cursor-pointer"
            onClick={handleViewDetails}
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";
            }}
          />

          <span
            className={`absolute top-4 left-4 ${badgeColor} text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm`}
          >
            {badge}
          </span>

          {/* Heart Icon Button */}
          <button
            type="button"
            onClick={() => toggleSaveProperty(property)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md transition-transform hover:scale-110 active:scale-95"
            aria-label="Save property"
          >
            <FaHeart className={`text-lg ${saved ? "text-red-500" : "text-gray-300"}`} />
          </button>
        </div>

        <div className="p-5">
          <div className="flex justify-between items-start gap-2">
            <h2
              onClick={handleViewDetails}
              className="text-2xl font-bold text-gray-900 line-clamp-1 cursor-pointer hover:text-amber-700 transition"
            >
              {property.title}
            </h2>
            <h3 className="text-blue-600 text-xl sm:text-2xl font-bold shrink-0">
              {priceText}
            </h3>
          </div>

          <div className="flex items-center gap-2 mt-3 text-gray-600 text-sm">
            <FaMapMarkerAlt className="text-orange-500 shrink-0" />
            <span className="truncate">{locationText}</span>
          </div>
        </div>
      </div>

      <div>
        <hr className="border-gray-100" />

        <div className="grid grid-cols-3 text-center py-3 text-xs sm:text-sm text-gray-700 bg-gray-50/50">
          <div className="flex justify-center items-center gap-1.5">
            <FaBed className="text-gray-400" /> {beds} Beds
          </div>
          <div className="flex justify-center items-center gap-1.5 border-x border-gray-200">
            <FaBath className="text-gray-400" /> {baths} Baths
          </div>
          <div className="flex justify-center items-center gap-1.5">
            <FaRulerCombined className="text-gray-400" /> {sqft} Sqft
          </div>
        </div>

        <div className="px-5 pb-5 pt-3">
          <button
            type="button"
            onClick={handleViewDetails}
            className="w-full py-2.5 rounded-xl border border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition shadow-sm"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyCardMarketplace;