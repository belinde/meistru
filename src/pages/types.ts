import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MaterialBottomTabScreenProps } from "react-native-paper/react-navigation";
import { LibraryStackParams } from "./Library/types";

export type RootStackRoutes = {
  Library: NavigatorScreenParams<LibraryStackParams>;
  Concert: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackRoutes> =
  MaterialBottomTabScreenProps<RootStackRoutes, T>;

export type LibraryTabScreenProps<T extends keyof LibraryStackParams> =
  CompositeScreenProps<
    NativeStackScreenProps<LibraryStackParams, T, "LibraryStack">,
    RootStackScreenProps<"Library">
  >;

  declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackRoutes {}
    }
  }