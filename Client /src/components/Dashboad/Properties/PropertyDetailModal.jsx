import {
  LuX,
  LuMapPin,
  LuPencil,
  LuTrash2,
  LuShare2,
  LuEye,
  LuUsers,
  LuCalendarDays,
  LuBed,
  LuBath,
  LuMaximize,
  LuCar,
} from "react-icons/lu";
import { TbCheck } from "react-icons/tb";

// ==========================================
// STATUS CONFIG
// ==========================================

const statusConfig = {
  Active:  { bg: "#064E3B", color: "#10B981" },
  Pending: { bg: "#7C3A00", color: "#FBBF24" },
  Sold:    { bg: "#1E3A5F", color: "#60A5FA" },
  Rented:  { bg: "#3B0764", color: "#C084FC" },
  Draft:   { bg: "#1F2937", color: "#9CA3AF" },
};

function PropertyDetailModal({ item, onClose, onEdit, onDelete }) {
  if (!item) return null;

  const status = statusConfig[item.status] || statusConfig.Draft;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl flex flex-col"
        style={{
          backgroundColor: "#111111",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >

        {/* ==========================================
            HEADER
        ========================================== */}
        <div
          className="flex items-center justify-between px-6 py-4 sticky top-0 z-10"
          style={{
            backgroundColor: "#111111",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Listing ID + Title + Location */}
          <div className="flex items-center gap-4 min-w-0">
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-lg shrink-0"
              style={{ backgroundColor: "#1E1E1E", color: "#C88A1A" }}
            >
              {item.listingId}
            </span>
            <div className="min-w-0">
              <h2 className="text-white text-xl font-bold truncate">
                {item.title}
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <LuMapPin size={12} style={{ color: "#6B7280" }} />
                <span className="text-gray-500 text-sm truncate">
                  {item.location}
                </span>
                <span className="text-gray-700">•</span>
                <span
                  className="text-xs font-bold px-2.5 py-0.5 rounded-full shrink-0"
                  style={{ backgroundColor: status.bg, color: status.color }}
                >
                  {item.status}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0 ml-4">
            <button
              className="w-9 h-9 flex items-center justify-center rounded-xl transition hover:opacity-80"
              style={{ backgroundColor: "#1E1E1E", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <LuShare2 size={15} style={{ color: "#9CA3AF" }} />
            </button>
            <button
              onClick={() => onEdit?.(item)}
              className="flex items-center gap-2 text-white text-sm font-semibold px-4 py-2 rounded-xl transition hover:opacity-80"
              style={{ backgroundColor: "#1E1E1E", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <LuPencil size={14} style={{ color: "#C88A1A" }} />
              Edit
            </button>
            <button
              onClick={() => onDelete?.(item)}
              className="w-9 h-9 flex items-center justify-center rounded-xl transition hover:opacity-80"
              style={{ backgroundColor: "#2E0A0A", border: "1px solid rgba(248,113,113,0.15)" }}
            >
              <LuTrash2 size={15} style={{ color: "#F87171" }} />
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full transition hover:bg-white/10"
            >
              <LuX size={18} style={{ color: "#9CA3AF" }} />
            </button>
          </div>
        </div>

        {/* ==========================================
            BODY
        ========================================== */}
        <div className="flex flex-col gap-6 p-6">

          {/* ==========================================
              HERO IMAGE + PRICE BADGE
          ========================================== */}
          <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://placehold.co/800x400/111111/333?text=No+Image";
              }}
            />

            {/* Type Badge */}
            <span
              className="absolute top-4 left-4 text-white text-sm font-semibold px-4 py-2 rounded-xl"
              style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
            >
              {item.type} • {item.listingType || "Sale"}
            </span>

            {/* Price Badge */}
            <span
              className="absolute top-4 right-4 text-base font-black px-4 py-2 rounded-xl"
              style={{ backgroundColor: "rgba(0,0,0,0.85)", color: "#60A5FA" }}
            >
              {item.price}
            </span>
          </div>

          {/* ==========================================
              SPECS GRID
          ========================================== */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: LuBed,       label: "Bedrooms",    value: item.beds                    },
              { icon: LuBath,      label: "Bathrooms",   value: item.baths ? `${item.baths} Baths` : "—" },
              { icon: LuMaximize,  label: "Carpet Area", value: item.area                    },
              { icon: LuCar,       label: "Parking",     value: item.parking || "2 Reserved Slots" },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center gap-2 rounded-2xl py-4"
                style={{ backgroundColor: "#161616", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="flex items-center gap-2">
                  <Icon size={16} style={{ color: "#C88A1A" }} />
                  <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
                    {label}
                  </p>
                </div>
                <p className="text-white font-bold text-base">{value}</p>
              </div>
            ))}
          </div>

          {/* ==========================================
              ARCHITECTURAL OVERVIEW
          ========================================== */}
          <div className="flex flex-col gap-3">
            <p
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "#6B7280" }}
            >
              Architectural Overview & Highlights
            </p>
            <div
              className="rounded-2xl p-4"
              style={{ backgroundColor: "#161616", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <p className="text-gray-300 text-sm leading-relaxed">
                {item.description ||
                  "Prestige corner unit with 270-degree skyline views, custom walk-in closet suites, concierge valeting, and private climate-controlled wine cellar."}
              </p>
            </div>
          </div>

          {/* ==========================================
              KEY SPECS + AMENITIES
          ========================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Key Specifications */}
            <div
              className="rounded-2xl p-5 flex flex-col gap-4"
              style={{ backgroundColor: "#161616", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <p
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "#6B7280" }}
              >
                Key Specifications
              </p>
              {[
                { label: "Furnishing Status", value: item.furnishing || "Fully Furnished" },
                { label: "Floor Level",       value: item.floorLevel || "21st of 30"     },
                { label: "Year of Construction", value: item.yearBuilt || "2022"         },
                { label: "Assigned Agent",
                  value: item.agentName || "Johnathan Vance",
                  highlight: true },
              ].map(({ label, value, highlight }) => (
                <div key={label} className="flex items-center justify-between gap-4">
                  <p className="text-gray-500 text-sm">{label}</p>
                  <p
                    className="text-sm font-semibold text-right"
                    style={{ color: highlight ? "#C88A1A" : "#fff" }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Included Amenities */}
            <div
              className="rounded-2xl p-5 flex flex-col gap-4"
              style={{ backgroundColor: "#161616", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <p
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "#6B7280" }}
              >
                Included Amenities
              </p>
              <div className="grid grid-cols-2 gap-3">
                {(item.amenities || [
                  "Swimming pool", "Gym",
                  "Parking",       "Security",
                  "Elevator",      "Clubhouse",
                ]).map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <TbCheck size={14} style={{ color: "#10B981" }} />
                    <span className="text-gray-300 text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ==========================================
              STATS BAR
          ========================================== */}
          <div
            className="flex items-center justify-around rounded-2xl py-4 px-6 gap-4 flex-wrap"
            style={{ backgroundColor: "#161616", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="flex items-center gap-2">
              <LuEye size={16} style={{ color: "#60A5FA" }} />
              <span className="text-gray-400 text-sm">Total Property Views:</span>
              <span className="text-white font-bold text-sm">{item.views?.toLocaleString()}</span>
            </div>
            <div
              className="w-px h-6 hidden sm:block"
              style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            />
            <div className="flex items-center gap-2">
              <LuUsers size={16} style={{ color: "#10B981" }} />
              <span className="text-gray-400 text-sm">Qualified Leads:</span>
              <span className="text-white font-bold text-sm">{item.leads}</span>
            </div>
            <div
              className="w-px h-6 hidden sm:block"
              style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            />
            <div className="flex items-center gap-2">
              <LuCalendarDays size={16} style={{ color: "#C88A1A" }} />
              <span className="text-gray-400 text-sm">Site Tours:</span>
              <span className="text-white font-bold text-sm">{item.visits}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PropertyDetailModal;