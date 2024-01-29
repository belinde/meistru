import { Audio } from "expo-av";
import { FC, useRef } from "react";
import { Button } from "react-native-paper";
import { NOTEFILES } from "../constants";
import { Note, NoteResourceName } from "../types";

export const PlayNote: FC<{ note: Note }> = (props) => {
  const sound = useRef<Audio.Sound>();

  const soundKey: NoteResourceName =
    `${props.note.octave}${props.note.note}` as NoteResourceName;

  return (
    <Button
      mode="outlined"
      icon="play-circle"
      onPressIn={async () => {
        console.log("play", soundKey);
        const creation = await Audio.Sound.createAsync(NOTEFILES[soundKey], {
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
