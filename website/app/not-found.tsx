import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-6 py-32 text-center">
      <h1
        className="text-6xl font-bold text-green-deep mb-4"
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        404
      </h1>
      <p
        className="text-brown/60 text-lg mb-8"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
      >
        This page doesn&apos;t exist yet — but maybe it should.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-green-deep text-white rounded-full text-sm font-semibold hover:bg-terracotta transition-all duration-300"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
      >
        Back to Home
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
