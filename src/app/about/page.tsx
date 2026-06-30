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
          I am a software engineer and leader focused on building <span className="font-semibold text-black dark:text-white">scalable, highly reliable digital systems</span>. Currently a Computer Science student at DYCI and a full-stack developer and project manager intern at <span className="font-semibold text-black dark:text-white">Rakso</span>, I take complete ownership of product backlogs and lead cross-functional teams to deliver enterprise-grade systems under tight schedules.
        </p>
        <p>
          My technical expertise centers on backend performance tuning, secure CI/CD automation, and designing for extreme reliability, such as validating supply chain architectures under simulated loads of 284k+ concurrent requests and reducing request failure rates by 99% under stress. Whether representing the Philippines at the World Robot Olympiad in Germany or managing end-to-end software lifecycles, I strive to deliver technical mastery and clear, measurable business value.
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

