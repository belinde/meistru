import { FC, useCallback, useState } from "react";
import { Text } from "react-native-paper";
import { Page } from "../../components/Page";
import { SongForm } from "../../components/SongForm/SongForm";
import { useDataContext } from "../../hooks/useDataContext";
import { useEffectOnFocus } from "../../hooks/useEffectOnFocus";
import { Song } from "../../types";
import { LibraryTabScreenProps } from "../types";

export const EditSong: FC<LibraryTabScreenProps<"Edit">> = (props) => {
  const data = useDataContext();

  const [currentSong, setCurrentSong] = useState<Song>();

  const loader = useCallback(() => {
    setCurrentSong(data.songs.fetch(props.route.params.song));
  }, [data.songs, props.route.params.song]);

  useEffectOnFocus(loader);

  const persister = useCallback(
    (song: Song) =>
      data.songs.upsert(song).then(() =>
        props.navigation.navigate("Library", {
          screen: "View",
          params: { song: song.id },
        })
      ),
    [data.songs, props.navigation]
  );

  if (!currentSong) {
    return (
      <Page accessibilityLabel="Brano inesistente">
        <Text>Il brano richiesto non esiste</Text>
      </Page>
    );
  }

  return (
    <Page accessibilityLabel={`Modifica del brano "${currentSong.title}"`}>
      <SongForm song={currentSong} persister={persister} />
    </Page>
  );
};
