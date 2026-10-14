import React from "react";
import PropertyDetails from "./PropertyDetails";
import FilterAuction from "./FilterAuction";

function PropertyOverview() {
  return (
    <section className="bg-[#111111] min-h-screen py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-14">

        {/* Sidebar / Filters (Takes 1 column on desktop) */}
        <div className="lg:col-span-1 w-full">
          <FilterAuction />
        </div>

        {/* Main Property Details (Takes 2 columns on desktop) */}
        <div className="lg:col-span-2 w-full">
          <PropertyDetails />
        </div>

      </div>
    </section>
  );
}

export default PropertyOverview;