import React from 'react'
import SideBar from '../components/SideBar'
import PropertyGrid from '../components/PropertyGrid'
import Topsection from '../components/Topsection'

function Properties() {
  return (
    <div className="min-h-screen bg-black text-white">
        <Topsection />
        
        {/* Main Content Dashboard Area */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
                
                {/* Sidebar Filter Section */}
                <div className="w-full lg:w-auto shrink-0">
                    <SideBar />
                </div>
                
                {/* Property Grid Results Section */}
                <div className="w-full flex-1">
                    <PropertyGrid />
                </div>

            </div>
        </div>
    </div>
  )
}

export default Properties;