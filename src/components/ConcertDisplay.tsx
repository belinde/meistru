import { FC } from "react";
import { ScrollView } from "react-native";
import { Divider, Text } from "react-native-paper";
import { Concert } from "../types";
import { ConcertPiecesList } from "./ConcertPiecesList";

export const ConcertDisplay: FC<{ concert: Concert }> = ({ concert }) => {
  return (
    <ScrollView>
      <Text variant="titleLarge">{concert.title}</Text>
      <Text>{concert.description}</Text>
      <Divider bold style={{ marginTop: 10, marginBottom: 10 }} />
      <ConcertPiecesList pieces={concert.pieces} />
    </ScrollView>
  );
};
