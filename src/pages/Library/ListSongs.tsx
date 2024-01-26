import { FC } from "react";
import { Button } from "react-native-paper";
import { Page } from "../../components/Page";
import { SongList } from "../../components/SongList";
import { useSongList } from "../../hooks/useSongList";
import { LibraryTabScreenProps } from "../types";

export const ListSongs: FC<LibraryTabScreenProps<"List">> = (props) => {
  const { songs } = useSongList();

  return (
    <Page>
      <SongList
        songs={songs}
        onPress={(song) =>
          props.navigation.navigate("Library", {
            screen: "View",
            params: { song: song.id },
          })
        }
      />
      <Button
        icon="music-note-plus"
        mode="contained"
        onPress={() =>
          props.navigation.navigate("Library", { screen: "Create" })
        }
      >
        Aggiungi
      </Button>
    </Page>
  );
};
