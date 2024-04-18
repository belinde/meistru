import { NavigationContainer } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { AppMainTabs } from "./src/AppMainTabs";
import { DataProvider } from "./src/hooks/useDataContext";
import { THEME } from "./src/theme";

export default function App() {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(THEME.colors.elevation.level2);
    NavigationBar.setButtonStyleAsync("dark");
  }, []);

  return (
    <PaperProvider theme={THEME}>
      <StatusBar
        backgroundColor={THEME.colors.elevation.level2}
        // eslint-disable-next-line react/style-prop-object
        style="auto"
      />
      <DataProvider>
        <NavigationContainer theme={THEME}>
          <AppMainTabs />
        </NavigationContainer>
      </DataProvider>
    </PaperProvider>
  );
}
