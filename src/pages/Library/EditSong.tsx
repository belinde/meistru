import { FC, useEffect, useState } from "react";
import { Page } from "../../components/Page";
import { SongForm } from "../../components/SongForm";
import { useSongList } from "../../hooks/useSongList";
import { Song } from "../../types";
import { LibraryTabScreenProps } from "../types";

export const EditSong: FC<LibraryTabScreenProps<"Edit">> = (props) => {
  const { getSong, editSong } = useSongList();
  const [currentSong, setCurrentSong] = useState<Song>();
  useEffect(() => {
    if (currentSong) return;
    getSong(props.route.params.song).then(setCurrentSong);
  }, [currentSong, getSong, props.route.params.song]);
  if (!currentSong) {
    return null;
  }
  return (
    <Page>
      <SongForm
        song={currentSong}
        persister={(song) =>
          editSong(song).then(() =>
            props.navigation.navigate("Library", {
              screen: "View",
              params: { song: song.id },
            })
          )
        }
      />
    </Page>
  );
};
