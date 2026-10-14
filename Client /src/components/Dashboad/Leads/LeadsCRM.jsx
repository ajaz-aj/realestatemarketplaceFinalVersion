function LeadsCRM({ activeTab = "all", onTabChange, counts = {} }) {
  const tabs = [
    { key: "all",         label: "All",         count: counts.all ?? 0 },
    { key: "new",         label: "New",         count: counts.new ?? 0 },
    { key: "contacted",   label: "Contacted",   count: counts.contacted ?? 0 },
    { key: "interested",  label: "Interested",  count: counts.interested ?? 0 },
    { key: "sitevisit",   label: "Site Visit",  count: counts.sitevisit ?? 0 },
    { key: "negotiation", label: "Negotiation", count: counts.negotiation ?? 0 },
    { key: "converted",   label: "Converted",   count: counts.converted ?? 0 },
  ];

  return (
    <div className="w-full flex flex-col gap-6">

      {/* ==========================================
          HEADER
      ========================================== */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-3xl font-bold text-white">
            Leads & Prospects CRM
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage and follow up with your high-value property leads.
          </p>
        </div>
      </div>

      {/* ==========================================
          TABS
      ========================================== */}
      <div className="flex items-center gap-2 flex-wrap">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange?.(tab.key)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition cursor-pointer"
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

      {/* Divider */}
      <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.05)" }} />

      {/* ==========================================
          LEADS CONTENT GOES HERE
          Filter by activeTab
      ========================================== */}

    </div>
  );
}

export default LeadsCRM;