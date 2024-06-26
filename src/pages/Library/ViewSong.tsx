import { FC, useCallback, useState } from "react";
import { Page } from "../../components/Page";
import { SongDisplay } from "../../components/SongDisplay";
import { useDataContext } from "../../hooks/useDataContext";
import { useEffectOnFocus } from "../../hooks/useEffectOnFocus";
import { Song } from "../../types";
import { LibraryTabScreenProps } from "../types";
import { UnexistingSong } from "./UnexistingSong";

export const ViewSong: FC<LibraryTabScreenProps<"View">> = (props) => {
  const data = useDataContext();
  const [currentSong, setCurrentSong] = useState<Song>();

  const loader = useCallback(() => {
    setCurrentSong(data.songs.fetch(props.route.params.song));
  }, [data.songs, props.route.params.song]);

  useEffectOnFocus(loader);

  if (!currentSong) {
    return <UnexistingSong />;
  }

  return (
    <Page accessibilityLabel={`Brano selezionato: ${currentSong.title}`}>
      <SongDisplay song={currentSong} />
    </Page>
  );
};
