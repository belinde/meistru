import { FC } from "react";
import { List } from "react-native-paper";
import { Song } from "../types";

export const SongRow: FC<{ song: Song }> = ({ song }) => (
  <List.Item
    theme={{ colors: { primary: "red" } }}
    title={song.title}
    description={song.artist}
    left={(props) => <List.Icon {...props} icon="music" />}
  />
);
