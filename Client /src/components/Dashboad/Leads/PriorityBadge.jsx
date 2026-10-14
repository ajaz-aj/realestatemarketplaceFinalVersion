import { TbFlame } from "react-icons/tb";

const priorityConfig = {
  High:   { bg: "#2E0A0A", color: "#F87171", showFlame: true  },
  Medium: { bg: "#2A1F00", color: "#C88A1A", showFlame: false },
  Low:    { bg: "#1E1E1E", color: "#9CA3AF", showFlame: false },
};

function PriorityBadge({ priority }) {
  const config = priorityConfig[priority] || priorityConfig.Low;

  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap"
      style={{
        backgroundColor: config.bg,
        color: config.color,
        border: `1px solid ${config.color}30`,
      }}
    >
      {config.showFlame && <TbFlame size={11} />}
      {priority}
    </span>
  );
}

export default PriorityBadge;