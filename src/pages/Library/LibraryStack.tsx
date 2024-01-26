import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import { useTheme } from "react-native-paper";
import { CreateSong } from "./CreateSong";
import { EditSong } from "./EditSong";
import { ListSongs } from "./ListSongs";
import { ViewSong } from "./ViewSong";
import { LibraryStackParams } from "./types";

const Stack = createNativeStackNavigator<LibraryStackParams>();

export const LibraryStack: FC = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      id="LibraryStack"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.elevation.level2,
        },
        headerTintColor: theme.colors.onBackground,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="List"
        component={ListSongs}
        options={{ title: "Repertorio" }}
      />
      <Stack.Screen
        name="Create"
        component={CreateSong}
        options={{ title: "Nuova canta" }}
      />
      <Stack.Screen
        name="Edit"
        component={EditSong}
        options={{ title: "Modifica canta" }}
      />
      <Stack.Screen
        name="View"
        component={ViewSong}
        options={{ title: "Visualizza canta" }}
      />
    </Stack.Navigator>
  );
};