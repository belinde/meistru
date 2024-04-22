import { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, ToggleButton } from "react-native-paper";
import { NOTES } from "../../constants";
import { useNoteName } from "../../hooks/useNoteName";
import { THEME } from "../../theme";
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
  const [note, setNote] = useState(props.note);

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
        <Text variant="labelSmall">Ott.</Text>
        <ToggleButton.Group
          onValueChange={(value) => {
            const newVal = parseInt(value);
            props.setOctave(newVal);
          }}
          value={props.octave.toString()}
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <ToggleButton
              key={n}
              icon={`numeric-${n}`}
              value={n.toString()}
              aria-label={n.toString()}
              accessibilityLabel={n.toString()}
              style={{
                backgroundColor:
                  props.octave === n ? THEME.colors.primary : undefined,
              }}
            />
          ))}
        </ToggleButton.Group>
      </View>

      <View>
        <Text variant="labelSmall">Nota</Text>
        {[...NOTES].reverse().map((n) => (
          <Button
            key={n}
            mode={note === n ? "contained" : "text"}
            aria-label={noteName(n)}
            accessibilityLabel={noteName(n)}
            onPress={() => {
              setNote(n);
              props.setNote(n);
            }}
          >
            {noteName(n)}
          </Button>
        ))}
      </View>

      <View>
        <Text variant="labelSmall">Alter.</Text>
        <ToggleButton.Group
          onValueChange={(value) => {
            const newVal = value !== "-" ? (value as Alteration) : undefined;
            props.setAlteration(newVal);
          }}
          value={props.alteration || "-"}
        >
          <ToggleButton
            icon="minus"
            value="-"
            accessibilityLabel="-"
            style={{
              backgroundColor: !props.alteration
                ? THEME.colors.primary
                : undefined,
            }}
          />
          <ToggleButton
            icon="music-accidental-sharp"
            value="#"
            accessibilityLabel="diesis"
            style={{
              backgroundColor:
                props.alteration === "#" ? THEME.colors.primary : undefined,
            }}
          />
          <ToggleButton
            icon="music-accidental-flat"
            value="b"
            accessibilityLabel="bemolle"
            style={{
              backgroundColor:
                props.alteration === "b" ? THEME.colors.primary : undefined,
            }}
          />
        </ToggleButton.Group>
      </View>
    </View>
  );
};
