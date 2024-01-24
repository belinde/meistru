import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import { Create } from "./Create";
import { Edit } from "./Edit";
import { List } from "./List";
import { View } from "./View";
import { LibraryStackParams } from "./types";

const Stack = createNativeStackNavigator<LibraryStackParams>();

export const LibraryStack: FC = () => (
  <Stack.Navigator
    id="LibraryStack"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="List" component={List} />
    <Stack.Screen name="Create" component={Create} />
    <Stack.Screen name="Edit" component={Edit} />
    <Stack.Screen name="View" component={View} />
  </Stack.Navigator>
);
