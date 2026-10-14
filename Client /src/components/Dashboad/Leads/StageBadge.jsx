const stageConfig = {
  New:          { color: "#60A5FA" },
  Contacted:    { color: "#A78BFA" },
  Interested:   { color: "#34D399" },
  "Site Visit": { color: "#FBBF24" },
  Negotiation:  { color: "#F97316" },
  Converted:    { color: "#10B981" },
};

function StageBadge({ stage }) {
  const config = stageConfig[stage] || { color: "#9CA3AF" };

  return (
    <span
      className="w-3 h-3 rounded-full shrink-0 inline-block"
      style={{ backgroundColor: config.color }}
      title={stage}
    />
  );
}

export default StageBadge;