import { Alteration, InitialNote, NoteName, Section, Song } from "./types";

const COMPRESSED_SECTIONS: Record<Section, number> = {
  soprani: 0,
  mezzosoprani: 1,
  contralti: 2,
  tenori: 3,
  baritoni: 4,
  bassi: 5,
} as const;

type CompressedInitialNote = [
  number, // section
  number, // subsection
  NoteName, // note
  Alteration | "", // alteration
  number, // octave
];

type CompressedSong = [
  string, // id
  string, // title
  string, // artist
  string, // annotations
  CompressedInitialNote[],
];

export const isCompressedSong = (data: unknown): data is CompressedSong =>
  Array.isArray(data) &&
  data.length === 5 &&
  typeof data[0] === "string" &&
  typeof data[1] === "string" &&
  typeof data[2] === "string" &&
  typeof data[3] === "string" &&
  Array.isArray(data[4]) &&
  data[4].every(
    (note) =>
      Array.isArray(note) &&
      note.length === 5 &&
      typeof note[0] === "number" &&
      typeof note[1] === "number" &&
      typeof note[2] === "string" &&
      note[2].length === 1 &&
      (note[3] === "" || note[3] === "#" || note[3] === "b") &&
      typeof note[4] === "number"
  );

export const serializeSong = (song: Song): string => {
  const compressed: CompressedSong = [
    song.id,
    song.title,
    song.artist,
    song.annotations,
    Object.values(song.initialNotes).map((note) => [
      COMPRESSED_SECTIONS[note.section],
      note.subsection,
      note.note.note,
      note.note.alteration || "",
      note.note.octave,
    ]),
  ];
  return JSON.stringify(compressed);
};

export const unserializeSong = (data: string): Song | null => {
  const compressed = JSON.parse(data);
  if (!isCompressedSong(compressed)) return null;
  const song: Song = {
    id: compressed[0],
    title: compressed[1],
    artist: compressed[2],
    annotations: compressed[3],
    initialNotes: {},
  };

  compressed[4].forEach((note) => {
    const section = Object.keys(COMPRESSED_SECTIONS).find(
      (section) => COMPRESSED_SECTIONS[section as Section] === note[0]
    ) as Section;
    const subsection = note[1];
    const initialNote: InitialNote = {
      section,
      subsection,
      note: {
        note: note[2],
        alteration: note[3] || undefined,
        octave: note[4],
      },
    };
    song.initialNotes[`${section}${subsection}`] = initialNote;
  });

  return song;
};
