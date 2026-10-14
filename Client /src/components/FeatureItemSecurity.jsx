function FeatureItemSecurity({ Icon, title, description }) {
  return (
    <div className="flex gap-5">
      {/* Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20">
        <Icon size={24} className="text-blue-500" />
      </div>

      {/* Text */}
      <div>
        <h3 className="text-2xl font-semibold text-white">
          {title}
        </h3>

        <p className="mt-2 text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default FeatureItemSecurity;