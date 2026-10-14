import React from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/RentalsBG.jpg";
import { FaMapMarkerAlt } from "react-icons/fa";

function RentalHero() {
  const navigate = useNavigate();
  return (
    <section
      className="relative min-h-screen bg-cover bg-center flex flex-col justify-end py-12 md:py-20"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="max-w-3xl mb-8 md:mb-12">

          <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-serif font-bold leading-tight tracking-tight">
            Luxury Rentals For The
            <br className="hidden sm:block" />
            Discerning Resident
          </h1>

          <p className="text-gray-300 mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl leading-relaxed sm:leading-8">
            Experience unparalleled comfort and style with our curated
            selection of elite long-term and seasonal residences in the
            world's most sought-after locations.
          </p>

        </div>

        {/* Search Box Container */}
        <div className="bg-black/40 backdrop-blur-md p-4 sm:p-6 rounded-2xl md:rounded-3xl border border-white/10">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">

            {/* Location */}
            <div className="lg:col-span-2">

              <label className="text-gray-300 uppercase text-xs sm:text-sm mb-1.5 sm:mb-2 block font-medium tracking-wider">
                Location
              </label>

              <div className="bg-white rounded-xl flex items-center px-4 sm:px-5 h-12 sm:h-14">

                <FaMapMarkerAlt className="text-black mr-3 shrink-0 text-sm sm:text-base" />

                <input
                  type="text"
                  placeholder="Where Would You Like To Live?"
                  className="w-full bg-transparent text-sm sm:text-base text-black outline-none placeholder:text-gray-500"
                />

              </div>

            </div>

            {/* Duration */}
            <div>

              <label className="text-gray-300 uppercase text-xs sm:text-sm mb-1.5 sm:mb-2 block font-medium tracking-wider">
                Duration
              </label>

              <select className="bg-white rounded-xl w-full h-12 sm:h-14 px-4 text-sm sm:text-base text-black outline-none cursor-pointer">
                <option>Monthly</option>
                <option>Yearly</option>
                <option>Weekly</option>
              </select>

            </div>

            {/* Furnishing */}
            <div>

              <label className="text-gray-300 uppercase text-xs sm:text-sm mb-1.5 sm:mb-2 block font-medium tracking-wider">
                Furnishing
              </label>

              <select className="bg-white rounded-xl w-full h-12 sm:h-14 px-4 text-sm sm:text-base text-black outline-none cursor-pointer">
                <option>Any</option>
                <option>Furnished</option>
                <option>Unfurnished</option>
              </select>

            </div>

            {/* Amenities & Search Button Container */}
            <div className="sm:col-span-2 lg:col-span-1 flex flex-col sm:flex-row lg:flex-col gap-4">

              <div className="w-full">
                <label className="text-gray-300 uppercase text-xs sm:text-sm mb-1.5 sm:mb-2 block font-medium tracking-wider">
                  Amenities
                </label>

                <select className="bg-white rounded-xl w-full h-12 sm:h-14 px-4 text-sm sm:text-base text-black outline-none cursor-pointer">
                  <option>Any</option>
                  <option>Pool</option>
                  <option>Gym</option>
                  <option>Parking</option>
                </select>
              </div>

              <button
                onClick={() => navigate("/marketplace")}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl h-12 sm:h-14 px-6 sm:px-10 transition-colors w-full shrink-0 flex items-center justify-center text-base sm:text-lg cursor-pointer"
              >
                Search
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default RentalHero;