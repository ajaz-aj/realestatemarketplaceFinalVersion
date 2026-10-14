import { useState, useEffect } from "react";
import API_URL from "../../../Services/Api";

const defaultFunnelStages = [
  { label: "Impressions & Views",    value: 8420, percent: 100,  percentLabel: "100%",  color: "#374151" },
  { label: "Inquiries Received",     value: 184,  percent: 21.8, percentLabel: "21.8%", color: "#374151" },
  { label: "Qualified Active Leads", value: 19,   percent: 10.3, percentLabel: "10.3%", color: "#C88A1A" },
  { label: "Site Visits Conducted",  value: 12,   percent: 63.1, percentLabel: "63.1%", color: "#3B82F6" },
  { label: "Price Negotiation",      value: 5,    percent: 41.6, percentLabel: "41.6%", color: "#8B5CF6" },
  { label: "Deals Closed & Converted", value: 2,  percent: 40.0, percentLabel: "40.0%", color: "#10B981" },
];

function LeadConversionFunnel() {
  const [stages, setStages] = useState(defaultFunnelStages);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`${API_URL}/analytics`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.data?.funnelStages) && data.data.funnelStages.length > 0) {
            setStages(data.data.funnelStages);
          }
        }
      } catch (err) {
        console.error("Failed to load funnel stages:", err);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div
      className="flex-1 flex flex-col gap-6 rounded-3xl p-6"
      style={{ backgroundColor: "#111111" }}
    >
      {/* HEADER */}
      <div>
        <h3 className="text-white text-xl font-bold">
          Lead Conversion Funnel
        </h3>
        <p className="text-gray-500 text-sm mt-1">
          End-to-end deal flow from impressions to closings
        </p>
      </div>

      {/* FUNNEL STAGES */}
      <div className="flex flex-col gap-5">
        {stages.map((stage, i) => (
          <div key={i} className="flex flex-col gap-2">
            {/* Label + Value */}
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">
                {stage.label}
              </span>
              <span className="text-white font-bold text-sm">
                {stage.value.toLocaleString()}
              </span>
            </div>

            {/* Progress Bar */}
            <div
              className="relative w-full h-7 rounded-full overflow-hidden"
              style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            >
              <div
                className="h-full rounded-full flex items-center justify-end pr-3 transition-all duration-700"
                style={{
                  width: `${Math.min(stage.percent, 100)}%`,
                  backgroundColor: stage.color,
                  minWidth: "60px",
                }}
              >
                <span className="text-white text-xs font-bold">
                  {stage.percentLabel}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeadConversionFunnel;