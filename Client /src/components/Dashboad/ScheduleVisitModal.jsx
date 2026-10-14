import { useState } from "react";
import { LuX, LuCalendarDays, LuArrowLeft } from "react-icons/lu";

// ==========================================
// OPTIONS
// ==========================================

const clientOptions = [
  "Antony (₹85 Lakh)",
  "Kavita Krishnamurthy (₹3.10 Cr)",
  "Rajesh Singhania (₹85 Lakh)",
  "Dr. Vikramaditya Rao (₹72 Lakh)",
];

const propertyOptions = [
  "Obsidian Peak Estate - ₹85 Lakh (Bangalore)",
  "Crystal Bay Manor - ₹85 Lakh (Indiranagar)",
  "Azure Marina Waterfront - ₹3.10 Cr (Goa)",
  "Golden Crest Villa - ₹72 Lakh (Bangalore)",
];

const dateOptions = [
  "Today (Tuesday)",
  "Tomorrow (Wednesday)",
  "Thu, Oct 3",
  "Fri, Oct 4",
  "Sat, Oct 5",
];

const timeOptions = [
  "09:00 AM (Morning Slot)",
  "10:30 AM (Morning Slot)",
  "12:00 PM (Noon Slot)",
  "02:30 PM (Afternoon Slot)",
  "04:00 PM (Afternoon Slot)",
  "06:00 PM (Evening Slot)",
];

// ==========================================
// SELECT FIELD STYLE
// ==========================================

const selectStyle = {
  backgroundColor: "#1A1A1A",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "14px",
  color: "#fff",
  padding: "14px 16px",
  width: "100%",
  appearance: "none",
  fontSize: "14px",
  outline: "none",
  cursor: "pointer",
};

function ScheduleVisitModal({ onClose, onConfirm }) {
  const [formData, setFormData] = useState({
    client: clientOptions[0],
    property: propertyOptions[0],
    date: dateOptions[0],
    time: timeOptions[3],
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirm = () => {
    onConfirm?.(formData);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl flex flex-col"
        style={{
          backgroundColor: "#111111",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >

        {/* ==========================================
            HEADER
        ========================================== */}
        <div
          className="flex items-center justify-between px-6 py-5 sticky top-0 z-10"
          style={{
            backgroundColor: "#111111",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#3D2A0A" }}
            >
              <LuCalendarDays size={22} style={{ color: "#C88A1A" }} />
            </div>
            <div>
              <h2 className="text-white text-xl font-bold">
                Site Visit Appointments & Schedule
              </h2>
              <p className="text-gray-500 text-sm mt-0.5">
                Manage client property tours and VIP walkthroughs
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full transition hover:bg-white/10"
          >
            <LuX size={18} style={{ color: "#9CA3AF" }} />
          </button>
        </div>

        {/* ==========================================
            BODY
        ========================================== */}
        <div className="flex flex-col gap-6 p-6">

          {/* Sub Header */}
          <div className="flex items-center justify-between">
            <h3
              className="text-xl font-bold"
              style={{ color: "#C88A1A" }}
            >
              Book New Site Visit
            </h3>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition"
            >
              <LuArrowLeft size={14} />
              Back to Schedule
            </button>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.06)" }} />

          {/* ==========================================
              FORM GRID
          ========================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Select Client */}
            <div className="flex flex-col gap-2">
              <label
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "#6B7280" }}
              >
                Select Client / Lead
              </label>
              <div className="relative">
                <select
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  style={selectStyle}
                >
                  {clientOptions.map((c) => (
                    <option key={c} value={c} style={{ backgroundColor: "#1A1A1A" }}>
                      {c}
                    </option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">
                  ▾
                </span>
              </div>
            </div>

            {/* Select Property */}
            <div className="flex flex-col gap-2">
              <label
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "#6B7280" }}
              >
                Select Property
              </label>
              <div className="relative">
                <select
                  name="property"
                  value={formData.property}
                  onChange={handleChange}
                  style={selectStyle}
                >
                  {propertyOptions.map((p) => (
                    <option key={p} value={p} style={{ backgroundColor: "#1A1A1A" }}>
                      {p}
                    </option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">
                  ▾
                </span>
              </div>
            </div>

            {/* Visit Date */}
            <div className="flex flex-col gap-2">
              <label
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "#6B7280" }}
              >
                Visit Date
              </label>
              <div className="relative">
                <select
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  style={selectStyle}
                >
                  {dateOptions.map((d) => (
                    <option key={d} value={d} style={{ backgroundColor: "#1A1A1A" }}>
                      {d}
                    </option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">
                  ▾
                </span>
              </div>
            </div>

            {/* Visit Time */}
            <div className="flex flex-col gap-2">
              <label
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "#6B7280" }}
              >
                Visit Time
              </label>
              <div className="relative">
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  style={selectStyle}
                >
                  {timeOptions.map((t) => (
                    <option key={t} value={t} style={{ backgroundColor: "#1A1A1A" }}>
                      {t}
                    </option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">
                  ▾
                </span>
              </div>
            </div>

          </div>

          {/* Special Instructions */}
          <div className="flex flex-col gap-2">
            <label
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "#6B7280" }}
            >
              Visit Special Instructions / Access Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="e.g. VIP client escort from gate, prepare chilled sparkling water and floor plans..."
              rows={4}
              className="w-full text-white text-sm outline-none resize-none p-4 placeholder-gray-600"
              style={{
                backgroundColor: "#1A1A1A",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "14px",
              }}
            />
          </div>

          {/* Divider */}
          <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.06)" }} />

          {/* ==========================================
              FOOTER BUTTONS
          ========================================== */}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="text-white text-sm font-semibold px-6 py-3 rounded-full transition hover:opacity-80"
              style={{
                backgroundColor: "#1E1E1E",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="text-black text-sm font-bold px-6 py-3 rounded-full transition hover:opacity-80"
              style={{ backgroundColor: "#C88A1A" }}
            >
              Confirm Appointment
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ScheduleVisitModal;