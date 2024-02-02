import { Audio } from "expo-av";
import { FC, useEffect, useRef } from "react";
import { IconButton } from "react-native-paper";
import { NOTEFILES } from "../constants";
import { Alteration, Note, NoteName, NoteResourceName } from "../types";

const ResMap: Record<`${NoteName}${Alteration}`, [string, number]> = {
  Cb: ["B", -1],
  "C#": ["CD", 0],
  Db: ["CD", 0],
  "D#": ["DE", 0],
  Eb: ["DE", 0],
  "E#": ["F", 0],
  Fb: ["E", 0],
  "F#": ["FG", 0],
  Gb: ["FG", 0],
  "G#": ["GA", 0],
  Ab: ["GA", 0],
  "A#": ["AB", 0],
  Bb: ["AB", 0],
  "B#": ["C", 1],
};

const getResourceName = (note: Note): NoteResourceName | null => {
  let resourceName: NoteResourceName =
    `${note.octave}${note.note}` as NoteResourceName;

  if (note.alteration) {
    const [baseName, changeOctave] = ResMap[`${note.note}${note.alteration}`];
    const octave = note.octave + changeOctave;
    resourceName = `${octave}${baseName}` as NoteResourceName;
  }

  return resourceName in NOTEFILES ? resourceName : null;
};

export const PlayNote: FC<{ note: Note }> = (props) => {
  const sound = useRef<Audio.Sound>();

  const soundKey = getResourceName(props.note);

  useEffect(() => {
    if (soundKey) {
      Audio.Sound.createAsync(NOTEFILES[soundKey], { isLooping: true }).then(
        (creation) => {
          sound.current = creation.sound;
        }
      );
      return () => {
        sound.current?.unloadAsync();
      };
    }
  }, [soundKey]);

  return (
    <IconButton
      mode="outlined"
      icon="volume-high"
      onPressIn={() => {
        sound.current?.playAsync();
      }}
      onPressOut={() => {
        sound.current?.stopAsync();
      }}
    />
  );
};
