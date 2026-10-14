import { useState } from "react";
import { FiStar, FiPhone, FiMessageSquare, FiCalendar, FiCheck } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import { PiBuildingApartmentBold } from "react-icons/pi";

export default function AgentCard({ advisor }) {
  const [tourScheduled, setTourScheduled] = useState(false);

  if (!advisor) return null;

  const name = advisor.name || advisor.fullName || "Elite Advisor";
  const image = advisor.image || advisor.profileImage || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80";
  const agency = advisor.agency || advisor.company?.name || "Luxe Realty Sovereign";
  const online = advisor.online ?? advisor.isOnline ?? true;
  const title = advisor.title || "Private Wealth Real Estate Partner";
  const rating = Number(advisor.rating || 4.9);
  const reviews = advisor.reviews || advisor.reviewCount || 28;
  const countryFlag = advisor.countryFlag || advisor.country?.flag || "🇺🇸";
  const country = (typeof advisor.country === "object" ? advisor.country?.name : advisor.country) || "United States";
  const languages = Array.isArray(advisor.languages) && advisor.languages.length > 0 ? advisor.languages : ["English", "French"];
  const forSale = advisor.forSale ?? advisor.listings?.forSale ?? 14;
  const forRent = advisor.forRent ?? advisor.listings?.forRent ?? 6;
  const specialist = advisor.specialist || (Array.isArray(advisor.specialties) ? advisor.specialties[0] : null) || "High-Value Acquisitions";
  const phone = advisor.phone || advisor.contact?.phone || "+1 (555) 019-2834";

  const handleScheduleTour = () => {
    setTourScheduled(true);
    setTimeout(() => setTourScheduled(false), 3000);
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=Hello%20${encodeURIComponent(name)},%20I%20am%20inquiring%20about%20your%20luxury%20listings.`, "_blank");
  };

  const handleCall = () => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-[#151312] p-5 sm:p-6 shadow-xl flex flex-col justify-between hover:border-amber-500/30 transition">
      <div>
        <div className="flex flex-col sm:flex-row gap-5">
          {/* Photo */}
          <div className="relative w-full sm:w-40 h-52 sm:h-auto shrink-0 overflow-hidden rounded-2xl">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80";
              }}
            />
            {online && (
              <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/75 backdrop-blur-md px-2.5 py-1 text-xs font-medium text-white shadow">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Online
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="mb-2 sm:mb-3 flex items-start justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1.5 text-xs text-gray-300">
                <PiBuildingApartmentBold className="text-amber-500" />
                {agency}
              </span>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1 text-[11px] font-semibold text-white">
                <FiStar className="fill-white" size={11} />
                SUPERAGENT
              </span>
            </div>

            <h3 className="flex items-center gap-1.5 text-xl font-semibold text-white">
              {name}
              <MdVerified className="text-amber-500" size={18} />
            </h3>
            <p className="text-sm text-gray-400 mt-0.5">{title}</p>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-300">
              <span className="flex items-center gap-1 font-medium text-white">
                <FiStar className="text-amber-500 fill-amber-500" size={14} />
                {rating.toFixed(1)}
              </span>
              <span className="text-gray-500">({reviews} reviews)</span>
              <span className="text-gray-600">•</span>
              <span className="flex items-center gap-1.5 text-gray-400">
                {countryFlag} {country}
              </span>
            </div>

            <div className="mt-4">
              <p className="mb-1.5 text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
                Languages
              </p>
              <div className="flex flex-wrap gap-1.5">
                {languages.map((lang, idx) => (
                  <span
                    key={idx}
                    className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-gray-300"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-gray-300">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              For Sale: <span className="font-semibold text-white">{forSale}</span>
            </span>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-1.5 text-gray-300">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              For Rent: <span className="font-semibold text-white">{forRent}</span>
            </span>
          </div>
          <span className="text-[11px] font-medium tracking-wide text-gray-400 truncate max-w-[150px]">
            {specialist}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 grid grid-cols-3 gap-2.5">
        <button
          onClick={handleScheduleTour}
          className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold transition shadow ${
            tourScheduled
              ? "bg-emerald-600 text-white"
              : "bg-amber-500 text-black hover:bg-amber-400"
          }`}
        >
          {tourScheduled ? (
            <>
              <FiCheck size={16} /> Requested
            </>
          ) : (
            <>
              <FiCalendar size={15} /> Tour
            </>
          )}
        </button>
        <button
          onClick={handleWhatsApp}
          className="flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-xs sm:text-sm font-medium text-gray-200 transition hover:bg-white/10"
        >
          <FiMessageSquare size={15} className="text-emerald-400" />
          WhatsApp
        </button>
        <button
          onClick={handleCall}
          className="flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-xs sm:text-sm text-gray-200 transition hover:bg-white/10"
          title={`Call ${phone}`}
        >
          <FiPhone size={15} className="text-amber-400" />
          Call
        </button>
      </div>
    </div>
  );
}