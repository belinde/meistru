import { FC } from "react";
import { FlatList } from "react-native";
import { List } from "react-native-paper";
import { Song } from "../types";

export const SongList: FC<{ songs: Song[]; onPress: (song: Song) => void }> = (
  props
) => {
  return (
    <FlatList
      data={props.songs}
      renderItem={(row) => (
        <List.Item
          title={row.item.title}
          description={row.item.artist}
          left={() => <List.Icon icon="music" />}
          onPress={() => props.onPress(row.item)}
        />
      )}
      keyExtractor={(song) => song.id}
    />
  );
};
