import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

export const useEffectOnFocus = (callback: () => void) => {
  const navigation = useNavigation();
  useEffect(
    () => navigation.addListener("focus", callback),
    [navigation, callback]
  );
};
