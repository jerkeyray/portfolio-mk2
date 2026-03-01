"use client";

import { useState } from "react";
import { FaGithub, FaXTwitter, FaEnvelope, FaLinkedin, FaCheck, FaFileArrowDown } from "react-icons/fa6";
import { SiHashnode, SiBuymeacoffee } from "react-icons/si";
import Link from "next/link";

const socials = [
  { name: "GitHub", url: "https://github.com/jerkeyray", icon: FaGithub },
  { name: "X", url: "https://x.com/jerkeyray", icon: FaXTwitter },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/aditya-srivastava-a943a8321/", icon: FaLinkedin },
  { name: "Hashnode", url: "https://jerkeyray.hashnode.dev", icon: SiHashnode },
  { name: "Buy Me a Coffee", url: "https://www.buymeacoffee.com/jerkeyray", icon: SiBuymeacoffee },
];

export default function Home() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const email = "srivastavya24@gmail.com";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
      setEmailError(true);
      setTimeout(() => setEmailError(false), 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col justify-start md:justify-center min-h-screen pt-16 md:pt-0 pb-10 px-4 md:px-8">
      <section className="space-y-5 md:space-y-7">
        <h1
          className="animate-stagger text-xl md:text-3xl font-bold tracking-tight"
          style={{ animationDelay: "0ms" }}
        >
          hi, i&apos;m aditya.
        </h1>

        <div
          className="animate-stagger flex flex-wrap items-center gap-2 text-[11px] md:text-sm font-medium"
          style={{ animationDelay: "100ms" }}
        >
          {["go", "distributed systems", "ai infra", "db internals"].map((tag, i) => (
            <span key={tag} className="flex items-center gap-2">
              {i > 0 && <span className="text-muted-foreground/30">•</span>}
              <span className="bg-accent/10 px-2 py-0.5 md:px-2.5 md:py-1 rounded border border-accent/20 text-accent/90 transition-all duration-200 hover:bg-accent/20 hover:border-accent/40 cursor-default">
                {tag}
              </span>
            </span>
          ))}
        </div>

        <div
          className="animate-stagger space-y-4"
          style={{ animationDelay: "200ms" }}
        >
          <p className="text-sm md:text-lg text-muted-foreground/90 leading-relaxed">
            cs undergrad working on production{" "}
            <span className="text-accent font-medium">backend</span> and{" "}
            <span className="text-accent font-medium">ai systems</span>.
          </p>

          <p className="text-sm md:text-lg text-muted-foreground/90 leading-relaxed">
            i learn by thinking from{" "}
            <span className="text-accent font-medium">first principles</span> and
            digging into the details until things make sense — mostly working with{" "}
            <span className="text-accent font-medium">go</span>, building backend systems
            from scratch, focusing on{" "}
            <span className="text-accent font-medium">concurrency</span> and system
            fundamentals.
          </p>
        </div>

        <div
          className="animate-stagger space-y-2.5 text-sm md:text-lg"
          style={{ animationDelay: "300ms" }}
        >
          <p className="text-muted-foreground/90 leading-relaxed">
            currently building at{" "}
            <Link
              href="/work"
              className="text-accent hover:text-accent/80 underline decoration-accent/50 hover:decoration-accent underline-offset-4 transition-all font-medium"
            >
              work
            </Link>
            . i also write{" "}
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

      <div
        className="animate-stagger flex items-center gap-5 pt-8 md:pt-10"
        style={{ animationDelay: "400ms" }}
      >
        {socials.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-all duration-300 hover:scale-110 focus:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
              aria-label={social.name}
            >
              <Icon size={25} />
            </a>
          );
        })}

        <span className="h-5 w-px bg-muted/30" />

        <button
          onClick={copyEmail}
          className={`transition-all duration-300 hover:scale-110 focus:scale-110 cursor-pointer flex items-center bg-transparent border-none p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded ${
            emailError
              ? "text-red-400 animate-pulse"
              : emailCopied
                ? "text-accent"
                : "text-muted-foreground hover:text-accent"
          }`}
          aria-label={emailError ? "Failed to copy email" : emailCopied ? "Email copied" : "Copy email"}
        >
          {emailCopied ? (
            <FaCheck size={19} />
          ) : (
            <FaEnvelope size={25} />
          )}
        </button>
      </div>
    </div>
  );
}
