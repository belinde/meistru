import { Alteration, NoteName, Section, Song } from "./types";

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
