import { useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { Button } from "react-native-paper";
import { Page } from "../components/Page";
import { SongList } from "../components/SongList";
import { useSongList } from "../hooks/useSongList";
import { HomeScreenNavigationProp } from "../types";

export const Library: FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { songs } = useSongList();

  return (
    <Page>
      <Button
        icon="music-note-plus"
        mode="contained"
        onPress={() => navigation.navigate("NewSong")}
      >
        Aggiungi
      </Button>
      <SongList songs={songs} />
    </Page>
  );
};
