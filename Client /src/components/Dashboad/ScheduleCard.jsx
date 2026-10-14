import { LuNavigation, LuEye, LuPhone, LuMapPin, LuClock } from "react-icons/lu";
import StatusBadge from "./StatusBadge";

function ScheduleCard({ item }) {
  return (
    <div
      className="rounded-2xl p-5 flex gap-4"
      style={{
        backgroundColor: "#161616",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Time Box */}
      <div
        className="shrink-0 w-24 h-24 rounded-xl flex flex-col items-center justify-center gap-1"
        style={{ backgroundColor: "#1E1E1E" }}
      >
        <LuClock size={18} style={{ color: "#C88A1A" }} />
        <p className="text-white font-bold text-sm leading-tight text-center">
          {item.time}
        </p>
        <p className="text-gray-500 text-xs">{item.day}</p>
      </div>

      {/* Property Image */}
      <div className="relative shrink-0 w-24 h-24 rounded-xl overflow-hidden">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://placehold.co/96x96/1a1a1a/444?text=Img";
          }}
        />
        {item.imageCount > 1 && (
          <div
            className="absolute bottom-1.5 right-1.5 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          >
            {item.imageCount}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">

        <h3 className="text-white font-bold text-lg leading-tight mb-2 truncate">
          {item.title}
        </h3>

        <StatusBadge status={item.status} />

        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-400">
          <span>{item.type}</span>
          <span>•</span>
          <span className="font-bold" style={{ color: "#C88A1A" }}>
            {item.price}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <LuMapPin size={12} />
            {item.location}
          </span>
        </div>

        <div className="mt-3 flex items-start gap-2 text-sm">
          <span style={{ color: "#C88A1A" }} className="font-semibold shrink-0">
            Client:
          </span>
          <span className="text-white">{item.client.name}</span>
          <span className="text-gray-500">{item.client.phone}</span>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 shrink-0 justify-center">

        <button
          className="flex items-center gap-2 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition hover:opacity-80"
          style={{ backgroundColor: "#1E2A3A" }}
        >
          <LuNavigation size={14} style={{ color: "#60A5FA" }} />
          Directions
        </button>

        <button
          className="flex items-center gap-2 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition hover:opacity-80"
          style={{ backgroundColor: "#1E2A3A" }}
        >
          <LuEye size={14} style={{ color: "#60A5FA" }} />
          View Property
        </button>

        <button
          className="flex items-center justify-center w-10 h-10 rounded-xl transition hover:opacity-80 self-end"
          style={{ backgroundColor: "#0A2E1A", border: "1px solid #10B98130" }}
        >
          <LuPhone size={16} style={{ color: "#10B981" }} />
        </button>

      </div>
    </div>
  );
}

export default ScheduleCard;