import { useState } from "react";
import { LuLayoutGrid, LuList } from "react-icons/lu";

const tabs = [
  { key: "all",     label: "All",     count: 8  },
  { key: "active",  label: "Active",  count: 6  },
  { key: "pending", label: "Pending", count: 1  },
  { key: "sold",    label: "Sold",    count: 1  },
  { key: "rented",  label: "Rented",  count: 0  },
  { key: "draft",   label: "Draft",   count: 0  },
];

const propertyTypes = [
  "All Types", "Villa", "Apartment", "House", "Land", "Commercial"
];

function PropertiesPortfolio() {
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedType, setSelectedType] = useState("All Types");

  return (
    <div className="w-full flex flex-col gap-6 mt-20">

      {/* ==========================================
          HEADER
      ========================================== */}
      <div>
        <h2 className="text-3xl font-bold text-white">
          Properties Portfolio
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Manage your exclusive listings, track views, and update availability status.
        </p>
      </div>

      {/* ==========================================
          TABS + FILTERS
      ========================================== */}
      <div className="flex items-center justify-between gap-4 flex-wrap">

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition"
                style={{
                  backgroundColor: isActive ? "#C88A1A" : "#1E1E1E",
                  color: isActive ? "#fff" : "#9CA3AF",
                  border: isActive
                    ? "none"
                    : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {tab.label}
                <span
                  className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: isActive
                      ? "rgba(0,0,0,0.25)"
                      : "#2A2A2A",
                    color: isActive ? "#fff" : "#6B7280",
                  }}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right — Type Dropdown + View Toggle */}
        <div className="flex items-center gap-3">

          {/* Type Dropdown */}
          <div className="relative">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="appearance-none text-white text-sm font-semibold pl-4 pr-8 py-2.5 rounded-xl outline-none cursor-pointer transition"
              style={{
                backgroundColor: "#1E1E1E",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {propertyTypes.map((type) => (
                <option key={type} value={type}
                  style={{ backgroundColor: "#1E1E1E" }}>
                  {type}
                </option>
              ))}
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              ▾
            </span>
          </div>

          {/* View Toggle */}
          <div
            className="flex items-center rounded-xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <button
              onClick={() => setViewMode("grid")}
              className="p-2.5 transition"
              style={{
                backgroundColor: viewMode === "grid" ? "#C88A1A" : "#1E1E1E",
              }}
            >
              <LuLayoutGrid
                size={16}
                style={{ color: viewMode === "grid" ? "#fff" : "#6B7280" }}
              />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className="p-2.5 transition"
              style={{
                backgroundColor: viewMode === "list" ? "#C88A1A" : "#1E1E1E",
              }}
            >
              <LuList
                size={16}
                style={{ color: viewMode === "list" ? "#fff" : "#6B7280" }}
              />
            </button>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.05)" }} />

      {/* ==========================================
          CARDS GO HERE
          Use activeTab, selectedType, viewMode
          to filter and display your property cards
      ========================================== */}

    </div>
  );
}

export default PropertiesPortfolio;