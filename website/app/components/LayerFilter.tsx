"use client";

import { LAYERS } from "@/lib/layers";
import { useTranslations } from "next-intl";

interface LayerFilterProps {
  selected: number | null;
  onChange: (layer: number | null) => void;
}

export default function LayerFilter({ selected, onChange }: LayerFilterProps) {
  const tc = useTranslations("common");
  const tl = useTranslations("layers");

  return (
    <div
      className="flex flex-wrap gap-2"
      style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
    >
      <button
        onClick={() => onChange(null)}
        className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
          selected === null
            ? "bg-brown-dark text-white"
            : "bg-cream-dark/50 text-brown/50 hover:text-brown-dark hover:bg-cream-dark"
        }`}
      >
        {tc("all")}
      </button>
      {LAYERS.map((layer) => (
        <button
          key={layer.id}
          onClick={() => onChange(selected === layer.id ? null : layer.id)}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
            selected === layer.id
              ? "bg-brown-dark text-white"
              : "bg-cream-dark/50 text-brown/50 hover:text-brown-dark hover:bg-cream-dark"
          }`}
        >
          {layer.icon} {tl(`items.${layer.slug}.title`)}
        </button>
      ))}
    </div>
  );
}
