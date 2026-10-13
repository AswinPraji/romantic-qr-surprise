"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

interface Screen3SlideshowProps {
  onNext: () => void;
  onBack: () => void;
}

const SLIDES = [
  {
    id: 1,
    url: "/photos/media_1791899742405.jpg",
    alt: "Watercolor Portrait Memory",
    caption: "Every moment with you is special. ❤️",
  },
  {
    id: 2,
    url: "/photos/media_1791899784636.jpg",
    alt: "Bike Ride Memory",
    caption: "Distance can keep us apart, but never change what you mean to me.",
  },
  {
    id: 3,
    url: "/photos/media_1791899798897.jpg",
    alt: "Silhouette Intimacy",
    caption: "Even when we fight, you are still my favourite person.",
  },
  {
    id: 4,
    url: "/photos/media_1791899925185.jpg",
    alt: "Holding Hands Memory",
    caption: "Ennum ente ponnaa. ❤️",
  },
];

export default function Screen3Slideshow({ onNext, onBack }: Screen3SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev === SLIDES.length - 1) {
        // Last slide reached
        return prev;
      }
      return prev + 1;
    });
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  // Slideshow auto-advance (4.5s)
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    // If on last slide, pause auto advance so user can deliberately proceed
    if (currentIndex === SLIDES.length - 1) {
      setIsPlaying(false);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex, nextSlide]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8 md:py-14 relative">
      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Top bar with back button & counter */}
        <div className="w-full flex items-center justify-between mb-4 max-w-2xl px-2">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-pink-300/80 hover:text-pink-200 transition-colors px-3 py-1.5 rounded-full glass-panel"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Special Photo</span>
            <span className="sm:hidden">Back</span>
          </button>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-pink-200 text-sm font-medium">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>
              {currentIndex + 1} / {SLIDES.length}
            </span>
          </div>
        </div>

        {/* Cinematic Slideshow Viewer */}
        <div className="relative w-full max-w-2xl group">
          {/* Ambient Glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-pink-600/30 via-purple-600/30 to-rose-600/30 rounded-3xl blur-xl opacity-75 transition duration-700 pointer-events-none" />

          {/* Photo Frame Container */}
          <div className="relative rounded-3xl overflow-hidden glass-panel border border-pink-400/30 shadow-2xl p-2.5 sm:p-4 bg-zinc-950/90">
            <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-black/80">
              {SLIDES.map((slide, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      isActive
                        ? "opacity-100 z-10 scale-100"
                        : "opacity-0 z-0 pointer-events-none scale-105"
                    }`}
                  >
                    <Image
                      src={slide.url}
                      alt={slide.alt}
                      fill
                      priority={idx === 0}
                      sizes="(max-width: 640px) 90vw, 650px"
                      className="object-cover object-center"
                      onLoad={() =>
                        setLoadedImages((prev) => ({ ...prev, [slide.id]: true }))
                      }
                    />
                    {/* Dark gradient at bottom for text clarity without obscuring faces */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
                  </div>
                );
              })}

              {/* Navigation overlays */}
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                aria-label="Previous slide"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-pink-200 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95 transition-all shadow-md"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextSlide}
                disabled={currentIndex === SLIDES.length - 1}
                aria-label="Next slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-pink-200 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95 transition-all shadow-md"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Bottom Caption inside frame */}
              <div className="absolute bottom-4 left-4 right-4 z-20 text-center px-3 py-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
                <p
                  className="text-base sm:text-lg md:text-xl font-serif text-pink-100 italic drop-shadow-md"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  &ldquo;{SLIDES[currentIndex].caption}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls row */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-pink-200 hover:text-white transition-all text-sm font-medium"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 text-pink-400" />
                <span>Pause Auto-play</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-pink-400" />
                <span>Auto-play Slides</span>
              </>
            )}
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-full glass-panel">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? "w-7 bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.8)]"
                    : "w-2.5 bg-zinc-600 hover:bg-zinc-400"
                }`}
              />
            ))}
          </div>

          {/* Move to Screen 4 (Final screen) */}
          <button
            onClick={onNext}
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-white text-sm shadow-lg transition-all duration-300 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 hover:scale-105 active:scale-95 border border-pink-300/30"
          >
            <span>Final Promise</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
