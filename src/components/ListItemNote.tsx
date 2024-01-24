import { FC, ReactNode } from "react";
import { List } from "react-native-paper";
import { InitialNote } from "../types";

export const ListItemNote: FC<{
  note: InitialNote;
  action?: () => ReactNode;
}> = (props) => {
  return (
    <List.Item
      left={() => <List.Icon icon="music-box-outline" />}
      right={props.action}
      title={`${props.note.section.split("-").join(" ")}${
        props.note.subsection ? ` ${props.note.subsection}` : ""
      }`}
      titleStyle={{ textTransform: "capitalize" }}
      description={`${props.note.note.note}${
        props.note.note.alteration || ""
      } - ottava ${props.note.note.octave}`}
    />
  );
};
