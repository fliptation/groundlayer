"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import LayerFilter from "@/app/components/LayerFilter";
import { getLayerName, getLayerIcon } from "@/lib/layers";
import { useAuth } from "@/app/components/AuthProvider";

type Idea = {
  id: number;
  title: string;
  description: string;
  layer: number;
  type: string;
  createdAt: string;
  userName: string | null;
  voteCount: number;
  hasVoted: boolean;
};

const typeColors: Record<string, "default" | "secondary" | "outline"> = {
  proposal: "default",
  question: "secondary",
  resource: "outline",
};

export default function IdeasPage() {
  const { user } = useAuth();
  const t = useTranslations("ideas");
  const tCollaborate = useTranslations("collaborate");
  const tCommon = useTranslations("common");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [layerFilter, setLayerFilter] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const loadIdeas = useCallback(() => {
    setLoading(true);
    const url = layerFilter
      ? `/api/ideas?layer=${layerFilter}`
      : "/api/ideas";
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        setIdeas(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [layerFilter]);

  useEffect(() => {
    loadIdeas();
  }, [loadIdeas]);

  async function handleVote(ideaId: number) {
    if (!user) return;
    const res = await fetch(`/api/ideas/${ideaId}/vote`, { method: "POST" });
    if (res.ok) {
      const { voted } = await res.json();
      setIdeas((prev) =>
        prev.map((idea) =>
          idea.id === ideaId
            ? {
                ...idea,
                hasVoted: voted,
                voteCount: voted ? idea.voteCount + 1 : idea.voteCount - 1,
              }
            : idea
        )
      );
    }
  }

  return (
    <article className="max-w-4xl mx-auto px-6 lg:px-10 py-20 md:py-28">
      <nav className="flex items-center gap-2 text-xs text-brown/40 mb-8 font-sans">
        <Link href="/collaborate" className="hover:text-terracotta transition-colors">{tCollaborate("heading")}</Link>
        <span>/</span>
        <span className="text-brown/70">{t("breadcrumb")}</span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-green-deep mb-3 leading-tight font-display">
            {t("heading")}
          </h1>
          <p className="text-brown/60 text-sm max-w-md font-sans">
            {t("description")}
          </p>
        </div>
        {user && (
          <Button asChild className="bg-brown-dark hover:bg-terracotta rounded-full shrink-0">
            <Link href="/collaborate/ideas/new">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              {t("newIdea")}
            </Link>
          </Button>
        )}
      </div>

      <div className="mb-8">
        <LayerFilter selected={layerFilter} onChange={setLayerFilter} />
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-warm-white border-brown-light/12">
              <CardContent className="p-6 animate-pulse">
                <div className="h-5 bg-brown-light/15 rounded w-1/3 mb-3" />
                <div className="h-4 bg-brown-light/10 rounded w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : ideas.length === 0 ? (
        <div className="text-center py-20 text-brown/40 font-sans">
          <p className="text-lg mb-2">{t("noIdeas")}</p>
          <p className="text-sm">
            {user ? t("beFirst") : t("signInToSubmit")}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {ideas.map((idea) => (
            <Card
              key={idea.id}
              className="group bg-warm-white border-brown-light/12 hover:border-green-muted/30 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Vote button */}
                  <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
                    <button
                      onClick={() => handleVote(idea.id)}
                      disabled={!user}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                        idea.hasVoted
                          ? "bg-terracotta text-white"
                          : "bg-cream-dark/50 text-brown/40 hover:bg-terracotta/10 hover:text-terracotta"
                      } ${!user ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                      title={user ? (idea.hasVoted ? t("removeVote") : t("vote")) : t("signInToVote")}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill={idea.hasVoted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 19V5M5 12l7-7 7 7" />
                      </svg>
                    </button>
                    <span className={`text-sm font-semibold font-sans ${idea.hasVoted ? "text-terracotta" : "text-brown/40"}`}>
                      {idea.voteCount}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h2 className="text-lg font-bold text-green-deep group-hover:text-terracotta transition-colors duration-300 font-display">
                        {idea.title}
                      </h2>
                      <Badge variant={typeColors[idea.type] || "outline"} className="shrink-0 capitalize">
                        {idea.type}
                      </Badge>
                    </div>
                    <p className="text-brown/60 text-sm leading-relaxed mb-3 line-clamp-2 font-sans">
                      {idea.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-brown/40 font-sans">
                      <Badge variant="outline" className="gap-1 font-normal">
                        {getLayerIcon(idea.layer)} {getLayerName(idea.layer)}
                      </Badge>
                      <span className="ml-auto text-brown/30">
                        {tCommon("by", { name: idea.userName || tCommon("anonymous") })}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </article>
  );
}
