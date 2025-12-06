"use client";

import { useState, useEffect } from "react";
import { FaGithub, FaXTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa6";
import { SiLeetcode, SiHashnode } from "react-icons/si";
import Link from "next/link";

const socials = [
  {
    name: "GitHub",
    url: "https://github.com/jerkeyray",
    icon: FaGithub,
    hoverColor: "#9333EA",
  },
  {
    name: "X",
    url: "https://x.com/jerkeyray",
    icon: FaXTwitter,
    hoverColor: "#1DA1F2",
  },
  // {
  //   name: "LinkedIn",
  //   url: "https://www.linkedin.com/in/aditya-srivastava-a943a8321/",
  //   icon: FaLinkedin,
  //   hoverColor: "#0077B5",
  // },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/0tMezaewYp/",
    icon: SiLeetcode,
    hoverColor: "#FFA116",
  },
  {
    name: "Hashnode",
    url: "https://jerkeyray.hashnode.dev",
    icon: SiHashnode,
    hoverColor: "#2962FF",
  },
];

export default function Home() {
  const [emailCopied, setEmailCopied] = useState(false);
  const email = "srivastavya24@gmail.com";

  useEffect(() => {
    // Prevent scrolling on the about page
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling when leaving the page
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col justify-center h-[calc(100vh-5rem)] md:h-screen pt-20 md:pt-0 px-4 overflow-hidden max-h-[calc(100vh-5rem)] md:max-h-screen">
      <section className="space-y-3 md:space-y-6 lg:space-y-8">
        <h1 className="text-xl md:text-3xl font-bold tracking-tight">
          hi, i&apos;m aditya.
        </h1>

        <div className="flex flex-wrap gap-2 md:gap-3 text-xs md:text-sm font-medium text-muted-foreground">
          <span className="bg-muted/10 px-2 py-1 rounded text-accent">go</span>
          <span className="text-muted-foreground/40 flex items-center">•</span>
          <span className="bg-muted/10 px-2 py-1 rounded text-accent">
            backend systems
          </span>
          <span className="text-muted-foreground/40 flex items-center">•</span>
          <span className="bg-muted/10 px-2 py-1 rounded text-accent">
            distributed systems
          </span>
          <span className="text-muted-foreground/40 flex items-center">•</span>
          <span className="bg-muted/10 px-2 py-1 rounded text-accent">
            developer tools
          </span>
        </div>

        <p className="text-sm md:text-lg text-muted-foreground leading-relaxed">
          i learn by thinking from first principles, tinkering with the details
          and abusing caffeine until things finally make sense. i mostly work
          with <span className="text-accent">go</span>, exploring{" "}
          <span className="text-foreground font-medium">backend systems</span>{" "}
          through projects i build entirely from scratch —{" "}
          <span className="text-foreground font-medium">interpreters</span>,{" "}
          <span className="text-foreground font-medium">tiny data stores</span>,{" "}
          <span className="text-foreground font-medium">rate limiters</span> and
          other things that force me to understand what&apos;s actually going
          on.
        </p>

        <div className="space-y-2 text-sm md:text-lg">
          <p className="text-muted-foreground leading-relaxed">
            <span className="text-accent font-medium">currently:</span>{" "}
            exploring distributed systems, concurrency patterns, system
            fundamentals and rust.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            you can find my finished projects{" "}
            <Link
              href="/projects"
              className="text-accent hover:text-accent/80 underline decoration-accent underline-offset-4 transition-colors"
            >
              here
            </Link>
            .
          </p>
        </div>
      </section>

      <div className="flex gap-4 pt-4">
        {socials.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-all duration-200 hover:scale-110"
              style={{
                color: "currentColor",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#f0a0c0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "";
              }}
              aria-label={social.name}
            >
              <Icon size={25} />
            </a>
          );
        })}
        <button
          onClick={copyEmail}
          className="text-muted-foreground transition-all duration-200 hover:scale-110 cursor-pointer flex items-center bg-transparent border-none p-0"
          style={{
            color: emailCopied ? "#f0a0c0" : "currentColor",
          }}
          onMouseEnter={(e) => {
            if (!emailCopied) {
              e.currentTarget.style.color = "#f0a0c0";
            }
          }}
          onMouseLeave={(e) => {
            if (!emailCopied) {
              e.currentTarget.style.color = "";
            }
          }}
          aria-label="Copy email"
        >
          {emailCopied ? (
            <span className="text-sm">copied</span>
          ) : (
            <FaEnvelope size={25} />
          )}
        </button>
      </div>
    </div>
  );
}
