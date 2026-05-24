import Link from "next/link";
import Newsletter from "../components/newsletter";

export default function Home() {
  return (
    <div className="flex flex-col gap-7 justify-end flex-1 animate-fade-in">
      {/* Header Bio Intro */}
      <header className="max-w-xl">
        <h1 className="text-zinc-800 dark:text-zinc-200 text-lg leading-relaxed font-normal">
          I&apos;m <span className="font-semibold text-black dark:text-white">Lancelot Mailig</span>.
          Designer, developer, and writer. This is my portfolio.
        </h1>
      </header>

      {/* Subscription Box */}
      <Newsletter />
    </div>
  );
}
