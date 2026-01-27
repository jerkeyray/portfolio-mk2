"use client";

import { Copy, Check, X } from "lucide-react";
import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch (err) {
      console.error("Failed to copy:", err);
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className={`relative inline-flex h-8 w-8 items-center justify-center rounded-md border transition-all ${
        error
          ? "border-red-500/60 bg-red-500/15 text-red-400 animate-pulse"
          : "border-white/20 bg-white/10 text-foreground/80 hover:bg-accent/15 hover:border-accent/60 hover:text-accent"
      }`}
    >
      {error ? (
        <X size={14} strokeWidth={2} className="text-red-400" />
      ) : copied ? (
        <Check size={14} strokeWidth={2} className="text-accent animate-bounce" />
      ) : (
        <Copy size={14} strokeWidth={2} />
      )}
      <span
        className={`pointer-events-none absolute -right-1 -top-8 whitespace-nowrap rounded-md border px-2 py-1 text-xs font-medium shadow-sm transition-opacity ${
          copied
            ? "opacity-100 border-white/20 bg-black/70 text-foreground/90"
            : error
              ? "opacity-100 border-red-500/60 bg-red-900/70 text-red-200"
              : "opacity-0"
        }`}
      >
        {error ? "Failed" : "Copied"}
      </span>
      <span className="sr-only">
        {error ? "Failed to copy" : copied ? "Copied" : "Copy code"}
      </span>
    </button>
  );
}
