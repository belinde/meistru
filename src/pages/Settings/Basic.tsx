import { FC, useCallback, useEffect, useState } from "react";
import { RadioButton, Text } from "react-native-paper";
import { StandardSection } from "../../Settings";
import { Page } from "../../components/Page";
import { useDataContext } from "../../hooks/useDataContext";
import { NoteNameStyle } from "../../types";
import { SectionSelector } from "./SectionSelector";

export const Basic: FC = () => {
  const data = useDataContext();
  const [style, setStyle] = useState(data.settings.getNoteStyle());
  useEffect(
    () => data.settings.subscribe(() => setStyle(data.settings.getNoteStyle())),
    [data.settings]
  );
  const [sections, setSections] = useState(data.settings.getStandardSections());
  useEffect(
    () =>
      data.settings.subscribe(() =>
        setSections(data.settings.getStandardSections())
      ),
    [data.settings]
  );
  const sectionsPersister = useCallback(
    (parts: StandardSection[]) => {
      data.settings.setStandardSections(parts).catch(console.error);
    },
    [data.settings]
  );

  return (
    <Page accessibilityLabel="Impostazioni">
      <Text variant="titleMedium">Nomi delle note:</Text>

      <RadioButton.Group
        onValueChange={(val) => {
          data.settings.setNoteStyle(val as NoteNameStyle);
        }}
        value={style}
      >
        <RadioButton.Item
          value="latin"
          label="Do, Re, Mi..."
          accessibilityLabel="Do, Re, Mi..."
        />
        <RadioButton.Item
          value="english"
          label="A, B, C..."
          accessibilityLabel="A, B, C..."
        />
      </RadioButton.Group>

      <Text variant="titleMedium">Reparti normalmente utilizzati:</Text>
      <SectionSelector
        section="soprani"
        parts={sections}
        setParts={sectionsPersister}
      />
      <SectionSelector
        section="mezzosoprani"
        parts={sections}
        setParts={sectionsPersister}
      />
      <SectionSelector
        section="contralti"
        parts={sections}
        setParts={sectionsPersister}
      />
      <SectionSelector
        section="tenori"
        parts={sections}
        setParts={sectionsPersister}
      />
      <SectionSelector
        section="baritoni"
        parts={sections}
        setParts={sectionsPersister}
      />
      <SectionSelector
        section="bassi"
        parts={sections}
        setParts={sectionsPersister}
      />
    </Page>
  );
};
