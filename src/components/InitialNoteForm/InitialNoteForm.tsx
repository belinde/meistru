import { FC, useState } from "react";
import { View } from "react-native";
import { Button, Dialog, Portal, Text, ToggleButton } from "react-native-paper";
import { NOTES } from "../../constants";
import { Alteration, InitialNote, NoteName } from "../../types";
import { DeleteButton } from "../DeleteButton";
import { Pentagram } from "../Pentagram";
import { ManageSection } from "./ManageSection";
import { ManageSubsection } from "./ManageSubsection";

export const InitialNoteForm: FC<{
  initial: InitialNote;
  save: (changed: InitialNote) => void;
  remove: () => void;
}> = (props) => {
  const [section, setSection] = useState(() => props.initial.section);
  const [subsection, setSubsection] = useState(() => props.initial.subsection);
  const [alteration, setAlteration] = useState(
    () => props.initial.note.alteration
  );
  const [octave, setOctave] = useState(() => props.initial.note.octave);
  const [note, setNote] = useState(() => props.initial.note.note);

  return (
    <Portal>
      <Dialog
        visible
        dismissable={false}
        style={{
          height: "75%",
        }}
      >
        <Dialog.Title>Modifica nota:</Dialog.Title>
        <Dialog.ScrollArea>
          <View
            style={{
              flex: 1,
              rowGap: 5,
            }}
          >
            <ManageSection section={section} setSection={setSection} />
            <ManageSubsection
              subsection={subsection}
              setSubsection={setSubsection}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              rowGap: 5,
              height: 500,
            }}
          >
            <View style={{ flexGrow: 3, height: 500 }}>
              <Text>Anteprima</Text>

              <Pentagram
                notes={[
                  { section, subsection, note: { note, octave, alteration } },
                ]}
              />
            </View>
            <View style={{ flexGrow: 1, height: 500, marginBottom: 30 }}>
              <Text>Nota</Text>

              <ToggleButton.Group
                onValueChange={(val) => {
                  const newVal = val as NoteName;
                  setNote(newVal);
                }}
                value={note}
              >
                {NOTES.map((n) => (
                  <ToggleButton
                    key={n}
                    icon={`alpha-${n.toLowerCase()}`}
                    value={n}
                  />
                ))}
              </ToggleButton.Group>
            </View>
            <View style={{ flexGrow: 1 }}>
              <Text>Alter.</Text>

              <ToggleButton.Group
                onValueChange={(value) => {
                  const newVal =
                    value !== "-" ? (value as Alteration) : undefined;
                  setAlteration(newVal);
                }}
                value={alteration || "-"}
              >
                <ToggleButton icon="minus" value="-" />
                <ToggleButton icon="music-accidental-sharp" value="#" />
                <ToggleButton icon="music-accidental-flat" value="b" />
              </ToggleButton.Group>
            </View>
            <View style={{ flexGrow: 1 }}>
              <Text>Ottava</Text>

              <ToggleButton.Group
                onValueChange={(value) => {
                  const newVal = parseInt(value);
                  setOctave(newVal);
                }}
                value={octave.toString()}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <ToggleButton
                    key={n}
                    icon={`numeric-${n}`}
                    value={n.toString()}
                  />
                ))}
              </ToggleButton.Group>
            </View>
          </View>
        </Dialog.ScrollArea>

        <Dialog.Actions>
          <DeleteButton onPress={props.remove}>
            <Text>Vuoi davvero rimuovere questa nota iniziale?</Text>
          </DeleteButton>
          <Button
            icon="check-bold"
            mode="contained"
            onPress={() => {
              props.save({
                section,
                subsection,
                note: {
                  note,
                  alteration,
                  octave,
                },
              });
            }}
          >
            Aggiorna
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
