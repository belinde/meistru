import { FC } from "react";
import { Page } from "../../components/Page";
import { SongForm } from "../../components/SongForm";
import { createIdentifier } from "../../functions";
import { useSongList } from "../../hooks/useSongList";
import { LibraryTabScreenProps } from "../types";

export const CreateSong: FC<LibraryTabScreenProps<"Create">> = (props) => {
  const { addSong } = useSongList();
  return (
    <Page>
      <SongForm
        song={{
          id: createIdentifier(),
          title: "",
          artist: "",
          annotations: "",
          initialNotes: {},
        }}
        persister={(song) =>
          addSong(song).then(() =>
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
