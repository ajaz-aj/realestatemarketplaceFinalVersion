import React from 'react'

function Topsection() {
  return (
    <div className="bg-[#111111] px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        
        {/* Left Section: Titles */}
        <div className="w-full md:w-auto">
          <h1 className="text-white text-lg sm:text-xl md:text-2xl font-bold tracking-wide">
            Modern Residences In San Francisco
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Showing 1,248 Properties Matching Your Criteria
          </p>
        </div>

        {/* Right Section: Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          
          {/* Show Map Button */}
          <button className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-[#d1d5db] hover:bg-[#9ca3af] text-black px-4 py-2.5 rounded-md text-xs sm:text-sm font-semibold transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
              <line x1="9" y1="3" x2="9" y2="18"></line>
              <line x1="15" y1="6" x2="15" y2="21"></line>
            </svg>
            <span>Show Map</span>
          </button>

          {/* Sort Dropdown */}
          <div className="relative flex-1 sm:flex-initial">
            <select 
              className="w-full appearance-none bg-[#d1d5db] hover:bg-[#9ca3af] text-black px-4 py-2.5 pr-10 rounded-md text-xs sm:text-sm font-semibold outline-none cursor-pointer transition-colors"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
            
            {/* Custom Dropdown Arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-black">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Topsection;