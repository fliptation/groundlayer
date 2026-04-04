"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { EXAMPLES } from "@/lib/examples";
import { LAYERS } from "@/lib/layers";
import { useAuth } from "@/app/components/AuthProvider";

type VoteData = Record<
  string,
  { score: number; userVote: number | null; commentCount: number }
>;

export default function ExamplesPage() {
  const t = useTranslations("examples");
  const tl = useTranslations("layers");
  const { user } = useAuth();
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [voteData, setVoteData] = useState<VoteData>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const layerParam = params.get("layer");
    if (layerParam) setActiveLayer(Number(layerParam));
  }, []);

  const loadVotes = useCallback(async () => {
    const names = EXAMPLES.map((e) => encodeURIComponent(e.name)).join(",");
    const res = await fetch(`/api/examples/votes?names=${names}`);
    if (res.ok) setVoteData(await res.json());
  }, []);

  useEffect(() => {
    loadVotes();
  }, [loadVotes]);

  async function handleVote(name: string, value: 1 | -1) {
    if (!user) return;
    const res = await fetch(
      `/api/examples/${encodeURIComponent(name)}/vote`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      }
    );
    if (res.ok) {
      const { score, userVote } = await res.json();
      setVoteData((prev) => ({
        ...prev,
        [name]: { ...prev[name], score, userVote, commentCount: prev[name]?.commentCount ?? 0 },
      }));
    }
  }

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
    count: EXAMPLES.filter((e) => e.layer === l.number).length,
  }));

  function layerName(num: number) {
    const l = LAYERS.find((l) => l.number === num);
    return l ? tl(`items.${l.slug}.title`) : "";
  }

  function layerIcon(num: number) {
    return LAYERS.find((l) => l.number === num)?.icon ?? "";
  }

  function slugify(name: string) {
    return encodeURIComponent(name);
  }

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
            {t("eyebrow")}
          </span>
        </div>
        <h1
          className="text-3xl md:text-5xl font-bold text-green-deep mb-3 leading-tight"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {t("title")}
        </h1>
        <p
          className="text-lg text-brown/60 max-w-2xl"
          style={{ fontFamily: "var(--font-source-serif), serif" }}
        >
          {t("subtitle")}
        </p>
      </div>

      {/* Search */}
      <div
        className="flex flex-col sm:flex-row gap-4 mb-10"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
      >
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
            placeholder={t("searchPlaceholder")}
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
          {t("all", { count: EXAMPLES.length })}
        </button>
        {layerCounts.map((l) => (
          <button
            key={l.number}
            onClick={() =>
              setActiveLayer(activeLayer === l.number ? null : l.number)
            }
            className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
              activeLayer === l.number
                ? "bg-brown-dark text-white font-semibold shadow-sm"
                : "text-brown/60 hover:bg-cream-dark/60 hover:text-green-deep"
            }`}
          >
            {l.icon} {tl(`items.${l.slug}.title`)} ({l.count})
          </button>
        ))}
      </div>

      {/* Results count */}
      <p
        className="text-sm text-brown/40 mb-6"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
      >
        {filtered.length} {t("exampleCount", { count: filtered.length })}
        {activeLayer ? ` ${t("inLayer")} ${layerName(activeLayer)}` : ""}
        {searchQuery ? ` ${t("matching")} "${searchQuery}"` : ""}
      </p>

      {/* Examples grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((ex) => {
          const data = voteData[ex.name];
          const score = data?.score ?? 0;
          const userVote = data?.userVote ?? null;
          const commentCount = data?.commentCount ?? 0;

          return (
            <div
              key={ex.name}
              className="group bg-warm-white border border-brown-light/12 rounded-2xl p-6 hover:border-green-muted/30 transition-all duration-300"
            >
              <div className="flex gap-4">
                {/* Vote column */}
                <div
                  className="flex flex-col items-center gap-0.5 shrink-0 pt-0.5"
                  style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
                >
                  <button
                    onClick={() => handleVote(ex.name, 1)}
                    disabled={!user}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                      userVote === 1
                        ? "bg-green-deep text-white"
                        : "bg-cream-dark/50 text-brown/30 hover:bg-green-light hover:text-green-deep"
                    } ${!user ? "cursor-not-allowed opacity-40" : "cursor-pointer"}`}
                    title={user ? t("upvote") : t("signInToVote")}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4l-8 8h5v8h6v-8h5z" />
                    </svg>
                  </button>
                  <span
                    className={`text-xs font-semibold ${
                      score > 0
                        ? "text-green-deep"
                        : score < 0
                          ? "text-terracotta"
                          : "text-brown/30"
                    }`}
                  >
                    {score}
                  </span>
                  <button
                    onClick={() => handleVote(ex.name, -1)}
                    disabled={!user}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                      userVote === -1
                        ? "bg-terracotta text-white"
                        : "bg-cream-dark/50 text-brown/30 hover:bg-terracotta-light hover:text-terracotta"
                    } ${!user ? "cursor-not-allowed opacity-40" : "cursor-pointer"}`}
                    title={user ? t("downvote") : t("signInToVote")}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 20l8-8h-5V4H9v8H4z" />
                    </svg>
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <Link
                      href={`/examples/${slugify(ex.name)}`}
                      className="text-green-deep font-bold hover:text-terracotta transition-colors duration-300"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      {ex.name}
                    </Link>
                    <a
                      href={ex.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 mt-1"
                      title={t("visitWebsite")}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="text-brown/20 hover:text-terracotta transition-colors duration-300"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </a>
                  </div>

                  <p
                    className="text-brown/40 text-xs mb-2"
                    style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
                  >
                    {ex.location}
                    {ex.yearFounded ? ` · Est. ${ex.yearFounded}` : ""}
                    {` · ${layerIcon(ex.layer)} ${layerName(ex.layer)}`}
                  </p>

                  <p
                    className="text-brown/60 text-sm leading-relaxed mb-3"
                    style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
                  >
                    {ex.description}
                  </p>

                  <div
                    className="flex items-center justify-between"
                    style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
                  >
                    <div className="flex flex-wrap gap-1.5">
                      {ex.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-green-light/50 text-green-mid"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/examples/${slugify(ex.name)}`}
                      className="text-brown/30 hover:text-terracotta text-xs flex items-center gap-1 shrink-0 ml-2 transition-colors duration-200"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                      </svg>
                      {commentCount > 0 ? commentCount : ""}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p
            className="text-brown/40 text-sm"
            style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
          >
            {t("noResults")}
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 text-center">
        <p
          className="text-brown/50 text-sm mb-4"
          style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        >
          {t("ctaText")}
        </p>
        <Link
          href="/collaborate/projects/new"
          className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-deep text-white text-sm font-semibold hover:bg-green-mid transition-colors duration-300"
          style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        >
          {t("ctaButton")}
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
