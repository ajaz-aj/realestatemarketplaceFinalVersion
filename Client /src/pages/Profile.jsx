import React from 'react';
import PersonalConciergeCard from '../components/PersonalConciergeCard';
import ProfileCard from '../components/ProfileCard';
import SavedCollection from '../components/SavedCollection';

function Profile() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-20 sm:pt-24 px-4 sm:px-6 md:px-10 pb-12 sm:pb-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
            
            {/* Left Sidebar */}
            <div className="flex flex-col gap-6 w-full lg:w-[350px] shrink-0">
                <ProfileCard />
                <PersonalConciergeCard />
            </div>
            
            {/* Right Content Area */}
            <div className="w-full flex-1">
                <SavedCollection />
            </div>
            
        </div>
      </div>
    </div>
  );
}

export default Profile;