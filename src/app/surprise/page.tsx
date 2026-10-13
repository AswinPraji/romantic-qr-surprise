"use client";

import React, { useState } from "react";
import FloatingHeartsCanvas from "@/components/FloatingHeartsCanvas";
import BackgroundMusicPlayer from "@/components/BackgroundMusicPlayer";
import Screen1Apology from "@/components/Screen1Apology";
import Screen2FifthPhoto from "@/components/Screen2FifthPhoto";
import Screen3Slideshow from "@/components/Screen3Slideshow";
import Screen4Final from "@/components/Screen4Final";

export default function SurprisePage() {
  const [currentScreen, setCurrentScreen] = useState<1 | 2 | 3 | 4>(1);

  const goToScreen = (screen: 1 | 2 | 3 | 4) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen text-pink-50 overflow-x-hidden selection:bg-pink-500 selection:text-white">
      {/* Background Floating Hearts Canvas & Ambient Stars */}
      <FloatingHeartsCanvas />

      {/* Floating Persistent Background Music Player */}
      <BackgroundMusicPlayer />

      {/* Dynamic Screen View with Smooth Transitions */}
      <div className="relative z-10 transition-opacity duration-700">
        {currentScreen === 1 && (
          <Screen1Apology onNext={() => goToScreen(2)} />
        )}

        {currentScreen === 2 && (
          <Screen2FifthPhoto
            onNext={() => goToScreen(3)}
            onBack={() => goToScreen(1)}
          />
        )}

        {currentScreen === 3 && (
          <Screen3Slideshow
            onNext={() => goToScreen(4)}
            onBack={() => goToScreen(2)}
          />
        )}

        {currentScreen === 4 && (
          <Screen4Final onRestart={() => goToScreen(1)} />
        )}
      </div>
    </main>
  );
}
