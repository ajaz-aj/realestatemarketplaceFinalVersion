import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbFlame } from "react-icons/tb";
import { FaArrowRight } from "react-icons/fa";
import LeadCard from "./LeadCard";
import LeadModal from "./Leads/LeadModal.jsx";
import API_URL from "../../Services/Api";

function PriorityLeads() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    const fetchPriorityLeads = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/leads?priority=high`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.data) && data.data.length > 0) {
            setLeads(data.data);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to fetch priority leads from database:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPriorityLeads();
  }, []);

  return (
    <>
      <div
        className="w-full rounded-2xl mt-10 p-5"
        style={{
          backgroundColor: "#111111",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* HEADER */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#2E0A0A" }}
            >
              <TbFlame size={22} style={{ color: "#F87171" }} />
            </div>
            <div>
              <h2 className="text-white text-2xl font-bold leading-tight">
                Priority Leads
              </h2>
              <p className="text-gray-500 text-sm mt-0.5">
                High-intent luxury buyers needing immediate action
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/dashboard/leads")}
            className="flex items-center gap-2 text-sm font-semibold transition hover:opacity-70 cursor-pointer"
            style={{ color: "#C88A1A" }}
          >
            View All Leads
            <FaArrowRight size={12} />
          </button>
        </div>

        <div
          className="w-full h-px mb-6"
          style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
        />

        {/* CARDS — pass onClick */}
        {loading ? (
          <div className="py-8 text-center text-gray-500">Loading priority leads...</div>
        ) : leads.length === 0 ? (
          <div className="py-8 text-center text-gray-500">No high priority leads at this moment.</div>
        ) : (
          <div className="flex gap-4 flex-wrap">
            {leads.map((item) => (
              <LeadCard
                key={item._id || item.id}
                item={item}
                onClick={() => setSelectedLead(item)}
              />
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {selectedLead && (
        <LeadModal
          item={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </>
  );
}

export default PriorityLeads;