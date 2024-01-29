import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { FC, useState } from "react";
import { Alert } from "react-native";
import { IconButton, Menu } from "react-native-paper";
import { Page } from "../../components/Page";
import { SongDisplay } from "../../components/SongDisplay";
import { useSongList } from "../../hooks/useSongList";
import { LibraryTabScreenProps } from "../types";
import { LibraryStackParams } from "./types";

export const ViewSongMenu: FC = () => {
  const { deleteSong } = useSongList();
  const route = useRoute<RouteProp<LibraryStackParams, "View">>();
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchorPosition="top"
      anchor={
        <IconButton
          icon="dots-vertical"
          mode="outlined"
          onPress={() => setVisible(true)}
        />
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
                  deleteSong(route.params.song).then(() =>
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
  const { getSong } = useSongList();
  const song = getSong(props.route.params.song);
  if (!song) return null;
  return (
    <Page>
      <SongDisplay song={song} />
    </Page>
  );
};
