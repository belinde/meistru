import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type Alteration = "#" | "b";

export type Note = {
  note: string;
  alteration?: Alteration;
  octave: number;
};

export type InitialNote = {
  section: string;
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
  Profile: {
    name: string;
    birthYear: string;
  };
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  "SongList"
>;
