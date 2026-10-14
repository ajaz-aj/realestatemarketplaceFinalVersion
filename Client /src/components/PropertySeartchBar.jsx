import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";

function PropertySearchBar() {
  const tabs = [
    { name: "Buy" },
    { name: "Rent" },
    { name: "Bid" },
    { name: "Sell" },
  ];
  
  // Initialize states with default values
  const [activeTab, setActiveTab] = useState("Buy");
  const [type, setType] = useState("Villa");
  const [price, setPrice] = useState("$1M - $5M");

  return (
    <div className="mt-12 bg-[#E6E6E6]/90 rounded-3xl p-6 w-full max-w-6xl shadow-xl text-black">
      
      {/* Tabs */}
      <div className="flex gap-14 border-b border-gray-300 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={
              activeTab === tab.name
                ? "text-[#C88719] font-semibold border-b-2 border-[#C88719] pb-5"
                : "text-gray-500 font-semibold pb-5 hover:text-black transition-colors"
            }
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Inputs & Search Button Grid */}
      <div className="flex flex-wrap lg:flex-nowrap gap-4 items-end mt-4">
        
        {/* Location */}
        <div className="p-4 flex-1">
          <p className="text-[11px] font-bold mb-2 uppercase text-gray-500 tracking-wider">
            Location
          </p>
          <div className="border border-gray-400 rounded-xl p-4 flex items-center gap-3 text-gray-700 w-full bg-transparent">
            <IoMdSearch className="text-xl" />
            <input 
              type="text"
              placeholder="Where To?"
              className="bg-transparent outline-none w-full text-md font-medium"
            />
          </div>
        </div>

        {/* Property Type */}
        <div className="p-4 flex-1">
          <p className="text-[11px] font-bold mb-2 uppercase text-gray-500 tracking-wider">
            Property type
          </p>
          <div className="border border-gray-400 rounded-xl p-4 flex items-center gap-3 text-gray-700 w-full bg-transparent">
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-transparent outline-none cursor-pointer text-md font-medium appearance-none"
            >
              <option value="Estate">Estate</option>
              <option value="Villa">Villa</option>
              <option value="Apartment">Apartment</option>
            </select>
          </div>
        </div>

        {/* Price Range */}
        <div className="p-4 flex-1">
          <p className="text-[11px] font-bold mb-2 uppercase text-gray-500 tracking-wider">
            Price Range
          </p>
          <div className="border border-gray-400 rounded-xl p-4 flex items-center gap-3 text-gray-700 w-full bg-transparent">
            <select 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              className="w-full bg-transparent outline-none cursor-pointer text-md font-medium appearance-none"
            >
              <option value="$20M+">$20M+</option>
              <option value="$5M - $20M">$5M - $20M</option>
              <option value="$1M - $5M">$1M - $5M</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="p-4 flex-[0.7] min-w-[180px]">
          <button className="w-full bg-[#C88719] hover:bg-[#b07616] text-white rounded-xl p-4 flex items-center justify-center gap-2 font-semibold text-lg transition-colors duration-300">
            <IoMdSearch className="text-2xl" />
            Search
          </button>
        </div>

      </div>
    </div>
  );
}

export default PropertySearchBar;