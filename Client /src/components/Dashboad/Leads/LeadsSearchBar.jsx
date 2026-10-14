import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const priorities = [
  "All Priorities",
  "High Priority",
  "Medium Priority",
  "Low Priority",
];

function LeadsSearchBar({ onSearch, onPriorityChange }) {
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState("All Priorities");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  const handlePriority = (e) => {
    setPriority(e.target.value);
    onPriorityChange?.(e.target.value);
  };

  return (
    <div className="flex items-center gap-3 w-full">

      {/* Search Input */}
      <div
        className="flex items-center gap-3 flex-1 px-5 py-3.5 rounded-full"
        style={{
          backgroundColor: "#1A1A1A",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <FiSearch size={16} className="shrink-0" style={{ color: "#6B7280" }} />
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search leads by client name, email, phone, or interested property..."
          className="bg-transparent outline-none w-full text-sm text-white placeholder-gray-500"
        />
      </div>

      {/* Priority Dropdown */}
      <div
        className="relative shrink-0"
        style={{
          backgroundColor: "#1A1A1A",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "9999px",
        }}
      >
        <select
          value={priority}
          onChange={handlePriority}
          className="appearance-none text-white text-sm font-semibold pl-5 pr-10 py-3.5 rounded-full outline-none cursor-pointer bg-transparent"
        >
          {priorities.map((p) => (
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
  );
}

export default LeadsSearchBar;