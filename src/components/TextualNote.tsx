import { FC } from "react";
import { Text } from "react-native-paper";
import { Note, NoteName } from "../types";

const NAMES: Record<NoteName, string> = {
  C: "Do",
  D: "Re",
  E: "Mi",
  F: "Fa",
  G: "Sol",
  A: "La",
  B: "Si",
};

export const TextualNote: FC<{ note: Note }> = (props) => {
  return (
    <Text>{`${NAMES[props.note.note]}${
      props.note.alteration ? ` ${props.note.alteration}` : ""
    } - ottava ${props.note.octave}`}</Text>
  );
};
