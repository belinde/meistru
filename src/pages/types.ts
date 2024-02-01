import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MaterialBottomTabScreenProps } from "react-native-paper/react-navigation";
import { ConcertStackParams } from "./Concert/ConcertStack";
import { LibraryStackParams } from "./Library/LibraryStack";

export type RootStackRoutes = {
  Settings: undefined;
  Library: NavigatorScreenParams<LibraryStackParams>;
  Concert: NavigatorScreenParams<ConcertStackParams>;
};

export type RootStackScreenProps<T extends keyof RootStackRoutes> =
  MaterialBottomTabScreenProps<RootStackRoutes, T>;

export type LibraryTabScreenProps<T extends keyof LibraryStackParams> =
  CompositeScreenProps<
    NativeStackScreenProps<LibraryStackParams, T, "LibraryStack">,
    RootStackScreenProps<"Library">
  >;

export type ConcertTabScreenProps<T extends keyof ConcertStackParams> =
  CompositeScreenProps<
    NativeStackScreenProps<ConcertStackParams, T, "ConcertStack">,
    RootStackScreenProps<"Concert">
  >;

  declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackRoutes {}
    }
  }