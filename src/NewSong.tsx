import { useNavigation } from "@react-navigation/native";
import { FC, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSongList } from "./hooks/useSongList";
import { HomeScreenNavigationProp } from "./types";

export const NewSong: FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const { addSong } = useSongList();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  return (
    <SafeAreaView>
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
        onPress={() => {
          addSong({
            id: new Date().toString(),
            title,
            artist,
            initialNotes: [],
          }).then(() => navigation.navigate("SongList"));
        }}
      >
        Salva
      </Button>
    </SafeAreaView>
  );
};
