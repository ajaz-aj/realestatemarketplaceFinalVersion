import { LuBuilding2, LuBadgeDollarSign, LuUsers, LuCalendarCheck } from "react-icons/lu";
import { TbTrendingUp } from "react-icons/tb";

const iconMap = {
  building:  { icon: LuBuilding2,        bg: "#3D2A0A", color: "#C88A1A" },
  dollar:    { icon: LuBadgeDollarSign,  bg: "#0A1F3D", color: "#3B82F6" },
  users:     { icon: LuUsers,            bg: "#0A2E1A", color: "#10B981" },
  calendar:  { icon: LuCalendarCheck,    bg: "#1E0A3D", color: "#8B5CF6" },
};

function StatsCard({ label, value, sub, change, iconKey }) {
  const { icon: Icon, bg, color } = iconMap[iconKey] || iconMap.building;

  return (
    <div
      className="flex-1 min-w-[200px] rounded-2xl p-5 flex flex-col gap-4"
      style={{ backgroundColor: "#161616", border: "1px solid rgba(255,255,255,0.06)" }}
    >

      {/* Label + Icon */}
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 leading-relaxed">
          {label}
        </p>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: bg }}
        >
          <Icon style={{ color }} size={18} />
        </div>
      </div>

      {/* Value */}
      <p className="text-4xl sm:text-5xl font-black text-white leading-none">
        {value}
      </p>

      {/* Sub + Change Pill */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-gray-500 text-sm truncate">{sub}</span>
        {change && (
          <span
            className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full shrink-0"
            style={{ backgroundColor: "#0A2E1A", color: "#10B981" }}
          >
            <TbTrendingUp size={12} />
            {change}
          </span>
        )}
      </div>

    </div>
  );
}

export default StatsCard;