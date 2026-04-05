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

export default function NewDiscussionPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const tLayers = useTranslations("layers");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  if (!isLoading && !user) {
    return (
      <article className="max-w-2xl mx-auto px-6 lg:px-10 py-20 md:py-28 text-center">
        <p className="text-brown/60 text-lg mb-4 font-sans">Sign in to start a discussion.</p>
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
      layer: form.get("layer"),
      firstReply: form.get("firstReply"),
    };

    const errors: Record<string, string> = {};
    if (!body.title || (body.title as string).trim() === "") errors.title = "Title is required";
    if (!body.layer || (body.layer as string).trim() === "") errors.layer = "Layer is required";
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setSubmitting(false);
      return;
    }

    const res = await fetch("/api/discussions", {
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

    const discussion = await res.json();
    router.push(`/contribute/discussions/${discussion.id}`);
  }

  return (
    <article className="max-w-2xl mx-auto px-6 lg:px-10 py-20 md:py-28">
      <nav className="flex items-center gap-2 text-xs text-brown/40 mb-8 font-sans">
        <Link href="/contribute" className="hover:text-terracotta transition-colors">Contribute</Link>
        <span>/</span>
        <Link href="/contribute/discussions" className="hover:text-terracotta transition-colors">Discussions</Link>
        <span>/</span>
        <span className="text-brown/70">New</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-green-deep mb-8 leading-tight font-display">
        Start a Discussion
      </h1>

      <Card className="bg-warm-white border-brown-light/12">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Topic</Label>
              <Input
                id="title"
                name="title"
                required
                placeholder="What do you want to discuss?"
                className="bg-cream border-brown-light/20 focus-visible:ring-green-sage/30"
                onChange={() => setFieldErrors((prev) => { const { title, ...rest } = prev; return rest; })}
              />
              {fieldErrors.title && <p className="text-destructive text-xs mt-1">{fieldErrors.title}</p>}
            </div>

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
              <Label htmlFor="firstReply">
                Opening Message <span className="text-brown/40 font-normal">(optional)</span>
              </Label>
              <Textarea
                id="firstReply"
                name="firstReply"
                rows={5}
                placeholder="Share your thoughts to kick off the discussion..."
                className="bg-cream border-brown-light/20 focus-visible:ring-green-sage/30 resize-none"
              />
            </div>

            {error && (
              <p className="text-destructive text-sm font-sans">{error}</p>
            )}

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" disabled={submitting} className="bg-brown-dark hover:bg-terracotta rounded-full">
                {submitting ? "Creating..." : "Start Discussion"}
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/contribute/discussions">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </article>
  );
}
