import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { FC, useCallback, useState } from "react";
import { Alert } from "react-native";
import { IconButton, Menu } from "react-native-paper";
import { ConcertDisplay } from "../../components/ConcertDisplay";
import { Page } from "../../components/Page";
import { useConcertList } from "../../hooks/useConcertList";
import { useEffectOnFocus } from "../../hooks/useEffectOnFocus";
import { Concert } from "../../types";
import { ConcertTabScreenProps } from "../types";
import { ConcertStackParams } from "./ConcertStack";

export const ViewConcertMenu: FC = () => {
  const { deleteConcert } = useConcertList();
  const route = useRoute<RouteProp<ConcertStackParams, "View">>();
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
                  deleteConcert(route.params.concert).then(() =>
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

export const ViewConcert: FC<ConcertTabScreenProps<"View">> = (props) => {
  const [currentConcert, setCurrentConcert] = useState<Concert>();
  const { getConcert } = useConcertList();

  const loader = useCallback(() => {
    getConcert(props.route.params.concert).then(setCurrentConcert);
  }, [getConcert, props.route.params.concert]);

  useEffectOnFocus(loader);

  if (!currentConcert) return null;

  return (
    <Page>
      <ConcertDisplay concert={currentConcert} />
    </Page>
  );
};
