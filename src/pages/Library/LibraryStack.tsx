import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import { useNativeStackNavigatorOptions } from "../../hooks/useNativeStackNavigatorOptions";
import { CreateSong } from "./CreateSong";
import { EditSong } from "./EditSong";
import { ListSongs } from "./ListSongs";
import { ViewSong, ViewSongMenu } from "./ViewSong";

export type LibraryStackParams = {
  List: undefined;
  Create: undefined;
  View: {
    song: string;
  };
  Edit: {
    song: string;
  };
};

const Stack = createNativeStackNavigator<LibraryStackParams>();

export const LibraryStack: FC = () => {
  const screenOptions = useNativeStackNavigatorOptions();
  return (
    <Stack.Navigator id="LibraryStack" screenOptions={screenOptions}>
      <Stack.Screen
        name="List"
        component={ListSongs}
        options={{ title: "Repertorio" }}
      />
      <Stack.Screen
        name="Create"
        component={CreateSong}
        options={{ title: "Aggiungi" }}
      />
      <Stack.Screen
        name="Edit"
        component={EditSong}
        options={{
          title: "Modifica",
        }}
        getId={({ params }) => params.song}
      />
      <Stack.Screen
        name="View"
        component={ViewSong}
        options={{
          title: "Visualizza",
          headerRight: ViewSongMenu,
        }}
        getId={({ params }) => params.song}
      />
    </Stack.Navigator>
  );
};