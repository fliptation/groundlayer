export const LAYERS = [
  { id: 1, name: "Food & Land", icon: "\u{1F331}", slug: "food-and-land" },
  { id: 2, name: "Health", icon: "\u{1F49A}", slug: "health" },
  { id: 3, name: "Governance", icon: "\u{1F91D}", slug: "governance" },
  { id: 4, name: "Economy", icon: "\u{1F300}", slug: "economy" },
  { id: 5, name: "Education & Culture", icon: "\u{1F4D6}", slug: "education" },
  { id: 6, name: "Energy & Environment", icon: "\u{2600}\u{FE0F}", slug: "energy" },
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
