import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("footer");
  const tc = await getTranslations("common");

  return (
    <footer className="relative mt-32">
      {/* Top decorative line */}
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-brown-light/40 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 rounded-full bg-green-deep flex items-center justify-center">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FBF7EF"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M12 22c0-8-4-12-10-12 0 6 4 12 10 12z" />
                  <path d="M12 22c0-8 4-12 10-12 0 6-4 12-10 12z" />
                  <path d="M12 22V8" />
                </svg>
              </div>
              <span
                className="text-green-deep font-semibold text-lg"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {tc("brandName")}
              </span>
            </div>
            <p
              className="text-brown/60 text-sm leading-relaxed max-w-xs"
              style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              {t("tagline")}
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h4
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brown/40 mb-5"
              style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              {t("exploreHeading")}
            </h4>
            <nav
              className="flex flex-col gap-3"
              style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              <Link
                href="/vision"
                className="text-brown/70 hover:text-green-deep text-sm transition-colors duration-300"
              >
                {t("theVision")}
              </Link>
              <Link
                href="/layers/food-and-land"
                className="text-brown/70 hover:text-green-deep text-sm transition-colors duration-300"
              >
                {t("theLayers")}
              </Link>
              <Link
                href="/get-started"
                className="text-brown/70 hover:text-green-deep text-sm transition-colors duration-300"
              >
                {tc("getStarted")}
              </Link>
              <Link
                href="/contribute"
                className="text-brown/70 hover:text-green-deep text-sm transition-colors duration-300"
              >
                {t("contribute")}
              </Link>
            </nav>
          </div>

          {/* Connect */}
          <div className="md:col-span-4">
            <h4
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brown/40 mb-5"
              style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              {t("connectHeading")}
            </h4>
            <div
              className="space-y-3"
              style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              <a
                href="https://github.com/groundlayer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-brown/70 hover:text-green-deep text-sm transition-colors duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                {tc("viewOnGitHub")}
              </a>
              <p className="text-brown/40 text-xs leading-relaxed pt-2">
                {t("forkIt")}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-brown-light/15 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p
            className="text-brown/35 text-xs"
            style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
          >
            {t("license")}
          </p>
          <p
            className="text-brown/25 text-xs"
            style={{ fontFamily: "var(--font-source-serif), serif" }}
          >
            {t("motto")}
          </p>
        </div>
      </div>
    </footer>
  );
}
