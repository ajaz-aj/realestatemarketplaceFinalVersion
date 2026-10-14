import React from "react";

function RentalCollectionCard({ item }) {
  if (!item) return null;

  const displayImage =
    item.image ||
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";

  return (
    <div
      className={`relative overflow-hidden rounded-3xl group cursor-pointer ${
        item.large ? "h-[600px]" : "h-[290px]"
      }`}
    >
      <img
        src={displayImage}
        alt={item.title || "Rental Collection"}
        className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 p-6 pointer-events-none">
        <h2 className="text-white text-3xl sm:text-4xl font-bold">{item.title}</h2>
        {item.subtitle && (
          <p className="text-gray-300 mt-2 text-sm sm:text-base">{item.subtitle}</p>
        )}
      </div>
    </div>
  );
}

export default RentalCollectionCard;