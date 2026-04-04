import Link from "next/link";
import { useTranslations } from "next-intl";

interface LayerCardProps {
  number: number;
  title: string;
  description: string;
  slug: string;
  icon: string;
}

const accentColors: Record<number, string> = {
  1: "from-green-sage/10 to-transparent border-green-sage/15 hover:border-green-sage/40",
  2: "from-terracotta-light/30 to-transparent border-terracotta/10 hover:border-terracotta/30",
  3: "from-green-light/40 to-transparent border-green-muted/20 hover:border-green-muted/50",
  4: "from-cream-dark/60 to-transparent border-brown-light/20 hover:border-brown-light/50",
  5: "from-green-sage/8 to-transparent border-green-sage/12 hover:border-green-sage/35",
  6: "from-terracotta-light/20 to-transparent border-terracotta/8 hover:border-terracotta/25",
};

export default function LayerCard({
  number,
  title,
  description,
  slug,
  icon,
}: LayerCardProps) {
  const t = useTranslations("layers");

  return (
    <Link href={`/layers/${slug}`} className="group block">
      <div
        className={`relative bg-gradient-to-br ${accentColors[number]} border rounded-3xl p-7 h-full transition-all duration-500 hover:shadow-xl hover:shadow-green-deep/[0.03] hover:-translate-y-1.5`}
      >
        {/* Layer number watermark */}
        <span
          className="absolute top-4 right-6 text-6xl font-bold text-brown-light/15 select-none"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {number}
        </span>

        <div className="relative">
          <span className="text-3xl block mb-4" role="img" aria-hidden="true">
            {icon}
          </span>

          <div
            className="text-[10px] font-semibold uppercase tracking-[0.2em] text-green-sage mb-2"
            style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
          >
            {t("layerNumber", { number })}
          </div>

          <h3
            className="text-xl font-bold text-green-deep mb-3 group-hover:text-terracotta transition-colors duration-300"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {title}
          </h3>

          <p
            className="text-brown/70 text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
          >
            {description}
          </p>

          {/* Read more indicator */}
          <div
            className="mt-5 flex items-center gap-2 text-xs font-medium text-terracotta/0 group-hover:text-terracotta transition-all duration-500"
            style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
          >
            <span>{t("explore")}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
