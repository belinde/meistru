import { FC, useState } from "react";
import { ScrollView, View } from "react-native";
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
      <Page useSafeArea accessibilityLabel="Modalità concerto">
        <Button onPress={() => data.settings.setConcertMode(undefined)}>
          Esci dalla modalità concerto
        </Button>
      </Page>
    );
  }

  return (
    <Page useSafeArea accessibilityLabel="Modalità concerto">
      <ScrollView>
        <Text variant="titleLarge">{concert.title}</Text>
        {concert.description ? <Text>{concert.description}</Text> : null}
        <Divider bold style={{ marginTop: 10, marginBottom: 10 }} />
        <ConcertPiecesList
          pieces={concert.pieces}
          renderAction={(note) => (
            <View>
              <Button
                icon="music-circle"
                mode="contained-tonal"
                onPress={() => {
                  setSong(data.songs.fetch(note.song));
                }}
              >
                Note
              </Button>
            </View>
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
