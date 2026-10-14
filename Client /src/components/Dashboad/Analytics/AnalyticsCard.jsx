function AnalyticsCard({ label, value, sub, valueColor, subColor }) {
  return (
    <div
      className="flex-1 min-w-[150px] flex flex-col gap-4 rounded-3xl p-6"
      style={{ backgroundColor: "#161616" }}
    >

      {/* Label */}
      <p
        className="text-xs font-semibold tracking-widest uppercase leading-relaxed"
        style={{ color: "#6B7280" }}
      >
        {label.split("\n").map((line, i, arr) => (
          <span key={i}>
            {line}
            {i < arr.length - 1 && <br />}
          </span>
        ))}
      </p>

      {/* Value */}
      <p
        className="text-5xl font-black leading-none"
        style={{ color: valueColor }}
      >
        {value.split("\n").map((line, i, arr) => (
          <span key={i}>
            {line}
            {i < arr.length - 1 && <br />}
          </span>
        ))}
      </p>

      {/* Sub */}
      <p
        className="text-sm font-semibold leading-snug"
        style={{ color: subColor }}
      >
        {sub}
      </p>

    </div>
  );
}

export default AnalyticsCard;