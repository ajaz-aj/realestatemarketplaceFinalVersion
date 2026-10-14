const statusConfig = {
  Converted:    { bg: "#064E3B", color: "#10B981", border: "#10B98130" },
  Negotiation:  { bg: "#1E1035", color: "#A78BFA", border: "#A78BFA30" },
  Contacted:    { bg: "#1A1A2E", color: "#CBD5E1", border: "#CBD5E130" },
  Interested:   { bg: "#1A1A2E", color: "#CBD5E1", border: "#CBD5E130" },
  "Site Visit": { bg: "#0C1A2E", color: "#60A5FA", border: "#60A5FA30" },
  New:          { bg: "#1E1E1E", color: "#9CA3AF", border: "#9CA3AF30" },
};

function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.New;

  return (
    <span
      className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap"
      style={{
        backgroundColor: config.bg,
        color: config.color,
        border: `1px solid ${config.border}`,
      }}
    >
      {status}
    </span>
  );
}

export default StatusBadge;