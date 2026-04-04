import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("metadata");
  return {
    title: t("contribute.title"),
    description: t("contribute.description"),
  };
}

export default async function ContributePage() {
  const t = await getTranslations("contribute");
  const tCommon = await getTranslations("common");

  const wayKeys = Object.keys(t.raw("ways"));
  const guidelineKeys = Object.keys(t.raw("guidelines"));

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
        className="text-lg text-brown leading-relaxed mb-4 max-w-xl animate-fade-up delay-2"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
      >
        {t("intro")}
      </p>

      <p
        className="text-brown/60 leading-relaxed mb-16 max-w-lg animate-fade-up delay-3"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
      >
        {t.rich("githubIntro", {
          github: (chunks) => (
            <a
              href="https://github.com/groundlayer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terracotta hover:text-terracotta-dark font-semibold transition-colors"
            >
              {chunks}
            </a>
          ),
        })}
      </p>

      {/* Ways to contribute */}
      <div className="space-y-5 mb-20">
        {wayKeys.map((key) => {
          const exampleKeys = Object.keys(t.raw(`ways.${key}.examples`));
          return (
            <section
              key={key}
              className="group bg-warm-white border border-brown-light/12 rounded-3xl p-7 hover:border-green-muted/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl mt-0.5">{t(`ways.${key}.icon`)}</span>
                <div className="flex-1">
                  <h2
                    className="text-lg font-bold text-green-deep mb-2 group-hover:text-terracotta transition-colors duration-300"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {t(`ways.${key}.title`)}
                  </h2>
                  <p
                    className="text-brown/60 text-sm leading-relaxed mb-4"
                    style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
                  >
                    {t(`ways.${key}.desc`)}
                  </p>
                  <div
                    className="flex flex-wrap gap-2"
                    style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
                  >
                    {exampleKeys.map((exKey) => (
                      <span
                        key={exKey}
                        className="text-xs text-brown/40 bg-cream-dark/50 px-3 py-1.5 rounded-full"
                      >
                        {t(`ways.${key}.examples.${exKey}`)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Guidelines */}
      <section className="mb-20">
        <h2
          className="text-2xl md:text-3xl font-bold text-green-deep mb-6"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {t("guidelinesHeading")}
        </h2>
        <div
          className="space-y-0"
          style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        >
          {guidelineKeys.map((key) => (
            <div
              key={key}
              className="flex items-start gap-3 py-4 border-b border-brown-light/12 last:border-none"
            >
              <span className="text-green-sage mt-1 text-sm shrink-0">&#10003;</span>
              <p className="text-sm text-brown/70">
                <strong className="text-green-deep font-semibold">{t(`guidelines.${key}.bold`)}</strong>{" "}
                {t(`guidelines.${key}.rest`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>
        <a
          href="https://github.com/groundlayer"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-8 py-4 bg-brown-dark text-white rounded-full text-sm font-semibold hover:bg-terracotta-dark transition-all duration-300 hover:shadow-lg hover:shadow-terracotta/15"
        >
          {tCommon("viewOnGitHub")}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </article>
  );
}
