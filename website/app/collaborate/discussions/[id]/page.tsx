"use client";

import { useState, useEffect, useCallback, use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getLayerByNumber } from "@/lib/layers";
import { useAuth } from "@/app/components/AuthProvider";
import { useTranslations } from "next-intl";

type Reply = {
  id: number;
  content: string;
  parentId: number | null;
  createdAt: string;
  userName: string | null;
  userId: string;
};

type Discussion = {
  id: number;
  title: string;
  layer: number;
  createdAt: string;
  userName: string | null;
  replyCount: number;
};

export default function DiscussionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { user } = useAuth();
  const tLayers = useTranslations("layers");
  const [discussion, setDiscussion] = useState<Discussion | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(true);
  const [newReply, setNewReply] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [discRes, repliesRes] = await Promise.all([
        fetch(`/api/discussions?layer=`),
        fetch(`/api/discussions/${id}/replies`),
      ]);
      const discussions = await discRes.json();
      const disc = discussions.find((d: Discussion) => d.id === parseInt(id));
      setDiscussion(disc || null);
      setReplies(await repliesRes.json());
    } catch {
      // ignore
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSubmitReply(e: React.FormEvent) {
    e.preventDefault();
    if (!newReply.trim()) return;
    setSubmitting(true);

    const res = await fetch(`/api/discussions/${id}/replies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newReply }),
    });

    if (res.ok) {
      setNewReply("");
      load();
    }
    setSubmitting(false);
  }

  if (loading) {
    return (
      <article className="max-w-3xl mx-auto px-6 lg:px-10 py-20 md:py-28">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-brown-light/15 rounded w-2/3" />
          <div className="h-4 bg-brown-light/10 rounded w-1/3" />
          <Separator className="my-6" />
          {[1, 2].map((i) => (
            <div key={i} className="h-20 bg-brown-light/8 rounded-xl" />
          ))}
        </div>
      </article>
    );
  }

  if (!discussion) {
    return (
      <article className="max-w-3xl mx-auto px-6 lg:px-10 py-20 md:py-28 text-center">
        <p className="text-brown/50 font-sans">Discussion not found.</p>
        <Button variant="ghost" asChild className="mt-4">
          <Link href="/collaborate/discussions">Back to Discussions</Link>
        </Button>
      </article>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-6 lg:px-10 py-20 md:py-28">
      <nav className="flex items-center gap-2 text-xs text-brown/40 mb-8 font-sans">
        <Link href="/collaborate" className="hover:text-terracotta transition-colors">Collaborate</Link>
        <span>/</span>
        <Link href="/collaborate/discussions" className="hover:text-terracotta transition-colors">Discussions</Link>
        <span>/</span>
        <span className="text-brown/70 truncate max-w-[200px]">{discussion.title}</span>
      </nav>

      {/* Discussion header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-green-deep mb-4 leading-tight font-display">
          {discussion.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-xs text-brown/40 font-sans">
          <Badge variant="outline" className="gap-1 font-normal">
            {getLayerByNumber(discussion.layer)?.icon} {tLayers(`items.${getLayerByNumber(discussion.layer)?.slug}.title`)}
          </Badge>
          <span>Started by {discussion.userName || "Anonymous"}</span>
          <span className="text-brown/25">
            {new Date(discussion.createdAt).toLocaleDateString()}
          </span>
          <span className="text-brown/25">
            {replies.length} {replies.length === 1 ? "reply" : "replies"}
          </span>
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Replies */}
      {replies.length === 0 ? (
        <div className="text-center py-12 text-brown/30 font-sans text-sm">
          No replies yet. Be the first to respond.
        </div>
      ) : (
        <div className="space-y-4 mb-10">
          {replies.map((reply) => (
            <Card key={reply.id} className="bg-warm-white border-brown-light/10">
              <CardContent className="p-5">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-green-sage/20 text-green-deep text-xs font-bold">
                      {(reply.userName || "A")[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm font-semibold text-green-deep font-sans">
                        {reply.userName || "Anonymous"}
                      </span>
                      <span className="text-[11px] text-brown/30 font-sans">
                        {new Date(reply.createdAt).toLocaleDateString()} at{" "}
                        {new Date(reply.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-brown/70 text-sm leading-relaxed font-sans whitespace-pre-wrap">
                      {reply.content}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Reply form */}
      {user ? (
        <Card className="bg-warm-white border-brown-light/12">
          <CardContent className="p-5">
            <form onSubmit={handleSubmitReply} className="space-y-4">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-terracotta/15 text-terracotta text-xs font-bold">
                    {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="Write a reply..."
                    rows={3}
                    className="bg-cream border-brown-light/20 focus-visible:ring-green-sage/30 resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={submitting || !newReply.trim()}
                  className="bg-brown-dark hover:bg-terracotta rounded-full"
                >
                  {submitting ? "Sending..." : "Reply"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-green-light/30 border-green-muted/20">
          <CardContent className="p-5 text-center">
            <p className="text-brown/60 text-sm font-sans">
              <Link href="/auth/signin" className="text-terracotta font-semibold hover:text-terracotta-dark">
                Sign in
              </Link>{" "}
              to join the conversation.
            </p>
          </CardContent>
        </Card>
      )}
    </article>
  );
}
