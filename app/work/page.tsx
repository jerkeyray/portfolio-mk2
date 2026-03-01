import { allWorkEntries } from "contentlayer/generated";
import { format } from "date-fns";
import type { Metadata } from "next";
import { Database } from "lucide-react";
import { SiBun, SiElevenlabs, SiGo, SiNextdotjs, SiResend, SiUpstash } from "react-icons/si";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jerkeyray.dev";

export const metadata: Metadata = {
  title: "work",
  description: "Work experience, roles, and projects built by jerkeyray",
  openGraph: {
    type: "website",
    url: `${siteUrl}/work`,
    title: "work | jerkeyray",
    description: "Work experience, roles, and projects built by jerkeyray",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "jerkeyray work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "work | jerkeyray",
    description: "Work experience, roles, and projects built by jerkeyray",
    images: ["/og-image.png"],
    creator: "@jerkeyray",
  },
};

function formatWorkDate(date: string): string {
  return format(new Date(date), "MMM yyyy");
}


const workDetails: Record<
  string,
  {
    intro?: string;
    techStack?: string[];
    highlightTerms?: string[];
    highlights: string[];
  }
> = {
  hdesk: {
    intro:
      "Building and shipping end-to-end features for a B2B SaaS platform focused on outbound AI calling and lead qualification.",
    techStack: ["Next.js", "ElevenLabs", "Bun", "QStash", "Neon", "Resend"],
    highlights: [
      "Led full-stack development across backend APIs, database design, and frontend workflows.",
      "Integrated ElevenLabs voice agents for outbound, agentic call handling and structured data capture.",
      "Designed RBAC system for multi-role access control across sales, admin, and operations users.",
      "Built automated email workflows for qualified leads and synced outcomes directly to the company CRM.",
      "Implemented webhook pipelines for call events, status updates, and lead lifecycle tracking.",
    ],
    highlightTerms: [
      "Next.js",
      "ElevenLabs",
      "Bun",
      "QStash",
      "Neon",
      "Resend",
      "RBAC",
      "webhook",
      "CRM",
      "backend",
      "full-stack",
      "outbound AI",
    ],
  },
  "maxim-ai": {
    intro: "Working on a high performance LLM API gateway in Go.",
    techStack: ["Go"],
    highlights: [
      "Implemented rerank operations with multi-provider and pricing integration.",
      "Built scoped pricing override infrastructure with deterministic resolution.",
      "Actively resolving production issues and shipping core gateway improvements.",
    ],
    highlightTerms: ["rerank"],
  },
};

function getTechIcon(tech: string) {
  if (tech === "Next.js") return <SiNextdotjs className="size-3.5" />;
  if (tech === "ElevenLabs") return <SiElevenlabs className="size-3.5" />;
  if (tech === "Bun") return <SiBun className="size-3.5" />;
  if (tech === "QStash") return <SiUpstash className="size-3.5" />;
  if (tech === "Neon") return <Database className="size-3.5" />;
  if (tech === "Resend") return <SiResend className="size-3.5" />;
  if (tech === "Go") return <SiGo className="size-3.5" />;
  return null;
}

function highlightImportant(text: string, terms: string[] = []) {
  if (terms.length === 0) return text;

  const escapedTerms = terms.map((term) =>
    term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const pattern = new RegExp(`(${escapedTerms.join("|")})`, "gi");
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    const isImportant = terms.some(
      (term) => term.toLowerCase() === part.toLowerCase()
    );

    return isImportant ? (
      <span key={`${part}-${index}`} className="text-accent font-medium">
        {part}
      </span>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    );
  });
}

export default function WorkPage() {
  const entries = allWorkEntries
    .filter((entry) => entry.published)
    .sort((a, b) => {
      const startDateDiff =
        new Date(b.dateStart).getTime() - new Date(a.dateStart).getTime();

      if (startDateDiff !== 0) return startDateDiff;

      return (b.order ?? 0) - (a.order ?? 0);
    });

  return (
    <div className="space-y-8 max-w-3xl mx-auto pt-24 pb-10">
      <header className="space-y-2">
        <h1 className="text-xl md:text-3xl font-bold tracking-tight">work</h1>
      </header>

      {entries.length === 0 ? (
        <div className="border border-muted/20 rounded-md p-6 text-muted-foreground/90">
          work entries coming soon.
        </div>
      ) : (
        <div className="relative space-y-6 pl-8">
          {/* Timeline line with gradient fade */}
          <div
            className="absolute left-[9px] top-2 bottom-2 w-px animate-timeline-line"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--accent) 10%, var(--muted) 50%, transparent 100%)",
              opacity: 0.4,
            }}
          />

          {entries.map((entry, index) => {
            const details = workDetails[entry.slug];
            const highlightTerms = details?.highlightTerms ?? [];
            const isPresent = entry.dateEnd === "Present";
            const dateRange = `${formatWorkDate(entry.dateStart)} - ${
              isPresent ? "Present" : formatWorkDate(entry.dateEnd)
            }`;

            return (
              <article
                key={entry.slug}
                className="animate-timeline-entry relative rounded-md border border-muted/20 p-6 transition-all duration-300 hover:border-accent hover:bg-muted/5 hover:shadow-[0_0_20px_-5px_rgba(240,160,192,0.15)]"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Timeline dot */}
                <span
                  className={`absolute -left-[27px] top-7 h-3.5 w-3.5 rounded-full border-2 transition-colors ${
                    isPresent
                      ? "border-accent bg-accent shadow-[0_0_8px_rgba(240,160,192,0.4)]"
                      : "border-muted/50 bg-background"
                  }`}
                />

                <div className="flex flex-col gap-3">
                  {/* Title & Company */}
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-4">
                      <h2 className="text-lg md:text-xl font-bold tracking-tight">
                        {entry.title}
                      </h2>
                    </div>
                    <p className="text-accent text-sm md:text-base font-medium">
                      @{" "}
                      <span
                        className={entry.isCompanyBlurred ? "blur-sm select-none" : undefined}
                      >
                        {entry.company}
                      </span>
                    </p>
                  </div>

                  {/* Meta: date, location, type */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs md:text-sm text-muted-foreground/70">
                    <span>{dateRange}</span>
                    {entry.location && (
                      <>
                        <span className="text-muted-foreground/40">·</span>
                        <span>{entry.location}</span>
                      </>
                    )}
                    {entry.employmentType && (
                      <>
                        <span className="text-muted-foreground/40">·</span>
                        <span>{entry.employmentType}</span>
                      </>
                    )}
                  </div>

                  {/* Tech Stack */}
                  {details?.techStack?.length ? (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {details.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-2.5 py-0.5 text-xs text-accent/80 transition-colors hover:border-accent/40 hover:text-accent"
                        >
                          {getTechIcon(tech)}
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {/* Intro */}
                  <p className="text-sm md:text-base text-muted-foreground/90 leading-relaxed">
                    {highlightImportant(details?.intro ?? entry.summary, highlightTerms)}
                  </p>

                  {/* Featured Project */}
                  {entry.featuredProjectTitle && entry.featuredProjectSummary ? (
                    <div className="mt-1 rounded-md border border-accent/20 bg-accent/5 p-3">
                      <p className="text-sm font-semibold text-accent">
                        featured: {entry.featuredProjectTitle}
                      </p>
                      <p className="text-sm text-muted-foreground/90 mt-1 leading-relaxed">
                        {entry.featuredProjectSummary}
                      </p>
                    </div>
                  ) : null}

                  {/* Highlights */}
                  {details?.highlights?.length ? (
                    <ul className="space-y-2 text-sm md:text-base text-muted-foreground/85 leading-relaxed">
                      {details.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-2.5">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/50" />
                          <span>{highlightImportant(highlight, highlightTerms)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
