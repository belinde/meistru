import { FC, useEffect, useState } from "react";
import { RadioButton, Text } from "react-native-paper";
import { Page } from "../../components/Page";
import { useDataContext } from "../../hooks/useDataContext";
import { NoteNameStyle } from "../../types";

export const Basic: FC = () => {
  const data = useDataContext();
  const [style, setStyle] = useState(data.settings.getNoteStyle());
  useEffect(() => {
    return data.settings.subscribe(() =>
      setStyle(data.settings.getNoteStyle())
    );
  }, [data.settings]);

  return (
    <Page>
      <Text variant="titleMedium">Nomi delle note:</Text>

      <RadioButton.Group
        onValueChange={(val) => {
          data.settings.setNoteStyle(val as NoteNameStyle);
        }}
        value={style}
      >
        <RadioButton.Item value="latin" label="Do, Re, Mi..." />
        <RadioButton.Item value="english" label="A, B, C..." />
      </RadioButton.Group>
    </Page>
  );
};
