import { FC, useCallback } from "react";
import { Page } from "../../components/Page";
import { SongForm } from "../../components/SongForm/SongForm";
import { createIdentifier, favoriteSectionNote } from "../../functions";
import { useDataContext } from "../../hooks/useDataContext";
import { InitialNoteMap, Song } from "../../types";
import { LibraryTabScreenProps } from "../types";

export const CreateSong: FC<LibraryTabScreenProps<"Create">> = (props) => {
  const data = useDataContext();
  const persister = useCallback(
    (song: Song) => {
      if (!song.title) {
        return alert("Il titolo è obbligatorio.");
      }
      if (Object.values(song.initialNotes).length === 0) {
        return alert("Inserisci almeno una nota iniziale.");
      }
      data.songs.add(song).then(() =>
        props.navigation.navigate("Library", {
          screen: "View",
          params: { song: song.id },
        })
      );
    },
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
          initialNotes: data.settings
            .getStandardSections()
            .reduce((acc, curr) => {
              acc[`${curr.section}${curr.subsection}`] = {
                section: curr.section,
                subsection: curr.subsection,
                note: favoriteSectionNote(curr.section),
              };
              return acc;
            }, {} as InitialNoteMap),
        }}
        persister={persister}
      />
    </Page>
  );
};
