"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
    );
  }

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full flex items-center justify-center
                 bg-yellow-200/70 dark:bg-zinc-800
                 hover:bg-yellow-300/80 dark:hover:bg-zinc-700
                 transition-all duration-300 ease-in-out
                 hover:scale-110 active:scale-95
                 group overflow-hidden"
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      title={isDark ? "Modo Claro" : "Modo Escuro"}
    >
      <div
        className="absolute inset-0 bg-gradient-to-tr from-yellow-200 to-orange-200
                   dark:from-blue-900 dark:to-purple-900
                   opacity-0 group-hover:opacity-20
                   transition-opacity duration-300"
      />

      <IconSun
        size={20}
        className={`absolute transition-all duration-500 ease-in-out
                   ${
                     isDark
                       ? "rotate-90 scale-0 opacity-0"
                       : "rotate-0 scale-100 opacity-100"
                   }
                   text-yellow-600 dark:text-yellow-400`}
      />

      {/* Ícone da Lua */}
      <IconMoon
        size={20}
        className={`absolute transition-all duration-500 ease-in-out
                   ${
                     isDark
                       ? "rotate-0 scale-100 opacity-100"
                       : "-rotate-90 scale-0 opacity-0"
                   }
                   text-blue-600 dark:text-blue-400`}
      />
    </button>
  );
}
