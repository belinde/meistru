import { FC, useCallback, useEffect, useState } from "react";
import { Divider, RadioButton, Text } from "react-native-paper";
import { StandardSection } from "../../Settings";
import { useDataContext } from "../../hooks/useDataContext";
import { Instrument, NoteNameStyle } from "../../types";
import { SectionSelector } from "./SectionSelector";
import { SettingsSection } from "./SettingsSection";

export const SettingsSectionMusic: FC = () => {
  const data = useDataContext();
  const [style, setStyle] = useState(data.settings.getNoteStyle());
  const [instrument, setInstrument] = useState(data.settings.getInstrument());

  useEffect(
    () =>
      data.settings.subscribe(() => {
        setStyle(data.settings.getNoteStyle());
        setInstrument(data.settings.getInstrument());
      }),
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
    <SettingsSection title="Musica" icon="music-clef-treble">
      <Text variant="titleMedium">Strumento di riproduzione:</Text>
      <RadioButton.Group
        onValueChange={(val) => {
          data.settings.setInstrument(val as Instrument);
        }}
        value={instrument}
      >
        <RadioButton.Item
          value="synth"
          label="Sintetizzatore"
          accessibilityLabel="Sintetizzatore"
          aria-label="Sintetizzatore"
        />
        <RadioButton.Item
          value="pluck"
          label="Chitarra"
          accessibilityLabel="Chitarra"
          aria-label="Chitarra"
        />
      </RadioButton.Group>

      <Divider />

      <Text variant="titleMedium" style={{ marginTop: 16 }}>
        Nomi delle note:
      </Text>
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
          aria-label="Do, Re, Mi..."
        />
        <RadioButton.Item
          value="english"
          label="C, D, E..."
          accessibilityLabel="C, D, E..."
          aria-label="C, D, E..."
        />
      </RadioButton.Group>

      <Divider />

      <Text variant="titleMedium" style={{ marginTop: 16 }}>
        Reparti normalmente utilizzati:
      </Text>
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
    </SettingsSection>
  );
};
