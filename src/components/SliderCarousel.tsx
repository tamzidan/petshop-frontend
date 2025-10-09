import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Slider } from '../types';

interface SliderCarouselProps {
  sliders: Slider[];
}

const SliderCarousel = ({ sliders }: SliderCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (sliders.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === sliders.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Auto slide every 5 seconds

    return () => clearInterval(interval);
  }, [sliders.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliders.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === sliders.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (sliders.length === 0) {
    return null;
  }

  const currentSlider = sliders[currentIndex];

  return (
    <div className="relative w-full aspect-video md:h-[300px] lg:h-[600px] overflow-hidden bg-white group">
      {/* Slider Image */}
      <div className="relative w-full h-full">
        {currentSlider.link_url ? (
          <a
            href={currentSlider.link_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            <img
              src={currentSlider.image_url}
              alt={currentSlider.title}
              className="w-full h-full object-cover"
            />
          </a>
        ) : (
          <img
            src={currentSlider.image_url}
            alt={currentSlider.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Navigation Arrows */}
      {sliders.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {sliders.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {sliders.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white w-6 md:w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SliderCarousel;
