function StatusBadge({ status }) {
  const isConfirmed = status === "Confirmed";

  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
      style={{
        backgroundColor: isConfirmed ? "#0A2E1A" : "#1A2E0A",
        color: isConfirmed ? "#10B981" : "#84CC16",
        border: `1px solid ${isConfirmed ? "#10B981" : "#84CC16"}30`,
      }}
    >
      <span className="text-base leading-none">✓</span>
      {status}
    </span>
  );
}

export default StatusBadge;