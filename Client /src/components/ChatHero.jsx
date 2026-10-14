import React from 'react';
import { ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';

function ChatHero() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#0b0c0e] text-white px-4 sm:px-6 md:px-10 lg:px-[72px] pb-12 md:pb-16 lg:pb-20">
      
      {/* TOP BAR */}
      <div className="flex justify-end pt-4 sm:pt-5">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 md:gap-3 rounded-full border border-[#303033] bg-[#0b0c0e] px-5 py-2 md:px-7 md:py-3 text-sm md:text-[18px] font-medium text-gray-300 transition-all duration-300 hover:border-gray-500 hover:text-white"
        >
          <ArrowLeft strokeWidth={1.8} className="w-4 h-4 md:w-5 md:h-5" />
          <span>Back</span>
        </button>
      </div>

      {/* HERO CONTENT */}
      <div className="pt-10 md:pt-16 lg:pt-[48px]">
        
        {/* SMALL TITLE */}
        <p className="mb-4 md:mb-7 text-xs sm:text-sm md:text-[16px] font-semibold uppercase tracking-[3px] text-[#c98508]">
          Expert Consultation
        </p>

        {/* MAIN HEADING */}
        <h1 className="max-w-[650px] font-serif text-3xl sm:text-4xl md:text-[48px] leading-[1.2] md:leading-[1.15] font-medium tracking-tight md:tracking-[-0.5px] text-white">
          Speak With An Investment
          <br className="hidden md:block" /> Advisor
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-4 md:mt-5 max-w-[950px] text-base sm:text-lg md:text-[20px] font-medium md:font-semibold leading-relaxed md:leading-[1.6] text-[#a9a9aa]">
          Connect With Our Certified Real Estate Investment Specialists For
          Personalized Guidance, Portfolio Planning, And Exclusive Investment
          Opportunities
        </p>
        
      </div>
    </section>
  );
}

export default ChatHero;