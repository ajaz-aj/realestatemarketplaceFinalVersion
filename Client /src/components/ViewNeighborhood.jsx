import { useEffect, useState } from "react";
import map from "../assets/ViewMap.png";
import AttractionItem from "./ViewMapItem";
import { Crosshair, Wine, Trees, UtensilsCrossed, Plane } from "lucide-react";
import API_URL from "../Services/Api";

const iconMap = {
  Crosshair,
  Wine,
  Trees,
  UtensilsCrossed,
  Plane,
};

const defaultAttractions = [
  { icon: Crosshair, title: "8 Minutes To Downtown Napa" },
  { icon: Wine, title: "5 Minutes To World-Class Wineries" },
  { icon: Trees, title: "10 Minutes To Silverado Resort & Golf Club" },
  { icon: UtensilsCrossed, title: "Walking Distance To Michelin-Star Restaurants" },
  { icon: Plane, title: "1 Hour To San Francisco International Airport (SFO)" },
];

function ViewNeighborhood({ locationTitle = "Napa Valley, California" }) {
  const [attractions, setAttractions] = useState(defaultAttractions);

  useEffect(() => {
    const fetchNeighborhood = async () => {
      try {
        const res = await fetch(`${API_URL}/content/neighborhood`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.data?.items) && data.data.items.length > 0) {
            const enriched = data.data.items.map((item) => ({
              ...item,
              icon: iconMap[item.icon] || Trees,
            }));
            setAttractions(enriched);
          }
        }
      } catch (err) {
        console.error("Failed to load neighborhood highlights:", err);
      }
    };

    fetchNeighborhood();
  }, []);

  return (
    <section className="bg-[#111111] py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:gap-16 lg:grid-cols-2">
          {/* Left Side */}
          <div>
            <span className="inline-block rounded-lg bg-blue-900 px-4 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
              The Neighborhood
            </span>

            <h2 className="mt-6 sm:mt-8 font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              {locationTitle}
            </h2>

            <p className="mt-4 sm:mt-8 max-w-xl text-base sm:text-lg md:text-xl leading-relaxed sm:leading-9 text-gray-400">
              Nestled in prestigious prime locations, our properties combine luxury, privacy,
              and breathtaking views.
              Residents enjoy easy access to fine dining, luxury resorts and premier outdoor experiences.
            </p>

            <button className="mt-6 sm:mt-10 rounded-lg bg-blue-900 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white transition-colors hover:bg-blue-800">
              Nearby Attractions
            </button>

            <div className="mt-6 sm:mt-10 space-y-4 sm:space-y-8">
              {attractions.map((item, index) => (
                <AttractionItem
                  key={index}
                  Icon={item.icon}
                  title={item.title}
                />
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full">
            <img
              src={map}
              alt="Neighborhood map"
              className="h-[350px] sm:h-[420px] md:h-[520px] w-full rounded-2xl md:rounded-3xl object-cover shadow-2xl border border-white/5"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ViewNeighborhood;