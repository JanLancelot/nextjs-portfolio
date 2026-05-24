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
      </article>
    </div>
  );
}
