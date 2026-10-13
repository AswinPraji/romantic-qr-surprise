"use client";

import React, { useEffect } from "react";
import { Heart, RotateCcw, Sparkles, Stars } from "lucide-react";
import confetti from "canvas-confetti";

interface Screen4FinalProps {
  onRestart: () => void;
}

export default function Screen4Final({ onRestart }: Screen4FinalProps) {
  useEffect(() => {
    // Launch a delicate romantic heart confetti burst when reaching the final screen
    try {
      const end = Date.now() + 1.8 * 1000;
      const colors = ["#ec4899", "#f43f5e", "#a855f7", "#ffffff"];

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    } catch {
      // safe fallback
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 md:py-20 relative text-center">
      <div className="w-full max-w-2xl glass-panel-glow rounded-3xl p-8 sm:p-12 md:p-16 border border-pink-400/40 relative overflow-hidden animate-pulse-glow">
        {/* Soft background radial shine */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-pink-500/15 via-purple-600/10 to-transparent blur-3xl pointer-events-none" />

        {/* Floating Heart Icon Accent */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500/30 to-purple-600/40 flex items-center justify-center border border-pink-400/50 shadow-[0_0_30px_rgba(244,114,182,0.4)]">
            <Heart className="w-10 h-10 text-pink-400 fill-pink-500/80 animate-pulse" />
          </div>
          <Stars className="w-6 h-6 text-yellow-300 absolute -top-1 -right-2" />
        </div>

        {/* Message 1 */}
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-300 to-purple-200 leading-snug mb-8"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          &ldquo;Whatever happens, I will always choose you, ponnaa. ❤️&rdquo;
        </h2>

        {/* Divider */}
        <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-pink-400/60 to-transparent my-6" />

        {/* Message 2 */}
        <p className="text-lg sm:text-xl md:text-2xl text-pink-100/95 font-light leading-relaxed mb-12 tracking-wide">
          Sorry for the times I hurt you. Thank you for being part of my life.{" "}
          <span className="font-semibold text-pink-300 underline decoration-pink-500/40 underline-offset-4">
            I love you vavachiiiiii.
          </span>{" "}
          <span className="font-bold text-rose-300">Ummaaaaaa! ❤️</span>
        </p>

        {/* Glowing Button: Replay Our Story */}
        <div className="flex justify-center">
          <button
            onClick={onRestart}
            className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full font-semibold text-white shadow-2xl transition-all duration-300 bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 hover:from-pink-500 hover:via-rose-400 hover:to-purple-500 hover:shadow-pink-500/50 hover:scale-105 active:scale-95 border border-pink-200/40"
          >
            <RotateCcw className="w-5 h-5 group-hover:-rotate-90 transition-transform duration-500 text-pink-200" />
            <span className="tracking-wide">Replay Our Story ❤️</span>
            <Sparkles className="w-4 h-4 text-yellow-300 opacity-80" />
          </button>
        </div>
      </div>
    </div>
  );
}
