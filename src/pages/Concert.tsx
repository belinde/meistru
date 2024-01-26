import { useNavigation } from "@react-navigation/native";
import { Button, Text } from "react-native-paper";
import { Page } from "../components/Page";
import { Pentagram } from "../components/Pentagram";
import { InitialNote, NoteName, Section } from "../types";

type Short = [Section, number, NoteName];
const convert = (...notes: Short[]) =>
  notes.map(
    ([section, octave, note]): InitialNote => ({
      section,
      subsection: 1,
      note: {
        note,
        octave,
        alteration: section === "tenore" ? "#" : "b",
      },
    })
  );

export const Concert = () => {
  const aaa = useNavigation();
  return (
    <Page>
      <Text>Concert</Text>
      <Text>TO DO!</Text>
      <Pentagram
        notes={convert(
          ["tenore", 4, "C"],

          ["basso", 2, "A"]
          // ["basso", 3, "C"],
          // ["basso", 2, "C"],
          // ["basso", 1, "C"]
        )}
      />
      <Button onPress={() => aaa.navigate("Library" as unknown as never)}>
        Libreria
      </Button>
    </Page>
  );
};
