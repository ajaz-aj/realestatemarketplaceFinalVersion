import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import API_URL from "../../../Services/Api";

const defaultViewsData = [
  { day: "Mon", views: 120, inquiries: 20 },
  { day: "Tue", views: 180, inquiries: 35 },
  { day: "Wed", views: 210, inquiries: 42 },
  { day: "Thu", views: 190, inquiries: 38 },
  { day: "Fri", views: 240, inquiries: 55 },
  { day: "Sat", views: 320, inquiries: 70 },
  { day: "Sun", views: 410, inquiries: 90 },
];

function PropertyViewsChart() {
  const [chartData, setChartData] = useState(defaultViewsData);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await fetch(`${API_URL}/analytics`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.data?.viewsInquiries) && data.data.viewsInquiries.length > 0) {
            setChartData(data.data.viewsInquiries);
          }
        }
      } catch (err) {
        console.error("Failed to load chart data:", err);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div
      className="flex-1 flex flex-col gap-5 rounded-3xl p-6"
      style={{ backgroundColor: "#111111" }}
    >
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-white text-xl font-bold">
            Property Views & Inquiries
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            Weekly luxury portfolio traffic and buyer engagement
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: "#C88A1A" }}
            />
            <span className="text-gray-400 text-sm">Views</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: "#60A5FA" }}
            />
            <span className="text-gray-400 text-sm">Inquiries</span>
          </div>
        </div>
      </div>

      {/* CHART */}
      <div className="flex-1 min-h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C88A1A" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#C88A1A" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="inquiriesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#60A5FA" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#222" />
            <XAxis dataKey="day" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#161616",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#fff",
              }}
            />
            <Area
              type="monotone"
              dataKey="views"
              stroke="#C88A1A"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#viewsGrad)"
            />
            <Area
              type="monotone"
              dataKey="inquiries"
              stroke="#60A5FA"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#inquiriesGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PropertyViewsChart;