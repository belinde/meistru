import { useNavigation } from "@react-navigation/native";
import { Button, Text } from "react-native-paper";
import { Page } from "../components/Page";
import { Pentagram } from "../components/Pentagram";
import { NoteName, Section } from "../types";

type Short = [Section, number, NoteName];
const convert = (...notes: Short[]) =>
  notes.map(([section, octave, note]) => ({
    section,
    subsection: 0,
    note: {
      note,
      octave,
    },
  }));

export const Concert = () => {
  const aaa = useNavigation();
  return (
    <Page>
      <Text>Concert</Text>
      <Text>TO DO!</Text>
      <Pentagram
        notes={convert(
          ["tenore", 5, "C"],
          ["tenore", 4, "C"],
          // ["tenore", 2, "A"]
          ["basso", 3, "G"],
          // ["basso", 3, "C"]
          // ["basso", 2, "C"],
          ["basso", 1, "C"]
        )}
      />
      <Button onPress={() => aaa.navigate("Library" as unknown as never)}>
        Libreria
      </Button>
    </Page>
  );
};
