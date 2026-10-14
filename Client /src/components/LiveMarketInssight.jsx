import React from "react";
import {
  FaWallet,
  FaChartBar,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

function LiveMarketInsights() {
  return (
    <section className="bg-[#0b0b0b] text-white py-3 md:py-8 px-4 sm:px-8 lg:px-20">

      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
        Live Market Insights
      </h2>

      <p className="text-gray-400 text-base sm:text-lg md:text-xl mt-3 md:mt-4 mb-10 md:mb-14">
        Real-Time Performance Of Our Elite Investment Pools.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

        {/* Card 1 */}
        <div className="border border-blue-700 rounded-3xl bg-black p-6 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center">
              <div className="bg-blue-950 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center">
                <FaWallet className="text-blue-500 text-xl sm:text-2xl" />
              </div>
              <span className="text-blue-500 text-sm sm:text-base font-semibold">
                Predictive
              </span>
            </div>

            <h3 className="text-gray-400 text-xl sm:text-2xl mt-8 sm:mt-10">
              Average Portfolio ROI
            </h3>

            <h1 className="text-4xl sm:text-5xl font-bold mt-2 sm:mt-3">
              14.8%
              <span className="text-xl sm:text-2xl">/yr</span>
            </h1>
          </div>

          {/* Chart */}
          <div className="mt-8 sm:mt-10 h-36 sm:h-44 rounded-xl bg-gray-100 overflow-hidden">
            <img
              src="https://quickchart.io/chart?c={type:'line',data:{labels:[1,2,3,4,5,6,7,8],datasets:[{data:[4,5,8,6,9,5,7,6]},{data:[2,4,3,6,5,8,7,9]}]}}"
              alt="ROI Chart"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Card 2 */}
        <div className="border border-blue-700 rounded-3xl bg-black p-6 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center">
              <div className="bg-amber-900/40 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center">
                <FaChartBar className="text-amber-500 text-xl sm:text-2xl" />
              </div>
              <span className="text-blue-500 text-sm sm:text-base font-semibold">
                Elite Growth
              </span>
            </div>

            <h3 className="text-gray-400 text-xl sm:text-2xl mt-8 sm:mt-10">
              Total Assets Controlled
            </h3>

            <h1 className="text-3xl sm:text-5xl font-bold mt-2 sm:mt-3 tracking-tight">
              ₹120,500,000
            </h1>
          </div>

          {/* Progress */}
          <div className="mt-8 sm:mt-12 space-y-6 sm:space-y-8">
            <div>
              <div className="flex justify-between text-base sm:text-lg mb-2 sm:mb-3">
                <span>Residential</span>
                <span>45%</span>
              </div>
              <div className="bg-gray-300 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-2 rounded-full w-[45%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-base sm:text-lg mb-2 sm:mb-3">
                <span>Commercial</span>
                <span>35%</span>
              </div>
              <div className="bg-gray-300 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-2 rounded-full w-[35%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="border border-blue-700 rounded-3xl bg-black p-6 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center">
              <div className="bg-pink-200 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center">
                <FaShieldAlt className="text-red-700 text-xl sm:text-2xl" />
              </div>
              <span className="text-blue-500 text-sm sm:text-base font-semibold">
                Risk Shield
              </span>
            </div>

            <h3 className="text-gray-400 text-xl sm:text-2xl mt-8 sm:mt-10">
              Market Volatility Index
            </h3>

            <h1 className="text-4xl sm:text-5xl font-bold mt-2 sm:mt-3">
              LOW
              <span className="text-xl sm:text-2xl font-normal"> Beta</span>
            </h1>

            <p className="text-gray-400 text-sm sm:text-base mt-6 sm:mt-10 leading-relaxed sm:leading-8">
              Our portfolios maintain a low correlation with broader
              market indices, providing stability during economic
              downturns.
            </p>
          </div>

          <button className="mt-8 sm:mt-10 border border-amber-500 rounded-full px-6 py-2.5 sm:px-8 sm:py-3 flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold tracking-wider hover:bg-amber-500/10 transition-colors w-full sm:w-max">
            <FaCheckCircle className="text-amber-500 text-base" />
            AUDITED BY BIG FOUR
          </button>
        </div>

      </div>

    </section>
  );
}

export default LiveMarketInsights;