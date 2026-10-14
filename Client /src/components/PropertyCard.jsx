import {
  FaHeart,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaLocationDot,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSavedProperties } from "./SavedContext";
import { SERVER_URL } from "../Services/Api";

function PropertyCard({ item }) {
  const navigate = useNavigate();
  const { toggleSaveProperty, isPropertySaved } = useSavedProperties();

  if (!item) return null;

  const rawImage = Array.isArray(item.image)
    ? item.image[0]
    : Array.isArray(item.images) && item.images.length > 0
    ? item.images[0]
    : item.image || item.images;

  let displayImage = rawImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80";
  if (typeof displayImage === "string" && displayImage.startsWith("/uploads/")) {
    displayImage = `${SERVER_URL}${displayImage}`;
  }

  const locationText =
    typeof item.location === "object" && item.location !== null
      ? `${item.location.address || item.location.city || ""}, ${item.location.state || item.location.country || ""}`
      : item.location || "Prime Location";

  const formattedPrice =
    typeof item.price === "number"
      ? `₹${item.price.toLocaleString("en-IN")}`
      : item.price || "Price on Request";

  const propId = item._id || item.id;
  const isSaved = isPropertySaved(propId);
  const isAuction = item.auction || item.badge === "Live Auction" || item.listingType === "auction";

  return (
    <div
      onClick={() => navigate("/ViewDetails", { state: { property: item } })}
      className="overflow-hidden rounded-3xl bg-[#121212] border border-gray-800 shadow-lg text-white flex flex-col justify-between cursor-pointer hover:border-[#d4af37]/50 transition duration-300 group"
    >
      <div>
        {/* Property Image Container */}
        <div className="relative h-64 sm:h-72 overflow-hidden">
          <img
            src={displayImage}
            alt={item.title}
            className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
          />

          {/* Status Badge */}
          <span
            className={`absolute left-4 top-4 rounded-full px-4 py-2 text-sm font-semibold ${
              isAuction
                ? "bg-amber-100 text-[#C88719]"
                : item.listingType === "rent" || item.rent
                ? "bg-purple-600 text-white"
                : "bg-blue-600 text-white"
            }`}
          >
            {isAuction && "● "}
            {item.badge || item.status || (item.listingType === "rent" ? "For Rent" : "For Sale")}
          </span>

          {/* Favourite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveProperty(item);
            }}
            className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition ${
              isSaved
                ? "bg-red-600 text-white"
                : "bg-black/40 text-white hover:bg-black/60"
            }`}
          >
            <FaHeart />
          </button>

          {/* Auction Details Overlay */}
          {isAuction && (
            <div className="absolute bottom-0 left-0 right-0 flex justify-between bg-[#15162B]/90 backdrop-blur-sm px-5 py-3 text-white text-sm">
              <span>{item.time || "Ending Soon"}</span>
              <span>{item.bids || 18} Bids</span>
            </div>
          )}
        </div>

        {/* Property Details Header */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-[#d4af37] transition">
                {item.title}
              </h3>

              <div className="mt-2 flex items-center gap-2 text-gray-400 text-sm">
                <FaLocationDot className="text-[#C88719] shrink-0" />
                <span className="line-clamp-1">{locationText}</span>
              </div>
            </div>

            <div className="text-right shrink-0">
              {isAuction && (
                <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">
                  Current Bid
                </p>
              )}

              <p className="text-2xl font-bold text-[#d4af37]">
                {formattedPrice}
                {(item.listingType === "rent" || item.rent) && !String(formattedPrice).includes("/m") && (
                  <span className="text-sm text-gray-400 font-normal">
                    /Mon
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Property Features Footer */}
      <div className="grid grid-cols-3 border-t border-gray-800 bg-[#161616] text-gray-300 text-sm">
        <div className="flex items-center justify-center gap-2 border-r border-gray-800 py-4">
          <FaBed className="text-gray-400" />
          <span>{item.beds || item.bedrooms || 3} Beds</span>
        </div>

        <div className="flex items-center justify-center gap-2 border-r border-gray-800 py-4">
          <FaBath className="text-gray-400" />
          <span>{item.baths || item.bathrooms || 3} Baths</span>
        </div>

        <div className="flex items-center justify-center gap-2 py-4">
          <FaRulerCombined className="text-gray-400" />
          <span>{item.sqft || item.area || 2400} Sqft</span>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;