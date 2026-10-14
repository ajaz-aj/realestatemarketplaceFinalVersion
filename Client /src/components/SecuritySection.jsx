import { useEffect, useState } from "react";
import city from "../assets/City.jpg";
import { ShieldCheck, BadgeCheck, Lock } from "lucide-react";
import FeatureItemSecurity from "./FeatureItemSecurity";
import API_URL from "../Services/Api";

const iconMap = {
  ShieldCheck,
  BadgeCheck,
  Lock,
};

function SecuritySection() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchSecurityContent = async () => {
      try {
        const res = await fetch(`${API_URL}/content/security`);
        if (res.ok) {
          const data = await res.json();
          if (data.data?.items && Array.isArray(data.data.items) && data.data.items.length > 0) {
            const enriched = data.data.items.map((item) => ({
              ...item,
              icon: iconMap[item.icon] || ShieldCheck,
            }));
            setFeatures(enriched);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to fetch security features:", err);
      }
      // Fallback
      setFeatures([
        {
          id: 1,
          icon: ShieldCheck,
          title: "Expert Vetting Process",
          description: "Every asset undergoes a rigorous 200-point inspection and legal audit before inclusion in our pools.",
        },
        {
          id: 2,
          icon: BadgeCheck,
          title: "Fractional Ownership",
          description: "Invest in multi-million dollar assets with lower entry points through our secure syndication model.",
        },
        {
          id: 3,
          icon: Lock,
          title: "Bank-Grade Custody",
          description: "Assets are held in bankruptcy-remote vehicles with institutional-grade protection protocols.",
        },
      ]);
    };

    fetchSecurityContent();
  }, []);

  return (
    <section className="bg-[#0b0b0b] py-3 md:py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-2xl md:rounded-3xl bg-black p-6 sm:p-8 md:p-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:gap-12 lg:grid-cols-2">
          {/* Left Side */}
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-white tracking-tight">
              Unparalleled Security,
              <br className="hidden sm:block" />
              Absolute Transparency.
            </h2>

            <p className="mt-6 md:mt-8 text-base sm:text-lg md:text-xl leading-relaxed text-gray-400">
              We combine centuries of real estate wisdom with cutting-edge
              blockchain technology to provide a secure, liquid and
              high-performance investment experience.
            </p>

            <div className="mt-10 md:mt-14 space-y-6 sm:space-y-8 md:space-y-10">
              {features.map((item) => (
                <FeatureItemSecurity
                  key={item.id}
                  Icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="overflow-hidden rounded-2xl md:rounded-3xl">
            <img
              src={city}
              alt="Cityscape representing security and transparency"
              className="h-[350px] sm:h-[500px] lg:h-[700px] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SecuritySection;