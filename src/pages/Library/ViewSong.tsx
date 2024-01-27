import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { FC, useState } from "react";
import { IconButton, Menu, Text } from "react-native-paper";
import { Page } from "../../components/Page";
import { SongDisplay } from "../../components/SongDisplay";
import { useConfirmDeletion } from "../../hooks/useConfirmDeletion";
import { useSongList } from "../../hooks/useSongList";
import { LibraryTabScreenProps } from "../types";
import { LibraryStackParams } from "./types";

export const ViewSongMenu: FC = () => {
  const { deleteSong, getSong } = useSongList();
  const route = useRoute<RouteProp<LibraryStackParams, "View">>();
  const navigation = useNavigation();

  const { setConfirmDeletionVisible, ConfirmationDialog } =
    useConfirmDeletion();
  const [visible, setVisible] = useState(false);

  return (
    <>
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
            setConfirmDeletionVisible(true);
          }}
          title="Elimina"
        />
      </Menu>
      <ConfirmationDialog
        onPress={() =>
          deleteSong(route.params.song).then(() =>
            navigation.navigate("Library", { screen: "List" })
          )
        }
      >
        <Text>Vuoi davvero eliminare questo pezzo dal repertorio?</Text>
      </ConfirmationDialog>
    </>
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
