"use client";

import { useState } from "react";
import { FaGithub, FaXTwitter, FaEnvelope, FaLinkedin, FaCheck, FaFileArrowDown } from "react-icons/fa6";
import { SiLeetcode, SiHashnode, SiBuymeacoffee } from "react-icons/si";
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
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/aditya-srivastava-a943a8321/",
    icon: FaLinkedin,
    hoverColor: "#0077B5",
  },
  // {
  //   name: "LeetCode",
  //   url: "https://leetcode.com/u/0tMezaewYp/",
  //   icon: SiLeetcode,
  //   hoverColor: "#FFA116",
  // },
  {
    name: "Hashnode",
    url: "https://jerkeyray.hashnode.dev",
    icon: SiHashnode,
    hoverColor: "#2962FF",
  },
  {
    name: "Buy Me a Coffee",
    url: "https://www.buymeacoffee.com/jerkeyray",
    icon: SiBuymeacoffee,
    hoverColor: "#FFDD00",
  },
];

export default function Home() {
  const [emailCopied, setEmailCopied] = useState(false);
  const email = "srivastavya24@gmail.com";

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
    <div className="max-w-3xl mx-auto flex flex-col justify-start md:justify-center min-h-screen pt-16 md:pt-0 pb-10 px-4 md:px-8 animate-in fade-in duration-700">
      <section className="space-y-5 md:space-y-7">
        <h1 className="text-xl md:text-3xl font-bold tracking-tight">
          hi, i&apos;m aditya.
        </h1>
        <div className="flex flex-wrap items-center gap-2 text-[11px] md:text-sm font-medium">
          <span className="bg-accent/10 px-2 py-0.5 md:px-2.5 md:py-1 rounded border border-accent/20 text-accent/90">
            go
          </span>
          <span className="text-muted-foreground/30">•</span>
          <span className="bg-accent/10 px-2 py-0.5 md:px-2.5 md:py-1 rounded border border-accent/20 text-accent/90">
            distributed systems
          </span>
          <span className="text-muted-foreground/30">•</span>
          <span className="bg-accent/10 px-2 py-0.5 md:px-2.5 md:py-1 rounded border border-accent/20 text-accent/90">
            backend systems
          </span>
          <span className="text-muted-foreground/30">•</span>
          <span className="bg-accent/10 px-2 py-0.5 md:px-2.5 md:py-1 rounded border border-accent/20 text-accent/90">
            db internals
          </span>
        </div>

        <p className="text-sm md:text-lg text-muted-foreground/90 leading-relaxed">
          18 y/o pursuing bachelors in cs at vit vellore.
        </p>

        <p className="text-sm md:text-lg text-muted-foreground/90 leading-relaxed">
          learning by thinking from first principles and digging into the details
          until things make sense. mostly working with{" "}
          <span className="text-accent font-medium">go</span>, building backend systems
          from scratch—focusing on concurrency and system fundamentals.
        </p>

        <div className="space-y-2.5 text-sm md:text-lg">
          <p className="text-muted-foreground/90 leading-relaxed">
            <span className="text-accent font-semibold">currently:</span>{" "}
            exploring distributed systems, concurrency, and database internals.
          </p>

          <p className="text-muted-foreground/90 leading-relaxed">
            i also write{" "}
            <Link
              href="/blog"
              className="text-accent hover:text-accent/80 underline decoration-accent/50 hover:decoration-accent underline-offset-4 transition-all font-medium"
            >
              technical blogs
            </Link>{" "}
            about what i build and learn along the way.
          </p>

          <p className="text-muted-foreground/90 leading-relaxed">
            you can find my resume{" "}
            <a
              href="/aditya_srivastava_resume.pdf"
              download="aditya_srivastava_resume.pdf"
              className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 underline decoration-accent/50 hover:decoration-accent underline-offset-4 transition-all font-medium group"
            >
              here
              <FaFileArrowDown className="text-sm group-hover:translate-y-0.5 transition-transform" />
            </a>
            .
          </p>
        </div>
      </section>

      <div className="flex gap-5 pt-8 md:pt-10">
        {socials.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-all duration-300 hover:scale-110 focus:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
              style={{
                color: "currentColor",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#f0a0c0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "";
              }}
              onFocus={(e) => {
                e.currentTarget.style.color = "#f0a0c0";
              }}
              onBlur={(e) => {
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
          className="text-muted-foreground transition-all duration-300 hover:scale-110 focus:scale-110 cursor-pointer flex items-center bg-transparent border-none p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
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
              e.currentTarget.style.color = "currentColor";
            }
          }}
          aria-label={emailCopied ? "Email copied" : "Copy email"}
        >
          {emailCopied ? (
            <span className="flex items-center gap-1.5 text-accent">
              <FaCheck size={19} />
            </span>
          ) : (
            <FaEnvelope size={25} />
          )}
        </button>
      </div>
    </div>
  );
}
