import React from "react";

function PersonalConciergeCard() {
  return (
    <div className="mx-auto w-full max-w-full sm:max-w-sm rounded-2xl border border-[#3a2e20] bg-[#0a0a0a] p-5 sm:p-6 flex flex-col text-white font-sans mt-5 sm:mt-6 shadow-xl">
      
      <h3 className="text-xs sm:text-sm font-bold uppercase mb-4 sm:mb-5 tracking-wide">
        Personal Concierge
      </h3>

      {/* Agent Info */}
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Sarah Williams"
          className="w-12 h-12 rounded-full object-cover shrink-0 border border-[#3a2e20]"
        />
        <div className="min-w-0 flex-1">
          <h4 className="text-base sm:text-lg font-bold truncate">Sarah Williams</h4>
          <p className="text-xs text-gray-400">Senior Advisor</p>
        </div>
      </div>

      {/* Quote */}
      <p className="text-xs sm:text-sm text-gray-400 italic leading-relaxed">
        "I've Selected A Collection Of Exclusive Properties That Match Your
        Lifestyle, Investment Goals, And Preferred Locations. Let's Find Your
        Perfect Property Together."
      </p>
      
    </div>
  );
}

export default PersonalConciergeCard;