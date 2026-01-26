"use client";

import { useState } from "react";

type Pokemon = "pikachu" | "eevee" | "squirtle";

export default function PikachuAnimation() {
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon>("pikachu");
  const [isLeaving, setIsLeaving] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  const handleClick = () => {
    setIsLeaving(true);

    setTimeout(() => {
      setCurrentPokemon(prev => {
        if (prev === "pikachu") return "eevee";
        if (prev === "eevee") return "squirtle";
        return "pikachu";
      });
      setIsLeaving(false);
      setIsEntering(true);
    }, 300);

    setTimeout(() => {
      setIsEntering(false);
    }, 800);
  };

  const pokemonSprites = {
    pikachu: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif",
    eevee: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/133.gif",
    squirtle: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/7.gif"
  };

  return (
    <div
      className={`fixed bottom-4 right-4 cursor-pointer z-40 transition-all duration-300 ${
        isLeaving
          ? "-translate-x-24 opacity-0"
          : isEntering
            ? "translate-x-0 opacity-100"
            : "hover:-translate-y-1"
      }`}
      onClick={handleClick}
    >
      <img
        src={pokemonSprites[currentPokemon]}
        alt={currentPokemon}
        className="w-20 h-20"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
