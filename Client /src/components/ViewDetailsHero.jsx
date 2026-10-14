import hero from "../assets/ViewDetailsHero.jpg";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../Services/Api";

function ViewDetailsHero({ property }) {
  const navigate = useNavigate();

  let bgImage = hero;
  if (property) {
    let raw = Array.isArray(property.image) && property.image.length > 0
      ? property.image[0]
      : Array.isArray(property.images) && property.images.length > 0
      ? property.images[0]
      : (typeof property.image === "string" ? property.image : typeof property.images === "string" ? property.images : null);

    if (raw && raw.startsWith("/uploads/")) {
      bgImage = `${SERVER_URL}${raw}`;
    } else if (raw) {
      bgImage = raw;
    }
  }

  const title = property?.title || "The Grand Horizon";
  const badge = property?.badge || (property?.listingType ? property.listingType.toUpperCase() : "Exclusive Portfolio");
  const description = property?.description || "A masterpiece of contemporary mountain living, nestled in the heart of Zermatt. Where architectural excellence meets breathtaking alpine scenery and uncompromising luxury.";

  return (
    <section
      className="relative min-h-[75vh] md:h-screen w-full overflow-hidden flex flex-col justify-between"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between px-4 sm:px-8 lg:px-16 py-6 sm:py-8 lg:py-12 flex-1">
        {/* Top */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 sm:gap-3 rounded-full border border-white/20 bg-black/40 px-4 sm:px-6 py-2.5 sm:py-3 text-white backdrop-blur-md transition hover:bg-black/70 text-xs sm:text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        {/* Bottom */}
        <div className="max-w-3xl pb-6 sm:pb-10 pt-20">
          <span className="inline-block rounded-md bg-blue-600 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium uppercase tracking-wide text-white shadow-lg">
            {badge}
          </span>

          <h1 className="mt-4 sm:mt-6 font-serif text-3xl sm:text-5xl md:text-7xl leading-tight text-white tracking-tight">
            {title}
          </h1>

          <p className="mt-3 sm:mt-6 text-sm sm:text-lg md:text-xl leading-relaxed sm:leading-8 text-gray-300 line-clamp-3 md:line-clamp-none">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ViewDetailsHero;