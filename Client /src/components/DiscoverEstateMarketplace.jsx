import React from "react";
import { useNavigate } from "react-router-dom";
import PropertyCardMarketplace from "./PropertyCardMarketplace";
import { useEffect, useState } from "react";
import API_URL from "../Services/Api";

function DiscoverEstateMarketplace() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/properties`);
        const data = await response.json();

        console.log(data.data);

        if (!response.ok) {
          throw new Error(
            `${data.message || "Failed to fetch properties"} (status ${response.status})`
          );
        }

        setProperties(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setError(error.message || "Unable to load properties");
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <section className="bg-[#090909] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Discover Estates
          </h1>

          <button
            onClick={() => navigate("/discoveritems")}
            className="text-xs sm:text-sm font-semibold text-gray-300 hover:text-white transition-colors shrink-0"
          >
            View All
          </button>
        </div>

        {loading ? (
          <p className="text-center text-white">Loading properties...</p>
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : properties.length === 0 ? (
          <p className="text-center text-gray-400">No properties found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {properties.map((property) => (
              <PropertyCardMarketplace
                key={property._id || property.id}
                property={property}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default DiscoverEstateMarketplace;