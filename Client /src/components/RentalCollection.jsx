import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import RentalCollectionCard from "./RentalCollectionCard";
import API_URL from "../Services/Api";
import { collections as staticCollections } from "../assets/RentalCollections.js";

function RentalCollection() {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_URL}/rentphoto`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data.data) && data.data.length > 0) {
            setCollections(data.data);
            return;
          }
        }
        setCollections(staticCollections);
      } catch (err) {
        console.error("Error fetching rental collections:", err);
        setCollections(staticCollections);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const activeCollections = collections.length > 0 ? collections : staticCollections;

  // Fallback: if no size:"large" in DB, use first item
  const largeCard =
    activeCollections.find((item) => item.size === "large") || activeCollections[0];

  const smallCards = activeCollections.filter(
    (item) => (item._id || item.id) !== (largeCard?._id || largeCard?.id)
  );

  return (
    <section className="bg-black py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADING */}
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-serif tracking-tight">
            Curated Collections
          </h2>
          <p className="text-gray-400 mt-2 sm:mt-3 text-base sm:text-lg md:text-xl">
            Explore Residences Tailored To Your Lifestyle Preferences.
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-white mt-10">
            Loading collections...
          </p>
        )}

        {/* ERROR */}
        {!loading && error && (
          <p className="text-center text-red-400 mt-10">{error}</p>
        )}

        {/* EMPTY */}
        {!loading && !error && activeCollections.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            No collections found.
          </p>
        )}

        {/* GRID */}
        {!loading && !error && activeCollections.length > 0 && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 sm:mt-10 md:mt-12">
              {/* Left Large Card */}
              {largeCard && (
                <div className="lg:col-span-2">
                  <RentalCollectionCard
                    item={{
                      title: largeCard.title,
                      image: largeCard.image,
                      subtitle: largeCard.description,
                      large: true,
                    }}
                  />
                </div>
              )}

              {/* Right Small Cards */}
              <div className="flex flex-col gap-6">
                {smallCards.map((card, idx) => (
                  <RentalCollectionCard
                    key={card._id || card.id || idx}
                    item={{
                      title: card.title,
                      image: card.image,
                      subtitle: card.description,
                      large: false,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Link */}
            <div className="flex justify-start sm:justify-end mt-6 sm:mt-8">
              <button
                onClick={() => navigate("/marketplace")}
                className="text-gray-300 flex items-center gap-2 sm:gap-3 hover:text-[#d4af37] transition text-sm sm:text-base font-semibold cursor-pointer"
              >
                View All Exclusive Residences
                <FaArrowRight className="text-xs sm:text-sm" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default RentalCollection;