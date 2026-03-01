"use client";

import { usePathname } from "next/navigation";

export default function FloralOverlay() {
  const pathname = usePathname();

  // Hide on blog reader pages (blog/[slug]), show everywhere else
  const isBlogReader = pathname.startsWith("/blog/");
  if (isBlogReader) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.012]"
      style={{
        backgroundImage: "url('/floral.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
