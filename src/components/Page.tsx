import { FC, ReactNode } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Page: FC<{ children: ReactNode }> = (props) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        rowGap: 16,
        flexDirection: "column",
        paddingTop: 10 + insets.top,
        paddingBottom: 10 + insets.bottom,
        paddingLeft: 10 + insets.left,
        paddingRight: 10 + insets.right,
      }}
    >
      {props.children}
    </View>
  );
};
