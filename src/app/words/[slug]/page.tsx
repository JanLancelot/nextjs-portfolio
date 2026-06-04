import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(blogContent).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogContent[slug];

  if (!post) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: `${post.title} — Lancelot Mailig`,
    description: post.excerpt,
  };
}

interface BlogArticle {
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: React.ReactNode;
}

const blogContent: Record<string, BlogArticle> = {
  "agentic-coding": {
    title: "Agentic Coding",
    date: "May 25, 2026",
    readTime: "4 min read",
    excerpt: "Reflections on how AI agents changed the way we write and design software.",
    content: (
      <>
        <p>
          Programming has always been about translating human intent into computer instructions. For decades, that meant mastering syntax, compiler rules, and API specifications. But recently, a fundamental shift occurred. We moved from writing code block-by-block to describing architectural intent to autonomous agents.
        </p>
        <p>
          Agentic coding is not just about autocomplete or copilot suggestions; it is about partnering with systems that can research a codebase, plan multi-file refactors, and verify their own work. The developer’s role shifts from a line-by-line keyboard operator to a systems architect and editor.
        </p>
        <h2 className="text-lg font-bold text-black dark:text-white mt-6 mb-2 font-sans">
          The Transition from Syntax to Intent
        </h2>
        <p>
          When you no longer spend hours debugging a typo or looking up boilerplate configurations, you have the cognitive space to think about the bigger picture: performance, architecture, accessibility, and user experience.
        </p>
        <blockquote className="border-l-2 border-blue-500 dark:border-blue-400 pl-4 py-1 my-6 italic text-zinc-650 dark:text-zinc-400 bg-zinc-50/50 dark:bg-zinc-950/20 pr-4 rounded-r-md">
          &ldquo;Software construction becomes less about wrestling with syntactic constraints, and more about navigating structural relationships and user intent.&rdquo;
        </blockquote>
        <p>
          This changes the speed of ideation. You can prototype a complex system in hours instead of days, allowing you to test designs, gather feedback, and iterate rapidly. However, it also demands higher critical thinking. You must be able to spot subtle logical bugs and architectural debt that an agent might introduce.
        </p>
        <h2 className="text-lg font-bold text-black dark:text-white mt-6 mb-2 font-sans">
          The Skills that Matter Now
        </h2>
        <p>
          As syntax becomes a solved problem, the developer skillset is rebalancing. The most critical skills are now:
        </p>
        <ul className="list-disc pl-5 my-4 flex flex-col gap-2 font-sans text-sm text-zinc-650 dark:text-zinc-400">
          <li><strong>System Design:</strong> Understanding how modules, databases, and APIs interact at a macro level.</li>
          <li><strong>Mental Sandbox:</strong> Being able to dry-run logic in your head to audit agent-generated ideas.</li>
          <li><strong>Clear Communication:</strong> Articulating design requirements and constraints with precision.</li>
        </ul>
        <p>
          The future of development is collaborative. It is a dialogue between human creativity and agentic speed, crafting digital artifacts that are more robust, interactive, and aligned with user needs.
        </p>
      </>
    ),
  },
};

export default async function WordDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogContent[slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-3 animate-fade-in">
        <Link
          href="/words"
          className="text-xs font-mono text-zinc-450 hover:text-black dark:text-zinc-550 dark:hover:text-white transition-colors flex items-center gap-1.5 w-fit"
        >
          <span>←</span> Back to Words
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white mt-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-xs font-mono text-zinc-450 dark:text-zinc-550">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </header>

      <article className="flex flex-col gap-6 text-[15px] leading-7 text-zinc-600 dark:text-zinc-400 animate-fade-down animation-delay-200">
        {post.content}
      </article>

      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 mt-6">
        <Link
          href="/words"
          className="text-xs font-mono text-zinc-450 hover:text-black dark:text-zinc-550 dark:hover:text-white transition-colors flex items-center gap-1.5 w-fit"
        >
          <span>←</span> Back to Words
        </Link>
      </div>
    </div>
  );
}
