import { useEffect, useState } from "react";
import { FaTag, FaGavel } from "react-icons/fa";
import TransactionCard from "./TransactionCard";
import API_URL from "../Services/Api";

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/transactions`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.data) && data.data.length > 0) {
            // Enrich with UI styling
            const enriched = data.data.map((item) => {
              const isSeller = item.targetAudience === "sellers" || item.title.toLowerCase().includes("seller");
              return {
                ...item,
                icon: isSeller ? FaTag : FaGavel,
                cardBg: isSeller ? "bg-white" : "bg-[#111726]",
                textColor: isSeller ? "text-black" : "text-white",
                descColor: isSeller ? "text-gray-500" : "text-gray-400",
                iconBg: isSeller ? "bg-black text-white" : "bg-[#0A5FD9] text-white",
                numberBg: isSeller ? "bg-[#1A65D6] text-white" : "bg-[#1C1294] text-white",
                buttonClass: isSeller ? "bg-black text-white hover:bg-gray-800" : "bg-[#0A5FD9] text-white hover:bg-blue-700",
              };
            });
            setTransactions(enriched);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <section className="bg-black py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight">
            Seamless Transactions
          </h2>
          <p className="text-gray-400 mt-3 text-sm sm:text-base md:text-lg">
            Whether you are listing a premier property or securing your next investment, our platform delivers an uncompromising experience.
          </p>
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="py-16 text-center text-gray-400">Loading transactions workflow...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {transactions.map((item) => (
              <TransactionCard key={item._id || item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Transaction;