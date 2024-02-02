import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { FC, useState } from "react";
import { Alert } from "react-native";
import { IconButton, Menu } from "react-native-paper";
import { useDataContext } from "../../hooks/useDataContext";
import { ConcertStackParams } from "./ConcertStack";

export const ViewConcertMenu: FC = () => {
  const data = useDataContext();
  const route = useRoute<RouteProp<ConcertStackParams, "View">>();
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
          navigation.navigate("Concert", {
            screen: "Edit",
            params: { concert: route.params.concert },
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
            "Vuoi davvero eliminare questo concerto dal repertorio?",
            [
              {
                text: "Annulla",
                style: "cancel",
              },
              {
                text: "Elimina",
                style: "destructive",
                onPress: () =>
                  data.concerts
                    .delete(route.params.concert)
                    .then(() =>
                      navigation.navigate("Concert", { screen: "List" })
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
