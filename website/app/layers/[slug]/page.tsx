import Link from "next/link";
import { notFound } from "next/navigation";
import { getExamplesByLayer } from "@/lib/examples";
import { getTranslations } from "next-intl/server";
import { LAYERS } from "@/lib/layers";

export function generateStaticParams() {
  return LAYERS.map((layer) => ({ slug: layer.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const layer = LAYERS.find((l) => l.slug === slug);
  if (!layer) return { title: "Not Found" };
  const t = await getTranslations("metadata");
  const tl = await getTranslations("layers");
  return {
    title: t("layer.title", { title: tl(`items.${slug}.title`) }),
    description: tl(`items.${slug}.subtitle`),
  };
}

export default async function LayerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const layer = LAYERS.find((l) => l.slug === slug);

  if (!layer) {
    notFound();
  }

  const t = await getTranslations("layers");
  const tc = await getTranslations("common");

  const currentIndex = LAYERS.findIndex((l) => l.slug === slug);
  const prevLayer = currentIndex > 0 ? LAYERS[currentIndex - 1] : null;
  const nextLayer =
    currentIndex < LAYERS.length - 1 ? LAYERS[currentIndex + 1] : null;

  const solutionKeys = Object.keys(t.raw(`items.${slug}.solutions`));
  const actionKeys = Object.keys(t.raw(`items.${slug}.actions`));

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16 md:py-24">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
        {/* Sidebar nav */}
        <aside className="md:w-52 shrink-0">
          <nav
            className="flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-visible pb-4 md:pb-0 md:sticky md:top-24"
            style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
          >
            {LAYERS.map((l) => (
              <Link
                key={l.slug}
                href={`/layers/${l.slug}`}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm whitespace-nowrap transition-all duration-300 ${
                  l.slug === slug
                    ? "text-green-deep font-semibold"
                    : "text-brown/60 hover:text-green-deep"
                }`}
              >
                <span className="text-sm">{l.icon}</span>
                <span>{t(`items.${l.slug}.title`)}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <article className="flex-1 min-w-0">
          {/* Eyebrow */}
          <div
            className="flex items-center gap-3 mb-4"
            style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
          >
            <div className="h-px w-8 bg-terracotta" />
            <span className="text-terracotta text-[10px] font-semibold uppercase tracking-[0.2em]">
              {t("layerNumber", { number: layer.number })}
            </span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-bold text-green-deep mb-3 leading-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {layer.icon} {t(`items.${slug}.title`)}
          </h1>
          <p
            className="text-lg text-brown/60 mb-12"
            style={{ fontFamily: "var(--font-source-serif), serif" }}
          >
            {t(`items.${slug}.subtitle`)}
          </p>

          {/* Problem */}
          <section className="mb-14">
            <h2
              className="text-xl md:text-2xl font-bold text-green-deep mb-5"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {t("theProblem")}
            </h2>
            <div className="relative pl-5 border-l-2 border-terracotta/30">
              <p
                className="text-brown/70 leading-relaxed text-[15px]"
                style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
              >
                {t(`items.${slug}.problem`)}
              </p>
            </div>
          </section>

          {/* Solutions */}
          <section className="mb-14">
            <h2
              className="text-xl md:text-2xl font-bold text-green-deep mb-6"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {t("theAlternative")}
            </h2>
            <div className="grid gap-4">
              {solutionKeys.map((key, i) => (
                <div
                  key={key}
                  className="group bg-warm-white border border-brown-light/12 rounded-2xl p-6 hover:border-green-muted/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="text-terracotta/30 font-bold text-2xl leading-none mt-0.5"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3
                        className="text-green-deep font-bold mb-2 group-hover:text-terracotta transition-colors duration-300"
                        style={{ fontFamily: "var(--font-playfair), serif" }}
                      >
                        {t(`items.${slug}.solutions.${key}.name`)}
                      </h3>
                      <p
                        className="text-brown/60 text-sm leading-relaxed"
                        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
                      >
                        {t(`items.${slug}.solutions.${key}.desc`)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Actions */}
          <section className="mb-14">
            <h2
              className="text-xl md:text-2xl font-bold text-green-deep mb-5"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {t("startHere")}
            </h2>
            <ul
              className="space-y-0"
              style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              {actionKeys.map((key) => (
                <li
                  key={key}
                  className="flex items-start gap-3 text-brown/70 py-3 border-b border-brown-light/10 last:border-none"
                >
                  <span className="text-green-sage mt-0.5 text-sm">&#10003;</span>
                  <span className="text-sm">{t(`items.${slug}.actions.${key}`)}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Examples */}
          <section className="mb-14">
            <h2
              className="text-xl md:text-2xl font-bold text-green-deep mb-5"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {t("alreadyHappening")}
            </h2>
            <div className="grid gap-4">
              {getExamplesByLayer(layer.number).map((ex) => (
                <a
                  key={ex.name}
                  href={ex.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-warm-white border border-brown-light/12 rounded-2xl p-5 hover:border-green-muted/30 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3
                      className="text-green-deep font-bold group-hover:text-terracotta transition-colors duration-300"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      {ex.name}
                    </h3>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="text-brown/20 group-hover:text-terracotta shrink-0 mt-1 transition-colors duration-300"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                  <p
                    className="text-brown/40 text-xs mb-2"
                    style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
                  >
                    {ex.location}
                    {ex.yearFounded ? ` · Est. ${ex.yearFounded}` : ""}
                  </p>
                  <p
                    className="text-brown/60 text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
                  >
                    {ex.description}
                  </p>
                  <div
                    className="flex flex-wrap gap-1.5 mt-3"
                    style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
                  >
                    {ex.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-green-light/50 text-green-mid"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href={`/examples?layer=${layer.number}`}
                className="inline-flex items-center gap-2 text-sm text-terracotta hover:text-terracotta-dark transition-colors duration-300"
                style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
              >
                {t("viewAllExamples")}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </section>

          {/* Prev/Next navigation */}
          <div
            className="flex justify-between items-center pt-8 border-t border-brown-light/15"
            style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
          >
            {prevLayer ? (
              <Link
                href={`/layers/${prevLayer.slug}`}
                className="group flex items-center gap-2 text-sm text-brown/50 hover:text-terracotta transition-colors duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="transition-transform duration-300 group-hover:-translate-x-1">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                {prevLayer.icon} {t(`items.${prevLayer.slug}.title`)}
              </Link>
            ) : (
              <span />
            )}
            {nextLayer ? (
              <Link
                href={`/layers/${nextLayer.slug}`}
                className="group flex items-center gap-2 text-sm text-brown/50 hover:text-terracotta transition-colors duration-300"
              >
                {nextLayer.icon} {t(`items.${nextLayer.slug}.title`)}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <Link
                href="/get-started"
                className="group flex items-center gap-2 text-sm text-terracotta font-semibold hover:text-terracotta-dark transition-colors duration-300"
              >
                {tc("getStarted")}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
