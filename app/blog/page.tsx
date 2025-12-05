import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import { format } from "date-fns";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "jerkeyray | blog",
  description: "Blog posts about backend systems, distributed systems, and developer tools",
};

export default function Blog() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-8 max-w-3xl mx-auto pt-20">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">blog</h1>
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
        {posts.map((post) => (
          <Link 
            key={post.slug}
            href={post.url}
            className="group block border border-muted/20 p-6 hover:border-accent hover:bg-muted/5 hover:shadow-[0_0_20px_-5px_rgba(240,160,192,0.15)] transition-all duration-300 hover:-translate-y-1 rounded-md"
          >
            <article className="flex flex-col space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2">
                <h2 className="text-lg md:text-xl font-bold group-hover:text-accent transition-colors flex-1">
                  {post.title}
                </h2>
                <span className="text-sm text-muted font-mono flex-shrink-0">
                  {format(new Date(post.date), "MMM dd, yyyy")}
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}

