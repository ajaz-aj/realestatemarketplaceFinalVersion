import { LuX, LuPhoneCall, LuCalendarDays, LuFileText, LuBuilding2, LuMessageSquare } from "react-icons/lu";
import { TbBrandWhatsapp, TbFlame } from "react-icons/tb";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const stageOptions = [
  "New", "Contacted", "Interested", "Site Visit", "In Negotiation", "Converted"
];

const priorityOptions = [
  { label: "🔥 High Priority",   value: "High"   },
  { label: "⚡ Medium Priority", value: "Medium" },
  { label: "📌 Low Priority",    value: "Low"    },
];

const timelineIcons = {
  calendar: LuCalendarDays,
  phone:    LuPhoneCall,
  file:     LuFileText,
};

function LeadModal({ item, onClose }) {
  const navigate = useNavigate();
  const [stage, setStage]       = useState("In Negotiation");
  const [priority, setPriority] = useState("High");
  const [note, setNote]         = useState("");

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl flex flex-col"
        style={{ backgroundColor: "#111111", border: "1px solid rgba(255,255,255,0.08)" }}
      >

        {/* ==========================================
            MODAL HEADER
        ========================================== */}
        <div
          className="flex items-center justify-between px-6 py-5 sticky top-0 z-10"
          style={{ backgroundColor: "#111111", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-4">
            <img
              src={item.avatar}
              alt={item.name}
              className="w-14 h-14 rounded-full object-cover"
              onError={(e) => { e.target.src = "https://placehold.co/56x56/1a1a1a/444?text=U"; }}
            />
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-white text-xl font-bold">{item.name}</h2>
                <span
                  className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full"
                  style={{ backgroundColor: "#2E0A0A", color: "#F87171" }}
                >
                  <TbFlame size={11} />
                  High Priority
                </span>
              </div>
              <p className="text-gray-500 text-sm mt-0.5">
                CRM Lead ID: #LX-LD-7 • Sourced via {item.source || "MagicBricks"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                navigate("/dashboard/chat");
              }}
              className="flex items-center gap-2 text-black text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full transition hover:opacity-90 bg-[#d4af37] cursor-pointer shadow-md"
            >
              <LuMessageSquare size={14} />
              Open Live Chat
            </button>
            <a
              href={`tel:${item.phone}`}
              className="flex items-center gap-2 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full transition hover:opacity-80"
              style={{ backgroundColor: "#10B981" }}
            >
              <LuPhoneCall size={14} />
              Contact Lead
            </a>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full transition hover:bg-white/10 cursor-pointer"
            >
              <LuX size={18} style={{ color: "#9CA3AF" }} />
            </button>
          </div>
        </div>

        {/* ==========================================
            MODAL BODY — 3 COLUMNS
        ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_220px] gap-0 flex-1">

          {/* ==========================================
              LEFT COLUMN — Client Info + Pipeline
          ========================================== */}
          <div
            className="flex flex-col gap-5 p-5"
            style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}
          >

            {/* Contact Info */}
            <div
              className="flex flex-col gap-4 rounded-2xl p-4"
              style={{ backgroundColor: "#161616" }}
            >
              <div>
                <p className="text-gray-500 text-xs mb-1">Phone</p>
                <p className="text-white text-sm font-semibold">{item.phone}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Email</p>
                <p className="text-white text-sm font-semibold">{item.email || "kavita.k@zenithadvisors.in"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Budget</p>
                <p className="text-sm font-bold" style={{ color: "#60A5FA" }}>{item.property?.price || "₹3.10 Cr"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Property Type</p>
                <p className="text-white text-sm font-semibold">{item.propertyType || "4 BHK Villa"}</p>
              </div>
            </div>

            {/* Pipeline Controls */}
            <div
              className="flex flex-col gap-4 rounded-2xl p-4"
              style={{ backgroundColor: "#161616" }}
            >
              <p className="text-gray-500 text-xs font-semibold tracking-widest uppercase">
                Pipeline Controls
              </p>

              <div>
                <p className="text-gray-500 text-xs mb-2">Lead Stage Status</p>
                <div className="relative">
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className="w-full appearance-none text-white text-sm font-semibold pl-3 pr-8 py-2.5 rounded-xl outline-none cursor-pointer"
                    style={{ backgroundColor: "#1E1E1E", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {stageOptions.map((s) => (
                      <option key={s} value={s} style={{ backgroundColor: "#1E1E1E" }}>{s}</option>
                    ))}
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▾</span>
                </div>
              </div>

              <div>
                <p className="text-gray-500 text-xs mb-2">Priority Rating</p>
                <div className="relative">
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full appearance-none text-white text-sm font-semibold pl-3 pr-8 py-2.5 rounded-xl outline-none cursor-pointer"
                    style={{ backgroundColor: "#1E1E1E", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {priorityOptions.map((p) => (
                      <option key={p.value} value={p.value} style={{ backgroundColor: "#1E1E1E" }}>{p.label}</option>
                    ))}
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▾</span>
                </div>
              </div>
            </div>

            {/* Client Notes */}
            <div
              className="flex flex-col gap-2 rounded-2xl p-4"
              style={{ backgroundColor: "#161616" }}
            >
              <p className="text-gray-500 text-xs font-semibold tracking-widest uppercase">
                Client Notes
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.notes || "Holiday home seeker looking for Goa waterfront. Token advance discussion ongoing."}
              </p>
            </div>

          </div>

          {/* ==========================================
              MIDDLE COLUMN — Log Activity + Timeline
          ========================================== */}
          <div className="flex flex-col gap-5 p-5">

            {/* Log Activity */}
            <div
              className="flex flex-col gap-3 rounded-2xl p-4"
              style={{ backgroundColor: "#161616" }}
            >
              <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase">
                Log Activity
              </p>

              {/* Stage Pills */}
              <div className="flex gap-2 flex-wrap">
                {["Site Visit", "Call", "Offer Made", "Follow-up"].map((s) => (
                  <button
                    key={s}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full transition hover:opacity-80"
                    style={{ backgroundColor: "#C88A1A", color: "#000" }}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Note Input */}
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Log discussion notes, offer counter, buyer requests..."
                rows={4}
                className="w-full bg-transparent text-white text-sm outline-none resize-none rounded-xl p-3 placeholder-gray-600"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              />

              <button
                className="self-end flex items-center gap-2 text-black text-sm font-bold px-5 py-2.5 rounded-xl transition hover:opacity-80"
                style={{ backgroundColor: "#C88A1A" }}
              >
                + Log Activity
              </button>
            </div>

            {/* Activity Timeline */}
            <div
              className="flex flex-col gap-4 rounded-2xl p-4"
              style={{ backgroundColor: "#161616" }}
            >
              <div className="flex items-center justify-between">
                <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase">
                  Activity Timeline
                </p>
                <span className="text-xs font-bold" style={{ color: "#C88A1A" }}>
                  3 EVENTS LOGGED
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { icon: "calendar", title: "Site Visit Confirmed",           time: "Yesterday, 02:30 PM", desc: "Scheduled private inspection for Azure Marina Waterfront."              },
                  { icon: "phone",    title: "Client Qualification Call",       time: "Yesterday, 04:30 PM", desc: "Discussed budget expectation (₹3.10 Cr) and timeline for registration." },
                  { icon: "file",     title: "Lead Sourced from MagicBricks",   time: "3 days ago",          desc: "High-intent buyer registered through verified portal."                  },
                ].map((event, i) => {
                  const Icon = timelineIcons[event.icon];
                  return (
                    <div key={i} className="flex gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                        style={{ backgroundColor: "#1E1E1E" }}
                      >
                        <Icon size={15} style={{ color: "#C88A1A" }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <p className="text-white font-bold text-sm">{event.title}</p>
                          <p className="text-gray-600 text-xs">{event.time}</p>
                        </div>
                        <p className="text-gray-500 text-sm mt-1 leading-relaxed">{event.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ==========================================
              RIGHT COLUMN — Actions + Matched Properties
          ========================================== */}
          <div
            className="flex flex-col gap-5 p-5"
            style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}
          >

            {/* Quick Actions */}
            <div className="flex flex-col gap-3">
              {[
                { label: "Call Client",          icon: LuPhoneCall,     color: "#9CA3AF" },
                { label: "WhatsApp Message",     icon: TbBrandWhatsapp, color: "#9CA3AF" },
                { label: "Schedule Site Visit",  icon: LuCalendarDays,  color: "#C88A1A" },
              ].map(({ label, icon: Icon, color }) => (
                <button
                  key={label}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl text-white text-sm font-semibold transition hover:opacity-80"
                  style={{ backgroundColor: "#161616", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} style={{ color }} />
                    {label}
                  </div>
                  <span style={{ color: "#6B7280" }}>→</span>
                </button>
              ))}
            </div>

            {/* Interested & Matched Properties */}
            <div className="flex flex-col gap-3">
              <p className="text-gray-500 text-xs font-semibold tracking-widest uppercase">
                Interested & Matched
              </p>

              {[
                { title: "Imperial Height...", price: "₹95 Lakh",  image: "https://your-image.jpg" },
                { title: "Azure Marina W...",  price: "₹3.10 Cr",  image: "https://your-image.jpg" },
              ].map((prop, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition hover:opacity-80"
                  style={{ backgroundColor: "#161616" }}
                >
                  <img
                    src={prop.image}
                    alt={prop.title}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                    onError={(e) => { e.target.src = "https://placehold.co/48x48/1a1a1a/444?text=P"; }}
                  />
                  <div>
                    <p className="text-white text-sm font-bold">{prop.title}</p>
                    <p className="text-sm font-bold mt-0.5" style={{ color: "#C88A1A" }}>{prop.price}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default LeadModal;