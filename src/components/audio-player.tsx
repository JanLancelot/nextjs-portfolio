"use client";

import { useEffect, useState } from "react";
import { getAudioManager, AUDIO_PRESETS } from "../lib/audio-manager";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPreset, setCurrentPreset] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const audio = getAudioManager();
    
    // Sync React state with Audio Manager
    setIsPlaying(audio.isPlaying);
    setCurrentPreset(audio.currentPresetIndex);
    setVolume(audio.volume);

    const handleStateChange = () => {
      setIsPlaying(audio.isPlaying);
      setCurrentPreset(audio.currentPresetIndex);
      setVolume(audio.volume);
    };

    audio.registerCallback(handleStateChange);
    return () => {
      audio.unregisterCallback(handleStateChange);
    };
  }, []);

  if (!isMounted) {
    return (
      <div className="glass-panel rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-4 animate-fade-in opacity-0" />
    );
  }

  const audio = getAudioManager();

  const handleTogglePlay = () => {
    if (isPlaying) {
      audio.stop();
    } else {
      audio.start();
    }
  };

  const handlePresetChange = (idx: number) => {
    audio.setPreset(idx);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audio.setVolume(val);
  };

  return (
    <div className="glass-panel rounded-xl p-5 border border-zinc-200/50 dark:border-zinc-850/50 flex flex-col gap-4 animate-fade-in transition-all duration-300 shadow-xs">
      {/* Header with status */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
            Ambient Synth Console
          </span>
          <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            {AUDIO_PRESETS[currentPreset].name}
          </span>
        </div>
        
        {/* Glow indicator */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
            {isPlaying ? "ACTIVE" : "STANDBY"}
          </span>
          <span className={`relative flex h-2 w-2`}>
            {isPlaying && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            )}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${
              isPlaying ? "bg-blue-500" : "bg-zinc-300 dark:bg-zinc-700"
            }`}></span>
          </span>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="grid grid-cols-3 gap-2">
        {AUDIO_PRESETS.map((preset, idx) => (
          <button
            key={preset.name}
            onClick={() => handlePresetChange(idx)}
            className={`py-2 px-1 text-[11px] font-medium font-sans rounded-md border text-center transition-all duration-200 cursor-pointer ${
              currentPreset === idx
                ? "bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-100 dark:border-zinc-100 dark:text-black font-semibold"
                : "bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 hover:border-zinc-350 dark:hover:border-zinc-700"
            }`}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Description */}
      <p className="text-[11px] font-mono text-zinc-450 dark:text-zinc-500 leading-relaxed italic">
        &ldquo;{AUDIO_PRESETS[currentPreset].description}&rdquo;
      </p>

      {/* Controls: Play & Volume */}
      <div className="flex items-center gap-4 mt-1 pt-3 border-t border-zinc-150 dark:border-zinc-850/60">
        <button
          onClick={handleTogglePlay}
          className={`flex items-center justify-center h-9 w-9 rounded-full border transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 ${
            isPlaying
              ? "bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/20 dark:border-rose-900/50 dark:text-rose-400"
              : "bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-950/20 dark:border-blue-900/50 dark:text-blue-400"
          }`}
          aria-label={isPlaying ? "Pause Ambient Pads" : "Play Ambient Pads"}
        >
          {isPlaying ? (
            // Pause Icon
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M5.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75A.75.75 0 0 0 7.25 3h-1.5ZM12.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75a.75.75 0 0 0-.75-.75h-1.5Z" />
            </svg>
          ) : (
            // Play Icon
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-0.5">
              <path d="M6.3 2.841A.75.75 0 0 1 7 2.5c.27 0 .524.143.666.38l8.25 14a.75.75 0 0 1-.666 1.12H2c-.414 0-.75-.336-.75-.75V3.75A.75.75 0 0 1 2 3h.5a.75.75 0 0 1 .666.38L6.3 2.841ZM3.75 4.5v11H13.6L7 4.5H3.75Z" style={{ display: "none" }} />
              <path d="M6.3 2.841A.75.75 0 0 1 7.05 3v14a.75.75 0 0 1-1.25.56L1.55 13.56a.75.75 0 0 1 0-1.12l4.25-4a.75.75 0 0 1 .5-.6ZM12.75 3.5a.75.75 0 0 1 1 0c2.583 2.583 2.583 6.764 0 9.347a.75.75 0 1 1-1.06-1.06 5.087 5.087 0 0 0 0-7.227.75.75 0 0 1 0-1.06Z" style={{ display: "none" }} />
              <path d="M6.3 2.84A.75.75 0 0 0 5 3.5v13a.75.75 0 0 0 1.3.5l6.5-6.5a.75.75 0 0 0 0-1L6.3 2.84Z" />
            </svg>
          )}
        </button>

        <div className="flex-1 flex items-center gap-2">
          {/* Mute Speaker Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-zinc-450 dark:text-zinc-500">
            <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.063.922-2.063 2.063v4.875c0 1.141.922 2.062 2.063 2.062h1.932l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 0 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 0 0-1.06-1.06l-1.72 1.72-1.72-1.72Z" style={{ display: volume === 0 ? "block" : "none" }} />
            <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.063.922-2.063 2.063v4.875c0 1.141.922 2.062 2.063 2.062h1.932l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06Z" style={{ display: volume === 0 ? "none" : "block" }} />
          </svg>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="flex-1 custom-slider"
            aria-label="Synth volume slider"
          />

          {/* Full Volume Icon */}
          <span className="text-[10px] font-mono text-zinc-450 dark:text-zinc-550 w-6 text-right">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
