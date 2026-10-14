import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import API_URL from "../Services/Api";

function FeatureAuction() {
  const navigate = useNavigate();
  const [auctionItems, setAuctionItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        setLoading(true);
        // Try fetching active auctions
        const auctionRes = await fetch(`${API_URL}/auctions`);
        const propRes = await fetch(`${API_URL}/properties`);

        let merged = [];
        if (auctionRes.ok) {
          const aData = await auctionRes.json();
          if (Array.isArray(aData.data) && aData.data.length > 0) {
            merged = aData.data.map((a) => ({
              ...(a.property || {}),
              _id: a.property?._id || a._id,
              price: a.currentPrice || a.startingPrice || a.property?.price,
              auction: true,
              badge: "Live Auction",
              bids: 18,
              time: "64h 14m 43s",
            }));
          }
        }

        if (propRes.ok) {
          const pData = await propRes.json();
          if (Array.isArray(pData.data)) {
            // Find additional properties to display
            const otherProps = pData.data
              .filter((p) => !merged.some((m) => m._id === p._id))
              .slice(0, 3);
            merged = [...merged, ...otherProps];
          }
        }

        setAuctionItems(merged);
      } catch (err) {
        console.error("Failed to fetch auctions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <section className="bg-[#080808] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-4xl font-bold text-white tracking-tight">
            Featured Auctions
          </h2>

          <button
            onClick={() => navigate("/auction")}
            className="text-lg text-gray-300 transition hover:text-[#d4af37] cursor-pointer"
          >
            View All
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-gray-400">Loading auction estates...</div>
        ) : auctionItems.length === 0 ? (
          <div className="py-12 text-center text-gray-500">No active auctions at this moment.</div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {auctionItems.map((item) => (
              <PropertyCard key={item._id || item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeatureAuction;