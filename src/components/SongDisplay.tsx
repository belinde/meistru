import { FC } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { Song } from "../types";
import { InitialNotesList } from "./InitialNotesList";

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
      <Image height={120} source={{ uri: "https://picsum.photos/700/120" }} />
      <InitialNotesList
        initialNotes={song.initialNotes}
        renderAction={() => (
          <Button mode="outlined" icon="play-circle">
            Suona
          </Button>
        )}
      />
      <Text>{song.annotations}</Text>
    </ScrollView>
  );
};
