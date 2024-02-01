import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import { useNativeStackNavigatorOptions } from "../../hooks/useNativeStackNavigatorOptions";
import { CreateConcert } from "./CreateConcert";
import { EditConcert } from "./EditConcert";
import { ListConcerts } from "./ListConcerts";
import { ViewConcert, ViewConcertMenu } from "./ViewConcert";

export type ConcertStackParams = {
  List: undefined;
  Create: undefined;
  View: {
    concert: string;
  };
  Edit: {
    concert: string;
  };
};

const Stack = createNativeStackNavigator<ConcertStackParams>();

export const ConcertStack: FC = () => {
  // const data = useDataContext();
  const screenOptions = useNativeStackNavigatorOptions();
  // const concertMode = data.settings.getConcertoMode();
  // if (concertMode) {
  //   return (
  //     <Page additionalTopSpace={30}>
  //       <Text variant="titleMedium">Modalità concerto attiva</Text>
  //       <Button onPress={() => data.settings.setConcertoMode(undefined)}>
  //         Esci dalla modalità concerto
  //       </Button>
  //     </Page>
  //   );
  // }
  return (
    <Stack.Navigator id="ConcertStack" screenOptions={screenOptions}>
      <Stack.Screen
        name="List"
        component={ListConcerts}
        options={{ title: "Concerti" }}
      />
      <Stack.Screen
        name="Create"
        component={CreateConcert}
        options={{ title: "Aggiungi" }}
      />
      <Stack.Screen
        name="Edit"
        component={EditConcert}
        options={{
          title: "Modifica",
        }}
        getId={({ params }) => params.concert}
      />
      <Stack.Screen
        name="View"
        component={ViewConcert}
        options={{
          title: "Visualizza",
          headerRight: ViewConcertMenu,
        }}
        getId={({ params }) => params.concert}
      />
    </Stack.Navigator>
  );
};