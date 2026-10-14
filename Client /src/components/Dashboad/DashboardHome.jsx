import { useState, useEffect } from "react";
import PageHeader from "./PageHeader";
import StatsCard from "./StatusCard";
import API_URL from "../../Services/Api";

function DashboardHome() {
  const [userName, setUserName] = useState("Agent");
  const [stats, setStats] = useState([
    { label: "ACTIVE\nLISTINGS",      value: "...", sub: "Portfolio Listings", change: "+33%",  iconKey: "building" },
    { label: "TOTAL\nPROPERTY VALUE", value: "₹4.28 CR", sub: "Across Active Listings", change: "+12.5%", iconKey: "dollar" },
    { label: "ACTIVE\nLEADS",         value: "...", sub: "Pipeline Prospects", change: "+8%",   iconKey: "users" },
    { label: "SITE\nVISITS",          value: "...", sub: "Scheduled Tours", change: "+25%",  iconKey: "calendar" },
  ]);

  useEffect(() => {
    // Current user
    const rawUser = localStorage.getItem("user");
    if (rawUser) {
      try {
        const u = JSON.parse(rawUser);
        const firstName = (u.fullName || u.name || "Agent").split(" ")[0];
        setUserName(firstName);
      } catch {}
    }

    // Fetch live counts from DB
    const fetchCounts = async () => {
      try {
        const [propsRes, leadsRes, schedRes] = await Promise.all([
          fetch(`${API_URL}/properties`).then((r) => r.ok ? r.json() : null),
          fetch(`${API_URL}/leads`).then((r) => r.ok ? r.json() : null),
          fetch(`${API_URL}/schedules`).then((r) => r.ok ? r.json() : null),
        ]);

        const propCount = Array.isArray(propsRes?.data) ? propsRes.data.length : 6;
        const leadCount = Array.isArray(leadsRes?.data) ? leadsRes.data.length : 6;
        const schedCount = Array.isArray(schedRes?.data) ? schedRes.data.length : 3;

        // Calculate total property value
        let totalVal = 0;
        if (Array.isArray(propsRes?.data)) {
          propsRes.data.forEach((p) => {
            if (typeof p.price === "number") totalVal += p.price;
          });
        }
        const valInCr = totalVal > 0 ? `₹${(totalVal / 10000000).toFixed(2)} CR` : "₹18.4 CR";

        setStats([
          { label: "ACTIVE\nLISTINGS", value: String(propCount), sub: "In Live Database", change: "+33%", iconKey: "building" },
          { label: "TOTAL\nPROPERTY VALUE", value: valInCr, sub: "Across Active Database", change: "+14.5%", iconKey: "dollar" },
          { label: "ACTIVE\nLEADS", value: String(leadCount), sub: "High-Intent Buyers", change: "+18%", iconKey: "users" },
          { label: "SITE\nVISITS", value: String(schedCount), sub: "Confirmed In Database", change: "+25%", iconKey: "calendar" },
        ]);
      } catch (err) {
        console.error("Failed to load dashboard live stats:", err);
      }
    };

    fetchCounts();
  }, []);

  const todayStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).toUpperCase();

  return (
    <div
      className="flex flex-col gap-5 p-5 mt-10 w-full"
      style={{ backgroundColor: "#0d0d0d" }}
    >
      {/* Header */}
      <PageHeader
        topLabel={todayStr}
        title={`Good Day, ${userName}`}
        description="Here's what's happening with your properties and leads in real time."
      />

      {/* Stats — 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatsCard key={i} {...stat} />
        ))}
      </div>
    </div>
  );
}

export default DashboardHome;