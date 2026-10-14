import React from 'react'
import TopSectionM from '../components/TopSectionM'
import FeatureCollectionMarketplace from '../components/FeatureCollectionMarketplace'
import DiscoverEstateMarketplace from '../components/DiscoverEstateMarketplace'
import RecentSales from '../components/RecentSales'

function MarketPlace() {
  return (
    <div className="min-h-screen bg-black text-white">
        <TopSectionM />
        <FeatureCollectionMarketplace />
        
        {/* Main Content Area */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
                
                {/* Discover Estates Section */}
                <div className="w-full lg:flex-1">
                    <DiscoverEstateMarketplace />
                </div>
                
                {/* Recent Sales Sidebar */}
                <div className="w-full lg:w-[400px] shrink-0">
                    <RecentSales />
                </div>

            </div>
        </div>
    </div>
  )
}

export default MarketPlace;