import React from 'react'
import ChatHero from '../components/ChatHero'
import AdvisorCard from '../components/AdvisorCard'
import ChatInterface from '../components/ChatInterface'
import InvestmentProfile from '../components/InvestmentProfile'

function ChatSection() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ChatHero />
      
      {/* Main Workspace Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-8 md:py-12 space-y-8 lg:space-y-12">
        
        {/* Main Consultation Row: Advisor Card & Main Live Chat Interface */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center lg:items-stretch">
          <div className="w-full lg:w-auto shrink-0 flex justify-center">
            <AdvisorCard />
          </div>
          <div className="w-full flex-1">
            <ChatInterface />
          </div>
        </div>

        {/* Supporting Investment Profile Dossier */}
        <div className="w-full flex justify-center">
          <InvestmentProfile />
        </div>

      </div>
    </div>
  );
}

export default ChatSection;