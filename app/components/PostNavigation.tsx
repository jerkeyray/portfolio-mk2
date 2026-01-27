"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Post = {
  title: string;
  url: string;
};

type PostNavigationProps = {
  prevPost?: Post;
  nextPost?: Post;
};

export default function PostNavigation({
  prevPost,
  nextPost,
}: PostNavigationProps) {
  if (!prevPost && !nextPost) return null;

  return (
    <nav className="mt-16 pt-8 border-t border-muted/20">
      <div className="flex items-center justify-between gap-4">
        {prevPost ? (
          <Link
            href={prevPost.url}
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors max-w-[45%] focus:outline-none focus-visible:ring-3 focus-visible:ring-accent focus-visible:ring-offset-2 rounded px-2 py-1 -mx-2"
          >
            <ArrowLeft
              size={16}
              className="flex-shrink-0 group-hover:-translate-x-1 transition-transform"
            />
            <div className="flex flex-col items-start">
              <span className="text-xs uppercase tracking-wider opacity-60">
                Previous
              </span>
              <span className="font-medium line-clamp-1">{prevPost.title}</span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextPost ? (
          <Link
            href={nextPost.url}
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors max-w-[45%] text-right ml-auto focus:outline-none focus-visible:ring-3 focus-visible:ring-accent focus-visible:ring-offset-2 rounded px-2 py-1 -mx-2"
          >
            <div className="flex flex-col items-end">
              <span className="text-xs uppercase tracking-wider opacity-60">
                Next
              </span>
              <span className="font-medium line-clamp-1">{nextPost.title}</span>
            </div>
            <ArrowRight
              size={16}
              className="flex-shrink-0 group-hover:translate-x-1 transition-transform"
            />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
