"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import LayerFilter from "@/app/components/LayerFilter";
import { getLayerByNumber } from "@/lib/layers";
import { useAuth } from "@/app/components/AuthProvider";

type Discussion = {
  id: number;
  title: string;
  layer: number;
  createdAt: string;
  userName: string | null;
  replyCount: number;
};

export default function DiscussionsPage() {
  const { user } = useAuth();
  const t = useTranslations("discussions");
  const tCollaborate = useTranslations("collaborate");
  const tCommon = useTranslations("common");
  const tLayers = useTranslations("layers");
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [layerFilter, setLayerFilter] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    const url = layerFilter
      ? `/api/discussions?layer=${layerFilter}`
      : "/api/discussions";
    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        setDiscussions(json.data ?? json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [layerFilter]);

  useEffect(() => {
    load();
  }, [load]);

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
            <Link href="/collaborate/discussions/new">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              {t("newDiscussion")}
            </Link>
          </Button>
        )}
      </div>

      <div className="mb-8">
        <LayerFilter selected={layerFilter} onChange={setLayerFilter} />
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-warm-white border-brown-light/12">
              <CardContent className="p-5 animate-pulse">
                <div className="h-5 bg-brown-light/15 rounded w-2/5 mb-2" />
                <div className="h-3 bg-brown-light/10 rounded w-1/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : discussions.length === 0 ? (
        <div className="text-center py-20 text-brown/40 font-sans">
          <p className="text-lg mb-2">{t("noDiscussions")}</p>
          <p className="text-sm">
            {user ? t("startFirst") : t("signInToStart")}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {discussions.map((d) => (
            <Link key={d.id} href={`/collaborate/discussions/${d.id}`}>
              <Card className="group bg-warm-white border-brown-light/12 hover:border-green-muted/30 transition-all duration-300 mb-3">
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    {/* Reply count */}
                    <div className="flex flex-col items-center shrink-0 w-12">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-brown/30 mb-0.5">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span className="text-xs font-semibold text-brown/40 font-sans">
                        {d.replyCount}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-base font-bold text-green-deep group-hover:text-terracotta transition-colors duration-300 font-display truncate">
                        {d.title}
                      </h2>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-brown/40 font-sans">
                        <Badge variant="outline" className="gap-1 font-normal text-[10px]">
                          {getLayerByNumber(d.layer)?.icon} {tLayers(`items.${getLayerByNumber(d.layer)?.slug}.title`)}
                        </Badge>
                        <span>{tCommon("by", { name: d.userName || tCommon("anonymous") })}</span>
                        <span className="text-brown/25">
                          {new Date(d.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-brown/15 group-hover:text-terracotta group-hover:translate-x-0.5 transition-all duration-300 shrink-0">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
