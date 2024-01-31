import { FC, useCallback, useState } from "react";
import { FlatList } from "react-native";
import { List } from "react-native-paper";
import { useEffectOnFocus } from "../hooks/useEffectOnFocus";
import { useSongList } from "../hooks/useSongList";
import { Song } from "../types";

export const SongList: FC<{ onPress: (song: Song) => void }> = (props) => {
  const { listSongs } = useSongList();
  const [songs, setSongs] = useState<Song[]>();
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(() => {
    setRefreshing(true);
    listSongs()
      .then(setSongs)
      .finally(() => {
        setRefreshing(false);
      });
  }, [listSongs]);

  useEffectOnFocus(refresh);

  return (
    <FlatList
      data={songs}
      refreshing={refreshing}
      onRefresh={refresh}
      renderItem={(row) => (
        <List.Item
          title={row.item.title}
          description={row.item.artist}
          left={() => <List.Icon icon="music" />}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => props.onPress(row.item)}
          titleNumberOfLines={2}
          descriptionNumberOfLines={1}
        />
      )}
      keyExtractor={(song) => song.id}
    />
  );
};
