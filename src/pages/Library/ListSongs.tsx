import { FC, useCallback, useEffect, useState } from "react";
import { Button, Text } from "react-native-paper";
import { Page } from "../../components/Page";
import { SongList } from "../../components/SongList";
import { useDataContext } from "../../hooks/useDataContext";
import { useEffectOnFocus } from "../../hooks/useEffectOnFocus";
import { Song } from "../../types";
import { LibraryTabScreenProps } from "../types";

export const ListSongs: FC<LibraryTabScreenProps<"List">> = (props) => {
  const data = useDataContext();
  const [songs, setSongs] = useState(() => data.songs.list());

  const applyFilter = useCallback(
    (s: Song[]) => {
      const filter = data.search.toLowerCase().trim();
      setSongs(
        filter === ""
          ? s
          : s.filter((song) => song.title.toLowerCase().includes(filter))
      );
    },
    [data.search]
  );

  const refresh = useCallback(
    () => data.songs.load().then(applyFilter),
    [applyFilter, data.songs]
  );

  useEffectOnFocus(refresh);

  useEffect(() => {
    applyFilter(data.songs.list());
  }, [applyFilter, data.songs]);

  return (
    <Page accessibilityLabel="Repertorio">
      <Text>Ricerca: {data.search}</Text>
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
