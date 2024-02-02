import { FC, ReactNode, useMemo } from "react";
import { StyleSheet } from "react-native";
import { List, Text } from "react-native-paper";
import { useDataContext } from "../hooks/useDataContext";
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

type SongMap = Record<string, { title: string; artist: string }>;

export const ConcertPiecesList: FC<{
  pieces: Record<string, ConcertPiece>;
  renderAction?: (note: ConcertPiece, key: string) => ReactNode;
}> = (props) => {
  console.debug("Rendering ConcertPiecesList");
  const data = useDataContext();
  const songs = useMemo(
    () =>
      data.songs.list().reduce<SongMap>((acc, song) => {
        acc[song.id] = {
          title: song.title,
          artist: song.artist,
        };
        return acc;
      }, {}),
    [data.songs]
  );
  return (
    <>
      {Object.entries(props.pieces)
        .sort(([_k1, a], [_k2, b]) => a.order - b.order)
        .map(([k, piece]) => (
          <List.Item
            key={k}
            title={songs[piece.song]?.title}
            description={songs[piece.song]?.artist}
            left={() => <Text variant="headlineSmall">{1 + piece.order}</Text>}
            right={() => props.renderAction && props.renderAction(piece, k)}
          />
        ))}
    </>
  );
};
