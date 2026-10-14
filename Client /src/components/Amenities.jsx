import React, { useState } from "react";

const items = ["Swimming Pool", "Smart Home Tech", "Private Gym"];

function Amenities() {
  const [selected, setSelected] = useState(["Swimming Pool"]);

  const toggle = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  return (
    <div className="py-6 border-t border-gray-800">
      <h3 className="text-xl font-semibold mb-6">AMENITIES</h3>
      <div className="space-y-4">
        {items.map((item) => (
          <label key={item} className="flex items-center gap-4 cursor-pointer text-gray-300">
            <input
              type="checkbox"
              checked={selected.includes(item)}
              onChange={() => toggle(item)}
              className="accent-[#C88719] w-5 h-5 rounded"
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default Amenities;