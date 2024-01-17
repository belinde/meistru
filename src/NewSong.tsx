import { useNavigation } from "@react-navigation/native";
import { FC, useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useSongList } from "./hooks/useSongList";
import { HomeScreenNavigationProp } from "./types";

export const NewSong: FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const { addSong } = useSongList();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  return (
    <View>
      <TextInput label="Titolo" value={title} onChangeText={setTitle} />
      <TextInput label="Artista" value={artist} onChangeText={setArtist} />
      <Button
        icon="content-save"
        mode="contained"
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
    </View>
  );
};
