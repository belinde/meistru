import { FC } from "react";
import { FlatList } from "react-native";
import { Song } from "../types";
import { SongRow } from "./SongRow";

export const SongList: FC<{ songs: Song[] }> = (props) => {
  return (
    <FlatList
      data={props.songs}
      renderItem={(row) => <SongRow key={row.item.id} song={row.item} />}
      keyExtractor={(song) => song.id}
    />
  );
};
