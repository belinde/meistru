import { FC, ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { SECTIONS } from "../constants";
import { InitialNote, InitialNoteMap, Part } from "../types";
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
  initialNotes: InitialNoteMap;
  renderAction: (note: InitialNote, key: Part) => ReactNode;
  children?: ReactNode;
}> = (props) => {
  return (
    <View style={style.card}>
      <View style={style.display}>
        <Pentagram notes={props.initialNotes} />
        <View style={style.initialNotes}>
          {Object.entries(props.initialNotes)
            .sort(([_k1, a], [_k2, b]) => {
              if (a.section === b.section) {
                return a.subsection - b.subsection;
              }
              return SECTIONS.indexOf(a.section) - SECTIONS.indexOf(b.section);
            })
            .map(([k, initNote]) => (
              <View key={k} style={style.noteRow}>
                <View>
                  <TextualSection
                    section={initNote.section}
                    subsection={initNote.subsection}
                    variant="labelLarge"
                  />
                  <TextualNote note={initNote.note} />
                </View>
                {props.renderAction(initNote, k as Part)}
              </View>
            ))}
        </View>
      </View>
      {props.children ? <View>{props.children}</View> : null}
    </View>
  );
};
