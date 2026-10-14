import React from "react";
import PriceRangeFilter from "./PriceRangeFilter";
import PropertryType from "./PropertryType";
import FilterBedrooms from "./FilterBedrooms";
import Amenities from "./Amenities";

function SideBar() {
  return (
    <aside className="w-full lg:w-[350px] shrink-0 bg-[#0D0D0D] text-white py-6 sm:py-8 px-4 sm:px-6 rounded-2xl">
      <div>
        <PriceRangeFilter />
        <PropertryType />
        <FilterBedrooms />
        <Amenities />
      </div>

      <button className="mt-6 w-full rounded-xl bg-[#C88719] py-3.5 sm:py-4 text-base sm:text-lg font-semibold hover:bg-[#B17618] transition shadow-lg cursor-pointer">
        Apply Filters
      </button>
    </aside>
  );
}

export default SideBar;