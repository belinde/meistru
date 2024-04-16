import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { FC, useState } from "react";
import { Alert } from "react-native";
import { IconButton, Menu } from "react-native-paper";
import { useDataContext } from "../../hooks/useDataContext";
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
        <IconButton
          icon="dots-vertical"
          onPress={() => setVisible(true)}
          accessibilityLabel="Azioni"
        />
      }
      overlayAccessibilityLabel="Menu del pezzo"
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
        accessibilityLabel="Modifica il pezzo"
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
        accessibilityLabel="Elimina il pezzo"
      />
    </Menu>
  );
};
