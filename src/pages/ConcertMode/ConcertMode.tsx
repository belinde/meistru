import { FC, useState } from "react";
import { ScrollView } from "react-native";
import { Button, Dialog, Divider, Portal, Text } from "react-native-paper";
import { ConcertPiecesList } from "../../components/ConcertPiecesList";
import { Page } from "../../components/Page";
import { SongDisplay } from "../../components/SongDisplay";
import { useDataContext } from "../../hooks/useDataContext";
import { Song } from "../../types";

export const ConcertMode: FC<{ concert: string }> = (props) => {
  const data = useDataContext();
  const concert = data.concerts.fetch(props.concert);
  const [song, setSong] = useState<Song>();

  if (!concert) {
    return (
      <Page useSafeArea>
        <Button onPress={() => data.settings.setConcertMode(undefined)}>
          Esci dalla modalità concerto
        </Button>
      </Page>
    );
  }

  return (
    <Page useSafeArea>
      <ScrollView>
        <Text variant="titleLarge">{concert.title}</Text>
        <Text>{concert.description}</Text>
        <Divider bold style={{ marginTop: 10, marginBottom: 10 }} />
        <ConcertPiecesList
          pieces={concert.pieces}
          renderAction={(note) => (
            <Button
              icon="music-circle"
              mode="contained-tonal"
              onPress={() => {
                setSong(data.songs.fetch(note.song));
              }}
            >
              Note
            </Button>
          )}
        />
        {song && (
          <Portal>
            <Dialog visible onDismiss={() => setSong(undefined)}>
              <Dialog.Content>
                <SongDisplay song={song} />
              </Dialog.Content>
            </Dialog>
          </Portal>
        )}
      </ScrollView>

      <Button
        mode="contained"
        onPress={() => data.settings.setConcertMode(undefined)}
      >
        Esci dalla modalità concerto
      </Button>
    </Page>
  );
};
