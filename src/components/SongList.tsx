import { FC, useCallback, useState } from "react";
import { FlatList } from "react-native";
import { List } from "react-native-paper";
import { useDataContext } from "../hooks/useDataContext";
import { useEffectOnFocus } from "../hooks/useEffectOnFocus";
import { Song } from "../types";

export const SongList: FC<{ onPress: (song: Song) => void }> = (props) => {
  const data = useDataContext();
  const [songs, setSongs] = useState<Song[]>();
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(() => {
    setRefreshing(true);
    data.songs
      .load()
      .then(setSongs)
      .finally(() => {
        setRefreshing(false);
      });
  }, [data.songs]);

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
