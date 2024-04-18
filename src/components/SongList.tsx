import { FC, useCallback, useState } from "react";
import { FlatList } from "react-native";
import { List } from "react-native-paper";
import { Song } from "../types";
import { EmptySearchableListElement } from "./EmptySearchableListElement";

export const SongList: FC<{
  songs: Song[];
  onPress?: (song: Song) => void;
  onRefresh?: () => Promise<void>;
}> = (props) => {
  const [refreshing, setRefreshing] = useState(false);

  const refresher = useCallback(() => {
    if (!props.onRefresh) return;
    setRefreshing(true);
    props.onRefresh!().finally(() => setRefreshing(false));
  }, [props.onRefresh]);

  return (
    <FlatList
      data={props.songs}
      refreshing={refreshing}
      onRefresh={props.onRefresh ? refresher : undefined}
      renderItem={(row) => (
        <List.Item
          title={row.item.title}
          titleStyle={{ fontWeight: "bold" }}
          description={row.item.artist}
          left={() => <List.Icon icon="music" />}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={props.onPress ? () => props.onPress!(row.item) : undefined}
          titleNumberOfLines={2}
          descriptionNumberOfLines={1}
        />
      )}
      keyExtractor={(song) => song.id}
      ListEmptyComponent={EmptySearchableListElement}
    />
  );
};
