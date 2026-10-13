"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function BackgroundMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasFile, setHasFile] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio element on mount
  useEffect(() => {
    try {
      const audio = new Audio("/music/romantic.mp3");
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0.65; // Pleasant romantic background volume

      const handlePlaying = () => {
        setIsPlaying(true);
        setErrorMessage(null);
      };

      const handlePause = () => {
        setIsPlaying(false);
      };

      const handleError = (e: Event) => {
        console.warn("[BackgroundMusicPlayer] Audio loading/playback error:", e);
        // Do not permanently lock the button out; allow the user to retry
      };

      audio.addEventListener("playing", handlePlaying);
      audio.addEventListener("pause", handlePause);
      audio.addEventListener("error", handleError);

      audioRef.current = audio;

      return () => {
        audio.removeEventListener("playing", handlePlaying);
        audio.removeEventListener("pause", handlePause);
        audio.removeEventListener("error", handleError);
        audio.pause();
        audio.src = "";
      };
    } catch (err) {
      console.error("[BackgroundMusicPlayer] Failed to instantiate Audio:", err);
    }
  }, []);

  const togglePlay = async () => {
    let audio = audioRef.current;
    if (!audio) {
      try {
        audio = new Audio("/music/romantic.mp3");
        audio.loop = true;
        audio.preload = "auto";
        audio.volume = 0.65;
        audioRef.current = audio;
      } catch (e) {
        console.error("[BackgroundMusicPlayer] Fallback creation failed:", e);
        return;
      }
    }

    try {
      if (!audio.paused) {
        audio.pause();
        setIsPlaying(false);
      } else {
        // Reset src if it was cleared
        if (!audio.src || audio.src.endsWith("/") || audio.src === window.location.href) {
          audio.src = "/music/romantic.mp3";
        }
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
        setIsPlaying(true);
        setErrorMessage(null);
      }
    } catch (err: unknown) {
      console.error("[BackgroundMusicPlayer] Playback error encountered:", err);
      setIsPlaying(false);
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <div className="fixed top-5 right-5 z-[100] pointer-events-auto">
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause romantic music" : "Play romantic music"}
        title={isPlaying ? "Pause romantic music" : "Play romantic music"}
        className="flex items-center gap-2.5 px-3.5 py-2 rounded-full glass-panel-glow text-pink-200 hover:text-white hover:border-pink-400 transition-all duration-300 shadow-lg active:scale-95 group text-sm font-medium cursor-pointer select-none"
      >
        <span className="relative flex h-3 w-3">
          {isPlaying && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
          )}
          <span
            className={`relative inline-flex rounded-full h-3 w-3 ${
              isPlaying ? "bg-pink-500" : "bg-zinc-500"
            }`}
          />
        </span>
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-pink-400 transition-transform group-hover:scale-110" />
        ) : (
          <VolumeX className="w-4 h-4 text-zinc-400 transition-transform group-hover:scale-110" />
        )}
        <span className="inline">
          {isPlaying ? "Music Playing" : "Play Music"}
        </span>
      </button>
    </div>
  );
}
