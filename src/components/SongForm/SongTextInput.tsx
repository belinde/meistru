import { FC, MutableRefObject, useCallback, useState } from "react";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { Song } from "../../types";

export const SongTextInput: FC<{
  song: MutableRefObject<Song>;
  field: "title" | "artist" | "annotations";
  label: string;
  multiline?: boolean;
  mandatory?: boolean;
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
    <View>
      <TextInput
        mode="outlined"
        error={props.mandatory && !value}
        label={props.label}
        accessibilityLabel={props.label}
        aria-label={props.label}
        value={value}
        onChangeText={onChangeText}
        multiline={props.multiline}
      />
      <HelperText type="error" visible={!!props.mandatory && !value}>
        Il campo è obbligatorio
      </HelperText>
    </View>
  );
};
