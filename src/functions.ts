import { SECTIONS } from "./constants";
import { InitialNote } from "./types";

export const createIdentifier = () =>
  Math.floor(1000 * (Date.now() + Math.random())).toString(36);

export const noteSorter = (a: InitialNote, b: InitialNote) => {
  const aSection = SECTIONS.indexOf(a.section);
  const bSection = SECTIONS.indexOf(b.section);
  if (aSection < bSection) return -1;
  if (aSection > bSection) return 1;
  if (a.subsection < b.subsection) return -1;
  if (a.subsection > b.subsection) return 1;
  return 0;
};
