import React, { useState, useEffect, useMemo } from "react";
import LeadsCRM from "./Leads/LeadsCRM";
import LeadsSearchBar from "./Leads/LeadsSearchBar";
import LeadsTable from "./Leads/LeadsTable";
import LeadModal from "./Leads/LeadModal.jsx";
import API_URL from "../../Services/Api";

function LeadsPage() {
  const [allLeads, setAllLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("All Priorities");
  const [selectedLead, setSelectedLead] = useState(null);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/leads`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.data)) {
          setAllLeads(data.data);
          return;
        }
      }
    } catch (err) {
      console.error("Failed to fetch leads in LeadsPage:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Compute live tab counts
  const counts = useMemo(() => {
    const res = {
      all: allLeads.length,
      new: 0,
      contacted: 0,
      interested: 0,
      sitevisit: 0,
      negotiation: 0,
      converted: 0,
    };

    allLeads.forEach((lead) => {
      const stage = (lead.stage || "").toLowerCase();
      const status = (lead.status || "").toLowerCase();

      if (stage === "new" || status === "new") res.new += 1;
      else if (stage === "contacted" || status === "contacted") res.contacted += 1;
      else if (stage === "interested" || status === "interested") res.interested += 1;
      else if (stage.includes("site") || stage === "sitevisit") res.sitevisit += 1;
      else if (stage.includes("negotiat")) res.negotiation += 1;
      else if (stage === "converted" || status === "converted") res.converted += 1;
    });

    return res;
  }, [allLeads]);

  // Filter leads based on active tab, search query, and priority dropdown
  const filteredLeads = useMemo(() => {
    return allLeads.filter((lead) => {
      // 1. Tab filter
      if (activeTab !== "all") {
        const stage = (lead.stage || "").toLowerCase();
        const status = (lead.status || "").toLowerCase();

        if (activeTab === "new" && stage !== "new" && status !== "new") return false;
        if (activeTab === "contacted" && stage !== "contacted" && status !== "contacted") return false;
        if (activeTab === "interested" && stage !== "interested" && status !== "interested") return false;
        if (activeTab === "sitevisit" && !stage.includes("site") && stage !== "sitevisit") return false;
        if (activeTab === "negotiation" && !stage.includes("negotiat")) return false;
        if (activeTab === "converted" && stage !== "converted" && status !== "converted") return false;
      }

      // 2. Priority filter
      if (selectedPriority !== "All Priorities") {
        const p = lead.priority || "Medium";
        if (selectedPriority === "High Priority" && p !== "High" && p !== "High Priority") return false;
        if (selectedPriority === "Medium Priority" && p !== "Medium") return false;
        if (selectedPriority === "Low Priority" && p !== "Low") return false;
      }

      // 3. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const name = (lead.name || "").toLowerCase();
        const email = (lead.email || "").toLowerCase();
        const phone = (lead.phone || "").toLowerCase();
        const source = (lead.source || "").toLowerCase();
        const propName = (typeof lead.property === "object" ? lead.property?.name : lead.property || "").toLowerCase();

        const matches =
          name.includes(q) ||
          email.includes(q) ||
          phone.includes(q) ||
          source.includes(q) ||
          propName.includes(q);

        if (!matches) return false;
      }

      return true;
    });
  }, [allLeads, activeTab, selectedPriority, searchQuery]);

  const handleDeleteLead = async (id, e) => {
    e?.stopPropagation();
    if (!window.confirm("Are you sure you want to remove this lead?")) return;
    try {
      const res = await fetch(`${API_URL}/leads/${id}`, { method: "DELETE" });
      if (res.ok) {
        setAllLeads((prev) => prev.filter((item) => (item._id || item.id) !== id));
        if (selectedLead && (selectedLead._id || selectedLead.id) === id) {
          setSelectedLead(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  };

  return (
    <div className="mt-16 sm:mt-20 flex flex-col gap-6">
      {/* CRM Header & Tabs */}
      <LeadsCRM
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={counts}
      />

      {/* Search & Priority Filter */}
      <LeadsSearchBar
        onSearch={setSearchQuery}
        onPriorityChange={setSelectedPriority}
      />

      {/* Leads Table */}
      <LeadsTable
        leads={filteredLeads}
        loading={loading}
        onDeleteLead={handleDeleteLead}
        onSelectLead={(lead) => setSelectedLead(lead)}
      />

      {/* Lead Detail Modal */}
      {selectedLead && (
        <LeadModal
          item={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </div>
  );
}

export default LeadsPage;