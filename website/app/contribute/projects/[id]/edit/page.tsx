"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { LAYERS } from "@/lib/layers";
import { useAuth } from "@/app/components/AuthProvider";
import { useTranslations } from "next-intl";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const tLayers = useTranslations("layers");
  const t = useTranslations("projects");
  const { user, isLoading: authLoading } = useAuth();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    layer: "",
    location: "",
    websiteUrl: "",
    status: "idea",
  });

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => {
        setForm({
          title: data.title || "",
          description: data.description || "",
          layer: String(data.layer),
          location: data.location || "",
          websiteUrl: data.websiteUrl || "",
          status: data.status || "idea",
        });
        // Check ownership
        if (user && data.userId !== user.id) {
          router.push("/contribute/projects");
        }
        setLoading(false);
      })
      .catch(() => {
        router.push("/contribute/projects");
      });
  }, [id, user, router]);

  if (authLoading || loading) {
    return (
      <article className="max-w-2xl mx-auto px-6 lg:px-10 py-20 md:py-28">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-brown-light/15 rounded w-1/3" />
          <div className="h-64 bg-brown-light/10 rounded" />
        </div>
      </article>
    );
  }

  if (!user) {
    router.push("/auth/signin");
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const res = await fetch(`/api/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong");
      setSubmitting(false);
      return;
    }

    router.push("/contribute/projects");
  }

  return (
    <article className="max-w-2xl mx-auto px-6 lg:px-10 py-20 md:py-28">
      <nav className="flex items-center gap-2 text-xs text-brown/40 mb-8 font-sans">
        <Link href="/contribute" className="hover:text-terracotta transition-colors">
          Collaborate
        </Link>
        <span>/</span>
        <Link href="/contribute/projects" className="hover:text-terracotta transition-colors">
          {t("breadcrumb")}
        </Link>
        <span>/</span>
        <span className="text-brown/70">{t("edit")}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-green-deep mb-8 leading-tight font-display">
        {t("editProject")}
      </h1>

      <Card className="bg-warm-white border-brown-light/12">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">{t("fieldTitle")}</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="bg-cream border-brown-light/20 focus-visible:ring-green-sage/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{t("fieldDescription")}</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                rows={4}
                className="bg-cream border-brown-light/20 focus-visible:ring-green-sage/30 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="layer">{t("fieldLayer")}</Label>
                <select
                  id="layer"
                  value={form.layer}
                  onChange={(e) => setForm({ ...form, layer: e.target.value })}
                  required
                  className="flex h-9 w-full rounded-md border border-brown-light/20 bg-cream px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-sage/30 font-sans"
                >
                  <option value="">Select a layer</option>
                  {LAYERS.map((l) => (
                    <option key={l.number} value={l.number}>
                      {l.icon} {tLayers(`items.${l.slug}.title`)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">{t("fieldStatus")}</Label>
                <select
                  id="status"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="flex h-9 w-full rounded-md border border-brown-light/20 bg-cream px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-sage/30 font-sans"
                >
                  <option value="idea">Idea</option>
                  <option value="active">Active</option>
                  <option value="established">Established</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">
                  {t("fieldLocation")} <span className="text-brown/40 font-normal">(optional)</span>
                </Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="bg-cream border-brown-light/20 focus-visible:ring-green-sage/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="websiteUrl">
                  {t("fieldWebsite")} <span className="text-brown/40 font-normal">(optional)</span>
                </Label>
                <Input
                  id="websiteUrl"
                  value={form.websiteUrl}
                  onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
                  type="url"
                  className="bg-cream border-brown-light/20 focus-visible:ring-green-sage/30"
                />
              </div>
            </div>

            {error && (
              <p className="text-destructive text-sm font-sans">{error}</p>
            )}

            <div className="flex items-center gap-3 pt-2">
              <Button
                type="submit"
                disabled={submitting}
                className="bg-brown-dark hover:bg-terracotta rounded-full"
              >
                {submitting ? t("saving") : t("saveChanges")}
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/contribute/projects">{t("cancel")}</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </article>
  );
}
