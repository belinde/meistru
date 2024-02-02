import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { FC, useCallback, useState } from "react";
import { Alert } from "react-native";
import { IconButton, Menu, Text } from "react-native-paper";
import { Page } from "../../components/Page";
import { SongDisplay } from "../../components/SongDisplay";
import { useDataContext } from "../../hooks/useDataContext";
import { useEffectOnFocus } from "../../hooks/useEffectOnFocus";
import { Song } from "../../types";
import { LibraryTabScreenProps } from "../types";
import { LibraryStackParams } from "./LibraryStack";

export const ViewSongMenu: FC = () => {
  const data = useDataContext();
  const route = useRoute<RouteProp<LibraryStackParams, "View">>();
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchorPosition="bottom"
      anchor={
        <IconButton icon="dots-vertical" onPress={() => setVisible(true)} />
      }
    >
      <Menu.Item
        leadingIcon="pencil"
        onPress={() => {
          setVisible(false);
          navigation.navigate("Library", {
            screen: "Edit",
            params: { song: route.params.song },
          });
        }}
        title="Modifica"
      />
      <Menu.Item
        leadingIcon="delete"
        onPress={() => {
          setVisible(false);
          Alert.alert(
            "Conferma cancellazione",
            "Vuoi davvero eliminare questo pezzo dal repertorio?",
            [
              {
                text: "Annulla",
                style: "cancel",
              },
              {
                text: "Elimina",
                style: "destructive",
                onPress: () =>
                  data.songs
                    .delete(route.params.song)
                    .then(() =>
                      navigation.navigate("Library", { screen: "List" })
                    ),
              },
            ]
          );
        }}
        title="Elimina"
      />
    </Menu>
  );
};

export const ViewSong: FC<LibraryTabScreenProps<"View">> = (props) => {
  const data = useDataContext();
  const [currentSong, setCurrentSong] = useState<Song>();

  const loader = useCallback(() => {
    setCurrentSong(data.songs.fetch(props.route.params.song));
  }, [data.songs, props.route.params.song]);

  useEffectOnFocus(loader);

  if (!currentSong) {
    return (
      <Page>
        <Text>Il brano richiesto non esiste</Text>
      </Page>
    );
  }

  return (
    <Page>
      <SongDisplay song={currentSong} />
    </Page>
  );
};
