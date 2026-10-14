import { FiSearch, FiMapPin } from "react-icons/fi";
import { PiBuildingsBold, PiHandshakeBold } from "react-icons/pi";
import { MdLanguage } from "react-icons/md";

const quickSelects = [
  { label: "Superagents Only", icon: "star-filled" },
  { label: "Top Rated 4.5+", icon: "star-outline" },
  { label: "Off-Market Specialists", icon: "key" },
  { label: "Multi-lingual" },
  { label: "Dubai Marina" },
  { label: "Palm Jumeirah" },
  { label: "Mayfair & Belgravia" },
];

function SearchField({ icon, label, children }) {
  return (
    <div className="flex flex-1 items-center gap-3 px-5 py-4">
      <span className="text-amber-500 text-lg">{icon}</span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold tracking-wide text-gray-400">
          {label}
        </p>
        {children}
      </div>
    </div>
  );
}

export default function SearchBar() {
  return (
    <div className="w-full max-w-5xl rounded-2xl border border-white/10 bg-[#14120F] p-3 shadow-2xl">
      <div className="flex flex-col divide-y divide-white/10 md:flex-row md:divide-y-0 md:divide-x">
        <SearchField icon={<FiMapPin />} label="Location & Agency">
          <input
            type="text"
            placeholder="Dubai, Mayfair, Agency name..."
            className="w-full bg-transparent text-white placeholder-gray-500 outline-none"
          />
        </SearchField>

        <SearchField icon={<PiBuildingsBold />} label="Portfolio Type">
          <select className="w-full appearance-none bg-transparent text-white outline-none">
            <option>All Asset Classes</option>
            <option>Residential</option>
            <option>Commercial</option>
            <option>Land</option>
          </select>
        </SearchField>

        <SearchField icon={<PiHandshakeBold />} label="Transaction">
          <select className="w-full appearance-none bg-transparent text-white outline-none">
            <option>For Sale</option>
            <option>For Rent</option>
            <option>Auction</option>
          </select>
        </SearchField>

        <SearchField icon={<MdLanguage />} label="Language">
          <select className="w-full appearance-none bg-transparent text-white outline-none">
            <option>Any Spoken</option>
            <option>English</option>
            <option>Arabic</option>
            <option>Mandarin</option>
          </select>
        </SearchField>

        <button
          type="button"
          className="flex items-center justify-center rounded-xl bg-amber-500 px-8 py-4 text-black transition hover:bg-amber-400 md:ml-2"
        >
          <FiSearch size={20} />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-white/10 px-5 pt-4 pb-2">
        <span className="text-[11px] font-semibold tracking-wide text-gray-400">
          Quick Select:
        </span>
        {quickSelects.map((item) => (
          <button
            key={item.label}
            type="button"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-200 transition hover:border-amber-500/50 hover:text-white"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}