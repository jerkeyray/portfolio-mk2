"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export default function PikachuAnimation() {
  const pathname = usePathname();
  const [isJumping, setIsJumping] = useState(false);

  // Hide on blog pages
  if (pathname?.startsWith("/blog/")) {
    return null;
  }

  const handleClick = () => {
    if (isJumping) return;
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Pikachu - click to make it jump!"
      className={`fixed bottom-4 right-4 cursor-pointer z-40 transition-transform duration-300 focus:outline-none focus-visible:ring-3 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded ${
        isJumping ? "-translate-y-4" : "hover:-translate-y-1"
      }`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif"
        alt="Pikachu"
        className="w-20 h-20"
        style={{ imageRendering: "pixelated" }}
        aria-hidden="true"
      />
    </div>
  );
}
