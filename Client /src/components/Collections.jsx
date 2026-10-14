import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import CollectionCard from "./CollectionsCard";
import API_URL from "../Services/Api";

const defaultCategories = [
  {
    id: 1,
    title: "Luxury Collection",
    desc: "World-class estates, private islands, and architectural masterpieces across the globe.",
    badge: "1,240+ Listings",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Elite Auctions",
    desc: "Transparent bidding for exclusive properties and prime acquisitions.",
    badge: "Live Now",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "New Construction",
    desc: "Discover newly built trophy homes and cutting-edge architectural developments.",
    badge: "New Developments",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb18f8f3c?auto=format&fit=crop&w=800&q=80",
  },
];

function Collection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/collection`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data.data) && data.data.length > 0) {
            setItems(data.data);
            return;
          }
        }
        setItems(defaultCategories);
      } catch (err) {
        console.error("Error fetching collections:", err);
        setItems(defaultCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const displayList = items.length > 0 ? items.slice(0, 3) : defaultCategories;

  return (
    <section className="bg-[#090909] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-0">
          <div>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[3px] sm:tracking-[4px] text-[#C88719]">
              Collections
            </p>
            <h1 className="mt-2 sm:mt-3 text-3xl sm:text-4xl md:text-5xl font-serif text-white leading-tight">
              Curated Property Categories
            </h1>
          </div>

          <button
            onClick={() => navigate("/marketplace")}
            className="flex w-max items-center gap-3 text-base sm:text-lg text-white transition hover:text-[#C88719] group"
          >
            Explore All Categories
            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-gray-400">Loading collections...</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayList.map((item, idx) => (
              <CollectionCard
                key={item._id || item.id || idx}
                item={{
                  title: item.title,
                  desc: item.description || item.desc,
                  badge: item.badge,
                  image: item.image || item.images?.[0] || defaultCategories[idx % defaultCategories.length].image,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Collection;