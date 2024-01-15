import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import { Application } from "./src/Application";
import { HomeStackNavigatorParamList } from "./types";

const Stack = createNativeStackNavigator<HomeStackNavigatorParamList>();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SongList"
            component={Application}
            options={{ title: "Elenco cante" }}
          />
          <Stack.Screen name="Profile" component={Application} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
