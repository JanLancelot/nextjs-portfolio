"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./theme-toggle";

export default function Footer() {
  const pathname = usePathname();

  const links = [
    { name: "About", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
  ];

  return (
    <footer className="mt-8 flex items-center justify-between gap-6 text-sm">
      <div className="flex items-center gap-6">
        <span className="text-zinc-400 dark:text-zinc-500 animate-pulse">📌</span>
        <nav className="flex items-center gap-5">
          <Link
            href="/"
            className={`transition-colors duration-200 hover:text-black dark:hover:text-white ${
              pathname === "/"
                ? "text-black font-semibold dark:text-white"
                : "text-zinc-500 dark:text-zinc-400"
            }`}
          >
            Home
          </Link>
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors duration-200 hover:text-black dark:hover:text-white ${
                  isActive
                    ? "text-black font-semibold dark:text-white border-b-2 border-black dark:border-white pb-0.5"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <ThemeToggle />
    </footer>
  );
}
