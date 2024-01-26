import { FC } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { Song } from "../types";
import { Pentagram } from "./Pentagram";
import { TextualNote } from "./TextualNote";
import { TextualSection } from "./TextualSection";

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
  display: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  initialNotes: {
    flexGrow: 1,
  },
  noteRow: {
    paddingBottom: 5,
    paddingLeft: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
      <View style={style.display}>
        <Pentagram notes={song.initialNotes} />
        <View style={style.initialNotes}>
          {song.initialNotes.map((initNote, i) => (
            <View key={i} style={style.noteRow}>
              <View>
                <TextualSection
                  section={initNote.section}
                  subsection={initNote.subsection}
                  variant="labelLarge"
                />
                <TextualNote note={initNote.note} />
              </View>
              <Button mode="outlined" icon="play-circle">
                Suona
              </Button>
            </View>
          ))}
        </View>
      </View>
      <Text>{song.annotations}</Text>
    </ScrollView>
  );
};
