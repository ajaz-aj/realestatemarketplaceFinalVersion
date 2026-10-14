import { LuMapPin, LuEye, LuUsers, LuCalendarDays, LuPencil, LuTrash2 } from "react-icons/lu";

// ==========================================
// STATUS BADGE CONFIG
// ==========================================

const statusConfig = {
  Active:  { bg: "#064E3B", color: "#10B981" },
  Pending: { bg: "#7C3A00", color: "#FBBF24" },
  Sold:    { bg: "#1E3A5F", color: "#60A5FA" },
  Rented:  { bg: "#3B0764", color: "#C084FC" },
  Draft:   { bg: "#1F2937", color: "#9CA3AF" },
};

function PropertyCard({ item, onView, onEdit, onDelete }) {
  const status = statusConfig[item.status] || statusConfig.Draft;

  return (
    <div
      onClick={() => onView?.(item)}
      className="flex flex-col rounded-2xl overflow-hidden cursor-pointer transition hover:border-white/20"
      style={{
        backgroundColor: "#111111",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >

      {/* ==========================================
          IMAGE + OVERLAY BADGES
      ========================================== */}
      <div className="relative h-52 shrink-0">

        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://placehold.co/400x200/111111/333?text=No+Image";
          }}
        />

        {/* Top Left — Listing ID */}
        <span
          className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-lg"
          style={{ backgroundColor: "rgba(0,0,0,0.75)", color: "#C88A1A" }}
        >
          {item.listingId}
        </span>

        {/* Top Center — Type */}
        <span
          className="absolute top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1 rounded-lg text-white"
          style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
        >
          {item.type}
        </span>

        {/* Top Right — Status */}
        <span
          className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full"
          style={{ backgroundColor: status.bg, color: status.color }}
        >
          {item.status}
        </span>

        {/* Bottom Left — Price */}
        <span
          className="absolute bottom-3 left-3 text-base font-black px-3 py-1.5 rounded-xl"
          style={{
            backgroundColor: "rgba(0,0,0,0.8)",
            color: "#60A5FA",
          }}
        >
          {item.price}
        </span>

      </div>

      {/* ==========================================
          CARD BODY
      ========================================== */}
      <div className="flex flex-col gap-4 p-4">

        {/* Title + Location */}
        <div>
          <h3 className="text-white font-bold text-lg leading-tight truncate">
            {item.title}
          </h3>
          <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm">
            <LuMapPin size={12} />
            <span className="truncate">{item.location}</span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.05)" }} />

        {/* Specs — Beds / Baths / Area */}
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { label: "Beds",  value: item.beds  },
            { label: "Baths", value: item.baths },
            { label: "Area",  value: item.area  },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-gray-500 text-xs mb-1">{label}</p>
              <p className="text-white font-bold text-sm leading-tight">{value}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.05)" }} />

        {/* Stats — Views / Leads / Visits */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <LuEye size={14} style={{ color: "#60A5FA" }} />
            {item.views} Views
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <LuUsers size={14} style={{ color: "#10B981" }} />
            {item.leads} Leads
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <LuCalendarDays size={14} style={{ color: "#C88A1A" }} />
            {item.visits} Visits
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.05)" }} />

        {/* Action Buttons */}
        <div className="flex items-center gap-2">

          {/* View Details */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView?.(item);
            }}
            className="flex-1 text-white text-sm font-semibold py-2.5 rounded-xl transition hover:opacity-80"
            style={{
              backgroundColor: "#1E1E1E",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            View Details
          </button>

          {/* Edit */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(item);
            }}
            className="w-10 h-10 flex items-center justify-center rounded-xl transition hover:opacity-80"
            style={{
              backgroundColor: "#1E1E1E",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <LuPencil size={15} style={{ color: "#C88A1A" }} />
          </button>

          {/* Delete */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(item);
            }}
            className="w-10 h-10 flex items-center justify-center rounded-xl transition hover:opacity-80"
            style={{
              backgroundColor: "#2E0A0A",
              border: "1px solid rgba(248,113,113,0.15)",
            }}
          >
            <LuTrash2 size={15} style={{ color: "#F87171" }} />
          </button>

        </div>

      </div>
    </div>
  );
}

export default PropertyCard;