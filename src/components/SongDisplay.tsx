import { FC } from "react";
import { Card, Text } from "react-native-paper";
import { Song } from "../types";

export const SongDisplay: FC<{ song: Song }> = (props) => {
  return (
    <Card>
      <Card.Title title={props.song.title} subtitle={props.song.artist} />
      <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
      <Card.Content>
        {props.song.initialNotes.map((note, index) => (
          <Text key={index}>{JSON.stringify(note)}</Text>
        ))}
      </Card.Content>
    </Card>
  );
};
