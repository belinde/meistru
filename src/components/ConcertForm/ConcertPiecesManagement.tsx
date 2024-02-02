import { FC, MutableRefObject, useCallback, useState } from "react";
import { Button, IconButton } from "react-native-paper";
import { createIdentifier } from "../../functions";
import { Concert, ConcertPiece, PieceMap } from "../../types";
import { ConcertPiecesList } from "../ConcertPiecesList";
import { ConcertPieceForm } from "./ConcertPieceForm";

const findNextOrder = (pieces: PieceMap): number => {
  const existentOrders = Object.values(pieces).map((p) => p.order);
  return existentOrders.length > 0 ? 1 + Math.max(...existentOrders) : 1;
};

export const ConcertPiecesManagement: FC<{
  concert: MutableRefObject<Concert>;
}> = (props) => {
  const [pieces, setPieces] = useState(() => props.concert.current.pieces);
  const [editing, setEditing] = useState<ConcertPiece>();

  const addNewPiece = useCallback(() => {
    setEditing({
      id: createIdentifier(),
      song: "",
      order: findNextOrder(pieces),
      played: false,
    });
  }, [pieces]);

  const savePiece = useCallback(
    (changed: ConcertPiece) => {
      if (!editing) return;
      const newPieces = { ...pieces };
      if (changed.id !== editing.id) {
        delete newPieces[editing.id];
      }
      newPieces[changed.id] = changed;
      props.concert.current.pieces = newPieces;
      setPieces(newPieces);
      setEditing(undefined);
    },
    [editing, pieces, props.concert]
  );

  const removePiece = useCallback(() => {
    if (editing) {
      const newPieces = { ...pieces };
      delete newPieces[editing.id];
      Object.values(newPieces).forEach((p, i) => {
        if (p.order > editing.order) p.order -= 1;
      });
      props.concert.current.pieces = newPieces;
      setPieces(newPieces);
      setEditing(undefined);
    }
  }, [editing, pieces, props.concert]);

  const movePiece = useCallback(
    (piece: ConcertPiece, direction: "up" | "down") => {
      const newPieces = { ...pieces };
      const orderedPieces = Object.values(pieces).sort(
        (a, b) => a.order - b.order
      );
      const index = orderedPieces.findIndex((p) => p.id === piece.id);
      if (direction === "up" && index > 0) {
        const previous = orderedPieces[index - 1];
        const temp = previous.order;
        previous.order = piece.order;
        piece.order = temp;
      } else if (direction === "down" && index < orderedPieces.length - 1) {
        const next = orderedPieces[index + 1];
        const temp = next.order;
        next.order = piece.order;
        piece.order = temp;
      }
      orderedPieces.forEach((p) => (newPieces[p.id] = p));
      props.concert.current.pieces = newPieces;
      setPieces(newPieces);
    },
    [pieces, props.concert]
  );

  return (
    <>
      <ConcertPiecesList
        pieces={pieces}
        renderAction={(piece) => (
          <>
            <IconButton
              icon="arrow-up"
              disabled={piece.order === 1}
              onPress={() => movePiece(piece, "up")}
            />
            <IconButton
              icon="arrow-down"
              disabled={piece.order === Object.keys(pieces).length}
              onPress={() => movePiece(piece, "down")}
            />
            <IconButton icon="pencil" onPress={() => setEditing(piece)} />
          </>
        )}
      />
      <Button onPress={addNewPiece} mode="outlined" icon="plus">
        Aggiungi brano
      </Button>

      {editing && (
        <ConcertPieceForm
          dismiss={() => setEditing(undefined)}
          piece={editing}
          save={savePiece}
          remove={removePiece}
        />
      )}
    </>
  );
};
