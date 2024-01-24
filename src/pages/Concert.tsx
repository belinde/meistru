import { useNavigation } from "@react-navigation/native";
import { Button, Text } from "react-native-paper";
import { Page } from "../components/Page";

export const Concert = () => {
  const aaa = useNavigation();
  return (
    <Page>
      <Text>Concert</Text>
      <Text>TO DO!</Text>
      <Button onPress={() => aaa.navigate("Library" as unknown as never)}>
        Libreria
      </Button>
    </Page>
  );
};
