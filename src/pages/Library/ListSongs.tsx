import { FC, useCallback, useState } from "react";
import { Button } from "react-native-paper";
import { Page } from "../../components/Page";
import { SongList } from "../../components/SongList";
import { useDataContext } from "../../hooks/useDataContext";
import { useEffectOnFocus } from "../../hooks/useEffectOnFocus";
import { LibraryTabScreenProps } from "../types";

export const ListSongs: FC<LibraryTabScreenProps<"List">> = (props) => {
  const data = useDataContext();
  const [songs, setSongs] = useState(() => data.songs.list());

  const refresh = useCallback(
    () => data.songs.load().then(setSongs),
    [data.songs]
  );

  useEffectOnFocus(refresh);

  return (
    <Page accessibilityLabel="Repertorio">
      <SongList
        songs={songs}
        onRefresh={refresh}
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
