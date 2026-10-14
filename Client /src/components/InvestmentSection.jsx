import { useEffect, useState } from "react";
import InvestmentCard from "./InvestmentCard";
import API_URL from "../Services/Api";

function InvestmentSection() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/investments/portfolios`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.data) && data.data.length > 0) {
            setPortfolios(data.data);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to fetch investment portfolios:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  return (
    <section className="bg-[#0b0b0b] py-5 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-white tracking-tight">
            Diversified Investment Verticals
          </h2>

          <p className="mt-4 md:mt-6 text-base sm:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Tailored Strategies To Meet The Risk-Return Profiles Of
            Modern High-Net-Worth Investors.
          </p>
        </div>

        {/* Cards */}
        {loading ? (
          <div className="py-16 text-center text-gray-400">Loading investment opportunities...</div>
        ) : (
          <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolios.map((item) => (
              <InvestmentCard
                key={item._id || item.id}
                image={item.image}
                title={item.title}
                subtitle={item.subtitle}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default InvestmentSection;