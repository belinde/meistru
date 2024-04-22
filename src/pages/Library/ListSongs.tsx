import { FC, useCallback, useEffect, useState } from "react";
import { Button, Searchbar } from "react-native-paper";
import { Page } from "../../components/Page";
import { SongList } from "../../components/SongList";
import { useDataContext } from "../../hooks/useDataContext";
import { useEffectOnFocus } from "../../hooks/useEffectOnFocus";
import { Song } from "../../types";
import { LibraryTabScreenProps } from "../types";

export const ListSongs: FC<LibraryTabScreenProps<"List">> = (props) => {
  const data = useDataContext();
  const [text, setText] = useState(() => data.search);

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

  const search = useCallback(
    (s: string) => {
      setText(s);
      data.setSearch(s);
    },
    [data]
  );
  const reset = useCallback(() => search(""), [search]);

  return (
    <Page accessibilityLabel="Repertorio">
      <Searchbar
        value={text}
        onChangeText={search}
        onIconPress={reset}
        onClearIconPress={reset}
        placeholder="Cerca..."
        searchAccessibilityLabel="Cerca..."
        aria-label="Cerca..."
      />
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
