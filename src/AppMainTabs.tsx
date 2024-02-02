import { FC, useEffect, useState } from "react";
import { Button, Text, useTheme } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { Page } from "./components/Page";
import { useDataContext } from "./hooks/useDataContext";
import { ConcertStack } from "./pages/Concert/ConcertStack";
import { LibraryStack } from "./pages/Library/LibraryStack";
import { Settings } from "./pages/Settings/Settings";
import { RootStackRoutes } from "./pages/types";

const Tab = createMaterialBottomTabNavigator<RootStackRoutes>();

export const AppMainTabs: FC = () => {
  const theme = useTheme();
  const data = useDataContext();
  const [concertMode, setConcertMode] = useState(() =>
    data.settings.getConcertMode()
  );
  useEffect(() => {
    return data.settings.subscribe(() =>
      setConcertMode(data.settings.getConcertMode())
    );
  }, [data.settings]);

  return concertMode ? (
    <Page additionalTopSpace={30}>
      <Text>Modalità concerto! ${concertMode}</Text>
      <Button onPress={() => data.settings.setConcertMode(undefined)}>
        Esci dalla modalità concerto
      </Button>
    </Page>
  ) : (
    <Tab.Navigator initialRouteName="Library" theme={theme}>
      <Tab.Screen
        name="Library"
        component={LibraryStack}
        options={{
          tabBarIcon: "folder-music",
          title: "Repertorio",
        }}
      />
      <Tab.Screen
        name="Concert"
        component={ConcertStack}
        options={{
          tabBarIcon: "account-music",
          title: "Concerti",
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: "cog",
          title: "Impostazioni",
        }}
      />
    </Tab.Navigator>
  );
};
