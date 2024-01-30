import { useFocusEffect } from "@react-navigation/native";
import { FC, useCallback, useRef, useState } from "react";
import { FlatList } from "react-native";
import { List } from "react-native-paper";
import { useSongList } from "../hooks/useSongList";
import { Song } from "../types";

export const SongList: FC<{ onPress: (song: Song) => void }> = (props) => {
  const { listSongs } = useSongList();
  const [songs, setSongs] = useState<Song[]>();
  const [refreshing, setRefreshing] = useState(true);
  const lastUpdate = useRef(0);

  const refresh = useCallback(() => {
    setRefreshing(true);
    listSongs()
      .then(setSongs)
      .finally(() => {
        setRefreshing(false);
        lastUpdate.current = Date.now();
      });
  }, [listSongs]);

  useFocusEffect(() => {
    if (Date.now() - lastUpdate.current > 500) {
      refresh();
    }
  });

  console.debug("Rendering SongList");

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
