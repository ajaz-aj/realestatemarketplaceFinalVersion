import { useEffect, useState } from "react";
import API_URL from "../Services/Api";

function RecentSales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/sales`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.data) && data.data.length > 0) {
            setSales(data.data);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to fetch recent sales:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  return (
    <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 w-full max-w-md lg:max-w-[400px] h-full mx-auto shadow-xl">
      <h2 className="text-2xl sm:text-3xl font-bold mb-5 tracking-tight text-gray-900">
        Recent Sales
      </h2>

      {loading ? (
        <div className="py-8 text-center text-gray-400">Loading recent sales...</div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {sales.map((item) => (
            <div
              key={item._id || item.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 pb-4 sm:pb-0 border-b border-gray-100 sm:border-b-0 last:border-b-0"
            >
              {/* Left */}
              <div className="flex items-center gap-4 sm:gap-5 w-full sm:w-auto">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 sm:w-15 sm:h-15 rounded-xl sm:rounded-2xl object-cover shrink-0"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                    {item.title}
                  </h3>

                  <p className="text-blue-600 text-sm sm:text-base font-bold mt-0.5 sm:mt-1">
                    {item.price}
                  </p>
                </div>
              </div>

              {/* Right */}
              <span className="self-end sm:self-auto bg-orange-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default RecentSales;