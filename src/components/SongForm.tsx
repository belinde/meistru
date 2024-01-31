import { FC, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";
import { SECTIONS } from "../constants";
import { InitialNoteMap, Part, Section, Song } from "../types";
import { InitialNoteForm } from "./InitialNoteForm/InitialNoteForm";
import { InitialNotesList } from "./InitialNotesList";
import { ScorePhoto } from "./ScorePhoto";
import { ScorePhotoPicker } from "./ScorePhotoPicker";

const style = StyleSheet.create({
  container: {
    display: "flex",
    rowGap: 16,
  },
});

const findUnusedPart = (
  initials: InitialNoteMap
): { part: Part; section: Section; subsection: number } | undefined => {
  for (let subsection = 0; subsection <= 4; subsection++) {
    for (const section of SECTIONS) {
      const part: Part = `${section}${subsection}`;
      if (!initials[part]) {
        return { part, section, subsection };
      }
    }
  }
  return;
};

export const SongForm: FC<{ song: Song; persister: (song: Song) => void }> = (
  props
) => {
  const [title, setTitle] = useState(() => props.song.title);
  const [artist, setArtist] = useState(() => props.song.artist);
  const [annotations, setAnnotations] = useState(() => props.song.annotations);
  const [initialNotes, setInitialNotes] = useState(
    () => props.song.initialNotes
  );
  const [editing, setEditing] = useState<Part>();
  const [image, setImage] = useState(() => props.song.image);

  return (
    <>
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

          {image && <ScorePhoto source={{ uri: image }} />}
          <ScorePhotoPicker getImageUrl={setImage} />

          <TextInput
            mode="outlined"
            label="Annotazioni"
            multiline
            value={annotations}
            onChangeText={setAnnotations}
          />

          <InitialNotesList
            initialNotes={initialNotes}
            renderAction={(note, i) => (
              <IconButton icon="pencil" onPress={() => setEditing(i)} />
            )}
          >
            <Button
              onPress={() => {
                const found = findUnusedPart(initialNotes);
                if (found) {
                  initialNotes[found.part] = {
                    section: found.section,
                    subsection: found.subsection,
                    note: { note: "C", octave: 4 },
                  };
                  setEditing(found.part);
                }
              }}
              mode="outlined"
              icon="plus"
            >
              Aggiungi nota iniziale
            </Button>
          </InitialNotesList>

          {editing !== undefined ? (
            <InitialNoteForm
              initial={initialNotes[editing]}
              save={(changed) => {
                const newPart: Part = `${changed.section}${changed.subsection}`;
                if (newPart !== editing) {
                  delete initialNotes[editing];
                }
                initialNotes[newPart] = changed;
                setInitialNotes({ ...initialNotes });
                setEditing(undefined);
              }}
              remove={() => {
                delete initialNotes[editing];
                setInitialNotes({ ...initialNotes });
                setEditing(undefined);
              }}
            />
          ) : null}
        </View>
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
            annotations,
            initialNotes,
            image,
          })
        }
      >
        Salva
      </Button>
    </>
  );
};
