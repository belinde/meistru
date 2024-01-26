import { FC, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { RadioButton, Text } from "react-native-paper";
import { Section } from "../../types";
import { Choice } from "../Choice";

const style = StyleSheet.create({
  sections: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  subsections: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
  },
  choice: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  choiceLabel: {
    textTransform: "capitalize",
  },
});

export const SectionSelector: FC<{
  section: Section;
  subsection: number;
  setSection: (s: Section) => void;
  setSubsection: (s: number) => void;
}> = (props) => {
  const choice = useCallback(
    (sect: Section) => (
      <Choice option={sect} currentValue={props.section} label={sect} />
    ),
    [props.section, props.setSection]
  );
  return (
    <View>
      <RadioButton.Group
        value={props.section}
        onValueChange={(s) => props.setSection(s as Section)}
      >
        <View style={style.sections}>
          <View>
            {choice("tenori")}
            {choice("baritoni")}
            {choice("bassi")}
          </View>
          <View>
            {choice("soprani")}
            {choice("mezzosoprani")}
            {choice("contralti")}
          </View>
        </View>
      </RadioButton.Group>

      <RadioButton.Group
        value={props.subsection.toString()}
        onValueChange={(s) => props.setSubsection(parseInt(s))}
      >
        <View style={style.subsections}>
          {[0, 1, 2, 3, 4].map((sub) => (
            <View key={sub} style={style.choice}>
              <RadioButton value={sub.toString()} />
              <Text style={style.choiceLabel}>{sub || "—"}</Text>
            </View>
          ))}
        </View>
      </RadioButton.Group>
    </View>
  );
};
