import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { RadioButton, Text, ToggleButton } from "react-native-paper";
import { NOTES } from "../../constants";
import { useNoteName } from "../../hooks/useNoteName";
import { Alteration, NoteName, Section } from "../../types";
import { Pentagram } from "../Pentagram";

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export const NoteSelector: FC<{
  section: Section;
  subsection: number;
  note: NoteName;
  octave: number;
  alteration?: Alteration;
  setNote: (n: NoteName) => void;
  setOctave: (n: number) => void;
  setAlteration: (a?: Alteration) => void;
}> = (props) => {
  const noteName = useNoteName();
  return (
    <View style={style.container}>
      <Pentagram
        notes={{
          [`${props.section}${props.subsection}`]: {
            section: props.section,
            subsection: props.subsection,
            note: {
              note: props.note,
              octave: props.octave,
              alteration: props.alteration,
            },
          },
        }}
      />

      <View>
        <Text>Ottava</Text>
        <ToggleButton.Group
          onValueChange={(value) => {
            const newVal = parseInt(value);
            props.setOctave(newVal);
          }}
          value={props.octave.toString()}
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <ToggleButton key={n} icon={`numeric-${n}`} value={n.toString()} />
          ))}
        </ToggleButton.Group>
      </View>

      <View>
        <Text>Nota</Text>
        <RadioButton.Group
          onValueChange={(val) => {
            const newVal = val as NoteName;
            props.setNote(newVal);
          }}
          value={props.note}
        >
          {[...NOTES].reverse().map((n) => (
            <RadioButton.Item key={n} value={n} label={noteName(n)} />
          ))}
        </RadioButton.Group>
      </View>

      <View>
        <Text>Alter.</Text>
        <ToggleButton.Group
          onValueChange={(value) => {
            const newVal = value !== "-" ? (value as Alteration) : undefined;
            props.setAlteration(newVal);
          }}
          value={props.alteration || "-"}
        >
          <ToggleButton icon="minus" value="-" />
          <ToggleButton icon="music-accidental-sharp" value="#" />
          <ToggleButton icon="music-accidental-flat" value="b" />
        </ToggleButton.Group>
      </View>
    </View>
  );
};
