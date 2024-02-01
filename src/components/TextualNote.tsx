import { FC } from "react";
import { Text } from "react-native-paper";
import { NOTE_NAMES } from "../constants";
import { useDataContext } from "../hooks/useDataContext";
import { Note } from "../types";

export const TextualNote: FC<{ note: Note }> = (props) => {
  const data = useDataContext();
  const mode = data.settings.getNoteStyle();
  const noteName =
    mode === "latin" ? NOTE_NAMES[props.note.note] : props.note.note;
  const alteration = props.note.alteration ? ` ${props.note.alteration}` : "";
  return (
    <Text>{`${noteName}${alteration} (${props.note.octave}ª ottava)`}</Text>
  );
};
