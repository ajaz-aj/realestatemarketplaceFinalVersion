import React, { useState } from 'react';

const rooms = ["Studio", "1+", "2+", "4+"];

function FilterBedrooms() {
    const [active, setActive] = useState("1+");

    return (
        <div className='py-6 border-t border-gray-800'>
            <h3 className='text-xl font-semibold'>BEDS & BATHS</h3>
            <p className='text-gray-400 mt-2 text-sm'>Minimum Bedrooms</p>
            <div className="mt-4 flex overflow-hidden rounded-xl bg-[#1A1A1A] p-1 border border-gray-800">
                {rooms.map((room) => (
                    <button
                        key={room}
                        type="button"
                        onClick={() => setActive(room)}
                        className={`flex-1 py-2.5 text-sm font-semibold transition-all rounded-lg ${
                            active === room ? 'bg-[#C88719] text-white shadow' : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        {room}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FilterBedrooms;