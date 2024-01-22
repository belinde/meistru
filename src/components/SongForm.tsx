import { FC, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { Song } from "../types";

export const SongForm: FC<{ song: Song; persister: (song: Song) => void }> = (
  props
) => {
  const [title, setTitle] = useState(() => props.song.title);
  const [artist, setArtist] = useState(() => props.song.title);
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
      <Button
        icon="content-save"
        mode="contained"
        disabled={!title || !artist}
        onPress={() =>
          props.persister({
            id: props.song.id,
            title,
            artist,
            initialNotes: [],
          })
        }
      >
        Salva
      </Button>
    </>
  );
};
