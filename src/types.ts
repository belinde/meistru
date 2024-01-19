import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SECTIONS } from "./constants";

export type Alteration = "#" | "b";

export type Note = {
  note: string;
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
  initialNotes: InitialNote[];
};

export type HomeStackNavigatorParamList = {
  SongList: undefined;
  NewSong: undefined;
  Profile: {
    name: string;
    birthYear: string;
  };
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  "SongList"
>;
