import { FC, MutableRefObject, useCallback, useState } from "react";
import { TextInput } from "react-native-paper";
import { Song } from "../../types";

export const SongTextInput: FC<{
  song: MutableRefObject<Song>;
  field: "title" | "artist" | "annotations";
  label: string;
  multiline?: boolean;
}> = (props) => {
  const [value, setValue] = useState(() => props.song.current[props.field]);
  const onChangeText = useCallback(
    (val: string) => {
      props.song.current[props.field] = val;
      setValue(val);
    },
    [props.field, props.song]
  );
  return (
    <TextInput
      mode="outlined"
      label={props.label}
      value={value}
      onChangeText={onChangeText}
      multiline={props.multiline}
    />
  );
};
