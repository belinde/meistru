export const SECTIONS = [
  "soprani",
  "mezzosoprani",
  "contralti",
  "tenori",
  "baritoni",
  "bassi",
] as const;

export const NOTES = ["C", "D", "E", "F", "G", "A", "B"] as const;

export const NOTE_NAMES: Record<(typeof NOTES)[number], string> = {
  C: "Do",
  D: "Re",
  E: "Mi",
  F: "Fa",
  G: "Sol",
  A: "La",
  B: "Si",
};