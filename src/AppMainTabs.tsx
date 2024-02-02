import { FC, useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { useDataContext } from "./hooks/useDataContext";
import { ConcertStack } from "./pages/Concert/ConcertStack";
import { ConcertMode } from "./pages/ConcertMode/ConcertMode";
import { LibraryStack } from "./pages/Library/LibraryStack";
import { SettingsStack } from "./pages/Settings/SettingsStack";
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
    <ConcertMode concert={concertMode} />
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
        component={SettingsStack}
        options={{
          tabBarIcon: "cog",
          title: "Impostazioni",
        }}
      />
    </Tab.Navigator>
  );
};
