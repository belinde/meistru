import { Audio } from "expo-av";
import { FC, useState } from "react";
import { Button } from "react-native-paper";
import { Note } from "../types";

export const PlayNote: FC<{ note: Note }> = (props) => {
  const [sound, setSound] = useState<Audio.Sound>();

  return (
    <Button
      mode="outlined"
      icon="play-circle"
      onPressIn={async () => {
        const creation = await Audio.Sound.createAsync(
          require("../../assets/notes/output.mp3")
        );
        setSound(creation.sound);
        await creation.sound.setIsLoopingAsync(true);
        await creation.sound.playAsync();
      }}
      onPressOut={async () => {
        await sound?.stopAsync();
        await sound?.unloadAsync();
      }}
    >
      Suona
    </Button>
  );
};
