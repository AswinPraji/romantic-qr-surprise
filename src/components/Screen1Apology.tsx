"use client";

import React, { useEffect, useState } from "react";
import { Heart, Sparkles, ChevronRight } from "lucide-react";

interface Screen1ApologyProps {
  onNext: () => void;
}

export default function Screen1Apology({ onNext }: Screen1ApologyProps) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Gentle entrance timer
    const t = setTimeout(() => {
      setRevealed(true);
    }, 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 md:py-16 relative">
      <div
        className={`w-full max-w-2xl glass-panel-glow rounded-3xl p-6 sm:p-10 md:p-12 transition-all duration-1000 transform ${
          revealed
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-6 scale-[0.98]"
        }`}
      >
        {/* Header with romantic glowing heart */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative mb-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500/20 to-purple-600/30 flex items-center justify-center border border-pink-500/40 animate-pulse-glow">
              <Heart className="w-8 h-8 text-pink-400 fill-pink-500/60 animate-bounce" />
            </div>
            <Sparkles className="w-5 h-5 text-yellow-300 absolute -top-1 -right-1 animate-spin duration-3000" />
          </div>

          <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold mb-1">
            A message from the bottom of my heart
          </span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-pink-200 via-rose-300 to-purple-200 bg-clip-text text-transparent"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            FOR MY PONNAA ❤️
          </h1>
        </div>

        {/* The Apology Message - EXACT wording specified in prompt */}
        <div className="space-y-6 text-base sm:text-lg md:text-xl text-pink-100/90 leading-relaxed font-light tracking-wide border-t border-pink-500/20 pt-6">
          <p className="font-serif italic text-pink-300 text-xl md:text-2xl">
            ponnahhhh,
          </p>

          <p>
            I know njan ee idayayi korach vazhakkali avunnu. korach deshyappedal koodunnu
          </p>

          <p className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent italic">
            Iam sorry..
          </p>

          <p>
            Deeply Iam in love with you. Enikk aryilla ponna. inn njan athrem rise ayi, for no reason. Iam sorry.
          </p>

          <p>
            Innim vazhakkukal ondayekkam. But athonnum nammade relationil oru thari muriv polum varuthand namukk nokkam.{" "}
            <span className="text-rose-300 font-medium">Iam sorryy.</span>{" "}
            <span className="text-pink-300 font-semibold underline decoration-pink-500/50 underline-offset-4">
              I love you vavachiiiiii.
            </span>{" "}
            <span className="text-pink-200 font-medium">ummaaaaaa.</span>
          </p>
        </div>

        {/* CTA to Screen 2 */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <button
            onClick={onNext}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-white shadow-xl transition-all duration-300 bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 hover:from-pink-500 hover:via-rose-400 hover:to-purple-500 hover:shadow-pink-500/40 hover:scale-105 active:scale-95 border border-pink-300/30"
          >
            <span>One More Thing, Ponnaa ❤️</span>
            <ChevronRight className="w-5 h-5 text-white/90 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
