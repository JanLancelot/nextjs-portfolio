import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Lancelot Mailig",
  description: "A showcase of custom websites, design systems, and digital tools created by Lancelot Mailig.",
};

interface Product {
  name: string;
  description: string;
  link: string;
  category: string;
  year: string;
  badge?: string;
}

const products: Product[] = [
  {
    name: "SchoolAide",
    description: "An event management application developed for RAKSO, featuring streamlined event creation and coordination.",
    link: "https://github.com/JanLancelot/school-aide",
    category: "Web App / SaaS",
    year: "2026",
    badge: "Featured",
  },
];

export default function PortfolioPage() {
  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-2 animate-fade-in">
        <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">
          Portfolio
        </h1>
        <p className="text-sm text-zinc-400 dark:text-zinc-500">
          A showcase of simple, high-performing creations.
        </p>
      </header>

      <div className="flex flex-col gap-8 animate-fade-down animation-delay-200">
        {products.map((product, idx) => (
          <div
            key={product.name}
            className="group flex flex-col gap-2 border-b border-zinc-150 dark:border-zinc-850 pb-6"
          >
            <div className="flex items-baseline justify-between gap-4">
              <div className="flex items-center gap-2">
                <a
                  href={product.link}
                  target={product.link.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="text-base font-semibold text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1"
                >
                  {product.name}
                  {product.link.startsWith("http") && (
                    <span className="text-[10px] text-zinc-400 font-normal">↗</span>
                  )}
                </a>
                {product.badge && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400">
                    {product.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-mono text-zinc-400 dark:text-zinc-600">
                {product.year}
              </span>
            </div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              {product.category}
            </p>
            <p className="text-[14px] leading-6 text-zinc-500 dark:text-zinc-450 mt-1">
              {product.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
