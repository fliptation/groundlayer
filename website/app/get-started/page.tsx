import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("metadata");
  return {
    title: t("getStarted.title"),
    description: t("getStarted.description"),
  };
}

export default async function GetStartedPage() {
  const t = await getTranslations("getStarted");
  const tCommon = await getTranslations("common");

  const stepKeys = Object.keys(t.raw("steps"));
  const quickActionKeys = Object.keys(t.raw("quickActions"));
  const concernKeys = Object.keys(t.raw("concerns"));

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
        className="text-4xl md:text-6xl font-bold text-green-deep mb-6 leading-[1.1] animate-fade-up delay-1"
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        {t("heading")}
      </h1>

      <p
        className="text-lg text-brown leading-relaxed mb-16 max-w-xl animate-fade-up delay-2"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
      >
        {t("intro")}
      </p>

      {/* Five Steps */}
      <div
        className="space-y-0 mb-20"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
      >
        {stepKeys.map((key, i) => (
          <section key={key} className="relative">
            {/* Connecting line */}
            {i < stepKeys.length - 1 && (
              <div className="absolute left-[19px] top-14 bottom-0 w-px bg-brown-light/20" />
            )}
            <div className="flex gap-6 pb-12">
              {/* Step number */}
              <div className="shrink-0 w-10 h-10 rounded-full bg-terracotta/10 border border-terracotta/20 flex items-center justify-center">
                <span className="text-terracotta text-xs font-bold">{t(`steps.${key}.num`)}</span>
              </div>
              <div className="pt-1.5">
                <h2
                  className="text-xl md:text-2xl font-bold text-green-deep mb-3"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {t(`steps.${key}.title`)}
                </h2>
                <p className="text-brown/70 leading-relaxed text-[15px]">
                  {t(`steps.${key}.text`)}
                </p>

                {/* Quick actions grid for step 4 */}
                {t(`steps.${key}.num`) === "04" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                    {quickActionKeys.map((qaKey) => (
                      <div
                        key={qaKey}
                        className="bg-warm-white border border-brown-light/15 rounded-2xl p-4 hover:border-green-muted/40 transition-colors duration-300"
                      >
                        <div className="text-[10px] font-semibold text-green-sage uppercase tracking-[0.15em] mb-1.5">
                          {t(`quickActions.${qaKey}.icon`)} {t(`quickActions.${qaKey}.layer`)}
                        </div>
                        <p className="text-brown/60 text-sm">{t(`quickActions.${qaKey}.action`)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Concerns */}
      <section className="mb-20">
        <h2
          className="text-2xl md:text-3xl font-bold text-green-deep mb-8"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {t("commonConcernsHeading")}
        </h2>
        <div
          className="space-y-1"
          style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        >
          {concernKeys.map((key) => (
            <div
              key={key}
              className="py-5 border-b border-brown-light/15 last:border-none"
            >
              <h3 className="text-green-deep font-semibold mb-2 text-[15px]">
                &ldquo;{t(`concerns.${key}.q`)}&rdquo;
              </h3>
              <p className="text-brown/60 text-sm leading-relaxed">{t(`concerns.${key}.a`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-terracotta/5 border border-terracotta/10 rounded-3xl p-10 text-center">
        <p
          className="text-2xl md:text-3xl font-bold text-green-deep mb-6 leading-snug"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {t.rich("ctaHeading", {
            br: () => <br className="hidden sm:block" />,
          })}
        </p>
        <div
          className="flex flex-wrap justify-center gap-4"
          style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        >
          <Link
            href="/contribute"
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-brown-dark text-white rounded-full text-sm font-semibold hover:bg-terracotta-dark transition-all duration-300"
          >
            {t("contributeToProject")}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/layers/food-and-land"
            className="inline-flex items-center px-7 py-3.5 border border-brown-light text-brown-dark rounded-full text-sm font-semibold hover:border-terracotta hover:text-terracotta transition-all duration-300"
          >
            {t("exploreLayers")}
          </Link>
        </div>
      </div>
    </article>
  );
}
