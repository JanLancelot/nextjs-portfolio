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
    <div className="glass-panel rounded-xl p-5 border border-slate-200/60 dark:border-slate-800/60 flex flex-col gap-4 animate-fade-in transition-all duration-300 shadow-xs">
      {/* Header with status */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 dark:text-slate-500 uppercase">
            Ambient Audio Synth
          </span>
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {AUDIO_PRESETS[currentPreset].name}
          </span>
        </div>
        
        {/* Glow indicator */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
            {isPlaying ? "ACTIVE" : "STANDBY"}
          </span>
          <span className="relative flex h-2 w-2">
            {isPlaying && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            )}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${
              isPlaying ? "bg-blue-500" : "bg-slate-350 dark:bg-slate-700"
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
                ? "bg-slate-900 border-slate-900 text-white dark:bg-slate-100 dark:border-slate-100 dark:text-slate-950 font-semibold"
                : "bg-transparent border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 hover:border-slate-350 dark:hover:border-slate-700"
            }`}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Description */}
      <p className="text-[11px] font-mono text-slate-450 dark:text-slate-500 leading-relaxed italic">
        &ldquo;{AUDIO_PRESETS[currentPreset].description}&rdquo;
      </p>

      {/* Controls: Play & Volume */}
      <div className="flex items-center gap-4 mt-1 pt-3 border-t border-slate-150 dark:border-slate-800/60">
        <button
          onClick={handleTogglePlay}
          className={`flex items-center justify-center h-9 w-9 rounded-full border transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 ${
            isPlaying
              ? "bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-950/20 dark:border-blue-900/50 dark:text-blue-400"
              : "bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-900/40 dark:border-slate-800 dark:text-slate-400"
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
              <path d="M6.3 2.84A.75.75 0 0 0 5 3.5v13a.75.75 0 0 0 1.3.5l6.5-6.5a.75.75 0 0 0 0-1L6.3 2.84Z" />
            </svg>
          )}
        </button>

        <div className="flex-1 flex items-center gap-2">
          {/* Speaker Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-slate-450 dark:text-slate-500">
            <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.063.922-2.063 2.063v4.875c0 1.141.922 2.062 2.063 2.062h1.932l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06Z" />
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

          <span className="text-[10px] font-mono text-slate-450 dark:text-slate-500 w-6 text-right">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
