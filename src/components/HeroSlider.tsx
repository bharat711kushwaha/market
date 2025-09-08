// HeroSlider.tsx - Cyberpunk Theme
import React, { useState, useEffect } from 'react';

interface SlideProps {
  id: number;
  backgroundImage: string;
  title: string;
  subtitle: string;
  trending: string;
}

interface HeroSliderProps {
  slides: SlideProps[];
  autoplayInterval?: number;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ 
  slides, 
  autoplayInterval = 5000  // Default 5 seconds
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, autoplayInterval);
    
    return () => clearInterval(interval);
  }, [slides.length, autoplayInterval]);
  
  const nextSlide = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  
  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-gray-900">
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === activeSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${slide.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Cyberpunk Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-purple-900/40 to-cyan-900/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent"></div>
          
          <div className="container mx-auto h-full flex items-center px-4 relative z-10">
            <div className="max-w-2xl">
              {/* Subtitle */}
              <h5 className="text-cyan-400 text-sm md:text-base font-black mb-3 tracking-widest uppercase">
                {slide.subtitle}
              </h5>
              
              {/* Main Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text leading-tight tracking-wider uppercase">
                {slide.title}
              </h1>
              
              {/* Trending Text */}
              <span className="block mb-8 text-gray-300 text-lg tracking-wide">
                {slide.trending}
              </span>
              
              {/* CTA Button */}
              <a href="#" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-pink-500 text-black font-black rounded-lg hover:from-cyan-400 hover:to-pink-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 hover:scale-105 tracking-wider uppercase">
                SHOP NOW
                <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Arrows */}
      <button 
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gray-800 border-2 border-cyan-500/30 p-3 rounded-xl shadow-lg hover:border-cyan-400 hover:bg-gray-700 hover:shadow-cyan-500/25 focus:outline-none transition-all duration-300 z-20"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <svg className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-gray-800 border-2 border-cyan-500/30 p-3 rounded-xl shadow-lg hover:border-cyan-400 hover:bg-gray-700 hover:shadow-cyan-500/25 focus:outline-none transition-all duration-300 z-20"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <svg className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button 
            key={index}
            className={`h-3 w-3 rounded-full transition-all duration-300 border-2 ${
              index === activeSlide 
                ? 'bg-gradient-to-r from-cyan-500 to-pink-500 border-transparent scale-125 shadow-lg shadow-cyan-500/50' 
                : 'bg-transparent border-gray-400 hover:border-cyan-400'
            }`}
            onClick={() => setActiveSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Cyberpunk Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
      </div>
    </div>
  );
};

export default HeroSlider;