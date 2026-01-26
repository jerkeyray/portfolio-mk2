"use client";

import { useState } from "react";

export default function PikachuAnimation() {
  const [isJumping, setIsJumping] = useState(false);

  const handleClick = () => {
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 600);
  };

  return (
    <div
      className={`fixed bottom-4 right-4 cursor-pointer z-40 transition-transform duration-300 ${
        isJumping ? "-translate-y-16" : "hover:-translate-y-1"
      }`}
      onClick={handleClick}
    >
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif"
        alt="Pikachu"
        className="w-20 h-20"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
