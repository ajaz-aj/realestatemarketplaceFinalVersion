import { useNavigate } from "react-router-dom";
import { properties as fallbackProperties } from "../assets/propertydataProduct";
import PropertyCardMarketplace from "./PropertyCardMarketplace";
import { useState, useEffect } from "react";
import API_URL from "../Services/Api";

function CommonCard() {
  const [propertiesList, setPropertiesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/properties`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          setPropertiesList(data.data);
        } else {
          setPropertiesList(fallbackProperties);
        }
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
        setPropertiesList(fallbackProperties);
      })
      .finally(() => setLoading(false));
  }, []);

  const itemsToDisplay = propertiesList.length > 0 ? propertiesList : fallbackProperties;

  return (
    <section className="bg-[#080808] py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 md:mb-10 flex items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              Curated Selection
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mt-1">
              Featured Opportunities
            </h2>
          </div>

          <button
            onClick={() => {
              navigate("/discoveritems");
            }}
            className="shrink-0 whitespace-nowrap text-sm sm:text-base text-gray-300 transition hover:text-[#d4af37]"
          >
            View All →
          </button>
        </div>

        {/* Grid Section */}
        {loading ? (
          <div className="py-12 text-center text-gray-400">Loading properties...</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {itemsToDisplay.map((property, idx) => (
              <PropertyCardMarketplace
                key={property._id || property.id || idx}
                property={property}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default CommonCard;