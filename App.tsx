import { NavigationContainer } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { FC, useEffect, useMemo, useState } from "react";
import {
  BottomNavigation,
  MD3DarkTheme,
  PaperProvider,
  useTheme,
} from "react-native-paper";
import { BaseRoute } from "react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Library } from "./src/pages/Library";

const ROUTES: BaseRoute[] = [
  {
    key: "Library",
    title: "Libreria",
    focusedIcon: "folder-music",
    unfocusedIcon: "folder-music-outline",
  },
  {
    key: "Concert",
    title: "Concerto",
    focusedIcon: "account-music",
    unfocusedIcon: "account-music-outline",
  },
];

const ThemedNavigationContainer: FC = () => {
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const routes = useMemo(() => ROUTES, []);

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(theme.colors.elevation.level2);
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("overlay-swipe");
  }, [theme]);

  const renderScene = BottomNavigation.SceneMap({
    Library,
    Concert: Library,
  });
  return (
    <NavigationContainer>
      <BottomNavigation
        renderScene={renderScene}
        onIndexChange={setIndex}
        navigationState={{
          index,
          routes,
        }}
      />
      <StatusBar backgroundColor={theme.colors.elevation.level2} />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <PaperProvider
      theme={{
        ...MD3DarkTheme,
        colors: {
          primary: "rgb(156, 215, 105)",
          onPrimary: "rgb(26, 55, 0)",
          primaryContainer: "rgb(40, 80, 0)",
          onPrimaryContainer: "rgb(183, 244, 129)",
          secondary: "rgb(190, 203, 174)",
          onSecondary: "rgb(41, 52, 31)",
          secondaryContainer: "rgb(63, 74, 52)",
          onSecondaryContainer: "rgb(218, 231, 201)",
          tertiary: "rgb(160, 207, 205)",
          onTertiary: "rgb(0, 55, 54)",
          tertiaryContainer: "rgb(30, 78, 77)",
          onTertiaryContainer: "rgb(187, 236, 233)",
          error: "rgb(255, 180, 171)",
          onError: "rgb(105, 0, 5)",
          errorContainer: "rgb(147, 0, 10)",
          onErrorContainer: "rgb(255, 180, 171)",
          background: "rgb(26, 28, 24)",
          onBackground: "rgb(227, 227, 220)",
          surface: "rgb(26, 28, 24)",
          onSurface: "rgb(227, 227, 220)",
          surfaceVariant: "rgb(68, 72, 62)",
          onSurfaceVariant: "rgb(196, 200, 186)",
          outline: "rgb(142, 146, 134)",
          outlineVariant: "rgb(68, 72, 62)",
          shadow: "rgb(0, 0, 0)",
          scrim: "rgb(0, 0, 0)",
          inverseSurface: "rgb(227, 227, 220)",
          inverseOnSurface: "rgb(47, 49, 44)",
          inversePrimary: "rgb(56, 107, 1)",
          elevation: {
            level0: "transparent",
            level1: "rgb(33, 37, 28)",
            level2: "rgb(36, 43, 31)",
            level3: "rgb(40, 49, 33)",
            level4: "rgb(42, 50, 34)",
            level5: "rgb(44, 54, 35)",
          },
          surfaceDisabled: "rgba(227, 227, 220, 0.12)",
          onSurfaceDisabled: "rgba(227, 227, 220, 0.38)",
          backdrop: "rgba(45, 50, 40, 0.4)",
        },
      }}
    >
      <SafeAreaProvider>
        <ThemedNavigationContainer />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
