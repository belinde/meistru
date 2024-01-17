import { useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { SongRow } from "./components/SongRow";
import { useSongList } from "./hooks/useSongList";
import { HomeScreenNavigationProp } from "./types";

export const SongList: FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { songs } = useSongList();

  return (
    <View>
      <Text>Elenco</Text>
      {songs.map((song) => (
        <SongRow key={song.id} song={song} />
      ))}
      <Button
        icon="music-note-plus"
        onPress={() => navigation.navigate("NewSong")}
      >
        Aggiungi
      </Button>
    </View>
  );
};
