import { NOTEFILES, NOTES, SECTIONS } from "./constants";

export type Alteration = "#" | "b";

export type NoteName = (typeof NOTES)[number];
export type NoteResourceName = keyof typeof NOTEFILES;

export type Note = {
  note: NoteName;
  alteration?: Alteration;
  octave: number;
};

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
  image?: string;
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