"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Parallax baseado em IntersectionObserver + scroll.
 * Aplica translateY proporcional à posição relativa do elemento na viewport.
 */
export function useParallax<T extends HTMLElement>(
  speed: number = 0.08,
  baseTransform: string = "",
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 768px)").matches) return;

    let ticking = false;
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const offset = (window.innerHeight / 2 - center) * speed;
      el.style.transform = `${baseTransform} translateY(${offset.toFixed(1)}px)`.trim();
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [speed, baseTransform]);

  return ref;
}
