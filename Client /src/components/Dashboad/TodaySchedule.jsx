import { useState, useEffect } from "react";
import { LuCalendarDays } from "react-icons/lu";
import ScheduleCard from "./ScheduleCard";
import SiteVisitModal from "./SiteVisitModal.jsx";
import API_URL from "../../Services/Api";

function TodaysSchedule() {
  const [showModal, setShowModal] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/schedules`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.data)) {
          setSchedules(data.data);
          return;
        }
      }
    } catch (err) {
      console.error("Failed to fetch schedules:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <>
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-3 border-white/5">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#3D2A0A" }}
            >
              <LuCalendarDays size={20} style={{ color: "#C88A1A" }} />
            </div>

            <div>
              <h2 className="text-white text-2xl font-bold leading-tight">
                Today's Schedule
              </h2>
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mt-1"
                style={{ backgroundColor: "#3D2A0A", color: "#C88A1A" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "#C88A1A" }}
                />
                {schedules.length} Site Visits Scheduled
              </span>
            </div>
          </div>

          {/* View Calendar — opens modal */}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition hover:opacity-80 cursor-pointer"
            style={{
              backgroundColor: "#1E1E1E",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            View Calendar
            <LuCalendarDays size={14} />
          </button>
        </div>

        {/* Cards */}
        {loading ? (
          <div className="py-8 text-center text-gray-500">Loading scheduled visits...</div>
        ) : schedules.length === 0 ? (
          <div className="py-8 text-center text-gray-500">No appointments scheduled for today.</div>
        ) : (
          <div className="flex flex-col gap-4 mt-5">
            {schedules.map((item) => (
              <ScheduleCard key={item._id || item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <SiteVisitModal
          onClose={() => {
            setShowModal(false);
            fetchSchedules();
          }}
        />
      )}
    </>
  );
}

export default TodaysSchedule;