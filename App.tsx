import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import { NewSong } from "./src/NewSong";
import { SongList } from "./src/SongList";
import { HomeStackNavigatorParamList } from "./src/types";

const Stack = createNativeStackNavigator<HomeStackNavigatorParamList>();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SongList"
            component={SongList}
            options={{ title: "Elenco cante" }}
          />
          <Stack.Screen
            name="NewSong"
            component={NewSong}
            options={{ title: "Nuova canta" }}
          />
          <Stack.Screen name="Profile" component={SongList} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
