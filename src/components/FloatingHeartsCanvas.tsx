"use client";

import React, { useEffect, useRef, useState } from "react";

interface HeartParticle {
  id: number;
  x: number; // percentage (0 - 100)
  size: number; // px
  speed: number; // duration in seconds
  drift: number; // drift px
  opacity: number;
  scale: number;
  colorType: "pink" | "violet" | "blue" | "glass";
}

interface Star {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

export default function FloatingHeartsCanvas() {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);
  const [stars, setStars] = useState<Star[]>([]);
  const idCounter = useRef(0);
  const lastScrollTime = useRef(0);
  const isReducedMotion = useRef(false);

  // Generate subtle background ambient stars once
  useEffect(() => {
    if (typeof window !== "undefined") {
      isReducedMotion.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    }

    const generatedStars: Star[] = Array.from({ length: 45 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setStars(generatedStars);
  }, []);

  const spawnHearts = (count: number, isScrollTriggered = false) => {
    if (isReducedMotion.current) return;

    setHearts((prev) => {
      // Limit active hearts to 35 to guarantee silky smooth mobile performance
      if (prev.length > 35) return prev;

      const newBatch: HeartParticle[] = [];
      const colorTypes: ("pink" | "violet" | "blue" | "glass")[] = [
        "pink",
        "violet",
        "pink",
        "blue",
        "glass",
      ];

      for (let i = 0; i < count; i++) {
        idCounter.current += 1;
        newBatch.push({
          id: idCounter.current,
          x: Math.random() * 92 + 4, // 4% to 96%
          size: Math.floor(Math.random() * 20) + (isScrollTriggered ? 16 : 14),
          speed: Math.random() * 3 + (isScrollTriggered ? 3.5 : 5),
          drift: (Math.random() - 0.5) * 60,
          opacity: Math.random() * 0.45 + 0.4,
          scale: Math.random() * 0.5 + 0.75,
          colorType: colorTypes[Math.floor(Math.random() * colorTypes.length)],
        });
      }

      return [...prev, ...newBatch];
    });
  };

  // Idle interval for soft background hearts
  useEffect(() => {
    const interval = setInterval(() => {
      spawnHearts(1, false);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  // Scroll listener (both mousewheel and touch scroll)
  useEffect(() => {
    const handleScroll = () => {
      const now = performance.now();
      if (now - lastScrollTime.current > 180) {
        lastScrollTime.current = now;
        spawnHearts(2, true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, []);

  const removeHeart = (id: number) => {
    setHearts((prev) => prev.filter((h) => h.id !== id));
  };

  const getBubbleStyle = (type: string) => {
    switch (type) {
      case "violet":
        return "from-purple-400/80 to-indigo-500/70 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]";
      case "blue":
        return "from-pink-300/80 to-sky-300/70 drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]";
      case "glass":
        return "from-white/60 to-pink-200/40 backdrop-blur-[2px] border border-white/40 drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]";
      case "pink":
      default:
        return "from-pink-400/90 to-rose-500/80 drop-shadow-[0_0_10px_rgba(244,114,182,0.6)]";
    }
  };

  return (
    <div
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden"
      aria-hidden="true"
    >
      {/* Background Star field */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white/70 twinkle-star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Floating Heart Bubbles */}
      {hearts.map((h) => (
        <div
          key={h.id}
          onAnimationEnd={() => removeHeart(h.id)}
          className="absolute bottom-[-40px] flex items-center justify-center select-none"
          style={{
            left: `${h.x}%`,
            opacity: h.opacity,
            animation: `riseUp ${h.speed}s cubic-bezier(0.25, 1, 0.5, 1) forwards`,
            ["--drift-x" as string]: `${h.drift}px`,
          }}
        >
          {/* Heart Bubble Shape */}
          <div
            className={`relative flex items-center justify-center rounded-full p-2 bg-gradient-to-br ${getBubbleStyle(
              h.colorType
            )}`}
            style={{
              width: `${h.size * 1.5}px`,
              height: `${h.size * 1.5}px`,
              transform: `scale(${h.scale})`,
            }}
          >
            {/* Heart SVG */}
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-full h-full text-white/90 drop-shadow-sm transition-transform"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            {/* Bubble highlight shine */}
            <div className="absolute top-1 left-1.5 w-1.5 h-1.5 rounded-full bg-white/70 blur-[0.5px]" />
          </div>
        </div>
      ))}

      <style jsx global>{`
        @keyframes riseUp {
          0% {
            transform: translateY(0) translateX(0) scale(0.6);
            opacity: 0;
          }
          15% {
            opacity: 0.9;
            transform: translateY(-80px) translateX(calc(var(--drift-x) * 0.3)) scale(1);
          }
          50% {
            transform: translateY(-50vh) translateX(var(--drift-x)) scale(1.05);
          }
          85% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-110vh) translateX(calc(var(--drift-x) * 1.4)) scale(0.9);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
