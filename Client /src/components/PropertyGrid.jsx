import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import API_URL from "../Services/Api";

function PropertyGrid() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/properties`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.data) && data.data.length > 0) {
            setProperties(data.data);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to fetch properties from backend:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <section className="bg-[#080808] py-8 sm:py-10 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-6 sm:mb-8 flex items-center justify-between border border-dashed border-gray-700 p-4 rounded-xl">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
            Discover Estate
          </h2>
          <button 
            onClick={() => navigate("/marketplace")}
            className="text-xs sm:text-sm font-semibold text-gray-300 hover:text-[#d4af37] transition-colors shrink-0 cursor-pointer"
          >
            View All
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-gray-400">Loading exclusive estates...</div>
        ) : properties.length === 0 ? (
          <div className="py-12 text-center text-gray-500">No estates found in the database.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            {properties.slice(0, 6).map((item) => (
              <PropertyCard
                key={item._id || item.id}
                item={item}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default PropertyGrid;