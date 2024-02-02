import { FC } from "react";
import { Text } from "react-native-paper";
import { useNoteName } from "../hooks/useNoteName";
import { Note } from "../types";

export const TextualNote: FC<{ note: Note }> = (props) => {
  const noteName = useNoteName();
  const alteration = props.note.alteration ? ` ${props.note.alteration}` : "";
  return (
    <Text>{`${noteName(props.note.note)}${alteration} (${props.note.octave}ª ottava)`}</Text>
  );
};
