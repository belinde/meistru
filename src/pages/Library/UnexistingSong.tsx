import { FC } from "react";
import { Text } from "react-native-paper";
import { Page } from "../../components/Page";

export const UnexistingSong: FC = () => (
  <Page accessibilityLabel="Brano inesistente">
    <Text>Il brano richiesto non esiste</Text>
  </Page>
);
