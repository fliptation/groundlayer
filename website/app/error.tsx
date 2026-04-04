"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-xl mx-auto px-6 py-32 text-center">
      <h1
        className="text-5xl font-bold text-green-deep mb-4"
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        Something went wrong
      </h1>
      <p
        className="text-brown/60 text-lg mb-8"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
      >
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 px-6 py-3 bg-green-deep text-white rounded-full text-sm font-semibold hover:bg-terracotta transition-all duration-300"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
      >
        Try again
      </button>
    </div>
  );
}
