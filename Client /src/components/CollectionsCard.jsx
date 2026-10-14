function Card({ item }) {
  return (
    <div className="relative h-[650px] rounded-3xl overflow-hidden">
      <img
        src={item.image || "/placeholder.jpg"}
        alt={item.title}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      <div className="absolute bottom-8 left-6 text-white">
        {item.badge && (
          <span className="bg-amber-600 px-5 py-2 rounded-xl font-semibold">
            {item.badge}
          </span>
        )}

        <h2 className="text-3xl font-bold mt-5">{item.title}</h2>

        <p className="mt-2 text-gray-300">{item.desc}</p>
      </div>
    </div>
  );
}

export default Card;