import { FC, useCallback, useState } from "react";
import { Alert } from "react-native";
import { Button, Dialog, Divider, Portal } from "react-native-paper";
import { InitialNote } from "../../types";
import { NoteSelector } from "./NoteSelector";
import { SectionSelector } from "./SectionSelector";

export const InitialNoteForm: FC<{
  initial: InitialNote;
  save: (changed: InitialNote) => void;
  remove: () => void;
  dismiss: () => void;
}> = (props) => {
  const [section, setSection] = useState(() => props.initial.section);
  const [subsection, setSubsection] = useState(() => props.initial.subsection);
  const [note, setNote] = useState(() => props.initial.note.note);
  const [alteration, setAlteration] = useState(
    () => props.initial.note.alteration
  );
  const [octave, setOctave] = useState(() => props.initial.note.octave);

  const remove = useCallback(() => {
    Alert.alert(
      "Conferma cancellazione",
      "Vuoi davvero eliminare questa nota iniziale?",
      [
        {
          text: "Annulla",
          style: "cancel",
        },
        {
          text: "Elimina",
          style: "destructive",
          onPress: props.remove,
        },
      ]
    );
  }, [props.remove]);

  const save = useCallback(() => {
    props.save({
      section,
      subsection,
      note: {
        note,
        alteration,
        octave,
      },
    });
  }, [section, subsection, note, alteration, octave, props]);

  return (
    <Portal>
      <Dialog visible onDismiss={props.dismiss}>
        <Dialog.Content>
          <SectionSelector
            section={section}
            subsection={subsection}
            setSection={setSection}
            setSubsection={setSubsection}
          />
          <Divider bold style={{ marginBottom: 10 }} />
          <NoteSelector
            note={note}
            octave={octave}
            alteration={alteration}
            section={section}
            subsection={subsection}
            setNote={setNote}
            setOctave={setOctave}
            setAlteration={setAlteration}
          />
        </Dialog.Content>

        <Dialog.Actions style={{ display: "flex" }}>
          <Button icon="close" onPress={props.dismiss} style={{ flexGrow: 1 }}>
            Annulla
          </Button>
          <Button icon="delete" onPress={remove} style={{ flexGrow: 1 }}>
            Elimina
          </Button>
          <Button
            icon="check-bold"
            mode="contained"
            onPress={save}
            style={{ flexGrow: 2 }}
          >
            Applica
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
