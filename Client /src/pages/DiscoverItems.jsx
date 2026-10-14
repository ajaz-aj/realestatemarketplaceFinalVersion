import { useEffect, useState } from "react";
import DiscoveredCollectionsHeader from "../components/DiscoveredCollectionsHeader";
import GridSystemForItem from "../components/GridSystemForItem";
import API_URL from "../Services/Api";

function DiscoverItems() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProps = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/properties`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.data)) {
            setProperties(data.data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch discovered properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProps();
  }, []);

  return (
    <div className="min-h-screen bg-black px-4 py-8 sm:px-6 md:p-12 lg:p-16">
      <div className="mx-auto max-w-7xl">
        <DiscoveredCollectionsHeader />
        
        <div className="mt-6 md:mt-8">
          {loading ? (
            <div className="py-16 text-center text-gray-400">Loading discovered collections...</div>
          ) : (
            <GridSystemForItem properties={properties} />
          )}
        </div>
      </div>
    </div>
  );
}

export default DiscoverItems;