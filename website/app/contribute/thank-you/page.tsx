"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function FloatingLeaf({ delay, x, size, duration }: { delay: number; x: number; size: number; duration: number }) {
  return (
    <div
      className="absolute pointer-events-none animate-float-leaf"
      style={{
        left: `${x}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      <span style={{ fontSize: `${size}rem`, opacity: 0.6 }}>🌿</span>
    </div>
  );
}

function PlanetScene({ stage }: { stage: number }) {
  return (
    <div className="relative w-64 h-64 mx-auto mb-10">
      {/* Glow behind planet */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-[2000ms]"
        style={{
          background: stage >= 1
            ? "radial-gradient(circle, rgba(122,155,104,0.25) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(122,155,104,0.05) 0%, transparent 70%)",
          transform: stage >= 2 ? "scale(1.3)" : "scale(1)",
        }}
      />

      {/* Planet body */}
      <div className="absolute inset-6 rounded-full overflow-hidden transition-all duration-[1500ms]"
        style={{
          background: stage >= 2
            ? "linear-gradient(135deg, #7A9B68 0%, #2D5016 40%, #1B3A0A 100%)"
            : "linear-gradient(135deg, #C9BAA6 0%, #8B7B68 40%, #6B5B48 100%)",
          boxShadow: stage >= 2
            ? "inset -20px -10px 40px rgba(0,0,0,0.2), 0 0 60px rgba(122,155,104,0.3)"
            : "inset -20px -10px 40px rgba(0,0,0,0.3), 0 0 20px rgba(0,0,0,0.1)",
        }}
      >
        {/* Land masses */}
        <div
          className="absolute w-16 h-12 rounded-full transition-all duration-[2000ms]"
          style={{
            top: "25%",
            left: "20%",
            background: stage >= 2 ? "#E4EFD8" : "#EFE6D5",
            opacity: stage >= 1 ? 0.7 : 0.3,
            transform: `rotate(-15deg) ${stage >= 2 ? "scale(1.1)" : "scale(1)"}`,
          }}
        />
        <div
          className="absolute w-10 h-14 rounded-full transition-all duration-[2000ms] delay-300"
          style={{
            top: "40%",
            right: "15%",
            background: stage >= 2 ? "#C5D6B4" : "#C9BAA6",
            opacity: stage >= 1 ? 0.6 : 0.2,
            transform: `rotate(20deg) ${stage >= 2 ? "scale(1.15)" : "scale(1)"}`,
          }}
        />
        <div
          className="absolute w-8 h-6 rounded-full transition-all duration-[2000ms] delay-500"
          style={{
            bottom: "20%",
            left: "35%",
            background: stage >= 2 ? "#7A9B68" : "#A09080",
            opacity: stage >= 1 ? 0.5 : 0.2,
          }}
        />

        {/* Water shimmer */}
        <div
          className="absolute inset-0 rounded-full transition-opacity duration-[2000ms]"
          style={{
            background: "radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 50%)",
            opacity: stage >= 2 ? 1 : 0.3,
          }}
        />
      </div>

      {/* Orbiting elements */}
      {stage >= 2 && (
        <>
          <div className="absolute top-2 right-8 animate-orbit-slow text-lg">🌱</div>
          <div className="absolute bottom-4 left-4 animate-orbit-slow-reverse text-base" style={{ animationDelay: "1s" }}>💚</div>
          <div className="absolute top-12 left-0 animate-orbit-slow text-sm" style={{ animationDelay: "2s" }}>🌿</div>
        </>
      )}

      {/* Sparkles */}
      {stage >= 3 && (
        <>
          <div className="absolute -top-2 left-1/2 animate-sparkle">✨</div>
          <div className="absolute top-1/4 -right-2 animate-sparkle" style={{ animationDelay: "0.3s" }}>✨</div>
          <div className="absolute -bottom-1 left-1/3 animate-sparkle" style={{ animationDelay: "0.6s" }}>✨</div>
        </>
      )}
    </div>
  );
}

export default function ThankYouPage() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 400);
    const t2 = setTimeout(() => setStage(2), 1200);
    const t3 = setTimeout(() => setStage(3), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const leaves = [
    { delay: 0, x: 10, size: 1.2, duration: 8 },
    { delay: 1.5, x: 30, size: 0.9, duration: 10 },
    { delay: 3, x: 55, size: 1.1, duration: 9 },
    { delay: 0.8, x: 75, size: 0.8, duration: 11 },
    { delay: 2.2, x: 90, size: 1, duration: 8.5 },
  ];

  return (
    <article className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      {/* Floating leaves background */}
      {stage >= 2 && leaves.map((leaf, i) => (
        <FloatingLeaf key={i} {...leaf} />
      ))}

      {/* Planet animation */}
      <PlanetScene stage={stage} />

      {/* Text content */}
      <div
        className="text-center max-w-md mx-auto transition-all duration-1000"
        style={{
          opacity: stage >= 1 ? 1 : 0,
          transform: stage >= 1 ? "translateY(0)" : "translateY(20px)",
        }}
      >
        <h1
          className="text-3xl md:text-5xl font-bold text-green-deep mb-4 leading-tight"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Thank You
        </h1>

        <p
          className="text-lg text-brown/70 mb-3 transition-all duration-1000 delay-500"
          style={{
            fontFamily: "var(--font-source-serif), serif",
            opacity: stage >= 2 ? 1 : 0,
            transform: stage >= 2 ? "translateY(0)" : "translateY(10px)",
          }}
        >
          Your contribution makes the planet a little greener.
        </p>

        <p
          className="text-sm text-brown/45 mb-10 transition-all duration-1000 delay-700"
          style={{
            fontFamily: "var(--font-geist-sans), sans-serif",
            opacity: stage >= 2 ? 1 : 0,
          }}
        >
          Every project, idea, and conversation plants a seed for change.
        </p>

        <div
          className="flex flex-wrap justify-center gap-3 transition-all duration-1000"
          style={{
            fontFamily: "var(--font-geist-sans), sans-serif",
            opacity: stage >= 3 ? 1 : 0,
            transform: stage >= 3 ? "translateY(0)" : "translateY(10px)",
          }}
        >
          <Link
            href="/contribute"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brown-dark text-white rounded-full text-sm font-semibold hover:bg-terracotta transition-all duration-300"
          >
            Back to Collaborate
          </Link>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-brown/20 text-brown-dark rounded-full text-sm font-semibold hover:border-terracotta hover:text-terracotta transition-all duration-300"
          >
            Home
          </Link>
        </div>
      </div>
    </article>
  );
}
