"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, Sparkles, ChevronRight, ArrowLeft } from "lucide-react";

interface Screen2FifthPhotoProps {
  onNext: () => void;
  onBack: () => void;
}

export default function Screen2FifthPhoto({ onNext, onBack }: Screen2FifthPhotoProps) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 md:py-16 relative">
      <div className="w-full max-w-3xl flex flex-col items-center">
        {/* Back navigation */}
        <button
          onClick={onBack}
          className="self-start mb-6 inline-flex items-center gap-2 text-sm text-pink-300/80 hover:text-pink-200 transition-colors px-3 py-1.5 rounded-full glass-panel"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Message</span>
        </button>

        {/* Central Romantic Photo Frame */}
        <div className="relative group w-full max-w-md sm:max-w-lg">
          {/* Glowing Aura Behind Photo */}
          <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-rose-500/40 rounded-3xl blur-xl opacity-80 group-hover:opacity-100 transition duration-1000 animate-pulse-glow" />

          {/* Photo Container */}
          <div className="relative rounded-3xl overflow-hidden glass-panel border-2 border-pink-400/40 shadow-2xl p-2.5 sm:p-3.5 bg-zinc-950/80">
            <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-black/60">
              <Image
                src="/photos/media_1791900006956.png"
                alt="Our Special Memory"
                fill
                priority
                sizes="(max-width: 640px) 90vw, 500px"
                className={`object-cover object-center transition-all duration-1000 ease-out hover:scale-105 ${
                  imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                onLoad={() => setImgLoaded(true)}
              />

              {!imgLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Heart className="w-10 h-10 text-pink-400 animate-pulse" />
                </div>
              )}

              {/* Romantic Vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating accent badge on photo */}
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-xs text-pink-200">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>Forever & Always</span>
              </div>
            </div>
          </div>
        </div>

        {/* Caption specified in Section 5 */}
        <div className="mt-8 text-center px-4 max-w-xl">
          <p
            className="text-2xl sm:text-3xl font-serif font-medium bg-gradient-to-r from-pink-200 via-rose-300 to-purple-200 bg-clip-text text-transparent leading-relaxed"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            &ldquo;Ente favourite person. Ente favourite feeling. Ente Ponnaa. ❤️&rdquo;
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-8">
          <button
            onClick={onNext}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-white shadow-xl transition-all duration-300 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:via-pink-500 hover:to-rose-500 hover:shadow-pink-500/40 hover:scale-105 active:scale-95 border border-pink-300/30"
          >
            <span>Our Little Memories ✨</span>
            <ChevronRight className="w-5 h-5 text-white/90 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
