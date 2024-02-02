import { FC, ReactNode, useMemo } from "react";
import { View } from "react-native";
import { List, Text } from "react-native-paper";
import { useDataContext } from "../hooks/useDataContext";
import { ConcertPiece } from "../types";

type SongMap = Record<string, { title: string; artist: string }>;

export const ConcertPiecesList: FC<{
  pieces: Record<string, ConcertPiece>;
  renderAction?: (note: ConcertPiece, key: string) => ReactNode;
}> = (props) => {
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
    <View>
      {Object.entries(props.pieces)
        .sort((a, b) => a[1].order - b[1].order)
        .map(([k, piece]) => (
          <List.Item
            key={k}
            title={songs[piece.song]?.title}
            description={songs[piece.song]?.artist}
            left={() => <Text variant="headlineSmall">{piece.order}</Text>}
            right={() => props.renderAction && props.renderAction(piece, k)}
          />
        ))}
    </View>
  );
};
