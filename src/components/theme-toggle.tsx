"use client";

import { useTheme } from "../context/theme-context";

export default function ThemeToggle() {
  const { theme, toggleTheme, isMounted } = useTheme();

  if (!isMounted) {
    return (
      <div className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 bg-transparent flex items-center justify-center opacity-0" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 bg-transparent text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
    >
      {theme === "light" ? (
        // Moon Icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4 transition-transform duration-500 rotate-0 hover:rotate-12"
        >
          <path
            fillRule="evenodd"
            d="M7.455 2.004a.75.75 0 0 1 .624.862 7.002 7.002 0 0 0 8.39 8.39.75.75 0 0 1 .87.87 8.002 8.002 0 1 1-10.4-10.4.75.75 0 0 1 .516.278Z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        // Sun Icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4 transition-transform duration-500 rotate-0 hover:rotate-90"
        >
          <path
            d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM15.657 4.343a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 1 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0ZM6.464 13.536a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 1 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0ZM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10ZM5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10ZM15.657 15.657a.75.75 0 0 1-1.06 0l-1.06-1.06a.75.75 0 1 1 1.06-1.06l1.06 1.06a.75.75 0 0 1 0 1.06ZM6.464 6.464a.75.75 0 0 1-1.06 0L4.34 5.404a.75.75 0 0 1 1.06-1.06l1.06 1.06a.75.75 0 0 1 0 1.06ZM10 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
          />
        </svg>
      )}
    </button>
  );
}
