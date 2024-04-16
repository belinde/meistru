import { FC, MutableRefObject, useCallback, useState } from "react";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { Concert } from "../../types";

export const ConcertTextInput: FC<{
  concert: MutableRefObject<Concert>;
  field: "title" | "description";
  label: string;
  multiline?: boolean;
  mandatory?: boolean;
}> = (props) => {
  const [value, setValue] = useState(() => props.concert.current[props.field]);
  const onChangeText = useCallback(
    (val: string) => {
      props.concert.current[props.field] = val;
      setValue(val);
    },
    [props.field, props.concert]
  );
  const hasError = !!props.mandatory && !value;

  return (
    <View>
      <TextInput
        mode="outlined"
        error={hasError}
        label={props.label}
        accessibilityLabel={props.label}
        value={value}
        onChangeText={onChangeText}
        multiline={props.multiline}
      />
      {hasError && (
        <HelperText type="error">Il campo è obbligatorio</HelperText>
      )}
    </View>
  );
};
