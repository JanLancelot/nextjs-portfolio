import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Words — Lancelot Mailig",
  description: "Read essays, articles, and thought pieces by Lancelot Mailig on design, development, and digital culture.",
};

export interface Post {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  readTime: string;
}

export const posts: Post[] = [
  {
    title: "Agentic Coding",
    excerpt: "Reflections on how AI agents changed the way we write and design software.",
    date: "May 25, 2026",
    slug: "agentic-coding",
    readTime: "4 min read",
  },
];

export default function WordsPage() {
  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-2 animate-fade-in">
        <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">
          Words
        </h1>
        <p className="text-sm text-zinc-400 dark:text-zinc-500">
          Thoughts on development, design, and life.
        </p>
      </header>

      <div className="flex flex-col gap-10 mt-2 animate-fade-down animation-delay-200">
        {posts.map((post, idx) => (
          <article
            key={post.slug}
            className="flex flex-col gap-2"
            style={{ animationDelay: `${(idx + 1) * 100}ms` }}
          >
            <div className="flex items-center justify-between text-xs font-mono text-zinc-450 dark:text-zinc-550">
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>

            <Link
              href={`/words/${post.slug}`}
              className="text-base font-semibold text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-fit"
            >
              {post.title}
            </Link>

            <p className="text-[14px] leading-6 text-zinc-550 dark:text-zinc-400">
              {post.excerpt}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
