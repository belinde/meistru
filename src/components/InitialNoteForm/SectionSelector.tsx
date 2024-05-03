import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { RadioButton, ToggleButton } from "react-native-paper";
import { THEME } from "../../theme";
import { Section } from "../../types";

const style = StyleSheet.create({
  sections: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 20,
  },
  sectionColumn: {
    flexGrow: 1,
  },
  compact: {
    maxHeight: 48,
  },
  subsections: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export const SectionSelector: FC<{
  section: Section;
  subsection: number;
  setSection: (s: Section) => void;
  setSubsection: (s: number) => void;
}> = (props) => {
  return (
    <View>
      <RadioButton.Group
        value={props.section}
        onValueChange={(s) => props.setSection(s as Section)}
      >
        <View style={style.sections}>
          <View style={style.sectionColumn}>
            <RadioButton.Item
              value="tenori"
              label="Tenori"
              accessibilityLabel="Tenori"
              style={style.compact}
            />
            <RadioButton.Item
              value="baritoni"
              label="Baritoni"
              accessibilityLabel="Baritoni"
              style={style.compact}
            />
            <RadioButton.Item
              value="bassi"
              label="Bassi"
              accessibilityLabel="Bassi"
              style={style.compact}
            />
          </View>
          <View style={style.sectionColumn}>
            <RadioButton.Item
              value="soprani"
              label="Soprani"
              accessibilityLabel="Soprani"
              style={style.compact}
            />
            <RadioButton.Item
              value="mezzosoprani"
              label="Mezzosoprani"
              accessibilityLabel="Mezzosoprani"
              style={style.compact}
            />
            <RadioButton.Item
              value="contralti"
              label="Contralti"
              accessibilityLabel="Contralti"
              style={style.compact}
            />
          </View>
        </View>
      </RadioButton.Group>

      <ToggleButton.Group
        value={props.subsection.toString()}
        onValueChange={(s) => props.setSubsection(parseInt(s))}
      >
        <View style={style.subsections}>
          {[0, 1, 2, 3, 4].map((sub) => (
            <ToggleButton
              key={sub}
              value={sub.toString()}
              icon={sub ? `numeric-${sub}` : "asterisk"}
              accessibilityLabel={sub ? sub.toString() : "—"}
              style={{
                backgroundColor:
                  props.subsection === sub ? THEME.colors.primary : undefined,
              }}
            />
          ))}
        </View>
      </ToggleButton.Group>
    </View>
  );
};
