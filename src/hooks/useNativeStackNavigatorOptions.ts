import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";

export const useNativeStackNavigatorOptions =
  (): NativeStackNavigationOptions => {
    const theme = useTheme();
    return {
      headerStyle: {
        backgroundColor: theme.colors.elevation.level2,
      },
      headerTintColor: theme.colors.onBackground,
      headerTitleStyle: {
        fontWeight: "bold",
      },
    };
  };
