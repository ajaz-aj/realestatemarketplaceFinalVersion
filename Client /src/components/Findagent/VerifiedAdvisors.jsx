import { useEffect, useState } from "react";
import AdvisorCard from "./AgentCard.jsx";
import API_URL from "../../Services/Api";

export default function VerifiedAdvisors() {
  const [advisorsList, setAdvisorsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("rating-high");

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/agents`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.data) && data.data.length > 0) {
            setAdvisorsList(data.data);
            return;
          }
        }
      } catch (e) {
        console.error("Error fetching agents from database:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const sortedList = [...advisorsList].sort((a, b) => {
    const ratingA = Number(a.rating || 4.9);
    const ratingB = Number(b.rating || 4.9);
    const reviewsA = Number(a.reviews || a.reviewCount || 0);
    const reviewsB = Number(b.reviews || b.reviewCount || 0);

    if (sortBy === "rating-high") return ratingB - ratingA;
    if (sortBy === "rating-low") return ratingA - ratingB;
    if (sortBy === "reviews") return reviewsB - reviewsA;
    return 0;
  });

  return (
    <section className="bg-[#0A0806] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Verified Sovereign Advisors
            </h2>
            <p className="mt-2 text-gray-400">
              Displaying top syndication brokers across ultra-luxury
              residential &amp; private commercial assets.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-[11px] font-semibold tracking-wide text-gray-500">
              SORT BY:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-white/10 bg-[#141210] px-4 py-2.5 text-white outline-none cursor-pointer"
            >
              <option value="rating-high">Rating: High to Low</option>
              <option value="rating-low">Rating: Low to High</option>
              <option value="reviews">Most Reviewed</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="py-16 text-center text-gray-400">Loading verified advisors from database...</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {sortedList.map((advisor, index) => (
              <AdvisorCard key={advisor._id || advisor.id || index} advisor={advisor} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}