import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Book } from "lucide-react";
import { MDXContent } from "./MDXContent";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = allPosts.find((post) => post.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
  };
}

function calculateReadTime(content: string): number {
  // Remove markdown syntax, code blocks, and HTML tags
  const text = content
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/`[^`]+`/g, "") // Remove inline code
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // Replace links with just text
    .replace(/[#*_~`]/g, "") // Remove markdown formatting
    .replace(/<[^>]+>/g, "") // Remove HTML tags
    .trim();

  const words = text.split(/\s+/).filter((word) => word.length > 0);
  const wordsPerMinute = 200;
  const readTime = Math.ceil(words.length / wordsPerMinute);

  return readTime || 1; // Minimum 1 minute
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = allPosts.find((post) => post.slug === slug);

  if (!post || !post.published) {
    notFound();
  }

  const readTime = calculateReadTime(post.body.raw);

  return (
    <article className="space-y-8 max-w-3xl mx-auto pt-20">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-muted">
          <time dateTime={post.date}>
            {format(new Date(post.date), "MMMM dd, yyyy")}
          </time>
          <span className="text-muted-foreground/60">•</span>
          <span className="flex items-center gap-1.5">
            <Book size={14} />
            {readTime} min read
          </span>
        </div>
      </header>

      <MDXContent code={post.body.code} />
    </article>
  );
}
