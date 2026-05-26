"use client";

import { useState, useTransition } from "react";

interface TimelineEvent {
  year: number;
  description: string;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  { year: 2004, description: "Born. Didn’t do too much that year." },
  { year: 2009, description: "Discovered video games with Crash Bandicoot on the PSP." },
  { year: 2015, description: "Received my first laptop, a graduation gift from my grandmother." },
  { year: 2016, description: "Wrote my first lines of HTML/CSS. Made a simple page that was mostly blinking text." },
  { year: 2020, description: "The pandemic year. Entered my first senior highschool year as an ICT student. Fully online." },
  { year: 2021, description: "Started competing internationally in robotics. Won 8th place out of 16 countries." },
  { year: 2022, description: "Competed in the World Robot Olympiad in Germany. Met people from all over the world." },
  { year: 2023, description: "Entered my first year of College at DYCI as a BS Computer Science student." },
  { year: 2024, description: "Started building full-stack web applications such as school clearance systems" },
  { year: 2025, description: "Lead the development of Nihon-Go, a 3D Japanese language learning game." },
  { year: 2026, description: "Started my first internship at Rakso as a full-stack developer and project manager." },
];

export default function LifeTimeline() {
  const [activeYear, setActiveYear] = useState(TIMELINE_EVENTS[0].year);
  const [, startTransition] = useTransition();

  const activeIndex = TIMELINE_EVENTS.findIndex((e) => e.year === activeYear);
  const totalEvents = TIMELINE_EVENTS.length;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(e.target.value, 10);
    const selectedEvent = TIMELINE_EVENTS[index];
    if (selectedEvent) {
      startTransition(() => {
        setActiveYear(selectedEvent.year);
      });
    }
  };

  const activeEvent = TIMELINE_EVENTS[activeIndex] || TIMELINE_EVENTS[0];

  // Calculate percentage of slider position based on index to ensure alignment
  const percentage = (activeIndex / (totalEvents - 1)) * 100;

  return (
    <div className="w-full flex flex-col gap-6 select-none animate-fade-in py-2">
      {/* Dynamic Content Area */}
      <div className="relative w-full min-h-[140px] flex flex-col justify-center gap-1.5">
        {/* Year Label */}
        <span
          key={`year-${activeYear}`}
          className="font-mono text-5xl sm:text-6xl font-extralight tracking-tighter text-zinc-200 dark:text-zinc-800/80 transition-all duration-300 ease-out animate-[slideFadeIn_0.35s_ease-out] select-none"
        >
          {activeYear}
        </span>

        {/* Description Text */}
        <p
          key={`desc-${activeYear}`}
          className="text-base text-zinc-700 dark:text-zinc-300 font-normal leading-relaxed transition-all duration-300 ease-out animate-[slideFadeIn_0.35s_ease-out]"
        >
          {activeEvent.description}
        </p>
      </div>

      {/* Scrub Track Section */}
      <div className="relative w-full py-6">
        <div className="relative w-full h-5">
          {/* Base Track Line */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-zinc-250 dark:bg-zinc-800/60" />

          {/* Absolute Spaced Ticks*/}
          {TIMELINE_EVENTS.map((evt, idx) => {
            const isActive = evt.year === activeYear;
            const tickPct = (idx / (totalEvents - 1)) * 100;
            return (
              <div
                key={evt.year}
                className="absolute bottom-0 flex flex-col items-center"
                style={{
                  left: `${tickPct}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <div
                  className={`w-[1px] transition-all duration-200 ${
                    isActive
                      ? "h-3.5 bg-zinc-800 dark:bg-zinc-100"
                      : "h-1.5 bg-zinc-200 dark:bg-zinc-800/80 hover:bg-zinc-400 dark:hover:bg-zinc-650"
                  }`}
                />
              </div>
            );
          })}

          <div
            className="absolute bottom-0 z-10 flex flex-col items-center pointer-events-none transition-all duration-75 ease-out"
            style={{
              left: `${percentage}%`,
              transform: "translateX(-50%)",
            }}
          >
            {/* Top Indicator Dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-850 dark:bg-zinc-200 absolute bottom-5" />

            {/* Vertical Line */}
            <div className="w-[1.5px] h-5.5 bg-zinc-850 dark:bg-zinc-200 absolute bottom-0" />
          </div>
        </div>

        {/* Range Slider Overlay */}
        <input
          type="range"
          min={0}
          max={totalEvents - 1}
          step={1}
          value={activeIndex}
          onChange={handleSliderChange}
          className="absolute inset-x-0 bottom-0 top-3 w-full h-8 opacity-0 cursor-ew-resize z-20 touch-none"
          aria-label="Timeline slider"
        />
      </div>

      {/* Muted Instructions */}
      <span className="text-[10px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase text-center block">
        Scrub the timeline
      </span>
    </div>
  );
}
