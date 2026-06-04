import { Metadata } from "next";
import LifeTimeline from "../../components/life-timeline";

export const metadata: Metadata = {
  title: "About — Lancelot Mailig",
  description: "Learn more about Lancelot Mailig's background, design philosophies, and personal workflow.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-2 animate-fade-in">
        <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">
          About
        </h1>
        <p className="text-sm text-zinc-400 dark:text-zinc-500">
          Designer & Developer / Building simple digital tools.
        </p>
      </header>

      <article className="flex flex-col gap-6 text-[15px] leading-7 text-zinc-650 dark:text-zinc-400 animate-fade-down animation-delay-200 font-sans">
        <p>
          I am a developer and designer focused on building <span className="font-semibold text-black dark:text-white">tactile, highly interactive digital experiences</span>. Currently, I am a Computer Science student at DYCI and working as a full-stack developer intern at <span className="font-semibold text-black dark:text-white">Rakso</span>, where I build data-rich web systems and coordinate software projects.
        </p>
        <p>
          My work sits at the intersection of logical structure and creative composition. I enjoy experimenting with <span className="font-semibold text-black dark:text-white">creative code, WebGL/3D, and procedural synthesis</span> to design interfaces that feel responsive, alive, and tactile. From representing the Philippines at the World Robot Olympiad in Germany to directing the 3D Japanese learning game *Nihon-Go*, I strive for simple, high-performing craft.
        </p>
      </article>

      <hr className="border-zinc-200/50 dark:border-zinc-800/50 my-2" />

      <section className="flex flex-col gap-6 animate-fade-down animation-delay-300">
        <h2 className="text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-mono font-medium">
          Life Timeline
        </h2>
        <LifeTimeline />
      </section>
    </div>
  );
}

