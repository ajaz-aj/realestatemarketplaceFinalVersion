import { useState, useEffect } from "react";
import API_URL from "../../../Services/Api";

const defaultTopProperties = [
  { id: 1, title: "Imperial Heights Suite", price: "₹95 Lakh", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80", views: 2890, leads: 42, visits: 18 },
  { id: 2, title: "Azure Marina Waterfront", price: "₹3.10 Cr", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=400&q=80", views: 1650, leads: 19, visits: 7 },
  { id: 3, title: "Skyline Lumina Loft", price: "₹1.80 Lakh/mo", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80", views: 760, leads: 9, visits: 3 },
  { id: 4, title: "The Grand Bel-Air Residence", price: "₹2.20 Cr", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=400&q=80", views: 3410, leads: 29, visits: 14 },
  { id: 5, title: "The Sovereign Penthouse", price: "₹1.45 Cr", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80", views: 2190, leads: 31, visits: 11 },
];

function TopPerformingProperties() {
  const [properties, setProperties] = useState(defaultTopProperties);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`${API_URL}/analytics`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.data?.topProperties) && data.data.topProperties.length > 0) {
            setProperties(data.data.topProperties);
          }
        }
      } catch (err) {
        console.error("Failed to load top properties:", err);
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
          Top Performing Properties
        </h3>
        <p className="text-gray-500 text-sm mt-1">
          High-traction listings generating maximum buyer interest
        </p>
      </div>

      {/* TABLE HEADER */}
      <div
        className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 pb-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        {["PROPERTY", "VIEWS", "LEADS", "VISITS"].map((col) => (
          <p
            key={col}
            className="text-xs font-semibold tracking-widest"
            style={{ color: "#6B7280" }}
          >
            {col}
          </p>
        ))}
      </div>

      {/* PROPERTY ROWS */}
      <div className="flex flex-col gap-0 overflow-y-auto">
        {properties.map((property, index) => (
          <div
            key={property._id || property.id || index}
            className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 items-center py-4 transition hover:bg-white/[0.02] cursor-pointer"
            style={{
              borderBottom:
                index < properties.length - 1
                  ? "1px solid rgba(255,255,255,0.04)"
                  : "none",
            }}
          >
            {/* Property — Image + Title + Price */}
            <div className="flex items-center gap-3">
              <img
                src={property.image}
                alt={property.title}
                className="w-12 h-12 rounded-xl object-cover shrink-0"
                onError={(e) => {
                  e.target.src = "https://placehold.co/48x48/1a1a1a/444?text=P";
                }}
              />
              <div className="min-w-0">
                <p className="text-white font-bold text-sm truncate">
                  {property.title}
                </p>
                <p
                  className="text-sm font-semibold mt-0.5"
                  style={{ color: "#C88A1A" }}
                >
                  {property.price}
                </p>
              </div>
            </div>

            {/* Views */}
            <p className="text-white font-semibold text-sm">
              {Number(property.views).toLocaleString()}
            </p>

            {/* Leads */}
            <p
              className="font-bold text-sm"
              style={{ color: "#C88A1A" }}
            >
              {property.leads}
            </p>

            {/* Visits */}
            <p className="text-white font-semibold text-sm">
              {property.visits}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopPerformingProperties;