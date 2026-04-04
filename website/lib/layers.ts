export const LAYERS = [
  { id: 1, name: "Food & Land", icon: "\u{1F331}", slug: "food-and-land" },
  { id: 2, name: "Health", icon: "\u{1F49A}", slug: "health" },
  { id: 3, name: "Governance", icon: "\u{1F91D}", slug: "governance" },
  { id: 4, name: "Economy", icon: "\u{1F300}", slug: "economy" },
  { id: 5, name: "Education & Culture", icon: "\u{1F4D6}", slug: "education" },
  { id: 6, name: "Energy & Environment", icon: "\u{2600}\u{FE0F}", slug: "energy" },
  { id: 7, name: "Housing & Shelter", icon: "\u{1F3E0}", slug: "housing" },
  { id: 8, name: "Technology & Infrastructure", icon: "\u{1F527}", slug: "technology" },
  { id: 9, name: "Water & Sanitation", icon: "\u{1F4A7}", slug: "water" },
  { id: 10, name: "Transportation & Mobility", icon: "\u{1F6B2}", slug: "transportation" },
  { id: 11, name: "Communication & Media", icon: "\u{1F4E1}", slug: "communication" },
  { id: 12, name: "Safety & Conflict Resolution", icon: "\u{1F6E1}\u{FE0F}", slug: "safety" },
  { id: 13, name: "Human Rights", icon: "\u{270A}", slug: "human-rights" },
] as const;

export function getLayerById(id: number) {
  return LAYERS.find((l) => l.id === id);
}

export function getLayerName(id: number) {
  return getLayerById(id)?.name ?? "Unknown";
}

export function getLayerIcon(id: number) {
  return getLayerById(id)?.icon ?? "";
}
