import { FC } from "react";
import { Text } from "react-native-paper";
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";
import { useNoteName } from "../hooks/useNoteName";
import { Note } from "../types";

export const TextualNote: FC<{ note: Note; variant?: VariantProp<never> }> = (
  props
) => {
  const noteName = useNoteName();
  const alteration = props.note.alteration ? ` ${props.note.alteration}` : "";
  return (
    <Text
      variant={props.variant}
    >{`${noteName(props.note.note)}${alteration} (${props.note.octave}ª ott.)`}</Text>
  );
};
