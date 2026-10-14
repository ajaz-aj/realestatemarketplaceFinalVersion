import React from 'react';
import { FaGlobe } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import { TiMail } from "react-icons/ti";

const Footer = () => {
  return (
    <div className='bg-stone-300 w-full flex flex-col pt-12'>
      
      {/* Top Section: Flex column on mobile, Row on large screens */}
      <div className='flex flex-col lg:flex-row justify-between w-full px-8 md:px-16'>

        {/* Brand & Description */}
        <div className='flex flex-col mb-12 lg:mb-0 lg:w-1/3'>
          <h1 className='text-2xl font-bold mb-4 tracking-tight'>
            LUXEREALITY
          </h1>
          <p className='text-gray-600 mb-8 max-w-sm'>
            The premier destination for high-end real estate transactions. We bridge the gap between architectural excellence and sophisticated investors worldwide.
          </p>

          {/* Social Icons */}
          <div className='flex gap-6'>
            <div className='bg-white rounded-full p-4 hover:shadow-xl cursor-pointer transition-shadow'>
              <FaGlobe className='h-6 w-6 text-gray-800' />
            </div>
            <div className='bg-white rounded-full p-4 hover:shadow-xl cursor-pointer transition-shadow'>
              <IoShareSocialOutline className='h-6 w-6 text-gray-800' />
            </div>
            <div className='bg-white rounded-full p-4 hover:shadow-xl cursor-pointer transition-shadow'>
              <TiMail className='h-6 w-6 text-gray-800' />
            </div>
          </div>
        </div>
        
        {/* Links Section: Grid layout for responsive stacking */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-10 lg:w-2/3 lg:justify-items-end'>
          <div className='flex flex-col'>
            <h1 className='text-black text-lg font-bold mb-5'>Company</h1>
            <p className='text-gray-600 mb-3 hover:text-blue-500 cursor-pointer transition-colors'>Terms of Service</p>
            <p className='text-gray-600 mb-3 hover:text-blue-500 cursor-pointer transition-colors'>Privacy Policy</p>
            <p className='text-gray-600 mb-3 hover:text-blue-500 cursor-pointer transition-colors'>Career</p>
          </div>
          <div className='flex flex-col'>
            <h1 className='text-black text-lg font-bold mb-5'>Resources</h1>
            <p className='text-gray-600 mb-3 hover:text-blue-500 cursor-pointer transition-colors'>Real Estate News</p>
            <p className='text-gray-600 mb-3 hover:text-blue-500 cursor-pointer transition-colors'>Market Report</p>
            <p className='text-gray-600 mb-3 hover:text-blue-500 cursor-pointer transition-colors'>Concierge FAQ</p>
          </div>
          <div className='flex flex-col'>
            <h1 className='text-black text-lg font-bold mb-5'>Contact</h1>
            <p className='text-gray-600 mb-3 hover:text-blue-500 cursor-pointer transition-colors'>Contact Us</p>
            <p className='text-gray-600 mb-3 hover:text-blue-500 cursor-pointer transition-colors'>Support Center</p>
            <p className='text-gray-600 mb-3 hover:text-blue-500 cursor-pointer transition-colors'>Partner Program</p>
          </div>
        </div>
      </div>
      
      {/* Bottom Section: Copyright & Status */}
      <div className='flex flex-col md:flex-row justify-between items-center border-t border-stone-400 mt-12 px-8 md:px-16 py-6'>
        <p className='font-semibold text-gray-600 text-sm text-center md:text-left mb-4 md:mb-0'>
          © 2026 Luxe Realty. All rights reserved. Precision in Every Transaction.
        </p>
        <p className='font-bold text-gray-800 text-sm'>
          Platform Status: <span className="text-green-600">Optimal</span>
        </p>
      </div>

    </div>
  )
}

export default Footer;