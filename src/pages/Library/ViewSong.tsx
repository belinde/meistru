import { FC, useCallback, useState } from "react";
import { Text } from "react-native-paper";
import { Page } from "../../components/Page";
import { SongDisplay } from "../../components/SongDisplay";
import { useDataContext } from "../../hooks/useDataContext";
import { useEffectOnFocus } from "../../hooks/useEffectOnFocus";
import { Song } from "../../types";
import { LibraryTabScreenProps } from "../types";

export const ViewSong: FC<LibraryTabScreenProps<"View">> = (props) => {
  const data = useDataContext();
  const [currentSong, setCurrentSong] = useState<Song>();

  const loader = useCallback(() => {
    setCurrentSong(data.songs.fetch(props.route.params.song));
  }, [data.songs, props.route.params.song]);

  useEffectOnFocus(loader);

  if (!currentSong) {
    return (
      <Page>
        <Text>Il brano richiesto non esiste</Text>
      </Page>
    );
  }

  return (
    <Page>
      <SongDisplay song={currentSong} />
    </Page>
  );
};
