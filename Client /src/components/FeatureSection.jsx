import React from "react";
import { collections } from "../assets/asset.js";


function FeatureSection({item}) {
  return (
    <section>
      <p
        className="
            text-blue-600
            tracking-[5px]
            font-bold
            "
      >
        {" "}
        COLLECTIONS
      </p>
      <div className="flex">
        <h1
          className="
                text-5xl
                font-bold
                mt-5
                "
        >
          Curated Property Categories
        </h1>
        <button
          className="
                    text-blue-600
                    font-bold
                    text-lg
                    "
        >
          Explore all categories →
        </button>
      </div>
      <div>
        <div className="relative h-[650px] rounded-3xl overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          <div className="absolute bottom-8 left-6 text-white">
            {item.live && (
              <span className="bg-amber-600 px-5 py-2 rounded-xl font-semibold">
                {item.badge}
              </span>
            )}

            <h2 className="text-3xl font-bold mt-5">{collection.title}</h2>

            <p className="mt-2 text-gray-300">{collection.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
