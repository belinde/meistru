import { FC, useCallback } from "react";
import { Page } from "../../components/Page";
import { SongForm } from "../../components/SongForm/SongForm";
import { createIdentifier } from "../../functions";
import { useDataContext } from "../../hooks/useDataContext";
import { Song } from "../../types";
import { LibraryTabScreenProps } from "../types";

export const CreateSong: FC<LibraryTabScreenProps<"Create">> = (props) => {
  const data = useDataContext();
  const persister = useCallback(
    (song: Song) =>
      data.songs.add(song).then(() =>
        props.navigation.navigate("Library", {
          screen: "View",
          params: { song: song.id },
        })
      ),
    [data.songs, props.navigation]
  );
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
        persister={persister}
      />
    </Page>
  );
};
