export const LAYERS = [
  { number: 1, icon: "\u{1F331}", slug: "food-and-land" },
  { number: 2, icon: "\u{1F49A}", slug: "health" },
  { number: 3, icon: "\u{1F91D}", slug: "governance" },
  { number: 4, icon: "\u{1F300}", slug: "economy" },
  { number: 5, icon: "\u{1F4D6}", slug: "education" },
  { number: 6, icon: "\u{2600}\u{FE0F}", slug: "energy" },
  { number: 7, icon: "\u{1F3E0}", slug: "housing" },
  { number: 8, icon: "\u{1F527}", slug: "technology" },
  { number: 9, icon: "\u{1F4A7}", slug: "water" },
  { number: 10, icon: "\u{1F6B2}", slug: "transportation" },
  { number: 11, icon: "\u{1F4E1}", slug: "communication" },
  { number: 12, icon: "\u{1F6E1}\u{FE0F}", slug: "safety" },
  { number: 13, icon: "\u{270A}", slug: "human-rights" },
] as const;

export type Layer = (typeof LAYERS)[number];

export function getLayerBySlug(slug: string) {
  return LAYERS.find((l) => l.slug === slug);
}

export function getLayerByNumber(num: number) {
  return LAYERS.find((l) => l.number === num);
}
