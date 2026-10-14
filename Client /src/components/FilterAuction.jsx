import React from "react";
import {
  FaMoneyBillWave,
  FaBuilding,
  FaBed,
  FaSwimmingPool,
  FaMapMarkerAlt,
  FaChevronDown,
} from "react-icons/fa";

const filters = [
  {
    title: "Price Range",
    icon: <FaMoneyBillWave />,
    active: true,
  },
  {
    title: "Property Type",
    icon: <FaBuilding />,
  },
  {
    title: "Beds & Baths",
    icon: <FaBed />,
  },
  {
    title: "Amenities",
    icon: <FaSwimmingPool />,
  },
  {
    title: "Location",
    icon: <FaMapMarkerAlt />,
  },
];

function FilterAuction() {
  return (
    <div className="bg-black rounded-3xl p-7 h-fit">

      <h2 className="text-4xl font-bold text-orange-500 mb-10">
        Filter Your Luxury Search
      </h2>

      <div className="space-y-5">

        {filters.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between items-center rounded-2xl px-6 py-6 cursor-pointer transition
            ${
              item.active
                ? "bg-[#222222] border-l-4 border-orange-500"
                : "hover:bg-[#1b1b1b]"
            }`}
          >
            <div className="flex items-center gap-4">

              <span
                className={`text-2xl ${
                  item.active ? "text-orange-500" : "text-gray-300"
                }`}
              >
                {item.icon}
              </span>

              <span
                className={`text-xl font-semibold ${
                  item.active ? "text-orange-500" : "text-gray-300"
                }`}
              >
                {item.title}
              </span>

            </div>

            <FaChevronDown
              className={`${
                item.active ? "text-orange-500" : "text-gray-400"
              }`}
            />
          </div>
        ))}
      </div>

      <button className="mt-10 w-full bg-orange-500 hover:bg-orange-600 py-5 rounded-2xl text-white font-bold text-xl">
        Apply Filters
      </button>
    </div>
  );
}

export default FilterAuction;