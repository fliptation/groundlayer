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
            <nav
              className="flex flex-col gap-3"
              style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              <Link
                href="/contribute"
                className="text-brown/70 hover:text-green-deep text-sm transition-colors duration-300"
              >
                {t("contribute")}
              </Link>
              <Link
                href="/examples"
                className="text-brown/70 hover:text-green-deep text-sm transition-colors duration-300"
              >
                Examples
              </Link>
              <Link
                href="/auth/signup"
                className="text-brown/70 hover:text-green-deep text-sm transition-colors duration-300"
              >
                {tc("signUp")}
              </Link>
            </nav>
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
