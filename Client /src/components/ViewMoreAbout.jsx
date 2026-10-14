import { useEffect, useState } from "react";
import ViewGalleryCard from "./ViewGallaryCard";
import API_URL from "../Services/Api";
import about1 from "../assets/about1.png";
import about2 from "../assets/about2.png";
import about3 from "../assets/about3.png";
import about4 from "../assets/about4.png";
import about5 from "../assets/about5.png";

const defaultGallery = [
  { id: 1, image: about1 },
  { id: 2, image: about2 },
  { id: 3, image: about3 },
  { id: 4, image: about4 },
  { id: 5, image: about5 },
];

function ViewMoreAbout({ images = [] }) {
  const [gallery, setGallery] = useState(defaultGallery);

  useEffect(() => {
    if (Array.isArray(images) && images.length > 0) {
      setGallery(images.map((img, i) => ({ id: i, image: img })));
      return;
    }

    const fetchPropertiesGallery = async () => {
      try {
        const res = await fetch(`${API_URL}/properties`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.data) && data.data.length > 0) {
            const extracted = data.data
              .flatMap((p) => (Array.isArray(p.image) ? p.image : [p.image || p.images]))
              .filter(Boolean)
              .slice(0, 5)
              .map((img, idx) => ({ id: idx, image: img }));

            if (extracted.length > 0) {
              setGallery(extracted);
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch gallery images:", err);
      }
    };

    fetchPropertiesGallery();
  }, [images]);

  return (
    <section className="bg-[#111111] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-8 text-3xl font-semibold text-white">
          More About
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {gallery.map((item) => (
            <ViewGalleryCard
              key={item.id}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ViewMoreAbout;