import { useState, useEffect } from "react";
import {
  LuX,
  LuCalendarDays,
  LuNavigation,
  LuTrash2,
  LuArrowLeft,
} from "react-icons/lu";
import API_URL from "../../Services/Api.js";

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
// SELECT STYLE
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

// ==========================================
// SHARED MODAL HEADER
// ==========================================

function ModalHeader({ onClose }) {
  return (
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
  );
}

// ==========================================
// APPOINTMENTS LIST VIEW
// ==========================================

function AppointmentsList({ appointments, onDelete, onSchedule }) {
  return (
    <div className="flex flex-col gap-4 p-6">

      {/* Section Label + Schedule Button */}
      <div className="flex items-center justify-between">
        <p
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: "#6B7280" }}
        >
          Current Scheduled Appointments ({appointments.length})
        </p>
        <button
          onClick={onSchedule}
          className="flex items-center gap-2 text-black text-sm font-bold px-5 py-2.5 rounded-full transition hover:opacity-80"
          style={{ backgroundColor: "#C88A1A" }}
        >
          + Schedule Visit
        </button>
      </div>

      {/* Empty State */}
      {appointments.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-10">
          No appointments scheduled.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {appointments.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-2xl p-4"
              style={{
                backgroundColor: "#161616",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >

              {/* Time Box */}
              <div
                className="shrink-0 w-20 h-20 rounded-xl flex flex-col items-center justify-center gap-0.5"
                style={{ backgroundColor: "#1E1E1E" }}
              >
                <p className="text-white font-black text-lg leading-tight text-center">
                  {item.time}
                </p>
                <p className="text-xs font-semibold" style={{ color: "#C88A1A" }}>
                  {item.day}
                </p>
              </div>

              {/* Property Image */}
              <div className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden">
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/80x80/1a1a1a/444?text=P";
                  }}
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">

                {/* Title + Status */}
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-white font-bold text-base truncate">
                    {item.title}
                  </h3>
                  <span
                    className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full shrink-0"
                    style={{
                      backgroundColor: "#064E3B",
                      color: "#10B981",
                      border: "1px solid #10B98130",
                    }}
                  >
                    {item.status || "Confirmed"}
                  </span>
                </div>

                {/* Client */}
                <p className="text-gray-400 text-sm mt-1">
                  Client:{" "}
                  <span className="text-white font-semibold">{item.client?.name}</span>{" "}
                  <span className="text-gray-500">{item.client?.phone}</span>
                </p>

                {/* Price + Location */}
                <div
                  className="flex items-center gap-2 mt-1 text-sm font-semibold"
                  style={{ color: "#60A5FA" }}
                >
                  <span>{item.price}</span>
                  <span style={{ color: "#374151" }}>•</span>
                  <span>{item.location}</span>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">

                <button
                  className="w-10 h-10 flex items-center justify-center rounded-xl transition hover:opacity-80"
                  style={{
                    backgroundColor: "#2A1F00",
                    border: "1px solid rgba(200,138,26,0.2)",
                  }}
                >
                  <LuNavigation size={15} style={{ color: "#C88A1A" }} />
                </button>

                <button
                  onClick={() => onDelete(item.id)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl transition hover:opacity-80"
                  style={{
                    backgroundColor: "#2E0A0A",
                    border: "1px solid rgba(248,113,113,0.2)",
                  }}
                >
                  <LuTrash2 size={15} style={{ color: "#F87171" }} />
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// BOOKING FORM VIEW
// ==========================================

function BookingForm({ onBack, onConfirm }) {
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

  return (
    <div className="flex flex-col gap-6 p-6">

      {/* Sub Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold" style={{ color: "#C88A1A" }}>
          Book New Site Visit
        </h3>
        <button
          onClick={onBack}
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
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▾</span>
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
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▾</span>
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
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▾</span>
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
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▾</span>
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

      {/* Footer Buttons */}
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={onBack}
          className="text-white text-sm font-semibold px-6 py-3 rounded-full transition hover:opacity-80"
          style={{
            backgroundColor: "#1E1E1E",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => onConfirm(formData)}
          className="text-black text-sm font-bold px-6 py-3 rounded-full transition hover:opacity-80"
          style={{ backgroundColor: "#C88A1A" }}
        >
          Confirm Appointment
        </button>
      </div>

    </div>
  );
}

// ==========================================
// MAIN MODAL
// ==========================================

function SiteVisitModal({ onClose }) {
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchAppointments = async () => {
    try {
      const res = await fetch(`${API_URL}/schedules`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.data)) {
          setAppointments(data.data);
        }
      }
    } catch (err) {
      console.error("Failed to load appointments:", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/schedules/${id}`, { method: "DELETE" });
      setAppointments((prev) => prev.filter((item) => (item._id || item.id) !== id));
    } catch (err) {
      console.error("Failed to delete appointment:", err);
    }
  };

  const handleConfirm = async (formData) => {
    const newAppointment = {
      time: formData.time.split(" ")[0] + " " + formData.time.split(" ")[1],
      day: formData.date.split(" ")[0],
      title: formData.property.split(" - ")[0],
      status: "Confirmed",
      price: formData.property.split(" - ")[1]?.split(" (")[0] || "",
      location: formData.property.match(/\(([^)]+)\)/)?.[1] || "Bangalore",
      images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"],
      client: {
        name: formData.client.split(" (")[0],
        phone: "+91 98450 12891",
      },
      notes: formData.notes,
    };

    try {
      const res = await fetch(`${API_URL}/schedules`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAppointment),
      });
      if (res.ok) {
        fetchAppointments();
      }
    } catch (err) {
      console.error("Failed to create appointment:", err);
    }
    setShowForm(false);
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
        {/* Shared Header */}
        <ModalHeader onClose={onClose} />

        {/* Toggle between list and form */}
        {showForm ? (
          <BookingForm
            onBack={() => setShowForm(false)}
            onConfirm={handleConfirm}
          />
        ) : (
          <AppointmentsList
            appointments={appointments}
            onDelete={handleDelete}
            onSchedule={() => setShowForm(true)}
          />
        )}

      </div>
    </div>
  );
}

export default SiteVisitModal;