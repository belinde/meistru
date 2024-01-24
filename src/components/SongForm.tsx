import { FC, useCallback, useState } from "react";
import { ScrollView } from "react-native";
import {
  Button,
  Card,
  Menu,
  Text,
  TextInput,
  ToggleButton,
} from "react-native-paper";
import { NOTES, SECTIONS } from "../constants";
import { Alteration, InitialNote, Note, NoteName, Song } from "../types";

const InitialNoteForm: FC<{
  initial: InitialNote;
  save: (changed: InitialNote) => void;
  remove: () => void;
}> = (props) => {
  const [subsection, setSubsection] = useState(() => props.initial.subsection);
  const [alteration, setAlteration] = useState(
    () => props.initial.note.alteration
  );
  const [octave, setOctave] = useState(() => props.initial.note.octave);
  const [note, setNote] = useState(() => props.initial.note.note);
  const saveNote = useCallback((note: Partial<Note>) => {
    props.save({
      ...props.initial,
      note: {
        ...props.initial.note,
        ...note,
      },
    });
  }, []);
  return (
    <Card style={{ marginBottom: 5 }}>
      <Card.Title
        title={props.initial.section + (subsection ? ` ${subsection}` : "")}
        right={() => (
          <ToggleButton.Row
            onValueChange={(val) => {
              const newVal = parseInt(val);
              setSubsection(parseInt(val));
              props.save({
                ...props.initial,
                subsection: newVal,
              });
            }}
            value={subsection.toString()}
          >
            <ToggleButton icon="minus" value="0" />
            {[1, 2, 3, 4].map((i) => (
              <ToggleButton
                key={i}
                icon={`numeric-${i}`}
                value={i.toString()}
              />
            ))}
          </ToggleButton.Row>
        )}
      />
      <Card.Content>
        <Text>Nota</Text>
        <ToggleButton.Row
          onValueChange={(val) => {
            const newVal = val as NoteName;
            setNote(newVal);
            saveNote({ note: newVal });
          }}
          value={note}
        >
          {NOTES.map((n) => (
            <ToggleButton key={n} icon={`alpha-${n.toLowerCase()}`} value={n} />
          ))}
        </ToggleButton.Row>
        <Text>Alterazione</Text>
        <ToggleButton.Row
          onValueChange={(value) => {
            const newVal = value !== "-" ? (value as Alteration) : undefined;
            setAlteration(newVal);
            saveNote({ alteration: newVal });
          }}
          value={alteration || "-"}
        >
          <ToggleButton icon="minus" value="-" />
          <ToggleButton icon="music-accidental-sharp" value="#" />
          <ToggleButton icon="music-accidental-flat" value="b" />
        </ToggleButton.Row>
        <Text>Ottava</Text>
        <ToggleButton.Row
          onValueChange={(value) => {
            const newVal = parseInt(value);
            setOctave(newVal);
            saveNote({ octave: newVal });
          }}
          value={octave.toString()}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <ToggleButton key={n} icon={`numeric-${n}`} value={n.toString()} />
          ))}
        </ToggleButton.Row>
      </Card.Content>
      <Card.Actions>
        <Button icon="delete" onPress={props.remove}>
          Elimina
        </Button>
      </Card.Actions>
    </Card>
  );
};

export const SongForm: FC<{ song: Song; persister: (song: Song) => void }> = (
  props
) => {
  const [title, setTitle] = useState(() => props.song.title);
  const [artist, setArtist] = useState(() => props.song.title);
  const [initialNotes, setInitialNotes] = useState(
    () => props.song.initialNotes
  );

  const [visible, setVisible] = useState(false);
  return (
    <>
      <TextInput
        mode="outlined"
        label="Titolo"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        mode="outlined"
        label="Artista"
        value={artist}
        onChangeText={setArtist}
      />
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchorPosition="bottom"
        anchor={
          <Button
            onPress={() => setVisible(true)}
            mode="outlined"
            icon="plus"
            style={{ marginTop: 20 }}
          >
            Aggiungi nota iniziale
          </Button>
        }
        style={{ flex: 1 }}
      >
        {SECTIONS.map((section) => (
          <Menu.Item
            key={section}
            onPress={() => {
              setVisible(false);
              setInitialNotes([
                ...initialNotes,
                { section, subsection: 0, note: { note: "A", octave: 4 } },
              ]);
            }}
            title={section}
          />
        ))}
      </Menu>

      <ScrollView>
        {initialNotes.map((initialNote, i) => (
          <InitialNoteForm
            key={`${initialNotes.length}.${i}`}
            initial={initialNote}
            save={(changed) => {
              initialNotes[i] = changed;
              setInitialNotes(initialNotes);
            }}
            remove={() => {
              initialNotes.splice(i, 1);
              setInitialNotes(initialNotes);
            }}
          />
        ))}
      </ScrollView>

      <Button
        icon="content-save"
        mode="contained"
        disabled={!title || !artist}
        onPress={() =>
          props.persister({
            id: props.song.id,
            title,
            artist,
            initialNotes: initialNotes.sort((a, b) => {
              const aSection = SECTIONS.indexOf(a.section);
              const bSection = SECTIONS.indexOf(b.section);
              if (aSection < bSection) return -1;
              if (aSection > bSection) return 1;
              if (a.subsection < b.subsection) return -1;
              if (a.subsection > b.subsection) return 1;
              return 0;
            }),
          })
        }
      >
        Salva
      </Button>
    </>
  );
};
