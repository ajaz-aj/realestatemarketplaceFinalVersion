import { useEffect, useState } from "react";
import { LuBuilding2, LuClock, LuCalendarDays, LuPhoneCall, LuTrash2 } from "react-icons/lu";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";
import StageBadge from "./StageBadge.jsx";
import API_URL from "../../../Services/Api";

const columns = [
  { key: "lead",     label: "LEAD"                },
  { key: "property", label: "INTERESTED PROPERTY"  },
  { key: "budget",   label: "BUDGET"               },
  { key: "source",   label: "SOURCE"               },
  { key: "priority", label: "PRIORITY"             },
  { key: "stage",    label: "STAGE"                },
  { key: "status",   label: "STATUS"               },
  { key: "followup", label: "FOLLOW-UP"            },
  { key: "actions",  label: "ACTIONS"              },
];

function LeadsTable({
  leads: externalLeads,
  loading: externalLoading,
  onDeleteLead,
  onSelectLead,
}) {
  const [internalLeads, setInternalLeads] = useState([]);
  const [internalLoading, setInternalLoading] = useState(true);

  const isControlled = externalLeads !== undefined;
  const leads = isControlled ? externalLeads : internalLeads;
  const loading = isControlled ? (externalLoading ?? false) : internalLoading;

  const fetchLeads = async () => {
    try {
      setInternalLoading(true);
      const res = await fetch(`${API_URL}/leads`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.data)) {
          setInternalLeads(data.data);
          return;
        }
      }
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setInternalLoading(false);
    }
  };

  useEffect(() => {
    if (!isControlled) {
      fetchLeads();
    }
  }, [isControlled]);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (onDeleteLead) {
      onDeleteLead(id, e);
      return;
    }
    if (!window.confirm("Are you sure you want to remove this lead?")) return;
    try {
      const res = await fetch(`${API_URL}/leads/${id}`, { method: "DELETE" });
      if (res.ok) {
        setInternalLeads((prev) => prev.filter((item) => (item._id || item.id) !== id));
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  };

  return (
    <div
      className="w-full rounded-2xl overflow-hidden mt-6"
      style={{ border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          {/* HEADER */}
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left px-5 py-4 text-xs font-semibold tracking-widest whitespace-nowrap"
                  style={{ color: "#6B7280", backgroundColor: "#111111" }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-12 text-center text-gray-500 bg-[#0d0d0d]">
                  Loading leads from database...
                </td>
              </tr>
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-12 text-center text-gray-500 bg-[#0d0d0d]">
                  No leads recorded in database.
                </td>
              </tr>
            ) : (
              leads.map((lead, index) => {
                const propertyName =
                  typeof lead.property === "object" && lead.property !== null
                    ? lead.property.name || "Luxury Property"
                    : lead.property || "Luxury Estate";

                return (
                  <tr
                    key={lead._id || lead.id || index}
                    onClick={() => onSelectLead?.(lead)}
                    className="transition hover:bg-white/[0.04] cursor-pointer"
                    style={{
                      backgroundColor: "#0d0d0d",
                      borderBottom:
                        index < leads.length - 1
                          ? "1px solid rgba(255,255,255,0.04)"
                          : "none",
                    }}
                  >
                    {/* Lead */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={lead.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                          alt={lead.name}
                          className="w-11 h-11 rounded-full object-cover shrink-0"
                          onError={(e) => {
                            e.target.src = "https://placehold.co/44x44/1a1a1a/444?text=U";
                          }}
                        />
                        <div>
                          <p className="text-white font-semibold text-sm leading-tight">
                            {lead.name}
                          </p>
                          <p className="text-gray-500 text-xs mt-0.5">
                            {lead.phone}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Property */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <LuBuilding2 size={13} style={{ color: "#60A5FA" }} className="shrink-0" />
                        <span
                          className="text-sm font-medium truncate max-w-[160px]"
                          style={{ color: "#60A5FA" }}
                        >
                          {propertyName}
                        </span>
                      </div>
                    </td>

                    {/* Budget */}
                    <td className="px-5 py-4">
                      <span className="text-white font-bold text-sm whitespace-nowrap">
                        {lead.budget || "₹1 Cr+"}
                      </span>
                    </td>

                    {/* Source */}
                    <td className="px-5 py-4">
                      <span
                        className="text-xs font-medium px-3 py-1.5 rounded-lg text-gray-300 whitespace-nowrap"
                        style={{
                          backgroundColor: "#1E1E1E",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        {lead.source || "Website"}
                      </span>
                    </td>

                    {/* Priority */}
                    <td className="px-5 py-4">
                      <PriorityBadge priority={lead.priority} />
                    </td>

                    {/* Stage dot */}
                    <td className="px-5 py-4">
                      <StageBadge stage={lead.stage} />
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <StatusBadge status={lead.status} />
                    </td>

                    {/* Follow-up */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-gray-400 text-sm whitespace-nowrap">
                        <LuClock size={13} style={{ color: "#6B7280" }} />
                        {lead.followUp || "Today"}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${lead.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg transition hover:bg-white/10"
                          style={{ color: "#10B981" }}
                          title="Call Lead"
                        >
                          <LuPhoneCall size={14} />
                        </a>
                        <button
                          onClick={(e) => handleDelete(lead._id || lead.id, e)}
                          className="p-2 rounded-lg transition hover:bg-red-500/20 text-gray-500 hover:text-red-400 cursor-pointer"
                          title="Delete Lead"
                        >
                          <LuTrash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeadsTable;