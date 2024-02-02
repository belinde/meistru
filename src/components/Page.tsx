import { FC, ReactNode } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Page: FC<{ children: ReactNode; useSafeArea?: boolean }> = (
  props
) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        rowGap: 16,
        flexDirection: "column",
        paddingTop: 10 + (props.useSafeArea ? insets.top : 0),
        paddingBottom: 10 + (props.useSafeArea ? insets.bottom : 0),
        paddingLeft: 10 + (props.useSafeArea ? insets.left : 0),
        paddingRight: 10 + (props.useSafeArea ? insets.right : 0),
      }}
    >
      {props.children}
    </View>
  );
};
