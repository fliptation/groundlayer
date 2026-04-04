import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function HeroSection() {
  const t = await getTranslations("hero");
  const tc = await getTranslations("common");

  return (
    <section className="relative overflow-hidden">
      {/* Organic background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, var(--green-deep) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-10 w-48 h-48 rounded-full opacity-[0.03]"
          style={{
            background:
              "radial-gradient(circle, var(--terracotta) 0%, transparent 70%)",
          }}
        />
        <svg
          className="absolute bottom-0 left-0 w-full h-64 opacity-[0.03]"
          viewBox="0 0 1440 256"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,128 C200,80 400,180 600,120 C800,60 1000,160 1200,100 C1300,70 1400,90 1440,80"
            stroke="var(--green-deep)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M0,160 C200,120 400,200 600,150 C800,100 1000,180 1200,130 C1300,110 1400,120 1440,110"
            stroke="var(--green-deep)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M0,192 C200,160 400,220 600,180 C800,140 1000,200 1200,160 C1300,145 1400,150 1440,140"
            stroke="var(--green-deep)"
            strokeWidth="0.75"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10 pt-20 pb-28 md:pt-32 md:pb-40">
        {/* Eyebrow */}
        <div
          className="flex items-center gap-3 mb-8 animate-fade-up"
          style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        >
          <div className="h-px w-12 bg-terracotta animate-draw-line" />
          <span className="text-terracotta text-xs font-semibold uppercase tracking-[0.2em]">
            {t("eyebrow")}
          </span>
        </div>

        <div className="max-w-4xl">
          <h1
            className="text-[2.75rem] md:text-7xl lg:text-8xl font-bold text-green-deep leading-[1.05] mb-8 animate-fade-up delay-1"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {t.rich("heading", {
              br: () => <br />,
              highlight: (chunks) => (
                <span className="italic font-medium text-terracotta">{chunks}</span>
              ),
            })}
          </h1>

          <p
            className="text-lg md:text-xl text-brown leading-relaxed mb-4 max-w-xl animate-fade-up delay-3"
            style={{ fontFamily: "var(--font-source-serif), Georgia, serif" }}
          >
            {t("subtitle")}
          </p>

          <p
            className="text-[15px] text-brown/60 leading-relaxed mb-12 max-w-lg animate-fade-up delay-4"
            style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
          >
            {t("description")}
          </p>

          <div
            className="flex flex-wrap gap-4 animate-fade-up delay-5"
            style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
          >
            <Link
              href="/vision"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-brown-dark text-white rounded-full text-sm font-semibold hover:bg-terracotta transition-all duration-300 hover:shadow-lg hover:shadow-brown-dark/15"
            >
              {t("readTheVision")}
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/get-started"
              className="inline-flex items-center px-6 py-3 border border-brown/30 text-brown-dark rounded-full text-sm font-semibold hover:border-terracotta hover:text-terracotta transition-all duration-300"
            >
              {tc("getStarted")}
            </Link>
          </div>
        </div>

        {/* Floating stat indicators */}
        <div
          className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 flex-col gap-6 animate-fade-up delay-6"
          style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        >
          {[
            { num: "6", label: t("stats.layers") },
            { num: "\u221E", label: t("stats.open") },
            { num: "0", label: t("stats.gatekeepers") },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center px-4 py-3 border border-brown-light/20 rounded-2xl bg-warm-white/60 backdrop-blur-sm"
            >
              <div
                className="text-2xl font-bold text-green-deep"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {stat.num}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-brown/50 mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
