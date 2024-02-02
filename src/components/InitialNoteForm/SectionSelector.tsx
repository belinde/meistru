import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { RadioButton, Text } from "react-native-paper";
import { Section } from "../../types";

const style = StyleSheet.create({
  sections: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  sectionColumn: {
    flexGrow: 1,
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
  return (
    <View>
      <RadioButton.Group
        value={props.section}
        onValueChange={(s) => props.setSection(s as Section)}
      >
        <View style={style.sections}>
          <View style={style.sectionColumn}>
            <RadioButton.Item value="tenori" label="Tenori" />
            <RadioButton.Item value="baritoni" label="Baritoni" />
            <RadioButton.Item value="bassi" label="Bassi" />
          </View>
          <View style={style.sectionColumn}>
            <RadioButton.Item value="soprani" label="Soprani" />
            <RadioButton.Item value="mezzosoprani" label="Mezzosoprani" />
            <RadioButton.Item value="contralti" label="Contralti" />
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
