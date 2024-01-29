import { NOTEFILES, NOTES, SECTIONS } from "./constants";

export type Alteration = "#" | "b";

export type NoteName = (typeof NOTES)[number];
export type NoteResourceName = keyof typeof NOTEFILES;

export type Note = {
  note: NoteName;
  alteration?: Alteration;
  octave: number;
};

export type Section = (typeof SECTIONS)[number];

export type InitialNote = {
  section: Section;
  subsection: number;
  note: Note;
};

export type Song = {
  id: string;
  title: string;
  artist: string;
  annotations: string;
  initialNotes: InitialNote[];
};
