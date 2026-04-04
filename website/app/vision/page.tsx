import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("metadata");
  return {
    title: t("vision.title"),
    description: t("vision.description"),
  };
}

export default async function VisionPage() {
  const t = await getTranslations("vision");
  const tCommon = await getTranslations("common");

  return (
    <article className="max-w-3xl mx-auto px-6 lg:px-10 py-20 md:py-28">
      {/* Eyebrow */}
      <div
        className="flex items-center gap-3 mb-6 animate-fade-up"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
      >
        <div className="h-px w-10 bg-terracotta" />
        <span className="text-terracotta text-xs font-semibold uppercase tracking-[0.2em]">
          {t("eyebrow")}
        </span>
      </div>

      <h1
        className="text-4xl md:text-6xl font-bold text-green-deep mb-8 leading-[1.1] animate-fade-up delay-1"
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        {t.rich("heading", {
          br: () => <br />,
          highlight: (chunks) => <span className="italic text-terracotta">{chunks}</span>,
        })}
      </h1>

      <div style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>
        <p className="text-lg text-brown leading-relaxed mb-10 max-w-2xl animate-fade-up delay-2">
          {t("introParagraph")}
        </p>

        <div className="h-px w-full bg-gradient-to-r from-brown-light/30 via-brown-light/10 to-transparent mb-14" />

        <h2
          className="text-2xl md:text-3xl font-bold text-green-deep mt-14 mb-5"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {t("differentDesignHeading")}
        </h2>
        <p className="text-brown/80 leading-relaxed mb-4">
          {t("differentDesignParagraph1")}
        </p>
        <p className="text-brown/80 leading-relaxed mb-10">
          {t("differentDesignParagraph2")}
        </p>

        <h2
          className="text-2xl md:text-3xl font-bold text-green-deep mt-14 mb-6"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {t("coreShiftHeading")}
        </h2>
        <div className="overflow-x-auto mb-10">
          <div className="grid gap-3">
            {Object.keys(t.raw("coreShifts")).map((key) => (
              <div
                key={key}
                className="flex items-center gap-4 py-3 px-5 rounded-xl bg-warm-white border border-brown-light/10"
              >
                <span className="text-brown/40 text-sm line-through flex-1">
                  {t(`coreShifts.${key}.from`)}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="1.5" strokeLinecap="round" className="shrink-0">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <span className="font-medium text-green-deep text-sm flex-1 text-right">
                  {t(`coreShifts.${key}.to`)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <h2
          className="text-2xl md:text-3xl font-bold text-green-deep mt-14 mb-5"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {t("howDifferentHeading")}
        </h2>
        <p className="text-brown/80 leading-relaxed mb-5">
          {t("howDifferentIntro")}
        </p>
        <div className="grid gap-3 mb-10">
          {Object.keys(t.raw("differences")).map((key) => (
            <div
              key={key}
              className="flex items-start gap-3 py-3 px-5 rounded-xl bg-green-light/20 border border-green-muted/15"
            >
              <span className="text-green-sage mt-0.5 text-sm">&#10003;</span>
              <p className="text-sm text-brown/80">
                <strong className="text-green-deep">{t(`differences.${key}.bold`)}</strong> {t(`differences.${key}.rest`)}
              </p>
            </div>
          ))}
        </div>

        <h2
          className="text-2xl md:text-3xl font-bold text-green-deep mt-14 mb-5"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {t("successHeading")}
        </h2>
        <p className="text-brown/80 leading-relaxed mb-5">
          {t("successIntro")}
        </p>
        <ul className="space-y-2 text-brown/70 mb-10 pl-1">
          {Object.keys(t.raw("successItems")).map((key) => (
            <li key={key} className="flex items-start gap-3 text-sm">
              <span className="text-terracotta mt-0.5">&#8594;</span>
              <span>{t(`successItems.${key}`)}</span>
            </li>
          ))}
        </ul>

        <div className="bg-cream-dark/40 rounded-2xl p-8 mb-14 border border-brown-light/10">
          <p
            className="text-xl text-green-deep font-medium leading-relaxed italic"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {t("blockquote")}
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/layers/food-and-land"
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-brown-dark text-white rounded-full text-sm font-semibold hover:bg-terracotta-dark transition-all duration-300"
          >
            {t("exploreLayers")}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/get-started"
            className="inline-flex items-center px-7 py-3.5 border border-brown-light text-brown-dark rounded-full text-sm font-semibold hover:border-terracotta hover:text-terracotta transition-all duration-300"
          >
            {tCommon("getStarted")}
          </Link>
        </div>
      </div>
    </article>
  );
}
