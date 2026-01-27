"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type Pokemon = "pikachu" | "eevee" | "squirtle";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function PikachuAnimation() {
  const pathname = usePathname();

  // Hide on blog pages
  if (pathname?.startsWith("/blog/")) {
    return null;
  }
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon>("pikachu");
  const [isLeaving, setIsLeaving] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [konamiActivated, setKonamiActivated] = useState(false);
  const konamiIndexRef = useRef(0);

  const cyclePokemon = () => {
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

  const handleClick = () => {
    cyclePokemon();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      cyclePokemon();
    }
  };

  // Konami code Easter egg
  useEffect(() => {
    const handleKonamiCode = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === KONAMI_CODE[konamiIndexRef.current]) {
        konamiIndexRef.current++;
        if (konamiIndexRef.current === KONAMI_CODE.length) {
          // Konami code completed!
          setKonamiActivated(true);
          konamiIndexRef.current = 0;

          // Rapid cycle through all Pokemon
          const pokemons: Pokemon[] = ["pikachu", "eevee", "squirtle"];
          let cycleCount = 0;
          const interval = setInterval(() => {
            setCurrentPokemon(pokemons[cycleCount % 3]);
            cycleCount++;
            if (cycleCount >= 9) {
              // 3 full cycles
              clearInterval(interval);
              setTimeout(() => setKonamiActivated(false), 1000);
            }
          }, 200);
        }
      } else {
        konamiIndexRef.current = 0;
      }
    };

    window.addEventListener("keydown", handleKonamiCode);
    return () => window.removeEventListener("keydown", handleKonamiCode);
  }, []);

  const pokemonSprites = {
    pikachu: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif",
    eevee: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/133.gif",
    squirtle: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/7.gif"
  };

  const pokemonNames = {
    pikachu: "Pikachu",
    eevee: "Eevee",
    squirtle: "Squirtle"
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Cycle through Pokemon characters. Currently showing ${pokemonNames[currentPokemon]}`}
      className={`fixed bottom-4 right-4 cursor-pointer z-40 transition-all duration-300 focus:outline-none focus-visible:ring-3 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded ${
        konamiActivated
          ? "animate-bounce scale-125"
          : isLeaving
            ? "-translate-x-24 opacity-0"
            : isEntering
              ? "translate-x-0 opacity-100"
              : "hover:-translate-y-1"
      }`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <img
        src={pokemonSprites[currentPokemon]}
        alt={pokemonNames[currentPokemon]}
        className="w-20 h-20"
        style={{ imageRendering: "pixelated" }}
        aria-hidden="true"
      />
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {pokemonNames[currentPokemon]}
      </span>
    </div>
  );
}
