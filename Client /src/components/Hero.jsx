import React from 'react';
import ImageHero from "../assets/hero.jpg";
import PropertySeartchBar from './PropertySeartchBar';

function Hero() {
  return (
    <section 
      className="relative h-[90vh] w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${ImageHero})` }}
    >
      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-6 md:px-12">
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center max-w-5xl leading-tight drop-shadow-lg">
          Extraordinary Living Starts with Precision
        </h1>
        
        <p className="mt-4 md:mt-6 text-lg md:text-xl lg:text-2xl text-center max-w-3xl drop-shadow-md">
          Discover the world's most exclusive properties with a platform designed for discerning investors and high-net-worth individuals.
        </p>
        
        {/* Added wrapper for top margin spacing to separate it from the text */}
        <div className="mt-8 md:mt-12 w-full flex flex-col items-center">
          <PropertySeartchBar />
          <a
            href="#consultation-form"
            className="mt-4 text-xs sm:text-sm text-gray-300 hover:text-[#d4af37] transition flex items-center gap-1.5 font-medium underline underline-offset-4 decoration-[#d4af37]/40 hover:decoration-[#d4af37]"
          >
            Looking for off-market portfolios? Speak with our Private Advisory Desk ↓
          </a>
        </div>
        
      </div>
    </section>
  );
}

export default Hero;