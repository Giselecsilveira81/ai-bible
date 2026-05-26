"use client";

import {
  Home,
  BookOpen,
  Calendar,
  Sparkles,
  User,
} from "lucide-react";

export default function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Phone body */}
      <div
        style={{
          width: 300,
          aspectRatio: "9 / 19.5",
          borderRadius: 44,
          padding: 5,
          background:
            "linear-gradient(135deg, #2a2620 0%, #15120e 30%, #0a0805 70%, #1c1814 100%)",
          boxShadow:
            "0 50px 100px rgba(10,10,10,0.35), " +
            "0 25px 50px rgba(10,10,10,0.2), " +
            "0 12px 24px rgba(201,169,97,0.12), " +
            "inset 0 0 0 1px rgba(201,169,97,0.2)",
        }}
      >
        {/* Frame glow */}
        <div
          aria-hidden
          className="absolute inset-[3px] rounded-[42px] pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,232,176,0.06) 0%, transparent 30%)",
          }}
        />

        {/* Screen */}
        <div
          className="relative w-full h-full overflow-hidden flex flex-col"
          style={{
            borderRadius: 39,
            background:
              "linear-gradient(180deg, #fbf9f4 0%, #f8f6f1 50%, #f5f1e8 100%)",
          }}
        >
          {/* Notch */}
          <div
            className="absolute top-2.5 left-1/2 -translate-x-1/2 rounded-full z-20"
            style={{
              width: 90,
              height: 26,
              background: "#0a0805",
              boxShadow: "inset 0 0 8px rgba(0,0,0,0.5)",
            }}
          />

          {/* Status bar */}
          <div className="relative z-10 flex justify-between items-center px-7 pt-3.5 text-[9px] font-medium text-ink">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <svg width="11" height="8" viewBox="0 0 11 8" fill="currentColor">
                <rect x="0" y="6" width="1.5" height="2" rx="0.4" />
                <rect x="2.5" y="4" width="1.5" height="4" rx="0.4" />
                <rect x="5" y="2" width="1.5" height="6" rx="0.4" />
                <rect x="7.5" y="0" width="1.5" height="8" rx="0.4" />
              </svg>
              <svg width="10" height="7" viewBox="0 0 10 7" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M5 6.2 L 5 6.2" strokeLinecap="round" strokeWidth="1.5" />
                <path d="M2.5 4.2 Q 5 2.5 7.5 4.2" />
                <path d="M0.5 2.2 Q 5 -1 9.5 2.2" />
              </svg>
              <svg width="14" height="7" viewBox="0 0 14 7" fill="none">
                <rect x="0.5" y="0.5" width="11" height="6" rx="1.2" stroke="currentColor" strokeWidth="0.7" />
                <rect x="12" y="2.5" width="1" height="2" fill="currentColor" rx="0.3" />
                <rect x="1.5" y="1.5" width="9" height="4" fill="currentColor" rx="0.4" />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {children}
          </div>

          {/* Tab bar */}
          <div
            className="flex justify-around items-center py-2.5 px-4 shrink-0"
            style={{
              borderTop: "1px solid rgba(10,10,10,0.06)",
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(8px)",
            }}
          >
            {[
              { icon: <Home size={11} />, label: "Início", active: false },
              { icon: <BookOpen size={11} />, label: "Bíblia", active: false },
              { icon: <Calendar size={11} />, label: "Plano", active: false },
              { icon: <Sparkles size={11} />, label: "IA", active: false },
              { icon: <User size={11} />, label: "Perfil", active: false },
            ].map((t) => (
              <div
                key={t.label}
                className="flex flex-col items-center gap-0.5"
                style={{ color: t.active ? "#8B6F2A" : "#9b9b9b" }}
              >
                {t.icon}
                <span className="font-mono uppercase" style={{ fontSize: 7, letterSpacing: "0.1em" }}>
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mini pedestal */}
      <div className="mx-auto" style={{ width: 200, marginTop: -4 }}>
        <div
          className="mx-auto rounded-full"
          style={{
            width: "100%",
            height: 28,
            background: "radial-gradient(ellipse at 50% 20%, #faf6ed 0%, #f0e6cf 100%)",
            boxShadow: "0 12px 30px rgba(201,169,97,0.25)",
          }}
        />
        <div
          className="mx-auto rounded-full"
          style={{
            width: "80%",
            height: 8,
            marginTop: -2,
            background: "radial-gradient(ellipse, rgba(232,213,160,0.6) 0%, transparent 70%)",
            filter: "blur(4px)",
          }}
        />
      </div>
    </div>
  );
}
