"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    // TODO: Replace with actual API call
    setTimeout(() => {
      if (!email.includes("@")) {
        setStatus("error");
        setMessage("Please enter a valid email address.");
      } else {
        setStatus("success");
        setMessage("Thank you! You have successfully subscribed.");
        setEmail("");
      }
    }, 1200);
  };

  return (
    <div className="w-full max-w-md mt-6 mb-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex items-center gap-3 w-full">
          <div className="relative flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="Your email address..."
              required
              disabled={status === "loading" || status === "success"}
              className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-800 py-3 pr-10 text-sm outline-hidden transition-all duration-300 focus:border-black dark:focus:border-white font-sans text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 disabled:opacity-50"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-1.5 py-0.5 text-[9px] tracking-widest text-zinc-400 dark:text-zinc-500 font-mono select-none">
              ...
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="rounded-full border border-zinc-900 dark:border-zinc-100 px-6 py-2.5 text-sm font-medium text-zinc-900 dark:text-zinc-100 bg-transparent hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-black transition-all duration-300 active:scale-95 disabled:opacity-50 cursor-pointer whitespace-nowrap min-w-[100px] flex items-center justify-center"
          >
            {status === "loading" ? (
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              "Join now"
            )}
          </button>
        </div>

        {status === "success" && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium animate-fade-in">
            {message}
          </p>
        )}
        {status === "error" && (
          <p className="text-xs text-rose-600 dark:text-rose-400 font-medium animate-fade-in">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
