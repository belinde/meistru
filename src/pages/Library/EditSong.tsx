import { FC } from "react";
import { Page } from "../../components/Page";
import { SongForm } from "../../components/SongForm";
import { useSongList } from "../../hooks/useSongList";
import { LibraryTabScreenProps } from "../types";

export const EditSong: FC<LibraryTabScreenProps<"Edit">> = (props) => {
  const { getSong, editSong } = useSongList();
  const song = getSong(props.route.params.song);
  if (!song) {
    return null;
  }
  return (
    <Page>
      <SongForm
        song={song}
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
