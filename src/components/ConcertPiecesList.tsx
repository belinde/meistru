import { FC, ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { ConcertPiece } from "../types";

const style = StyleSheet.create({
  card: {
    marginTop: 10,
    marginBottom: 10,
  },
  pieceRow: {
    paddingBottom: 5,
    paddingLeft: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pieceSong: {
    flexGrow: 1,
  },
});

export const ConcertPiecesList: FC<{
  pieces: Record<string, ConcertPiece>;
  renderAction: (note: ConcertPiece, key: string) => ReactNode;
  children?: ReactNode;
}> = (props) => {
  console.debug("Rendering ConcertPiecesList");
  return (
    <Card style={style.card}>
      <Card.Title title="Brani" />
      <Card.Content>
        {Object.entries(props.pieces)
          .sort(([_k1, a], [_k2, b]) => a.order - b.order)
          .map(([k, piece]) => (
            <View key={k} style={style.pieceRow}>
              <Text style={style.pieceSong}>
                {piece.order}: {piece.title}
              </Text>
              {props.renderAction(piece, k)}
            </View>
          ))}
      </Card.Content>
      {props.children ? <Card.Actions>{props.children}</Card.Actions> : null}
    </Card>
  );
};
