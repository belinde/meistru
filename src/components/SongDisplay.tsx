import { FC } from "react";
import { FlatList } from "react-native";
import { Card, List } from "react-native-paper";
import { useSongList } from "../hooks/useSongList";

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
          renderItem={(row) => (
            <List.Item
              title={`${row.item.section}${
                row.item.subsection ? ` ${row.item.subsection}` : ""
              }`}
              description={`${row.item.note.note}${
                row.item.note.alteration || ""
              } - ottava ${row.item.note.octave}`}
            />
          )}
        />
      </Card.Content>
    </Card>
  );
};
