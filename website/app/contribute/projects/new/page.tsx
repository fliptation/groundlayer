"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { LAYERS } from "@/lib/layers";
import { useAuth } from "@/app/components/AuthProvider";
import { useTranslations } from "next-intl";

export default function NewProjectPage() {
  const router = useRouter();
  const tLayers = useTranslations("layers");
  const { user, isLoading } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  if (!isLoading && !user) {
    return (
      <article className="max-w-2xl mx-auto px-6 lg:px-10 py-20 md:py-28 text-center">
        <p className="text-brown/60 text-lg mb-4 font-sans">
          Sign in to submit a project.
        </p>
        <Button asChild className="bg-brown-dark hover:bg-terracotta rounded-full">
          <Link href="/auth/signin">Sign In</Link>
        </Button>
      </article>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const body = {
      title: form.get("title"),
      description: form.get("description"),
      layer: form.get("layer"),
      location: form.get("location"),
      websiteUrl: form.get("websiteUrl"),
      status: form.get("status"),
    };

    const errors: Record<string, string> = {};
    if (!body.title || (body.title as string).trim() === "") errors.title = "Title is required";
    if (!body.description || (body.description as string).trim() === "") errors.description = "Description is required";
    if (!body.layer || (body.layer as string).trim() === "") errors.layer = "Layer is required";
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setSubmitting(false);
      return;
    }

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong");
      setSubmitting(false);
      return;
    }

    router.push("/contribute/thank-you");
  }

  return (
    <article className="max-w-2xl mx-auto px-6 lg:px-10 py-20 md:py-28">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-brown/40 mb-8 font-sans">
        <Link href="/contribute" className="hover:text-terracotta transition-colors">Contribute</Link>
        <span>/</span>
        <Link href="/contribute/projects" className="hover:text-terracotta transition-colors">Projects</Link>
        <span>/</span>
        <span className="text-brown/70">New</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-green-deep mb-8 leading-tight font-display">
        Submit a Project
      </h1>

      <Card className="bg-warm-white border-brown-light/12">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                name="title"
                required
                placeholder="e.g. Riverside Community Garden"
                className="bg-cream border-brown-light/20 focus-visible:ring-green-sage/30"
                onChange={() => setFieldErrors((prev) => { const { title, ...rest } = prev; return rest; })}
              />
              {fieldErrors.title && <p className="text-destructive text-xs mt-1">{fieldErrors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                required
                rows={4}
                placeholder="What is this project about? What problem does it address?"
                className="bg-cream border-brown-light/20 focus-visible:ring-green-sage/30 resize-none"
                onChange={() => setFieldErrors((prev) => { const { description, ...rest } = prev; return rest; })}
              />
              {fieldErrors.description && <p className="text-destructive text-xs mt-1">{fieldErrors.description}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="layer">Layer</Label>
                <select
                  id="layer"
                  name="layer"
                  required
                  className="flex h-9 w-full rounded-md border border-brown-light/20 bg-cream px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-sage/30 font-sans"
                  onChange={() => setFieldErrors((prev) => { const { layer, ...rest } = prev; return rest; })}
                >
                  <option value="">Select a layer</option>
                  {LAYERS.map((l) => (
                    <option key={l.number} value={l.number}>
                      {l.icon} {tLayers(`items.${l.slug}.title`)}
                    </option>
                  ))}
                </select>
                {fieldErrors.layer && <p className="text-destructive text-xs mt-1">{fieldErrors.layer}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
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
                  Location <span className="text-brown/40 font-normal">(optional)</span>
                </Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g. Portland, Oregon"
                  className="bg-cream border-brown-light/20 focus-visible:ring-green-sage/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="websiteUrl">
                  Website <span className="text-brown/40 font-normal">(optional)</span>
                </Label>
                <Input
                  id="websiteUrl"
                  name="websiteUrl"
                  type="url"
                  placeholder="https://..."
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
                {submitting ? "Submitting..." : "Submit Project"}
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/contribute/projects">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </article>
  );
}
