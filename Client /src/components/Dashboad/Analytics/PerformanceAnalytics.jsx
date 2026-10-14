import { useState, useEffect } from "react";
import AnalyticsCard from "./AnalyticsCard";
import API_URL from "../../../Services/Api";

const periods = [
  { key: "today",   label: "Today"    },
  { key: "7days",   label: "7 Days"   },
  { key: "30days",  label: "30 Days"  },
  { key: "3months", label: "3 Months" },
];

function PerformanceAnalytics() {
  const [activePeriod, setActivePeriod] = useState("today");
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/analytics`);
        if (res.ok) {
          const data = await res.json();
          if (data.data?.metrics) {
            setMetrics(data.data.metrics);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const stats = metrics[activePeriod] || [];

  return (
    <div className="w-full flex flex-col gap-8 mt-20 m-5">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Performance & Analytics
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-md leading-relaxed">
            Track your property views, lead pipeline conversion, and sales trajectory.
          </p>
        </div>

        {/* PERIOD TOGGLE */}
        <div
          className="flex items-center rounded-2xl p-1 gap-1"
          style={{
            backgroundColor: "#161616",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {periods.map((period) => {
            const isActive = activePeriod === period.key;
            return (
              <button
                key={period.key}
                onClick={() => setActivePeriod(period.key)}
                className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer"
                style={{
                  backgroundColor: isActive ? "#C88A1A" : "transparent",
                  color: isActive ? "#000000" : "#6B7280",
                }}
              >
                {period.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* STATS CARDS */}
      {loading ? (
        <div className="py-8 text-center text-gray-500">Loading performance metrics from database...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, index) => (
            <AnalyticsCard
              key={index}
              label={stat.label}
              value={stat.value}
              sub={stat.sub}
              valueColor={stat.valueColor}
              subColor={stat.subColor}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PerformanceAnalytics;