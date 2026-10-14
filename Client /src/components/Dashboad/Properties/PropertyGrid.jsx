import { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import PropertyDetailModal from "./PropertyDetailModal";
import API_URL from "../../../Services/Api";

function PropertyGrid() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/properties`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.data)) {
          const adapted = data.data.map((p, idx) => {
            const rawImg = Array.isArray(p.image)
              ? p.image[0]
              : Array.isArray(p.images) && p.images.length > 0
              ? p.images[0]
              : p.image || p.images;

            return {
              ...p,
              id: p._id || p.id,
              listingId: p.listingId || `LX-${108 - idx}`,
              type: (p.propertyType || "Villa").charAt(0).toUpperCase() + (p.propertyType || "Villa").slice(1),
              status: p.badge === "Sold" ? "Sold" : p.badge === "Pending" ? "Pending" : "Active",
              price: typeof p.price === "number" ? `₹${p.price.toLocaleString("en-IN")}` : p.price,
              image: rawImg || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
              location: typeof p.location === "object" ? `${p.location.address || p.location.city || "Bangalore"}` : p.location || "Bangalore",
              beds: `${p.bedrooms || 3} BHK`,
              baths: p.bathrooms || 3,
              area: `${p.area || 2400} sq.ft`,
              views: p.views || (1400 + idx * 450),
              leads: p.leads || (18 + idx * 6),
              visits: p.visits || (7 + idx * 2),
            };
          });
          setProperties(adapted);
          return;
        }
      }
    } catch (err) {
      console.error("Failed to fetch dashboard properties:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleView = (item) => setSelectedProperty(item);
  const handleEdit = (item) => console.log("Edit", item.id);
  const handleDelete = async (item) => {
    if (!window.confirm(`Are you sure you want to delete "${item.title}"?`)) return;
    try {
      await fetch(`${API_URL}/properties/${item.id}`, { method: "DELETE" });
      setProperties((prev) => prev.filter((p) => p.id !== item.id));
      setSelectedProperty(null);
    } catch (err) {
      console.error("Failed to delete property:", err);
    }
  };

  return (
    <>
      {loading ? (
        <div className="py-16 text-center text-gray-500">Loading properties from database...</div>
      ) : properties.length === 0 ? (
        <div className="py-16 text-center text-gray-500">No properties found in portfolio.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {properties.map((item) => (
            <PropertyCard
              key={item.id}
              item={item}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {selectedProperty && (
        <PropertyDetailModal
          item={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}

export default PropertyGrid;