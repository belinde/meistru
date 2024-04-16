import { FC } from "react";
import { Button } from "react-native-paper";
import { ConcertList } from "../../components/ConcertList";
import { Page } from "../../components/Page";
import { LibraryTabScreenProps } from "../types";

export const ListConcerts: FC<LibraryTabScreenProps<"List">> = (props) => {
  return (
    <Page accessibilityLabel="Elenco concerti">
      <ConcertList
        onPress={(concert) =>
          props.navigation.navigate("Concert", {
            screen: "View",
            params: { concert: concert.id },
          })
        }
      />
      <Button
        icon="music-note-plus"
        mode="contained"
        onPress={() =>
          props.navigation.navigate("Concert", { screen: "Create" })
        }
      >
        Aggiungi
      </Button>
    </Page>
  );
};
