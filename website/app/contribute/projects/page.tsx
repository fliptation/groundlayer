"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import LayerFilter from "@/app/components/LayerFilter";
import { getLayerByNumber } from "@/lib/layers";
import { useAuth } from "@/app/components/AuthProvider";

type Project = {
  id: number;
  title: string;
  description: string;
  layer: number;
  location: string | null;
  websiteUrl: string | null;
  status: string;
  createdAt: string;
  userName: string | null;
  userId: string;
};

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  idea: "outline",
  active: "default",
  established: "secondary",
};

export default function ProjectsPage() {
  const { user } = useAuth();
  const t = useTranslations("projects");
  const tCollaborate = useTranslations("collaborate");
  const tCommon = useTranslations("common");
  const tLayers = useTranslations("layers");
  const [projects, setProjects] = useState<Project[]>([]);
  const [layerFilter, setLayerFilter] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = layerFilter
      ? `/api/projects?layer=${layerFilter}`
      : "/api/projects";
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        setProjects(data.data ?? data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [layerFilter]);

  return (
    <article className="max-w-4xl mx-auto px-6 lg:px-10 py-20 md:py-28">
      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-2 text-xs text-brown/40 mb-8 font-sans"
      >
        <Link href="/contribute" className="hover:text-terracotta transition-colors">
          {tCollaborate("heading")}
        </Link>
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
            <Link href="/contribute/projects/new">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              {t("newProject")}
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
      ) : projects.length === 0 ? (
        <div className="text-center py-20 text-brown/40 font-sans">
          <p className="text-lg mb-2">{t("noProjects")}</p>
          <p className="text-sm">
            {user ? t("beFirst") : t("signInToSubmit")}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group bg-warm-white border-brown-light/12 hover:border-green-muted/30 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="text-lg font-bold text-green-deep group-hover:text-terracotta transition-colors duration-300 font-display">
                    {project.title}
                  </h2>
                  <Badge variant={statusVariant[project.status] || "outline"} className="shrink-0 capitalize">
                    {project.status}
                  </Badge>
                </div>

                <p className="text-brown/60 text-sm leading-relaxed mb-4 line-clamp-2 font-sans">
                  {project.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-brown/40 font-sans">
                  <Badge variant="outline" className="gap-1 font-normal">
                    {getLayerByNumber(project.layer)?.icon} {tLayers(`items.${getLayerByNumber(project.layer)?.slug}.title`)}
                  </Badge>
                  {project.location && (
                    <span className="inline-flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        <circle cx="12" cy="9" r="2.5" />
                      </svg>
                      {project.location}
                    </span>
                  )}
                  {project.websiteUrl && (
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-terracotta hover:text-terracotta-dark transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {tCommon("websiteLink")}
                    </a>
                  )}
                  <span className="ml-auto text-brown/30">
                    {tCommon("by", { name: project.userName || tCommon("anonymous") })}
                  </span>
                  {user?.id === project.userId && (
                    <div className="flex items-center gap-2 ml-2">
                      <Link
                        href={`/contribute/projects/${project.id}/edit`}
                        className="text-brown/40 hover:text-terracotta transition-colors"
                      >
                        {t("edit")}
                      </Link>
                      <button
                        onClick={async () => {
                          if (!confirm(t("confirmDelete"))) return;
                          const res = await fetch(`/api/projects/${project.id}`, { method: "DELETE" });
                          if (res.ok) setProjects((prev) => prev.filter((p) => p.id !== project.id));
                        }}
                        className="text-brown/40 hover:text-red-600 transition-colors"
                      >
                        {t("delete")}
                      </button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </article>
  );
}
