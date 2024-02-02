import { FC, useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { Song } from "../../types";
import { SongInitialNotesManagement } from "./SongInitialNotesManagement";
import { SongPhotoManagement } from "./SongPhotoManagement";
import { SongTextInput } from "./SongTextInput";

export const style = StyleSheet.create({
  container: {
    display: "flex",
    rowGap: 16,
  },
});

export const SongForm: FC<{ song: Song; persister: (song: Song) => void }> = (
  props
) => {
  const song = useRef(props.song);

  return (
    <>
      <ScrollView>
        <View style={style.container}>
          <SongTextInput song={song} field="title" label="Titolo" mandatory />
          <SongTextInput song={song} field="artist" label="Artista" />
          <SongPhotoManagement song={song} />
          <SongTextInput
            song={song}
            field="annotations"
            label="Annotazioni"
            multiline
          />
          <SongInitialNotesManagement song={song} />
        </View>
      </ScrollView>

      <Button
        icon="content-save"
        mode="contained"
        onPress={() => props.persister(song.current)}
      >
        Salva
      </Button>
    </>
  );
};
