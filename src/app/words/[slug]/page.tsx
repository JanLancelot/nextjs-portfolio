import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: "power-of-doing-less" },
    { slug: "privacy-first-analytics" },
    { slug: "designing-in-the-margins" },
  ];
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
    excerpt: "Reflections on how AI changed the way I code.",
    content: (
      <>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam velit eveniet voluptatum magni! Iusto, rem sequi, quia corrupti, nesciunt aliquid quae inventore voluptatum temporibus unde autem rerum doloremque nam ipsa!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, sed commodi? Nihil quo sapiente distinctio incidunt repudiandae aliquam voluptate quia accusamus in, sed autem nulla optio quidem, sequi tenetur? Velit!
        </p>
        <h2 className="text-lg font-bold text-black dark:text-white mt-6 mb-2">
          Lorem ipsum dolor sit amet consectetur
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, id. Ducimus explicabo tempore delectus quas animi iusto numquam, aliquam, mollitia eveniet repellat fugiat, dignissimos soluta aliquid fuga veniam suscipit? Nesciunt?
        </p>
        <blockquote className="border-l-2 border-zinc-400 dark:border-zinc-600 pl-4 py-1 my-6 italic text-zinc-550 dark:text-zinc-450">
          &ldquo;Lorem ipsum dolor sit amet consectetur&rdquo;
        </blockquote>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla ex mollitia recusandae minima velit? Natus nesciunt odit consequuntur, perspiciatis facilis quibusdam placeat quisquam veniam iste quos? Animi facilis rem autem?
        </p>
        <h2 className="text-lg font-bold text-black dark:text-white mt-6 mb-2">
          Lorem ipsum dolor sit amet consectetur
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo autem laudantium dicta in corrupti obcaecati, unde totam perferendis qui cupiditate corporis quam incidunt, sit sint nobis rerum eum. Architecto, enim?
        </p>
        <ul className="list-disc pl-5 my-4 flex flex-col gap-2">
          <li><strong>Lorem ipsum dolor:</strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos iusto ducimus deleniti.</li>
          <li><strong>Lorem ipsum dolor:</strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos iusto ducimus deleniti.</li>
          <li><strong>Lorem ipsum dolor:</strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos iusto ducimus deleniti.</li>
        </ul>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos iusto ducimus deleniti.
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
