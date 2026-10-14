import React from "react";
import PofileImg from "../assets/Sara.jpg";
import { Star } from "lucide-react";

const AdvisorCard = () => {
  return (
    <div className="mx-auto w-full max-w-full sm:max-w-[378px] rounded-[22px] bg-[#050505] px-6 py-6 sm:px-9 sm:py-8 text-white">

      {/* PROFILE IMAGE */}
      <div className="flex justify-center">
        <div className="relative">
          <img
            src={PofileImg}
            alt="Sarah Williams"
            className="h-24 w-24 sm:h-[116px] sm:w-[116px] rounded-[12px] border border-[#c98508] object-cover transition-all"
          />

          {/* ONLINE DOT */}
          <span className="absolute bottom-[-2px] right-[-4px] sm:bottom-[-3px] sm:right-[-5px] h-4 w-4 sm:h-[21px] sm:w-[21px] rounded-full border-2 border-[#050505] bg-[#07963c]" />
        </div>
      </div>

      {/* NAME */}
      <h2 className="mt-4 sm:mt-5 text-center text-xl sm:text-[21px] font-semibold">
        Sarah Williams
      </h2>

      {/* DESIGNATION */}
      <p className="mt-1 text-center text-sm sm:text-[15px] font-medium text-[#c98508]">
        Senior Investment Advisor
      </p>

      {/* RATING */}
      <div className="mt-2 sm:mt-3 flex items-center justify-center gap-2">
        <Star size={22} strokeWidth={2} className="sm:w-[26px] sm:h-[26px] text-[#c98508]" />
        <span className="text-base sm:text-[18px] font-semibold text-[#c98508]">4.9</span>
        <span className="text-base sm:text-[18px] font-medium text-[#b4b4b4]">/ 5.0</span>
      </div>

      {/* DIVIDER */}
      <div className="my-5 h-px w-full bg-[#332713]" />

      {/* STATUS */}
      {/* Used min-[350px] to ensure these elements stack on extremely narrow devices (like iPhone SE) but sit side-by-side otherwise */}
      <div className="flex flex-col min-[350px]:flex-row items-center justify-between gap-3">
        {/* ONLINE */}
        <div className="flex h-10 sm:h-[47px] w-full min-[350px]:flex-1 items-center justify-center gap-2 rounded-full bg-white text-[#117b28]">
          <span className="h-2 w-2 sm:h-[11px] sm:w-[11px] rounded-full bg-[#078c2e]" />
          <span className="text-sm sm:text-[17px] font-medium">Online</span>
        </div>

        {/* RESPONSE */}
        <div className="flex h-10 sm:h-[47px] w-full min-[350px]:flex-1 items-center justify-center rounded-full border border-[#0065b3] text-[#aaa]">
          <span className="text-sm sm:text-[17px]">2 Min Response</span>
        </div>
      </div>

      {/* CREDENTIALS */}
      <div className="mt-8 sm:mt-11">
        <h3 className="text-sm sm:text-[16px] font-semibold uppercase text-[#cbb18a]">
          Credentials
        </h3>
        <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-2">
          <p className="text-sm sm:text-[17px] leading-[1.5] text-[#aaa]">Certified Investment</p>
          <p className="text-sm sm:text-[17px] leading-[1.5] text-[#aaa]">Consultant</p>
          <p className="text-sm sm:text-[17px] leading-[1.5] text-[#aaa]">+12 Years Experience</p>
        </div>
      </div>

      {/* SPECIALIZATIONS */}
      <div className="mt-8 sm:mt-10">
        <h3 className="text-sm sm:text-[16px] font-semibold uppercase text-[#cbb18a]">
          Specializations
        </h3>
        {/* Shifted from a stacked list to a flex-wrap container on mobile to save vertical space */}
        <div className="mt-3 flex flex-wrap gap-2 sm:block sm:space-y-3">
          
          <div className="flex h-10 sm:h-[47px] flex-1 min-w-[120px] sm:w-full items-center justify-center rounded-full border border-[#a86d00] text-sm sm:text-[16px] text-white transition-colors hover:bg-amber-500 cursor-pointer">
            Commercial
          </div>

          <div className="flex h-10 sm:h-[47px] flex-1 min-w-[140px] sm:w-full items-center justify-center rounded-full border border-[#a86d00] text-sm sm:text-[16px] text-white transition-colors hover:bg-amber-500 cursor-pointer">
            Luxury Residence
          </div>

          <div className="flex h-10 sm:h-[47px] flex-1 min-w-[100px] sm:w-full items-center justify-center rounded-full border border-[#a86d00] text-sm sm:text-[16px] text-white transition-colors hover:bg-amber-500 cursor-pointer">
            Planning
          </div>

        </div>
      </div>

    </div>
  );
};

export default AdvisorCard;