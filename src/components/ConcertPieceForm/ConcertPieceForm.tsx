import { FC, useCallback, useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import { Button, Dialog, List, Portal, Searchbar } from "react-native-paper";
import { useSongList } from "../../hooks/useSongList";
import { ConcertPiece } from "../../types";

export const ConcertPieceForm: FC<{
  piece: ConcertPiece;
  save: (changed: ConcertPiece) => void;
  remove: () => void;
}> = (props) => {
  const { listSongs } = useSongList();
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState<Record<string, string>>({});

  const update = useCallback(
    (song: string, title: string) => {
      props.save({
        id: props.piece.id,
        song,
        title,
        order: props.piece.order,
        played: false,
      });
    },
    [props]
  );

  useEffect(() => {
    console.debug("ConcertForm: useEffect");
    listSongs()
      .then((songs) =>
        songs.reduce<Record<string, string>>(
          (acc, s) => ({ ...acc, [s.id]: s.title }),
          {}
        )
      )
      .then(setSongs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.debug("rendering ConcertPieceForm");

  return (
    <Portal>
      <Dialog visible dismissable={false}>
        <Dialog.Title>{props.piece.title}</Dialog.Title>
        <Dialog.Content>
          <Searchbar
            value={search}
            onChangeText={setSearch}
            placeholder="Cerca brano"
          />
          <FlatList
            data={Object.entries(songs).filter((val) =>
              val[1].toLowerCase().includes(search.toLowerCase())
            )}
            renderItem={({ item }) => (
              <List.Item
                title={item[1]}
                onPress={() => {
                  update(item[0], item[1]);
                }}
              />
            )}
            keyExtractor={(item) => item[0]}
          />
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
