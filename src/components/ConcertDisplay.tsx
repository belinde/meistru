import { FC } from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { Concert } from "../types";
import { ConcertPiecesList } from "./ConcertPiecesList";

export const ConcertDisplay: FC<{ concert: Concert }> = ({ concert }) => {
  return (
    <ScrollView>
      <Text variant="titleLarge">{concert.title}</Text>
      <ConcertPiecesList
        pieces={concert.pieces}
        renderAction={(initial) => null}
      />
      <Text>{concert.description}</Text>
    </ScrollView>
  );
};
