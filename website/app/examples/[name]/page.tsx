"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { EXAMPLES } from "@/lib/examples";
import { LAYERS } from "@/lib/layers";
import { useAuth } from "@/app/components/AuthProvider";

type Comment = {
  id: number;
  content: string;
  createdAt: string;
  userName: string | null;
  userId: string;
};

export default function ExampleDetailPage() {
  const params = useParams();
  const name = decodeURIComponent(params.name as string);
  const example = EXAMPLES.find((e) => e.name === name);

  const t = useTranslations("examples");
  const tl = useTranslations("layers");
  const { user } = useAuth();

  const [score, setScore] = useState(0);
  const [userVote, setUserVote] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const layer = example
    ? LAYERS.find((l) => l.number === example.layer)
    : null;

  const loadData = useCallback(async () => {
    if (!example) return;
    const encoded = encodeURIComponent(example.name);

    const [votesRes, commentsRes] = await Promise.all([
      fetch(`/api/examples/votes?names=${encoded}`),
      fetch(`/api/examples/${encoded}/comments`),
    ]);

    if (votesRes.ok) {
      const data = await votesRes.json();
      const v = data[example.name];
      if (v) {
        setScore(v.score);
        setUserVote(v.userVote);
      }
    }
    if (commentsRes.ok) {
      setComments(await commentsRes.json());
    }
  }, [example]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleVote(value: 1 | -1) {
    if (!user || !example) return;
    const res = await fetch(
      `/api/examples/${encodeURIComponent(example.name)}/vote`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      }
    );
    if (res.ok) {
      const data = await res.json();
      setScore(data.score);
      setUserVote(data.userVote);
    }
  }

  async function handleSubmitComment(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim() || !example) return;
    setSubmitting(true);

    const res = await fetch(
      `/api/examples/${encodeURIComponent(example.name)}/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment }),
      }
    );

    if (res.ok) {
      setNewComment("");
      loadData();
    }
    setSubmitting(false);
  }

  if (!example) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1
          className="text-2xl font-bold text-green-deep mb-4"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {t("notFound")}
        </h1>
        <Link href="/examples" className="text-terracotta text-sm">
          {t("backToExamples")}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-10 py-16 md:py-24">
      {/* Back link */}
      <Link
        href="/examples"
        className="inline-flex items-center gap-2 text-sm text-brown/50 hover:text-terracotta mb-8 transition-colors duration-300"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        {t("backToExamples")}
      </Link>

      {/* Example header */}
      <div className="flex gap-6 mb-8">
        {/* Vote column */}
        <div
          className="flex flex-col items-center gap-1 shrink-0 pt-2"
          style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        >
          <button
            onClick={() => handleVote(1)}
            disabled={!user}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
              userVote === 1
                ? "bg-terracotta text-white"
                : "bg-cream-dark/50 text-brown/30 hover:bg-terracotta/10 hover:text-terracotta"
            } ${!user ? "cursor-not-allowed opacity-40" : "cursor-pointer"}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4l-8 8h5v8h6v-8h5z" />
            </svg>
          </button>
          <span
            className={`text-sm font-bold ${
              score > 0
                ? "text-terracotta"
                : score < 0
                  ? "text-brown/40"
                  : "text-brown/30"
            }`}
          >
            {score}
          </span>
          <button
            onClick={() => handleVote(-1)}
            disabled={!user}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
              userVote === -1
                ? "bg-brown/60 text-white"
                : "bg-cream-dark/50 text-brown/30 hover:bg-brown/10 hover:text-brown/60"
            } ${!user ? "cursor-not-allowed opacity-40" : "cursor-pointer"}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 20l8-8h-5V4H9v8H4z" />
            </svg>
          </button>
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            {layer && (
              <span
                className="text-xs text-brown/40"
                style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
              >
                {layer.icon} {tl(`items.${layer.slug}.title`)}
              </span>
            )}
          </div>
          <h1
            className="text-2xl md:text-3xl font-bold text-green-deep mb-2 leading-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {example.name}
          </h1>
          <p
            className="text-brown/40 text-sm mb-4"
            style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
          >
            {example.location}
            {example.yearFounded ? ` · Est. ${example.yearFounded}` : ""}
          </p>
          <p
            className="text-brown/70 leading-relaxed mb-4"
            style={{ fontFamily: "var(--font-source-serif), serif" }}
          >
            {example.description}
          </p>
          <div className="flex items-center gap-4">
            <a
              href={example.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-deep text-white text-sm font-medium hover:bg-terracotta transition-colors duration-300"
              style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              {t("visitWebsite")}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
          <div
            className="flex flex-wrap gap-1.5 mt-4"
            style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
          >
            {example.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full bg-green-light/50 text-green-mid"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-brown-light/15 my-10" />

      {/* Comments section */}
      <section>
        <h2
          className="text-xl font-bold text-green-deep mb-6"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {t("comments")} ({comments.length})
        </h2>

        {/* Comment form */}
        {user ? (
          <form onSubmit={handleSubmitComment} className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={t("commentPlaceholder")}
              rows={3}
              className="w-full px-4 py-3 text-sm rounded-xl border border-brown-light/20 bg-warm-white text-brown placeholder:text-brown/30 focus:outline-none focus:border-green-sage/40 transition-colors resize-none"
              style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={submitting || !newComment.trim()}
                className="btn-primary px-5 py-2 rounded-lg bg-green-deep text-white text-sm font-medium hover:bg-terracotta transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
              >
                {submitting ? t("posting") : t("postComment")}
              </button>
            </div>
          </form>
        ) : (
          <div
            className="mb-8 p-4 rounded-xl bg-cream-dark/30 border border-brown-light/10 text-center"
            style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
          >
            <p className="text-brown/50 text-sm">
              <Link
                href="/auth/signin"
                className="text-terracotta font-medium hover:text-terracotta-dark"
              >
                {t("signIn")}
              </Link>{" "}
              {t("toComment")}
            </p>
          </div>
        )}

        {/* Comments list */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-warm-white border border-brown-light/10 rounded-xl p-4"
            >
              <div
                className="flex items-center gap-3 mb-2"
                style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
              >
                <div className="w-7 h-7 rounded-full bg-green-light flex items-center justify-center text-green-deep text-xs font-bold">
                  {(comment.userName || "?")[0].toUpperCase()}
                </div>
                <span className="text-sm font-medium text-brown-dark">
                  {comment.userName || t("anonymous")}
                </span>
                <span className="text-xs text-brown/30">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p
                className="text-brown/70 text-sm leading-relaxed whitespace-pre-wrap pl-10"
                style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
              >
                {comment.content}
              </p>
            </div>
          ))}

          {comments.length === 0 && (
            <p
              className="text-brown/30 text-sm text-center py-8"
              style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              {t("noComments")}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
