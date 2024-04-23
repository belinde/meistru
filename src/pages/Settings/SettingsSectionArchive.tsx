import { FC } from "react";
import { Divider } from "react-native-paper";
import { ArchiveExport } from "./ArchiveExport";
import { ArchiveImport } from "./ArchiveImport";
import { SettingsSection } from "./SettingsSection";

export const SettingsSectionArchive: FC = () => {
  return (
    <SettingsSection title="Archivio" icon="archive">
      <ArchiveExport />
      <Divider style={{ marginVertical: 16 }} />
      <ArchiveImport />
    </SettingsSection>
  );
};
