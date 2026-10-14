import { FaSearch } from "react-icons/fa";
import { FaMap } from "react-icons/fa6";

function TopSectionM() {
  return (
    <section className="bg-[#111111] py-12 md:py-20">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="mb-8 md:mb-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Discover Your Future Legacy
            </h1>

            <p className="mt-2 md:mt-3 text-base sm:text-lg text-gray-400">
              The Central Hub For High-End Fixed-Price Estates And
              Trending Global Investments.
            </p>
          </div>

          <button className="flex items-center gap-3 rounded-xl bg-white px-5 py-3.5 sm:px-6 sm:py-4 font-semibold text-black hover:bg-gray-200 transition text-sm sm:text-base shrink-0">
            <FaMap />
            View On App
          </button>

        </div>

        {/* Search Bar Container */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center rounded-2xl lg:rounded-3xl bg-white p-4 sm:p-5 shadow-xl gap-4 lg:gap-0">

          {/* Search Input */}
          <div className="flex flex-1 items-center rounded-xl lg:rounded-2xl bg-gray-100 px-4 sm:px-6 py-3.5 sm:py-5">
            <FaSearch className="mr-3 sm:mr-4 text-lg sm:text-xl text-gray-500 shrink-0" />
            <input
              type="text"
              placeholder="Location, Neighborhood Or Landmark"
              className="w-full bg-transparent text-sm sm:text-lg text-black outline-none placeholder:text-gray-500"
            />
          </div>

          <div className="hidden lg:block mx-5 h-14 w-px bg-gray-300"></div>

          {/* Property Type Select */}
          <select className="w-full lg:w-60 bg-gray-100 lg:bg-transparent rounded-xl lg:rounded-none px-4 py-3.5 lg:px-0 lg:py-0 text-sm sm:text-lg text-black lg:text-gray-800 outline-none cursor-pointer">
            <option>Property Type</option>
            <option>Villa</option>
            <option>Apartment</option>
            <option>Penthouse</option>
          </select>

          <div className="hidden lg:block mx-5 h-14 w-px bg-gray-300"></div>

          {/* Price Range Select */}
          <select className="w-full lg:w-60 bg-gray-100 lg:bg-transparent rounded-xl lg:rounded-none px-4 py-3.5 lg:px-0 lg:py-0 text-sm sm:text-lg text-black lg:text-gray-800 outline-none cursor-pointer">
            <option>Price Range</option>
            <option>$100K - $500K</option>
            <option>$500K - $1M</option>
            <option>$1M+</option>
          </select>

          <div className="hidden lg:block mx-5 h-14 w-px bg-gray-300"></div>

          {/* Search Button */}
          <button className="rounded-xl lg:rounded-2xl bg-[#D08A1C] px-8 lg:px-16 py-4 lg:py-5 text-sm sm:text-lg font-semibold text-white transition hover:bg-[#b67918] w-full lg:w-auto shrink-0">
            Search
          </button>

        </div>

      </div>

    </section>
  );
}

export default TopSectionM;