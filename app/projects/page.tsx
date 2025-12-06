import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import { projects } from "../../data/projects";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jerkeyray.dev";

export const metadata: Metadata = {
  title: "projects",
  description:
    "Projects built with Go, exploring backend systems and distributed systems",
  openGraph: {
    type: "website",
    url: `${siteUrl}/projects`,
    title: "projects | jerkeyray",
    description:
      "Projects built with Go, exploring backend systems and distributed systems",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "jerkeyray projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "projects | jerkeyray",
    description:
      "Projects built with Go, exploring backend systems and distributed systems",
    images: ["/og-image.png"],
    creator: "@jerkeyray",
  },
};

export default function Projects() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pt-20">
      <h1 className="text-xl md:text-3xl font-bold tracking-tight">projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group relative border border-muted/20 p-6 hover:border-accent hover:bg-muted/5 hover:shadow-[0_0_20px_-5px_rgba(240,160,192,0.15)] transition-all duration-300 hover:-translate-y-1 flex flex-col rounded-md"
          >
            {/* GitHub icon in top right (clickable if repoLink exists) */}
            {project.repoLink && (
              <Link
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 opacity-60 group-hover:opacity-100 group-hover:scale-110 group-hover:text-accent transition-all duration-300"
                aria-label={`${project.title} GitHub repository`}
              >
                <Github size={20} />
              </Link>
            )}

            {/* Title */}
            <h2 className="font-bold text-lg mb-3 pr-8 group-hover:text-accent transition-colors">
              {project.title}
            </h2>

            {/* Description */}
            <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 mb-4 grow">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="text-xs px-2 py-1 bg-muted/20 border border-muted/30 rounded text-muted-foreground group-hover:border-accent/20 group-hover:text-foreground transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* View source link (only if a live site sourceLink exists) */}
            {project.sourceLink && (
              <Link
                href={project.sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:text-accent/90 transition-colors inline-flex items-center gap-1.5"
              >
                live link
                <ExternalLink size={14} />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
