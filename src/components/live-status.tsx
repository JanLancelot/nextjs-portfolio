"use client";

import { useEffect, useState } from "react";
import { getAudioManager, AUDIO_PRESETS } from "../lib/audio-manager";

export default function LiveStatus() {
  const [time, setTime] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPreset, setCurrentPreset] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const audio = getAudioManager();
    
    // Initial sync
    setIsPlaying(audio.isPlaying);
    setCurrentPreset(audio.currentPresetIndex);

    const handleAudioChange = () => {
      setIsPlaying(audio.isPlaying);
      setCurrentPreset(audio.currentPresetIndex);
    };

    audio.registerCallback(handleAudioChange);

    // Active local time update for Bulacan (Asia/Manila timezone, UTC+8)
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      clearInterval(interval);
      audio.unregisterCallback(handleAudioChange);
    };
  }, []);

  const handleTogglePlay = () => {
    const audio = getAudioManager();
    if (audio.isPlaying) {
      audio.stop();
    } else {
      audio.start();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5 text-[11px] font-mono tracking-widest uppercase text-zinc-400 dark:text-zinc-500 select-none animate-fade-in">
      {/* Location / Status */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
          BULACAN, PH
        </span>
        <span className="text-zinc-300 dark:text-zinc-700">•</span>
        <span className="text-zinc-500 dark:text-zinc-400 font-medium">{time}</span>
      </div>

      <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">|</span>

      {/* Spotify Widget / Lofi Player Simulation */}
      {isMounted && (
        <button
          onClick={handleTogglePlay}
          className="flex items-center gap-2 cursor-pointer group text-left outline-hidden"
          title={isPlaying ? "Click to Pause Ambient Synth" : "Click to Play Ambient Synth"}
        >
          <div className="flex items-end gap-[2px] w-3 h-3 pb-[1px]">
            <span className={`w-[2px] bg-emerald-500 dark:bg-emerald-400 rounded-t-[1px] ${
              isPlaying ? "animate-eq-1" : "h-[3px]"
            }`} />
            <span className={`w-[2px] bg-emerald-500 dark:bg-emerald-400 rounded-t-[1px] ${
              isPlaying ? "animate-eq-2" : "h-[4px]"
            }`} style={isPlaying ? { animationDelay: "0.15s" } : undefined} />
            <span className={`w-[2px] bg-emerald-500 dark:bg-emerald-400 rounded-t-[1px] ${
              isPlaying ? "animate-eq-3" : "h-[2px]"
            }`} style={isPlaying ? { animationDelay: "0.3s" } : undefined} />
          </div>
          <span className="text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">
            {isPlaying ? (
              <>
                Playing: <span className="font-semibold text-zinc-750 dark:text-zinc-250">{AUDIO_PRESETS[currentPreset].name}</span>
              </>
            ) : (
              <span className="italic hover:underline decoration-zinc-400 dark:decoration-zinc-650">
                Synth: Offline (Tap to Play)
              </span>
            )}
          </span>
        </button>
      )}
    </div>
  );
}

