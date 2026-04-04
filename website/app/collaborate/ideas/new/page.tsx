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

export default function NewIdeaPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isLoading && !user) {
    return (
      <article className="max-w-2xl mx-auto px-6 lg:px-10 py-20 md:py-28 text-center">
        <p className="text-brown/60 text-lg mb-4 font-sans">Sign in to share an idea.</p>
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
      type: form.get("type"),
    };

    const res = await fetch("/api/ideas", {
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

    router.push("/collaborate/ideas");
  }

  return (
    <article className="max-w-2xl mx-auto px-6 lg:px-10 py-20 md:py-28">
      <nav className="flex items-center gap-2 text-xs text-brown/40 mb-8 font-sans">
        <Link href="/collaborate" className="hover:text-terracotta transition-colors">Collaborate</Link>
        <span>/</span>
        <Link href="/collaborate/ideas" className="hover:text-terracotta transition-colors">Ideas</Link>
        <span>/</span>
        <span className="text-brown/70">New</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-green-deep mb-8 leading-tight font-display">
        Share an Idea
      </h1>

      <Card className="bg-warm-white border-brown-light/12">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                required
                placeholder="What's your idea?"
                className="bg-cream border-brown-light/20 focus-visible:ring-green-sage/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                required
                rows={5}
                placeholder="Explain the idea in detail. Why is it important? How could it work?"
                className="bg-cream border-brown-light/20 focus-visible:ring-green-sage/30 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="layer">Layer</Label>
                <select
                  id="layer"
                  name="layer"
                  required
                  className="flex h-9 w-full rounded-md border border-brown-light/20 bg-cream px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-sage/30 font-sans"
                >
                  <option value="">Select a layer</option>
                  {LAYERS.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.icon} {l.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  name="type"
                  className="flex h-9 w-full rounded-md border border-brown-light/20 bg-cream px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-sage/30 font-sans"
                >
                  <option value="proposal">Proposal</option>
                  <option value="question">Question</option>
                  <option value="resource">Resource</option>
                </select>
              </div>
            </div>

            {error && (
              <p className="text-destructive text-sm font-sans">{error}</p>
            )}

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" disabled={submitting} className="bg-brown-dark hover:bg-terracotta rounded-full">
                {submitting ? "Submitting..." : "Share Idea"}
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/collaborate/ideas">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </article>
  );
}
