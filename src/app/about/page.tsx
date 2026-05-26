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

      <article className="flex flex-col gap-6 text-[15px] leading-7 text-zinc-600 dark:text-zinc-400 animate-fade-down animation-delay-200">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. <span className="font-semibold text-black dark:text-white">Consequatur</span>, dolore obcaecati iusto, illum temporibus fugiat magni cupiditate ducimus eos dolores iure nam fuga incidunt placeat, praesentium porro labore voluptatibus consectetur.
        </p>
        <p>
          Lorem <span className="font-semibold text-black dark:text-white">ipsum</span> dolor sit amet consectetur adipisicing elit. Ab, ipsum ducimus asperiores libero modi cum iste. Sequi perspiciatis ducimus vero ratione nobis nisi tempora impedit nam voluptate minima, quas unde.
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

