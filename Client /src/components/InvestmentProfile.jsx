import React from "react";
import { LineChart, ChevronDown } from "lucide-react";

const InvestmentProfile = () => {
  return (
    <div className="mx-auto w-full max-w-[400px] shrink-0 rounded-[20px] bg-[#050505] p-6 text-white sm:rounded-[22px] sm:p-8 md:w-[360px] md:max-w-none md:mx-0">
      
      {/* Header */}
      <div className="mb-8 flex items-center gap-3 sm:mb-10 sm:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#c98508] sm:h-[42px] sm:w-[42px]">
          <LineChart className="h-5 w-5 sm:h-6 sm:w-6 text-white" strokeWidth={2.5} />
        </div>
        <h2 className="text-base font-semibold tracking-wide sm:text-[18px]">
          Investment Profile
        </h2>
      </div>

      {/* Form Fields */}
      <div className="space-y-5 sm:space-y-6">
        
        {/* Budget Range */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase text-[#a3947a] sm:text-[13px]">
            Budget Range
          </label>
          <div className="relative">
            <select className="h-11 w-full appearance-none rounded-[8px] border border-[#332713] bg-transparent px-3 text-sm text-[#ccc] outline-none focus:border-[#c98508] sm:h-[46px] sm:px-4 sm:text-[15px]">
              <option value="under-50">Under ₹50 Lakhs</option>
              <option value="50-1cr">₹50 Lakhs - ₹1 Cr</option>
              <option value="1cr-plus">₹1 Cr +</option>
            </select>
            <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#ccc] sm:right-4" />
          </div>
        </div>

        {/* Asset Type */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase text-[#a3947a] sm:text-[13px]">
            Asset Type
          </label>
          <div className="relative">
            <select className="h-11 w-full appearance-none rounded-[8px] border border-[#332713] bg-transparent px-3 text-sm text-[#ccc] outline-none focus:border-[#c98508] sm:h-[46px] sm:px-4 sm:text-[15px]">
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="commercial">Commercial</option>
            </select>
            <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#ccc] sm:right-4" />
          </div>
        </div>

        {/* Expected ROI Dropdown */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase text-[#a3947a] sm:text-[13px]">
            Expected ROI
          </label>
          <div className="relative">
            <select className="h-11 w-full appearance-none rounded-[8px] border border-[#332713] bg-transparent px-3 text-sm text-[#ccc] outline-none focus:border-[#c98508] sm:h-[46px] sm:px-4 sm:text-[15px]">
              <option value="5-8">5% – 8%</option>
              <option value="8-12">8% – 12%</option>
              <option value="12-plus">12% +</option>
            </select>
            <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#ccc] sm:right-4" />
          </div>
        </div>

        {/* Term Buttons */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase text-[#a3947a] sm:text-[13px]">
            Investment Term
          </label>
          <div className="flex gap-2 sm:gap-3">
            <button className="h-10 flex-1 rounded-[8px] bg-[#0a0a0a] text-xs font-medium text-[#888] transition-colors hover:border hover:border-[#332713] hover:text-white sm:h-[42px] sm:text-[14px]">
              Short
            </button>
            <button className="h-10 flex-1 rounded-[8px] border border-[#c98508] bg-[#0a0a0a] text-xs font-medium text-[#c98508] sm:h-[42px] sm:text-[14px]">
              Medium
            </button>
            <button className="h-10 flex-1 rounded-[8px] bg-[#0a0a0a] text-xs font-medium text-[#888] transition-colors hover:border hover:border-[#332713] hover:text-white sm:h-[42px] sm:text-[14px]">
              Long
            </button>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button className="mt-8 h-12 w-full rounded-[10px] bg-[#c98508] text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:mt-10 sm:h-[52px] sm:text-[16px]">
        Share Preference
      </button>
      
    </div>
  );
};

export default InvestmentProfile;