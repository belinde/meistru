import { FC, ReactNode } from "react";
import { View } from "react-native";

export const Page: FC<{ children: ReactNode; additionalTopSpace?: number }> = (
  props
) => {
  // const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        rowGap: 16,
        flexDirection: "column",
        // paddingTop: 10 + insets.top,
        // paddingBottom: 10 + insets.bottom,
        // paddingLeft: 10 + insets.left,
        // paddingRight: 10 + insets.right,

        paddingTop: 10 + (props.additionalTopSpace ?? 0),
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      {props.children}
    </View>
  );
};
