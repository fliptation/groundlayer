"use client";

import Link from "next/link";
import { useState } from "react";
import { EXAMPLES } from "@/lib/examples";
import { LAYERS } from "@/lib/layers";

export default function ExamplesPage() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Read initial layer filter from URL on first render
  // (useSearchParams would require Suspense, keeping it simple)
  useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const layerParam = params.get("layer");
      if (layerParam) setActiveLayer(Number(layerParam));
    }
  });

  const filtered = EXAMPLES.filter((ex) => {
    if (activeLayer && ex.layer !== activeLayer) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        ex.name.toLowerCase().includes(q) ||
        ex.location.toLowerCase().includes(q) ||
        ex.description.toLowerCase().includes(q) ||
        ex.tags.some((t) => t.includes(q))
      );
    }
    return true;
  });

  const layerCounts = LAYERS.map((l) => ({
    ...l,
    count: EXAMPLES.filter((e) => e.layer === l.id).length,
  }));

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16 md:py-24">
      {/* Header */}
      <div className="mb-12">
        <div
          className="flex items-center gap-3 mb-4"
          style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        >
          <div className="h-px w-8 bg-terracotta" />
          <span className="text-terracotta text-[10px] font-semibold uppercase tracking-[0.2em]">
            Real-World Systems
          </span>
        </div>
        <h1
          className="text-3xl md:text-5xl font-bold text-green-deep mb-3 leading-tight"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Already Happening
        </h1>
        <p
          className="text-lg text-brown/60 max-w-2xl"
          style={{ fontFamily: "var(--font-source-serif), serif" }}
        >
          These aren&apos;t theories. These are real organizations and projects
          around the world already building the systems we need.
        </p>
      </div>

      {/* Filters */}
      <div
        className="flex flex-col sm:flex-row gap-4 mb-10"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
      >
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-brown/30"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search examples..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-brown-light/20 bg-warm-white text-brown placeholder:text-brown/30 focus:outline-none focus:border-green-sage/40 transition-colors"
          />
        </div>
      </div>

      {/* Layer filter pills */}
      <div
        className="flex flex-wrap gap-2 mb-8"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
      >
        <button
          onClick={() => setActiveLayer(null)}
          className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
            activeLayer === null
              ? "bg-brown-dark text-white font-semibold shadow-sm"
              : "text-brown/60 hover:bg-cream-dark/60 hover:text-green-deep"
          }`}
        >
          All ({EXAMPLES.length})
        </button>
        {layerCounts.map((l) => (
          <button
            key={l.id}
            onClick={() => setActiveLayer(activeLayer === l.id ? null : l.id)}
            className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
              activeLayer === l.id
                ? "bg-brown-dark text-white font-semibold shadow-sm"
                : "text-brown/60 hover:bg-cream-dark/60 hover:text-green-deep"
            }`}
          >
            {l.icon} {l.name} ({l.count})
          </button>
        ))}
      </div>

      {/* Results count */}
      <p
        className="text-sm text-brown/40 mb-6"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
      >
        {filtered.length} example{filtered.length !== 1 ? "s" : ""}
        {activeLayer
          ? ` in ${LAYERS.find((l) => l.id === activeLayer)?.name}`
          : ""}
        {searchQuery ? ` matching "${searchQuery}"` : ""}
      </p>

      {/* Examples grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((ex) => {
          const layer = LAYERS.find((l) => l.id === ex.layer);
          return (
            <a
              key={ex.name}
              href={ex.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-warm-white border border-brown-light/12 rounded-2xl p-6 hover:border-green-muted/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3
                  className="text-green-deep font-bold group-hover:text-terracotta transition-colors duration-300"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {ex.name}
                </h3>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="text-brown/20 group-hover:text-terracotta shrink-0 mt-1 transition-colors duration-300"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>

              <p
                className="text-brown/40 text-xs mb-2"
                style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
              >
                {ex.location}
                {ex.yearFounded ? ` · Est. ${ex.yearFounded}` : ""}
                {layer ? ` · ${layer.icon} ${layer.name}` : ""}
              </p>

              <p
                className="text-brown/60 text-sm leading-relaxed mb-3"
                style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
              >
                {ex.description}
              </p>

              <div
                className="flex flex-wrap gap-1.5"
                style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
              >
                {ex.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-green-light/50 text-green-mid"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p
            className="text-brown/40 text-sm"
            style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
          >
            No examples found. Try adjusting your search or filters.
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 text-center">
        <p
          className="text-brown/50 text-sm mb-4"
          style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        >
          Know a project that should be listed here?
        </p>
        <Link
          href="/collaborate/projects/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-deep text-white text-sm font-semibold hover:bg-green-mid transition-colors duration-300"
          style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        >
          Submit a Project
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
