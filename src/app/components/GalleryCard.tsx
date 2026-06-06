import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import img1 from 'figma:asset/4d36b49a53f241d35bf86aeefaceaf477050b4c9.png';
import img2 from 'figma:asset/dc3499506d0ea4454c22345039722195297ab28d.png';
import img3 from 'figma:asset/b21d5120d1fb512578822d81ea6a44f4729e11dc.png';

const IMAGES = [
  { src: img1, alt: "Sunset beach" },
  { src: img2, alt: "Airplane window view" },
  { src: img3, alt: "Statue of Liberty" },
];

export const GalleryCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full aspect-[4/5] md:aspect-auto h-auto md:h-full relative rounded-[36px] overflow-hidden bg-neutral-900 border border-white/5 group">
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full"
          >
            <ImageWithFallback
              src={IMAGES[currentIndex].src}
              alt={IMAGES[currentIndex].alt}
              className="w-full h-auto md:h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Overlay gradient for dots visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10 p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10">
        {IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white scale-125"
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
