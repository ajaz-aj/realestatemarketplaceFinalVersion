import React, { useState } from 'react';

const types = [
    "Single Family Home",
    "Modern Condo",
    "Townhouse",
    "Penthouse Suite", 
];

function PropertryType() {
    const [selected, setSelected] = useState(types[0]);

    return (
        <div className='py-6 border-t border-gray-800'>
            <h3 className='text-xl font-semibold mb-6'>PROPERTY TYPE</h3>
            <div className='space-y-4'>
                {types.map((item) => (
                    <label key={item} className='flex items-center gap-4 cursor-pointer text-gray-300'>
                        <input 
                            type='radio' 
                            name='propertyType'
                            checked={selected === item}
                            onChange={() => setSelected(item)}
                            className="accent-[#C88719] w-5 h-5"
                        />
                        <span>{item}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

export default PropertryType;