"use client";

import React, { useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";

export default function BackgroundMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasFile, setHasFile] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/music/romantic.mp3");
    audio.loop = true;
    audio.preload = "auto";

    audio.addEventListener("error", () => {
      // Audio file might not exist yet; handle smoothly without breaking UI
      setHasFile(false);
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current || !hasFile) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch {
      // Audio playback failed (e.g. file missing or autoplay blocked)
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed top-5 right-5 z-50">
      <button
        onClick={togglePlay}
        title={
          hasFile
            ? isPlaying
              ? "Pause romantic music"
              : "Play romantic music"
            : "Place romantic.mp3 into public/music/ to enable soundtrack"
        }
        className="flex items-center gap-2.5 px-3.5 py-2 rounded-full glass-panel-glow text-pink-200 hover:text-white hover:border-pink-400 transition-all duration-300 shadow-lg active:scale-95 group text-sm font-medium"
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
        <span className="hidden sm:inline">
          {isPlaying ? "Music Playing" : "Play Music"}
        </span>
      </button>
    </div>
  );
}
