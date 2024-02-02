import { FC, useCallback, useState } from "react";
import { Alert } from "react-native";
import { Button, Dialog, Portal, Searchbar } from "react-native-paper";
import { useDataContext } from "../../hooks/useDataContext";
import { ConcertPiece, Song } from "../../types";
import { SongList } from "../SongList";

export const ConcertPieceForm: FC<{
  piece: ConcertPiece;
  save: (changed: ConcertPiece) => void;
  remove: () => void;
}> = (props) => {
  const data = useDataContext();
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState(() => data.songs.list());

  const update = useCallback(
    (song: Song) => {
      props.save({
        id: props.piece.id,
        song: song.id,
        order: props.piece.order,
        played: false,
      });
    },
    [props]
  );

  const searchSongs = useCallback(
    (searchText: string) => {
      setSearch(searchText);
      setSongs(
        data.songs
          .list()
          .filter((song) =>
            song.title.toLowerCase().includes(searchText.toLowerCase())
          )
      );
    },
    [data.songs]
  );

  console.debug("rendering ConcertPieceForm");

  return (
    <Portal>
      <Dialog visible dismissable={false}>
        <Dialog.Content>
          <Searchbar
            mode="view"
            value={search}
            onChangeText={searchSongs}
            placeholder="Cerca brano"
          />
          <SongList songs={songs} onPress={update} />
        </Dialog.Content>

        <Dialog.Actions>
          <Button
            icon="delete"
            onPress={() => {
              Alert.alert(
                "Conferma cancellazione",
                "Vuoi davvero togliere questo brano dal concerto?",
                [
                  {
                    text: "Annulla",
                    style: "cancel",
                  },
                  {
                    text: "Rimuovi",
                    style: "destructive",
                    onPress: props.remove,
                  },
                ]
              );
            }}
            mode="outlined"
          >
            Rimuovi
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
