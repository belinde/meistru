import { FC } from "react";
import { Text } from "react-native-paper";
import { NOTE_NAMES } from "../constants";
import { Note } from "../types";

export const TextualNote: FC<{ note: Note }> = (props) => {
  return (
    <Text>{`${NOTE_NAMES[props.note.note]}${
      props.note.alteration ? ` ${props.note.alteration}` : ""
    } - ottava ${props.note.octave}`}</Text>
  );
};
