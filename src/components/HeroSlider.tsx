// HeroSlider.tsx
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
    <div className="relative h-[500px] md:h-[600px] overflow-hidden">
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
          <div className="container mx-auto h-full flex items-center px-4">
            <div className="max-w-lg">
              <h5 className="text-indigo-600 text-sm md:text-base font-medium mb-1">{slide.subtitle}</h5>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-gray-800 leading-tight">{slide.title}</h1>
              <span className="block mb-6 text-gray-600">{slide.trending}</span>
              
              <a href="#" className="inline-flex items-center px-6 py-3 border-2 border-gray-800 text-gray-800 font-medium rounded hover:bg-gray-800 hover:text-white transition duration-200">
                Shop Now
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Arrows */}
      <button 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none transition duration-300 z-10"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none transition duration-300 z-10"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button 
            key={index}
            className={`h-2 w-2 rounded-full transition-colors duration-300 ${
              index === activeSlide ? 'bg-indigo-600' : 'bg-gray-300'
            }`}
            onClick={() => setActiveSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;