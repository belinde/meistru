import { FC } from "react";
import { List } from "react-native-paper";
import { Song } from "../../types";

export const SongList: FC<{ songs: Song[] }> = (props) => {
  return (
    <>
      {props.songs.map((song) => (
        <List.Item
          key={song.id}
          title={song.title}
          description={song.artist}
          left={(props) => <List.Icon {...props} icon="music" />}
        />
      ))}
    </>
  );
};
