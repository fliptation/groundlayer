import HeroSection from "./components/HeroSection";
import LayerCard from "./components/LayerCard";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LAYERS } from "@/lib/layers";

const principleKeys = ["decentralize", "transparent", "regenerative", "voluntary"] as const;

const principleIcons = {
  decentralize: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="2" /><circle cx="4" cy="4" r="1.5" /><circle cx="20" cy="4" r="1.5" /><circle cx="4" cy="20" r="1.5" /><circle cx="20" cy="20" r="1.5" />
      <path d="M6 6l4 4M14 10l4-4M10 14l-4 4M14 14l4 4" />
    </svg>
  ),
  transparent: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" />
    </svg>
  ),
  regenerative: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 22c0-6-3-9-8-9 0 5 3 9 8 9z" /><path d="M12 22c0-6 3-9 8-9 0 5-3 9-8 9z" /><path d="M12 22V10" /><path d="M12 10c0-4 2-6 5-7" /><path d="M12 10c0-4-2-6-5-7" />
    </svg>
  ),
  voluntary: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
};

export default async function Home() {
  const t = await getTranslations("home");
  const tl = await getTranslations("layers");

  const layers = LAYERS.map((l) => ({
    ...l,
    title: tl(`items.${l.slug}.title`),
    description: tl(`items.${l.slug}.description`),
  }));

  return (
    <>
      <HeroSection />

      {/* Principles strip */}
      <section className="relative border-y border-brown-light/15 bg-warm-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {principleKeys.map((key, i) => (
              <div
                key={key}
                className={`flex flex-col items-center text-center animate-fade-up delay-${i + 1}`}
              >
                <div className="text-green-sage mb-3">{principleIcons[key]}</div>
                <div
                  className="text-green-deep font-bold text-sm tracking-wide mb-1"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {t(`principles.${key}.label`)}
                </div>
                <div
                  className="text-brown/45 text-xs leading-relaxed"
                  style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
                >
                  {t(`principles.${key}.sub`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Layers section */}
      <section className="max-w-6xl mx-auto px-6 lg:px-10 py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
          <div>
            <div
              className="flex items-center gap-3 mb-4"
              style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              <div className="h-px w-10 bg-terracotta" />
              <span className="text-terracotta text-xs font-semibold uppercase tracking-[0.2em]">
                {t("frameworkEyebrow")}
              </span>
            </div>
            <h2
              className="text-3xl md:text-5xl font-bold text-green-deep leading-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {t.rich("frameworkHeading", {
                br: () => <br className="hidden md:block" />,
              })}
            </h2>
          </div>
          <p
            className="text-brown/60 max-w-sm text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
          >
            {t("frameworkDescription")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {layers.map((layer) => (
            <LayerCard key={layer.slug} {...layer} />
          ))}
        </div>
      </section>

      {/* Pull quote section */}
      <section className="relative overflow-hidden bg-green-deep">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 30% 50%, #FBF7EF 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #FBF7EF 0%, transparent 50%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-10 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote
              className="text-2xl md:text-4xl font-medium leading-snug mb-8"
              style={{
                fontFamily: "var(--font-playfair), serif",
                color: "#FBF7EF",
              }}
            >
              {t.rich("pullQuote", {
                emphasis: (chunks) => (
                  <span className="italic text-green-muted">{chunks}</span>
                ),
              })}
            </blockquote>

            <div className="h-px w-16 bg-terracotta/60 mx-auto mb-8" />

            <p
              className="text-cream/50 text-sm mb-10 max-w-md mx-auto"
              style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              {t("pullQuoteDescription")}
            </p>

            <div
              className="flex flex-wrap justify-center gap-4"
              style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              <Link
                href="/contribute"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-cream text-green-deep rounded-full text-sm font-semibold hover:bg-white transition-all duration-300 hover:shadow-lg"
              >
                {t("startContributing")}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/get-started"
                className="inline-flex items-center px-7 py-3.5 border border-cream/30 text-cream rounded-full text-sm font-semibold hover:bg-cream/10 transition-all duration-300"
              >
                {t("beginLocally")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
