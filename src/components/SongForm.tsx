import { FC, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";
import { noteSorter } from "../functions";
import { Song } from "../types";
import { InitialNoteForm } from "./InitialNoteForm/InitialNoteForm";
import { InitialNotesList } from "./InitialNotesList";

const style = StyleSheet.create({
  container: {
    display: "flex",
    rowGap: 16,
  },
});

export const SongForm: FC<{ song: Song; persister: (song: Song) => void }> = (
  props
) => {
  const [title, setTitle] = useState(() => props.song.title);
  const [artist, setArtist] = useState(() => props.song.artist);
  const [annotations, setAnnotations] = useState(() => props.song.annotations);
  const [initialNotes, setInitialNotes] = useState(
    () => props.song.initialNotes
  );
  const [editing, setEditing] = useState<number>();

  return (
    <ScrollView>
      <View style={style.container}>
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

        <InitialNotesList
          initialNotes={initialNotes}
          renderAction={(note, i) => (
            <IconButton icon="pencil" onPress={() => setEditing(i)} />
          )}
        >
          <Button
            onPress={() => {
              const i = initialNotes.length;
              initialNotes.push({
                section: "tenori",
                subsection: 0,
                note: { note: "C", octave: 4 },
              });
              setEditing(i);
            }}
            mode="outlined"
            icon="plus"
          >
            Aggiungi nota iniziale
          </Button>
        </InitialNotesList>

        <TextInput
          mode="outlined"
          label="Annotazioni"
          multiline
          value={annotations}
          onChangeText={setAnnotations}
        />

        {editing !== undefined ? (
          <InitialNoteForm
            initial={initialNotes[editing]}
            save={(changed) => {
              initialNotes[editing] = changed;
              setInitialNotes(initialNotes.sort(noteSorter));
              setEditing(undefined);
            }}
            remove={() => {
              initialNotes.splice(editing, 1);
              setInitialNotes(initialNotes.sort(noteSorter));
              setEditing(undefined);
            }}
          />
        ) : null}

        <Button
          icon="content-save"
          mode="contained"
          disabled={!title || !artist}
          onPress={() =>
            props.persister({
              id: props.song.id,
              title,
              artist,
              annotations,
              initialNotes,
            })
          }
        >
          Salva
        </Button>
      </View>
    </ScrollView>
  );
};
