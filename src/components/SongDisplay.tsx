import { FC } from "react";
import { FlatList } from "react-native";
import { Card } from "react-native-paper";
import { useSongList } from "../hooks/useSongList";
import { ListItemNote } from "./ListItemNote";

export const SongDisplay: FC<{ song: string }> = (props) => {
  const { getSong } = useSongList();
  const song = getSong(props.song);
  if (!song) {
    return null;
  }

  return (
    <Card>
      <Card.Title title={song.title} subtitle={song.artist} />
      <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
      <Card.Content>
        <FlatList
          data={song.initialNotes}
          renderItem={(row) => <ListItemNote note={row.item} />}
        />
      </Card.Content>
    </Card>
  );
};
