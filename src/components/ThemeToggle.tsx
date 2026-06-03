"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
      document.documentElement.classList.toggle(
        "dark",
        savedTheme === "dark"
      );
    } else {
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      const defaultTheme = systemDark ? "dark" : "light";

      setTheme(defaultTheme);

      document.documentElement.classList.toggle(
        "dark",
        systemDark
      );
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    const syncTheme = (e: StorageEvent) => {
      if (e.key === "theme") {
        const newTheme = e.newValue as "light" | "dark";

        if (newTheme) {
          setTheme(newTheme);
          document.documentElement.classList.toggle(
            "dark",
            newTheme === "dark"
          );
        }
      }
    };

    window.addEventListener("storage", syncTheme);

    return () =>
      window.removeEventListener("storage", syncTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme =
      theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);

    localStorage.setItem("theme", nextTheme);

    document.documentElement.classList.toggle(
      "dark",
      nextTheme === "dark"
    );
  };

  if (!mounted) {
    return (
      <div className="w-12 h-12 rounded-full border border-slate-700 animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      title={`Switch to ${
        theme === "dark" ? "light" : "dark"
      } mode`}
      className="
        relative
        flex
        items-center
        justify-center
        w-12
        h-12
        rounded-full
        border
        border-slate-700
        bg-white/10
        dark:bg-slate-800/70
        backdrop-blur-md
        shadow-lg
        hover:scale-105
        hover:shadow-xl
        transition-all
        duration-300
      "
    >
      <div className="relative">
        <Sun
          size={20}
          className={`
            absolute
            transition-all
            duration-500
            ${
              theme === "light"
                ? "rotate-0 scale-100 opacity-100"
                : "rotate-90 scale-0 opacity-0"
            }
          `}
        />

        <Moon
          size={20}
          className={`
            transition-all
            duration-500
            ${
              theme === "dark"
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-90 scale-0 opacity-0"
            }
          `}
        />
      </div>
    </button>
  );
}