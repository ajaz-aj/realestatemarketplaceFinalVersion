import React, { useState } from "react";
import InvesterModal from "../pages/InvestorApplication";
import { useNavigate } from "react-router-dom";

const InvestHero = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="min-h-screen bg-[#0d0d0d] px-3 sm:px-6 pt-13 md:pt-17 pb-5 md:pb-1 text-white lg:px-15">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        
        {/* LEFT */}
        <div className="w-full">
          {/* Badge */}
          <div className="mb-6 md:mb-10 inline-block rounded-full border border-amber-500 px-5 py-2 md:px-8 md:py-3 text-xs md:text-sm tracking-widest text-gray-300">
            INSTITUTIONAL GRADE ASSETS
          </div>

          {/* Heading */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight lg:text-6xl">
            High-Yield Real Estate
            <br className="hidden sm:block" />
            Investment
            <br className="hidden sm:block" />
            Opportunities
          </h1>

          {/* Paragraph */}
          <p className="mt-6 md:mt-10 max-w-xl text-base sm:text-lg md:text-xl leading-relaxed md:leading-10 text-gray-400">
            Unlock exclusive access to high-performance property portfolios and
            commercial developments designed for sophisticated wealth preservation
            and capital growth.
          </p>

          {/* Buttons */}
          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6">
            <button
              className="w-full sm:w-auto rounded-xl bg-[#D28A19] px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-semibold duration-300 hover:bg-[#c47e12]"
              onClick={() => setShowModal(true)}
            >
              Join The Investor Club
            </button>

            <button 
              className="w-full sm:w-auto rounded-xl border border-amber-600 px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-semibold duration-300 hover:bg-amber-600"
              onClick={() => navigate("/ChatSection")}
            >
              Speak With An Advisor
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative w-full">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200"
            alt="Real Estate Portfolio"
            className="h-[450px] sm:h-[550px] md:h-[700px] w-full rounded-2xl md:rounded-3xl object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-black/35"></div>

          {/* Card */}
          <div className="absolute bottom-6 left-4 right-4 sm:bottom-10 sm:left-10 sm:right-10">
            <p className="text-sm sm:text-base md:text-xl text-gray-300">Current Portfolio AUM</p>

            <div className="mt-2 sm:mt-3 flex items-center justify-between">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight">₹30,500,000</h2>
              <span className="rounded-full bg-green-100 px-4 py-1.5 sm:px-6 sm:py-3 text-xs sm:text-sm md:text-base font-semibold text-green-700 whitespace-nowrap">
                ↗ +12.4%
              </span>
            </div>

            {/* Graph */}
            <div className="mt-6 sm:mt-10 flex h-24 sm:h-32 items-end gap-3 sm:gap-5 overflow-x-auto pb-2">
              <div className="h-6 w-12 sm:w-20 shrink-0 rounded bg-[#7A9BC9]"></div>
              <div className="h-10 w-12 sm:w-20 shrink-0 rounded bg-[#7A9BC9]"></div>
              <div className="h-16 w-12 sm:w-20 shrink-0 rounded bg-[#7A9BC9]"></div>
              <div className="h-8 w-12 sm:w-20 shrink-0 rounded bg-[#7A9BC9]"></div>
              <div className="h-24 w-12 sm:w-20 shrink-0 rounded bg-[#0F5BB8]"></div>
            </div>
          </div>
        </div>

      </div>

      {showModal && <InvesterModal onClose={() => setShowModal(false)} />}
    </section>
  );
};

export default InvestHero;