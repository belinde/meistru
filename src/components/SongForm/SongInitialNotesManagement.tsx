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

  const addNewNote = useCallback(() => {
    const found = findUnusedPart(initialNotes);
    if (found) {
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
      const oldPart: Part = makePart(editing);
      const newPart: Part = makePart(changed);
      if (newPart !== oldPart) {
        delete newNotes[oldPart];
      }
      newNotes[newPart] = changed;
      props.song.current.initialNotes = newNotes;
      setInitialNotes(newNotes);
      setEditing(undefined);
    },
    [editing, initialNotes, props.song]
  );

  const removeNote = useCallback(() => {
    if (editing) {
      const newNotes = { ...initialNotes };
      delete newNotes[makePart(editing)];
      setInitialNotes(newNotes);
      setEditing(undefined);
    }
  }, [editing, initialNotes]);

  console.debug("rendering SongInitialNotesManagement");
  return (
    <>
      <InitialNotesList
        initialNotes={initialNotes}
        renderAction={(note) => (
          <IconButton icon="pencil" onPress={() => setEditing(note)} />
        )}
      >
        <Button onPress={addNewNote} mode="outlined" icon="plus">
          Aggiungi nota iniziale
        </Button>
      </InitialNotesList>

      {editing && (
        <InitialNoteForm
          dismiss={() => setEditing(undefined)}
          initial={editing}
          save={saveNote}
          remove={removeNote}
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
