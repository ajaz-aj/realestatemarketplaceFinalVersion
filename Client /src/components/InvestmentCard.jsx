function InvestmentCard({ image, title, subtitle }) {
  return (
    <div className="group relative h-[430px] overflow-hidden rounded-3xl cursor-pointer">

      {/* Image */}
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover duration-500 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

      {/* Text */}
      <div className="absolute bottom-8 left-6">
        <h2 className="text-white text-3xl font-semibold">
          {title}
        </h2>

        <p className="text-gray-200 mt-2">
          {subtitle}
        </p>
      </div>

    </div>
  );
}

export default InvestmentCard;