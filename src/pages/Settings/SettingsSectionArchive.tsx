import { cacheDirectory, documentDirectory } from "expo-file-system";
import { isAvailableAsync, shareAsync } from "expo-sharing";
import { FC, useCallback, useEffect, useState } from "react";
import { Button, ProgressBar, Text } from "react-native-paper";
import { zip } from "react-native-zip-archive";
import { SettingsSection } from "./SettingsSection";

export const SettingsSectionArchive: FC = () => {
  const [canShare, setCanShare] = useState(true);
  const [elaboratingBackup, setElaboratingBackup] = useState(false);
  const [progress, setProgress] = useState(0);

  const now = new Date();
  const targetPath = `${cacheDirectory}/backup_${now.getFullYear()}-${now.getMonth()}-${now.getDate()}.meistru.zip`;

  useEffect(() => {
    isAvailableAsync().then(setCanShare);
  }, []);

  //   useEffect(() => {
  //     const observer = subscribe(
  //       (evt) => evt.filePath === targetPath && setProgress(evt.progress)
  //     );
  //     return () => observer.remove();
  //   }, [targetPath]);

  const doBackup = useCallback(async () => {
    if (!canShare || !documentDirectory || !cacheDirectory) return;
    setElaboratingBackup(true);
    setProgress(0);

    try {
      console.log("Zipping...", { documentDirectory, targetPath });
      await zip(documentDirectory + "cacca", targetPath);
      await shareAsync(targetPath, {
        mimeType: "application/zip",
        dialogTitle: "Esporta archivio",
      });
    } catch (err) {
      console.error(err);
      setElaboratingBackup(false);
    }
  }, [canShare, targetPath]);

  return (
    <SettingsSection title="Archivio" icon="archive">
      <Text variant="titleMedium">Esportazione dell'archivio</Text>
      {elaboratingBackup ? <ProgressBar progress={progress} /> : null}
      {canShare ? (
        <Button onPress={doBackup} disabled={elaboratingBackup}>
          Invia copia a...
        </Button>
      ) : (
        <Text>"Condivisione non disponibile"</Text>
      )}
    </SettingsSection>
  );
};
