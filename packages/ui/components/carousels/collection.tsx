"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@byteutils/functions/cn";

interface CarouselProps {
  children: React.ReactNode[];
  className?: string;
  itemsPerView?: number;
  gap?: number;
  autoplay?: boolean;
  autoplayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
}

export function CollectionCarousel({
  children,
  className,
  itemsPerView = 3,
  gap = 24,
  autoplay = false,
  autoplayInterval = 5000,
  showArrows = true,
  showDots = true,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewItems, setViewItems] = useState(itemsPerView);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalSlides = Math.ceil(children.length / viewItems);

  // Adjust items per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setViewItems(1);
      } else if (window.innerWidth < 1024) {
        setViewItems(2);
      } else {
        setViewItems(itemsPerView);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerView]);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, currentIndex, totalSlides]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Group children into slides
  const slides = [];
  for (let i = 0; i < children.length; i += viewItems) {
    slides.push(children.slice(i, i + viewItems));
  }

  return (
    <div className={cn("relative", className)}>
      <div
        ref={containerRef}
        className="overflow-hidden rounded-2xl bg-card/80 backdrop-blur-md shadow-lg border border-border/50"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "grid transition-all",
              `grid-cols-${viewItems} gap-${gap / 4}`
            )}
            style={{
              gridTemplateColumns: `repeat(${viewItems}, minmax(0, 1fr))`,
              gap: gap
            }}
          >
            {slides[currentIndex]?.map((child, idx) => (
              <div key={idx} className="min-w-0">
                {child}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {showArrows && totalSlides > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-primary/90 text-primary-foreground rounded-full flex items-center justify-center shadow-md z-10 hover:bg-primary transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 bg-primary/90 text-primary-foreground rounded-full flex items-center justify-center shadow-md z-10 hover:bg-primary transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && totalSlides > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all",
                currentIndex === idx
                  ? "bg-primary scale-110"
                  : "bg-primary/30 hover:bg-primary/50"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
