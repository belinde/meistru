import { FC, useState } from "react";
import { Button } from "react-native-paper";
import { Page } from "../components/Page";
import { SongDisplay } from "../components/SongDisplay";
import { SongForm } from "../components/SongForm";
import { SongList } from "../components/SongList";
import { useSongList } from "../hooks/useSongList";
import { Song } from "../types";

type Mode = "list" | "create" | "edit" | "view";

export const Library: FC = () => {
  const [mode, setMode] = useState<Mode>("list");
  const [current, setCurrent] = useState<Song | null>(null);
  const { songs, addSong, editSong } = useSongList();

  const backToList = (
    <Button icon="arrow-left" mode="text" onPress={() => setMode("list")}>
      Annulla
    </Button>
  );

  switch (mode) {
    case "create":
      return (
        <Page>
          {backToList}
          <SongForm
            song={{
              id: new Date().toISOString(),
              title: "",
              artist: "",
              initialNotes: [],
            }}
            persister={(song) => addSong(song).then(() => setMode("list"))}
          />
        </Page>
      );
    case "view":
      return (
        <Page>
          {backToList}
          {current && (
            <>
              <SongDisplay song={current} />
              <Button
                icon="pencil"
                mode="contained"
                onPress={() => setMode("edit")}
              >
                Modifica
              </Button>
            </>
          )}
        </Page>
      );
    case "edit":
      return (
        <Page>
          {backToList}
          {current && (
            <SongForm
              song={current}
              persister={(song) => editSong(song).then(() => setMode("list"))}
            />
          )}
        </Page>
      );
    default:
      return (
        <Page>
          <Button
            icon="music-note-plus"
            mode="contained"
            onPress={() => setMode("create")}
          >
            Aggiungi
          </Button>
          <SongList
            songs={songs}
            onPress={(song) => {
              setCurrent(song);
              setMode("view");
            }}
          />
        </Page>
      );
  }
};
