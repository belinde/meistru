import { NOTEFILES, NOTES, SECTIONS } from "./constants";

export type Alteration = "#" | "b";

export type NoteName = (typeof NOTES)[number];
export type NoteResourceName = keyof typeof NOTEFILES;

export type Note = {
  note: NoteName;
  alteration?: Alteration;
  octave: number;
};

export type Instrument = "synth" | "pluck";

export type NoteNameStyle = "english" | "latin";

export type Section = (typeof SECTIONS)[number];

export type Part = `${Section}${number}`;

export type InitialNote = {
  section: Section;
  subsection: number;
  note: Note;
};

export type InitialNoteMap = Record<Part, InitialNote>;

export type Song = {
  id: string;
  title: string;
  artist: string;
  annotations: string;
  initialNotes: InitialNoteMap;
  transpose?: number;
  image?: string;
};

export const isSong = (item: any): item is Song => {
  return (
    typeof item === "object" &&
    item !== null &&
    "id" in item &&
    "title" in item &&
    "artist" in item &&
    "annotations" in item &&
    "initialNotes" in item
  );
};

export type PentagramPreference = "high" | "low";

export type ConcertPiece = {
  id: string;
  song: string;
  order: number;
};

export type PieceMap = Record<string, ConcertPiece>;

export type Concert = {
  id: string;
  title: string;
  description: string;
  pieces: PieceMap;
};

export const isConcert = (item: any): item is Concert => {
  return (
    typeof item === "object" &&
    item !== null &&
    "id" in item &&
    "title" in item &&
    "description" in item &&
    "pieces" in item
  );
};