import { useState, useEffect } from "react";
import { TbSparkles } from "react-icons/tb";
import API_URL from "../../../Services/Api";

const defaultMarketingChannels = [
  { label: "Website Inbound",       leads: 8,  percent: 42, color: "#C88A1A" },
  { label: "Instagram VIP Campaigns", leads: 4, percent: 21, color: "#60A5FA" },
  { label: "Client Referrals",       leads: 3,  percent: 16, color: "#10B981" },
  { label: "Direct Office Walk-in",  leads: 2,  percent: 11, color: "#A78BFA" },
  { label: "MagicBricks / 99acres",  leads: 2,  percent: 10, color: "#F472B6" },
];

const defaultInsightText = {
  message: "Website inbound conversions are ",
  highlight: "42% higher",
  suffix: " this month following the ultra-luxury responsive upgrade.",
};

function MarketingChannels() {
  const [channels, setChannels] = useState(defaultMarketingChannels);
  const [insight, setInsight] = useState(defaultInsightText);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`${API_URL}/analytics`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.data?.marketingChannels) && data.data.marketingChannels.length > 0) {
            setChannels(data.data.marketingChannels);
          }
          if (data.data?.insightText?.message) {
            setInsight(data.data.insightText);
          }
        }
      } catch (err) {
        console.error("Failed to load marketing channels:", err);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div
      className="flex-1 flex flex-col gap-5 rounded-3xl p-6"
      style={{ backgroundColor: "#111111" }}
    >
      {/* HEADER */}
      <div>
        <h3 className="text-white text-xl font-bold">
          Leads by Marketing Channel
        </h3>
        <p className="text-gray-500 text-sm mt-1">
          High-net-worth buyer source attribution
        </p>
      </div>

      {/* CHANNEL BARS */}
      <div className="flex flex-col gap-5">
        {channels.map((channel, i) => (
          <div key={i} className="flex flex-col gap-2">
            {/* Label + Count */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-white font-semibold text-sm">
                {channel.label}
              </span>
              <span className="text-white font-bold text-sm shrink-0">
                {channel.leads} leads ({channel.percent}%)
              </span>
            </div>

            {/* Progress Bar */}
            <div
              className="w-full h-1.5 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            >
              <div
                className="h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: `${channel.percent}%`,
                  backgroundColor: channel.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* INSIGHT BOX */}
      <div
        className="flex items-start gap-4 rounded-2xl p-4 mt-auto"
        style={{ backgroundColor: "#1A1A1A" }}
      >
        <TbSparkles
          size={22}
          className="shrink-0 mt-0.5"
          style={{ color: "#C88A1A" }}
        />
        <p className="text-gray-400 text-sm leading-relaxed">
          {insight.message}
          <span className="text-white font-bold">
            {insight.highlight}
          </span>
          {insight.suffix}
        </p>
      </div>
    </div>
  );
}

export default MarketingChannels;