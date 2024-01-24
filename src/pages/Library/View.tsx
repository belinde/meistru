import { FC } from "react";
import { Text } from "react-native-paper";
import { DeleteButton } from "../../components/DeleteButton";
import { EditButton } from "../../components/EditButton";
import { Page } from "../../components/Page";
import { SongDisplay } from "../../components/SongDisplay";
import { useSongList } from "../../hooks/useSongList";
import { LibraryTabScreenProps } from "../types";

export const View: FC<LibraryTabScreenProps<"View">> = (props) => {
  const { deleteSong } = useSongList();
  return (
    <Page>
      <SongDisplay song={props.route.params.song} />
      <EditButton
        onPress={() =>
          props.navigation.navigate("Library", {
            screen: "Edit",
            params: { song: props.route.params.song },
          })
        }
      />
      <DeleteButton
        onPress={() =>
          deleteSong(props.route.params.song).then(() =>
            props.navigation.navigate("Library", { screen: "List" })
          )
        }
      >
        <Text>Vuoi davvero eliminare questo pezzo dal repertorio?</Text>
      </DeleteButton>
    </Page>
  );
};
