import { FC, ReactNode } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Page: FC<{
  children: ReactNode;
  useSafeArea?: boolean;
  accessibilityLabel: string;
}> = (props) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      accessible
      accessibilityLabel={props.accessibilityLabel}
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
