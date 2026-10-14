import React from 'react';

function PriceRangeFilter() {
  return (
    <div className="space-y-4 pb-6">
      <h3 className="text-xl font-semibold mb-6">PRICE RANGE</h3>
      <div className='flex gap-3'>
        <input type='number' placeholder='MIN' className='w-1/2 rounded-xl bg-white py-3 px-4 text-black outline-none'/>
        <input type='number' placeholder='MAX' className='w-1/2 rounded-xl bg-white py-3 px-4 text-black outline-none'/>
      </div>
      <input type='range' className='w-full mt-6 accent-[#C88719]'/>
    </div>
  );
}

export default PriceRangeFilter;