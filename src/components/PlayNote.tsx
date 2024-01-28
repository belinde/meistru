import { Audio } from "expo-av";
import { FC, useRef } from "react";
import { Button } from "react-native-paper";
import { Note } from "../types";

const FILES: Record<string, any> = {
  "1C": require("../../assets/notes/1C.mp3"),
  "1CD": require("../../assets/notes/1CD.mp3"),
  "1D": require("../../assets/notes/1D.mp3"),
  "1DE": require("../../assets/notes/1DE.mp3"),
  "1E": require("../../assets/notes/1E.mp3"),
  "1F": require("../../assets/notes/1F.mp3"),
  "1FG": require("../../assets/notes/1FG.mp3"),
  "1G": require("../../assets/notes/1G.mp3"),
  "1GA": require("../../assets/notes/1GA.mp3"),
  "1A": require("../../assets/notes/1A.mp3"),
  "1AB": require("../../assets/notes/1AB.mp3"),
  "1B": require("../../assets/notes/1B.mp3"),
  "2C": require("../../assets/notes/2C.mp3"),
  "2CD": require("../../assets/notes/2CD.mp3"),
  "2D": require("../../assets/notes/2D.mp3"),
  "2DE": require("../../assets/notes/2DE.mp3"),
  "2E": require("../../assets/notes/2E.mp3"),
  "2F": require("../../assets/notes/2F.mp3"),
  "2FG": require("../../assets/notes/2FG.mp3"),
  "2G": require("../../assets/notes/2G.mp3"),
  "2GA": require("../../assets/notes/2GA.mp3"),
  "2A": require("../../assets/notes/2A.mp3"),
  "2AB": require("../../assets/notes/2AB.mp3"),
  "2B": require("../../assets/notes/2B.mp3"),
  "3C": require("../../assets/notes/3C.mp3"),
  "3CD": require("../../assets/notes/3CD.mp3"),
  "3D": require("../../assets/notes/3D.mp3"),
  "3DE": require("../../assets/notes/3DE.mp3"),
  "3E": require("../../assets/notes/3E.mp3"),
  "3F": require("../../assets/notes/3F.mp3"),
  "3FG": require("../../assets/notes/3FG.mp3"),
  "3G": require("../../assets/notes/3G.mp3"),
  "3GA": require("../../assets/notes/3GA.mp3"),
  "3A": require("../../assets/notes/3A.mp3"),
  "3AB": require("../../assets/notes/3AB.mp3"),
  "3B": require("../../assets/notes/3B.mp3"),
  "4C": require("../../assets/notes/4C.mp3"),
  "4CD": require("../../assets/notes/4CD.mp3"),
  "4D": require("../../assets/notes/4D.mp3"),
  "4DE": require("../../assets/notes/4DE.mp3"),
  "4E": require("../../assets/notes/4E.mp3"),
  "4F": require("../../assets/notes/4F.mp3"),
  "4FG": require("../../assets/notes/4FG.mp3"),
  "4G": require("../../assets/notes/4G.mp3"),
  "4GA": require("../../assets/notes/4GA.mp3"),
  "4A": require("../../assets/notes/4A.mp3"),
  "4AB": require("../../assets/notes/4AB.mp3"),
  "4B": require("../../assets/notes/4B.mp3"),
  "5C": require("../../assets/notes/5C.mp3"),
  "5CD": require("../../assets/notes/5CD.mp3"),
  "5D": require("../../assets/notes/5D.mp3"),
  "5DE": require("../../assets/notes/5DE.mp3"),
  "5E": require("../../assets/notes/5E.mp3"),
  "5F": require("../../assets/notes/5F.mp3"),
  "5FG": require("../../assets/notes/5FG.mp3"),
  "5G": require("../../assets/notes/5G.mp3"),
  "5GA": require("../../assets/notes/5GA.mp3"),
  "5A": require("../../assets/notes/5A.mp3"),
  "5AB": require("../../assets/notes/5AB.mp3"),
  "5B": require("../../assets/notes/5B.mp3"),
};

export const PlayNote: FC<{ note: Note }> = (props) => {
  const sound = useRef<Audio.Sound>();

  const soundKey = `${props.note.octave}${props.note.note}`;

  return (
    <Button
      mode="outlined"
      icon="play-circle"
      onPressIn={async () => {
        console.log("play", soundKey);
        const creation = await Audio.Sound.createAsync(FILES[soundKey], {
          isLooping: true,
        });
        await creation.sound.playAsync();

        sound.current = creation.sound;
      }}
      onPressOut={async () => {
        await sound.current?.stopAsync();
        await sound.current?.unloadAsync();
      }}
    >
      Suona
    </Button>
  );
};
