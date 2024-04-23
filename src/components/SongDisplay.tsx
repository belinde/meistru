import { FC } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Song } from "../types";
import { InitialNotesList } from "./InitialNotesList";
import { PlayNote } from "./PlayNote";
import { ScorePhoto } from "./ScorePhoto";

const style = StyleSheet.create({
  titleBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    flexBasis: 2,
    flexGrow: 2,
  },
  artist: {
    flexBasis: 1,
    flexGrow: 1,
    textAlign: "right",
    fontStyle: "italic",
  },
});

export const SongDisplay: FC<{ song: Song }> = ({ song }) => {
  return (
    <ScrollView>
      <View style={style.titleBar}>
        <Text variant="titleLarge" style={style.title}>
          {song.title}
        </Text>
        <Text variant="titleSmall" style={style.artist}>
          {song.artist}
        </Text>
      </View>
      {song.image && <ScorePhoto source={song.image} />}
      <InitialNotesList
        transpose={song.transpose}
        initialNotes={song.initialNotes}
        renderAction={(initial) => <PlayNote note={initial.note} />}
        trasposeElement={
          <Text>Trasposto di {JSON.stringify(song.transpose)}</Text>
        }
      />
      <Text>{song.annotations}</Text>
    </ScrollView>
  );
};
