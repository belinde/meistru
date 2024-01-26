import { FC } from "react";
import { Text } from "react-native-paper";
import { Section } from "../types";

export const TextualSection: FC<
  { section: Section; subsection: number } & Pick<
    Parameters<typeof Text>[0],
    "variant" | "style"
  >
> = (props) => {
  return (
    <Text
      variant={props.variant}
      style={props.style || { textTransform: "capitalize" }}
    >{`${props.section.split("-").join(" ")}${
      props.subsection ? ` ${props.subsection}` : ""
    }`}</Text>
  );
};
