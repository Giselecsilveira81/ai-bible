"use client";

import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      document
        .querySelectorAll<HTMLElement>(".fade-up, .split-reveal")
        .forEach((el) => el.classList.add("in"));
      return;
    }

    const els = document.querySelectorAll<HTMLElement>(
      ".fade-up:not(.in), .split-reveal:not(.in)",
    );

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            // Stagger within parent
            const siblings = el.parentElement
              ? Array.from(
                  el.parentElement.querySelectorAll(".fade-up"),
                )
              : [];
            const idx = siblings.indexOf(el);
            if (idx > 0) el.style.transitionDelay = `${idx * 0.08}s`;
            el.classList.add("in");
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}
