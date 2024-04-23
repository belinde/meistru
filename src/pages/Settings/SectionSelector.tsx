import isEqual from "lodash/isEqual";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Text, ToggleButton } from "react-native-paper";
import { StandardSection } from "../../Settings";
import { THEME } from "../../theme";
import { Section } from "../../types";

const style = StyleSheet.create({
  block: {
    display: "flex",
    flexDirection: "column",
  },
  sectionLabel: {
    textTransform: "capitalize",
  },
  subsections: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 10,
  },
});

const SectionPart: FC<{
  section: Section;
  subsection: number;
  status: "checked" | "unchecked";
  toggle: () => void;
}> = (props) => {
  const description = props.subsection
    ? `${props.section} ${props.subsection}`
    : `tutti i ${props.section}`;

  return (
    <ToggleButton
      status={props.status}
      onPress={() => props.toggle()}
      icon={props.subsection ? `numeric-${props.subsection}` : "asterisk"}
      accessibilityLabel={description}
      aria-label={description}
      style={{
        backgroundColor:
          props.status === "checked" ? THEME.colors.primary : undefined,
      }}
    />
  );
};

export const SectionSelector: FC<{
  section: Section;
  parts: StandardSection[];
  setParts: (parts: StandardSection[]) => void;
}> = (props) => {
  return (
    <View style={style.block}>
      <Text style={style.sectionLabel}>{props.section}</Text>
      <View style={style.subsections}>
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
              let newParts = props.parts.filter(
                (p) =>
                  !isEqual(p, {
                    section: props.section,
                    subsection: sub,
                  })
              );
              if (newParts.length === props.parts.length) {
                if (sub === 0) {
                  newParts = props.parts.filter(
                    (p) => p.section !== props.section
                  );
                } else {
                  newParts = props.parts.filter(
                    (p) => p.section !== props.section || p.subsection !== 0
                  );
                }
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
