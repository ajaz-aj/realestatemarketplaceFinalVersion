function ViewDetailsDescription({ property }) {
  let priceText = "₹31,500,000";
  if (property) {
    if (typeof property.price === "number") {
      priceText = `₹${property.price.toLocaleString("en-IN")}`;
    } else if (property.price) {
      priceText = String(property.price);
    }
  }

  const beds = property?.beds ?? property?.bedrooms ?? 4;
  const baths = property?.baths ?? property?.bathrooms ?? 5;
  const sqft = property?.sqft ?? property?.area ?? 10050;
  const title = property?.title || "The Grand Horizon";
  const desc = property?.description;

  return (
    <section className="bg-[#111111] py-12 md:py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-2xl md:rounded-3xl bg-black px-6 sm:px-8 py-8 md:px-12 md:py-12 border border-white/5 shadow-2xl">

        {/* Top Row: Price & Stats */}
        <div className="flex flex-col lg:flex-row gap-8 lg:items-center lg:justify-between">

          {/* Price */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 font-medium">
              {property?.listingType === "rent" ? "Monthly Rent" : "Asking Price"}
            </p>

            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              {priceText}
            </h2>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center bg-[#0d0d0d] lg:bg-transparent p-4 lg:p-0 rounded-xl border border-white/10 lg:border-none">

            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 font-medium">
                Beds
              </p>

              <h3 className="mt-1 sm:mt-2 font-serif text-2xl sm:text-3xl text-white">
                {beds}
              </h3>
            </div>

            <div className="border-x border-white/10 lg:border-none px-2 lg:px-0">
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 font-medium">
                Baths
              </p>

              <h3 className="mt-1 sm:mt-2 font-serif text-2xl sm:text-3xl text-white">
                {baths}
              </h3>
            </div>

            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 font-medium">
                Sqft
              </p>

              <h3 className="mt-1 sm:mt-2 font-serif text-2xl sm:text-3xl text-white">
                {typeof sqft === "number" ? sqft.toLocaleString("en-IN") : sqft}
              </h3>
            </div>

          </div>

        </div>

        {/* Divider */}
        <div className="my-6 md:my-8 h-px w-full bg-yellow-700/60"></div>

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
          {title}
        </h1>

        {/* Description */}
        <div className="mt-6 md:mt-10 max-w-6xl space-y-6 md:space-y-8">
          {desc ? (
            <p className="text-base sm:text-lg leading-relaxed md:leading-9 text-gray-300">
              {desc}
            </p>
          ) : (
            <>
              <p className="text-base sm:text-lg leading-relaxed md:leading-9 text-gray-400">
                Positioned on the prestigious Platinum Row overlooking the charming
                village of Zermatt, The Alpine Sanctuary is an architectural
                masterpiece designed for those who appreciate privacy,
                sophistication, and timeless design.
              </p>

              <p className="text-base sm:text-lg leading-relaxed md:leading-9 text-gray-400">
                Every detail has been thoughtfully curated—from natural stone
                exteriors and floor-to-ceiling glass walls to handcrafted oak
                interiors and custom Italian finishes. Expansive living spaces
                seamlessly connect with panoramic terraces, creating an effortless
                indoor-outdoor lifestyle.
              </p>
            </>
          )}

          <p className="text-base sm:text-lg leading-relaxed md:leading-9 text-gray-400">
            The residence features an open-concept great room with soaring
            ceilings, a designer kitchen equipped with premium appliances, a
            temperature-controlled wine cellar, private wellness spa, home
            cinema, and an infinity-edge pool overlooking scenic landscapes.
          </p>

          <p className="text-base sm:text-lg leading-relaxed md:leading-9 text-gray-400">
            Whether as a private sanctuary or an elite portfolio asset, this
            residence offers an extraordinary luxury living experience unlike any
            other.
          </p>

        </div>

      </div>
    </section>
  );
}

export default ViewDetailsDescription;