import { DarkTheme } from "@react-navigation/native";
import { MD3DarkTheme } from "react-native-paper";

export const THEME = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
    primary: "#7eaa57",
    onPrimary: "#1a3700",
    primaryContainer: "#285000",
    onPrimaryContainer: "#a1d573",
    secondary: "#becbae",
    onSecondary: "#29341f",
    secondaryContainer: "#3f4a34",
    onSecondaryContainer: "#dae7c9",
    tertiary: "#a0cfcd",
    onTertiary: "#003736",
    tertiaryContainer: "#1e4e4d",
    onTertiaryContainer: "#bbece9",
    error: "#ffb4ab",
    onError: "#690005",
    errorContainer: "#93000a",
    onErrorContainer: "#ffb4ab",
    background: "#1a1c18",
    onBackground: "#e3e3dc",
    surface: "#1a1c18",
    onSurface: "#e3e3dc",
    surfaceVariant: "#44483e",
    onSurfaceVariant: "#c4c8ba",
    outline: "#8e9286",
    outlineVariant: "#44483e",
    shadow: "#000000",
    scrim: "#000000",
    inverseSurface: "#e3e3dc",
    inverseOnSurface: "#2f312c",
    inversePrimary: "#386b01",
    elevation: {
      level0: "transparent",
      level1: "#21251c",
      level2: "#242b1f",
      level3: "#283121",
      level4: "#2a3222",
      level5: "#2c3623",
    },
    surfaceDisabled: "rgba(227, 227, 220, 0.12)",
    onSurfaceDisabled: "rgba(227, 227, 220, 0.38)",
    backdrop: "rgba(45, 50, 40, 0.4)",
  },
};