import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import { format } from "date-fns";
import { ExternalLink, Book } from "lucide-react";
import type { Metadata } from "next";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jerkeyray.dev";

export const metadata: Metadata = {
  title: "blog",
  description: "Blog posts about backend systems, distributed systems, and developer tools",
  openGraph: {
    type: "website",
    url: `${siteUrl}/blog`,
    title: "blog | jerkeyray",
    description: "Blog posts about backend systems, distributed systems, and developer tools",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "jerkeyray blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "blog | jerkeyray",
    description: "Blog posts about backend systems, distributed systems, and developer tools",
    images: ["/og-image.png"],
    creator: "@jerkeyray",
  },
};

export default function Blog() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-8 max-w-3xl mx-auto pt-20">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-3xl font-bold tracking-tight">blog</h1>
        <a
          href="https://jerkeyray.hashnode.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-1.5"
        >
          view in hashnode
          <ExternalLink size={14} />
        </a>
      </div>
      
      <div className="space-y-4">
        {posts.map((post) => {
          const readTime = calculateReadTime(post.body.raw);
          return (
            <Link 
              key={post.slug}
              href={post.url}
              className="group block border border-muted/20 p-6 hover:border-accent hover:bg-muted/5 hover:shadow-[0_0_20px_-5px_rgba(240,160,192,0.15)] transition-all duration-300 hover:-translate-y-1 rounded-md"
            >
              <article className="flex flex-col space-y-2">
                <h2 className="text-lg md:text-xl font-bold group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
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
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

