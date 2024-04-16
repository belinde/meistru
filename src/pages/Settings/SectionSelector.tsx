import isEqual from "lodash/isEqual";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Checkbox, Text } from "react-native-paper";
import { StandardSection } from "../../Settings";
import { Section } from "../../types";

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
    alignItems: "center",
  },
  sectionLabel: {
    textTransform: "capitalize",
  },
});

const SectionPart: FC<{
  section: Section;
  subsection: number;
  status: "checked" | "unchecked";
  toggle: () => void;
}> = (props) => {
  const label = props.subsection ? props.subsection.toString() : "tutti";
  return (
    <View style={style.subsections}>
      <Checkbox.Item
        status={props.status}
        onPress={() => props.toggle()}
        label={label}
        accessibilityLabel={label}
      />
    </View>
  );
};

export const SectionSelector: FC<{
  section: Section;
  parts: StandardSection[];
  setParts: (parts: StandardSection[]) => void;
}> = (props) => {
  return (
    <View>
      <Text style={style.sectionLabel}>{props.section}</Text>
      <View style={style.sections}>
        {[0, 1, 2, 3, 4].map((sub) => (
          <SectionPart
            key={sub}
            section={props.section}
            subsection={sub}
            status={
              props.parts.some((p) =>
                isEqual(p, {
                  section: props.section,
                  subsection: sub,
                })
              )
                ? "checked"
                : "unchecked"
            }
            toggle={() => {
              const newParts = props.parts.filter(
                (p) =>
                  !isEqual(p, {
                    section: props.section,
                    subsection: sub,
                  })
              );
              if (newParts.length === props.parts.length) {
                newParts.push({
                  section: props.section,
                  subsection: sub,
                });
              }
              props.setParts(newParts);
            }}
          />
        ))}
      </View>
    </View>
  );
};
