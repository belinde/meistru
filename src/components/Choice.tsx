import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { RadioButton } from "react-native-paper";

const style = StyleSheet.create({
  choice: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  choiceLabel: {
    textTransform: "capitalize",
  },
});

type Comp<T> = FC<{
  option: T;
  currentValue: T;
  label: string;
}>;

export const Choice: Comp<any> = (props) => {
  return (
    <View style={style.choice}>
      <RadioButton.Item
        label={props.label}
        value={props.option}
        // status={props.currentValue === props.option ? "checked" : "unchecked"}
      />
      {/* <Text style={style.choiceLabel}>{props.label}</Text> */}
    </View>
  );
};
