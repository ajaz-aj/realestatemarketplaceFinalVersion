// import { featuredCollections } from "../assets/featuredCollections.js";

// function FeatureCollectionMarketplace() {
//   return (
//     <section className="bg-[#111111] py-12 md:py-20">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

//         <h2 className="mb-6 md:mb-8 text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
//           Featured Collections
//         </h2>

//         {/* Grid shifts from 1 column on mobile to 3 columns on lg+ screens */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

//           {/* Large Card */}
//           <div className="relative lg:col-span-2 h-[350px] sm:h-[420px] lg:h-[520px] overflow-hidden rounded-2xl sm:rounded-3xl group shadow-xl">

//             <img
//               src={featuredCollections[0].image}
//               alt={featuredCollections[0].title}
//               className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
//             />

//             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

//             <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8">

//               <span className="rounded-full bg-[#D08A1C] px-3 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold text-white">
//                 {featuredCollections[0].tag}
//               </span>

//               <h3 className="mt-3 sm:mt-5 text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
//                 {featuredCollections[0].title}
//               </h3>

//               <p className="mt-2 text-sm sm:text-base lg:text-lg text-gray-300 line-clamp-2 sm:line-clamp-none">
//                 {featuredCollections[0].desc}
//               </p>

//             </div>

//           </div>

//           {/* Right Cards */}
//           <div className="flex flex-col gap-6 sm:gap-8">

//             {featuredCollections.slice(1).map((item) => (

//               <div
//                 key={item.id}
//                 className="relative h-[250px] sm:h-[280px] lg:h-[245px] overflow-hidden rounded-2xl sm:rounded-3xl group shadow-xl"
//               >

//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
//                 />

//                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

//                 <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6">

//                   <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
//                     {item.title}
//                   </h3>

//                 </div>

//               </div>

//             ))}

//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }

// export default FeatureCollectionMarketplace;




import { useEffect, useState } from "react";
import API_URL from "../Services/Api";
import { featuredCollections } from "../assets/featuredCollections.js";

function FeatureCollectionMarketplace() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_URL}/featured-collections`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data.data) && data.data.length > 0) {
            setCollections(data.data);
            return;
          }
        }
        setCollections(featuredCollections);
      } catch (err) {
        console.error("Error fetching featured collections:", err);
        setCollections(featuredCollections);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  // Format cards
  const activeList = collections.length > 0 ? collections : featuredCollections;
  const largeCard =
    activeList.find((item) => item.size === "large") || activeList[0];

  // ==========================================
  // SMALL CARDS — everything except largeCard
  // ==========================================
  const smallCards = activeList.filter(
    (item) => (item._id || item.id) !== (largeCard?._id || largeCard?.id)
  );

  return (
    <section className="bg-[#111111] py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ======================================
            HEADING
        ====================================== */}

        <h2 className="mb-6 md:mb-8 text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Featured Collections
        </h2>

        {/* ======================================
            LOADING
        ====================================== */}

        {loading && (
          <p className="text-center text-white">Loading collections...</p>
        )}

        {/* ======================================
            ERROR
        ====================================== */}

        {!loading && error && (
          <p className="text-center text-red-400">{error}</p>
        )}

        {/* ======================================
            EMPTY
        ====================================== */}

        {!loading && !error && collections.length === 0 && (
          <p className="text-center text-gray-400">No collections found.</p>
        )}

        {/* ======================================
            COLLECTIONS
        ====================================== */}

        {!loading && !error && collections.length > 0 && (

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-5">

            {/* =================================
                LARGE CARD
            ================================= */}

            {largeCard && (
              <div className="relative lg:col-span-3 h-[350px] sm:h-[420px] lg:h-[530px] overflow-hidden rounded-2xl sm:rounded-3xl group shadow-xl">

                {/* IMAGE */}
                <img
                  src={largeCard.image}
                  alt={largeCard.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* CONTENT */}
                <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8">

                  {/* BADGE */}
                  {largeCard.badge && (
                    <span className="inline-block rounded-full bg-[#D08A1C] px-3 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold text-white">
                      {largeCard.badge}
                    </span>
                  )}

                  {/* TITLE */}
                  <h3 className="mt-3 sm:mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                    {largeCard.title}
                  </h3>

                  {/* DESCRIPTION */}
                  {largeCard.description && (
                    <p className="mt-1 text-sm sm:text-base text-gray-300 line-clamp-2 sm:line-clamp-none">
                      {largeCard.description}
                    </p>
                  )}

                </div>
              </div>
            )}

            {/* =================================
                SMALL CARDS
            ================================= */}

            <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-5">

              {smallCards.map((item) => (
                <div
                  key={item._id}
                  className="relative h-[250px] sm:h-[280px] lg:h-[253px] overflow-hidden rounded-2xl sm:rounded-3xl group shadow-xl"
                >

                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  {/* CONTENT */}
                  <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6">

                    {/* BADGE */}
                    {item.badge && (
                      <span className="inline-block mb-2 rounded-full bg-[#D08A1C] px-3 py-1 text-xs font-semibold text-white">
                        {item.badge}
                      </span>
                    )}

                    {/* TITLE */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {item.title}
                    </h3>

                  </div>
                </div>
              ))}

            </div>

          </div>
        )}

      </div>
    </section>
  );
}

export default FeatureCollectionMarketplace;