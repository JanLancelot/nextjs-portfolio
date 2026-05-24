import { Metadata } from "next";

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
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem reiciendis libero doloremque deserunt, et, quos animi aliquid repudiandae beatae deleniti suscipit corporis rerum, adipisci iusto alias ducimus? Ullam, non <span className="font-semibold text-black dark:text-white">eaque</span>. 
        </p>

        <div className="border-t border-zinc-200 dark:border-zinc-800 my-4" />

        <h2 className="text-base font-semibold text-black dark:text-white mt-2">
          Contact & Coordinates
        </h2>

        <p>
          I am always open to chatting about potential collaborations, minimalistic design patterns, or front-end optimization techniques. Feel free to reach out via:
        </p>

        <ul className="flex flex-col gap-3 font-medium text-zinc-800 dark:text-zinc-200 mt-2 pl-4 list-disc marker:text-zinc-300 dark:marker:text-zinc-700">
          <li>
            Email:{" "}
            <a
              href="mailto:janlancelotm@gmail.com"
              className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              janlancelotm@gmail.com
            </a>
          </li>
          <li>
            GitHub:{" "}
            <a
              href="https://github.com/JanLancelot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              @JanLancelot
            </a>
          </li>
          <li>
            Twitter:{" "}
            <a
              href="https://www.facebook.com/jan.lancelot.mailig.2024"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              @JanLancelot
            </a>
          </li>
        </ul>
      </article>
    </div>
  );
}
