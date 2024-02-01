import { FC, useState } from "react";
import { Headline, RadioButton, Text } from "react-native-paper";
import { Choice } from "../../components/Choice";
import { Page } from "../../components/Page";
import { useDataContext } from "../../hooks/useDataContext";
import { NoteNameStyle } from "../../types";

export const Settings: FC = () => {
  const data = useDataContext();
  const [style, setStyle] = useState(data.settings.getNoteStyle());
  return (
    <Page additionalTopSpace={30}>
      <Headline>Settings</Headline>

      <Text variant="titleMedium">Nomi delle note:</Text>

      <RadioButton.Group
        onValueChange={(val) => {
          const newVal = val as NoteNameStyle;
          data.settings.setNoteStyle(newVal).then(() => setStyle(newVal));
        }}
        value={data.settings.getNoteStyle()}
      >
        <Choice option="latin" currentValue={style} label="Do, Re, Mi..." />
        <Choice option="english" currentValue={style} label="A, B, C..." />
      </RadioButton.Group>
    </Page>
  );
};
