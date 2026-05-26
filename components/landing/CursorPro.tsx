"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorPro() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 768px)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;
    setEnabled(true);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
        dotRef.current.style.opacity = "1";
      }
    };

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const onHoverIn = () => {
      ringRef.current?.classList.add("is-hover");
      dotRef.current?.classList.add("is-hover");
    };
    const onHoverOut = () => {
      ringRef.current?.classList.remove("is-hover");
      dotRef.current?.classList.remove("is-hover");
    };

    const onClickStart = () => {
      ringRef.current?.classList.add("is-click");
    };
    const onClickEnd = () => {
      ringRef.current?.classList.remove("is-click");
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mousedown", onClickStart);
    document.addEventListener("mouseup", onClickEnd);

    const sel = "a, button, [data-hover], input, textarea, select";
    const bindHovers = () => {
      document.querySelectorAll(sel).forEach((el) => {
        el.addEventListener("mouseenter", onHoverIn);
        el.addEventListener("mouseleave", onHoverOut);
      });
    };
    bindHovers();
    // Re-bind para elementos novos
    const observer = new MutationObserver(() => bindHovers());
    observer.observe(document.body, { childList: true, subtree: true });

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
        ringRef.current.style.opacity = "1";
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    document.body.style.cursor = "none";
    document
      .querySelectorAll<HTMLElement>("a, button, input, textarea, select")
      .forEach((el) => (el.style.cursor = "none"));

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mousedown", onClickStart);
      document.removeEventListener("mouseup", onClickEnd);
      observer.disconnect();
      document.body.style.cursor = "";
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden
        style={{ opacity: 0 }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        aria-hidden
        style={{ opacity: 0 }}
      />
    </>
  );
}
