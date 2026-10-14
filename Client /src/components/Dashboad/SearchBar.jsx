import { FiSearch } from "react-icons/fi";

function SearchBar({ placeholder = "Search...", value, onChange }) {
  return (
    <div
      className="flex items-center gap-3 w-full rounded-2xl px-5 py-4"
      style={{
        backgroundColor: "#161616",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <FiSearch
        className="shrink-0"
        size={18}
        style={{ color: "#6b7280" }}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-transparent outline-none w-full text-sm text-white"
        style={{ caretColor: "#C88A1A" }}
      />
    </div>
  );
}

export default SearchBar;