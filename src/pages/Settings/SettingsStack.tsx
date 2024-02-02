import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import { useNativeStackNavigatorOptions } from "../../hooks/useNativeStackNavigatorOptions";
import { Basic } from "./Basic";

export type SettingsStackParams = {
  Basic: undefined;
};
const Stack = createNativeStackNavigator<SettingsStackParams>();

export const SettingsStack: FC = () => {
  const screenOptions = useNativeStackNavigatorOptions();

  return (
    <Stack.Navigator id="SettingsStack" screenOptions={screenOptions}>
      <Stack.Screen
        name="Basic"
        component={Basic}
        options={{ title: "Impostazioni di base" }}
      />
    </Stack.Navigator>
  );
};
