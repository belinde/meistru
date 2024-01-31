import { FC, useState } from "react";
import { Alert } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import { InitialNote } from "../../types";
import { NoteSelector } from "./NoteSelector";
import { SectionSelector } from "./SectionSelector";

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
      <Dialog visible dismissable={false}>
        <Dialog.Title>Modifica nota:</Dialog.Title>
        <Dialog.ScrollArea>
          <SectionSelector
            section={section}
            subsection={subsection}
            setSection={setSection}
            setSubsection={setSubsection}
          />
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
        </Dialog.ScrollArea>

        <Dialog.Actions>
          <Button
            icon="delete"
            onPress={() => {
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
            }}
            mode="outlined"
          >
            Elimina
          </Button>
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
