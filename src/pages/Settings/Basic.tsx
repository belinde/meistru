import { FC } from "react";
import { ScrollView } from "react-native";
import { Page } from "../../components/Page";
import { SettingsSectionArchive } from "./SettingsSectionArchive";
import { SettingsSectionMusic } from "./SettingsSectionMusic";

export const Basic: FC = () => {
  return (
    <Page accessibilityLabel="Impostazioni">
      <ScrollView>
        <SettingsSectionMusic />
        <SettingsSectionArchive />
      </ScrollView>
    </Page>
  );
};
