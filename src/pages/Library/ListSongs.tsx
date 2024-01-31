import { FC } from "react";
import { Button } from "react-native-paper";
import { Page } from "../../components/Page";
import { SongList } from "../../components/SongList";
import { LibraryTabScreenProps } from "../types";

export const ListSongs: FC<LibraryTabScreenProps<"List">> = (props) => {
  return (
    <Page>
      <SongList
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
