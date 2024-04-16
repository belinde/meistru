import { FC, MutableRefObject, useCallback, useState } from "react";
import { Button, IconButton } from "react-native-paper";
import { PENTAGRAM_PREFERENCE, SECTIONS } from "../../constants";
import { InitialNote, InitialNoteMap, Part, Section, Song } from "../../types";
import { InitialNoteForm } from "../InitialNoteForm/InitialNoteForm";
import { InitialNotesList } from "../InitialNotesList";

export const SongInitialNotesManagement: FC<{
  song: MutableRefObject<Song>;
}> = (props) => {
  const [initialNotes, setInitialNotes] = useState(
    () => props.song.current.initialNotes
  );
  const [editing, setEditing] = useState<InitialNote>();
  const [canChange, setCanChange] = useState(false);

  const addNewNote = useCallback(() => {
    const found = findUnusedPart(initialNotes);
    if (found) {
      setCanChange(true);
      setEditing({
        section: found.section,
        subsection: found.subsection,
        note: { note: "C", octave: found.octave },
      });
    }
  }, [initialNotes]);

  const saveNote = useCallback(
    (changed: InitialNote) => {
      if (!editing) return;
      const newNotes = { ...initialNotes };
      const oldPart = makePart(editing);
      const newPart = makePart(changed);
      if (newPart !== oldPart) {
        delete newNotes[oldPart];
      }
      newNotes[newPart] = changed;
      props.song.current.initialNotes = newNotes;
      setInitialNotes(newNotes);
      setEditing(undefined);
      setCanChange(false);
    },
    [editing, initialNotes, props.song]
  );

  const removeNote = useCallback(() => {
    if (editing) {
      const newNotes = { ...initialNotes };
      delete newNotes[makePart(editing)];
      props.song.current.initialNotes = newNotes;
      setInitialNotes(newNotes);
      setEditing(undefined);
      setCanChange(false);
    }
  }, [editing, initialNotes, props.song]);

  return (
    <>
      <InitialNotesList
        initialNotes={initialNotes}
        renderAction={(note) => (
          <IconButton
            icon="pencil"
            accessibilityLabel="Modifica nota iniziale"
            onPress={() => {
              setCanChange(false);
              setEditing(note);
            }}
          />
        )}
      >
        <Button onPress={addNewNote} mode="outlined" icon="plus">
          Aggiungi nota iniziale
        </Button>
      </InitialNotesList>

      {editing && (
        <InitialNoteForm
          dismiss={() => {
            setCanChange(false);
            setEditing(undefined);
          }}
          initial={editing}
          save={saveNote}
          remove={removeNote}
          canChange={canChange}
        />
      )}
    </>
  );
};

const makePart = (note: InitialNote): Part =>
  `${note.section}${note.subsection}`;

const findUnusedPart = (
  initials: InitialNoteMap
):
  | { part: Part; section: Section; subsection: number; octave: number }
  | undefined => {
  for (let subsection = 0; subsection <= 4; subsection++) {
    for (const section of SECTIONS) {
      const pentagram = PENTAGRAM_PREFERENCE[section];
      const part: Part = `${section}${subsection}`;
      if (!initials[part]) {
        return {
          part,
          section,
          subsection,
          octave: pentagram === "low" ? 2 : 4,
        };
      }
    }
  }
  return;
};
