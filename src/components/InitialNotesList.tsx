import { FC, ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { InitialNote } from "../types";
import { Pentagram } from "./Pentagram";
import { TextualNote } from "./TextualNote";
import { TextualSection } from "./TextualSection";

const style = StyleSheet.create({
  card: {
    marginTop: 10,
    marginBottom: 10,
  },
  display: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  initialNotes: {
    flexGrow: 1,
  },
  noteRow: {
    paddingBottom: 5,
    paddingLeft: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export const InitialNotesList: FC<{
  initialNotes: InitialNote[];
  renderAction: (note: InitialNote, idx: number) => ReactNode;
  children?: ReactNode;
}> = (props) => {
  return (
    <Card style={style.card}>
      <Card.Title title="Note iniziali" />
      <Card.Content style={style.display}>
        <Pentagram notes={props.initialNotes} />
        <View style={style.initialNotes}>
          {props.initialNotes.map((initNote, i) => (
            <View key={i} style={style.noteRow}>
              <View>
                <TextualSection
                  section={initNote.section}
                  subsection={initNote.subsection}
                  variant="labelLarge"
                />
                <TextualNote note={initNote.note} />
              </View>
              {props.renderAction(initNote, i)}
            </View>
          ))}
        </View>
      </Card.Content>
      {props.children ? <Card.Actions>{props.children}</Card.Actions> : null}
    </Card>
  );
};
