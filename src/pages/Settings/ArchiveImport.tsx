import { getDocumentAsync } from "expo-document-picker";
import {
  cacheDirectory,
  deleteAsync,
  getInfoAsync,
  makeDirectoryAsync,
  moveAsync,
  readAsStringAsync,
  readDirectoryAsync,
} from "expo-file-system";
import { FC, useCallback, useEffect, useState } from "react";
import { Button, Checkbox, Dialog, Portal, Text } from "react-native-paper";
import { unzip } from "react-native-zip-archive";
import { isSettingsProperties } from "../../Settings";
import {
  DOCUMENT_DIRECTORY,
  FILENAME_CONCERTS,
  FILENAME_SETTINGS,
  FILENAME_SONGS,
} from "../../constants";
import { useDataContext } from "../../hooks/useDataContext";
import { isConcert, isSong } from "../../types";

const BACKUP_FOLDER = `${cacheDirectory}backup`;

export const readJsonFile = async <T,>(fileName: string): Promise<T | null> => {
  const file = `${BACKUP_FOLDER}/${fileName}`;
  const info = await getInfoAsync(file);
  if (!info.exists) {
    return null;
  }
  const content = await readAsStringAsync(file, {
    encoding: "utf8",
  }).catch((e) => {
    console.warn("Cannot open file", fileName, e);
    return null;
  });
  try {
    return content ? JSON.parse(content) : null;
  } catch (e) {
    console.warn("Cannot parse file", fileName, e);
    return null;
  }
};

const FolderInspector: FC<{ close: () => void }> = (props) => {
  const data = useDataContext();
  const [files, setFiles] = useState<string[]>([]);
  const [mergeSongs, setMergeSongs] = useState(false);
  const [mergeConcerts, setMergeConcerts] = useState(false);
  const [mergeSettings, setMergeSettings] = useState(false);

  const importBackup = useCallback(async () => {
    if (mergeSongs) {
      const songsJson = await readJsonFile<unknown[]>(FILENAME_SONGS);
      if (Array.isArray(songsJson)) {
        songsJson.forEach(async (s) => {
          if (isSong(s)) {
            data.songs.add(s);
            if (s.image && files.includes(s.image)) {
              await moveAsync({
                from: `${BACKUP_FOLDER}/${s.image}`,
                to: `${DOCUMENT_DIRECTORY}${s.image}`,
              });
            }
          }
        });
      }
    }

    if (mergeConcerts) {
      const concertsJson = await readJsonFile<unknown[]>(FILENAME_CONCERTS);
      if (Array.isArray(concertsJson)) {
        concertsJson.forEach(async (c) => {
          if (isConcert(c)) {
            data.concerts.add(c);
          }
        });
      }
    }

    if (mergeSettings) {
      const settingsJson = await readJsonFile(FILENAME_SETTINGS);
      if (isSettingsProperties(settingsJson)) {
        data.settings.setNoteStyle(settingsJson.noteStyle);
        data.settings.setStandardSections(settingsJson.standardSections);
      }
    }

    props.close();
  }, [
    mergeSongs,
    mergeConcerts,
    mergeSettings,
    props,
    data.songs,
    data.concerts,
    data.settings,
    files,
  ]);

  useEffect(() => {
    readDirectoryAsync(BACKUP_FOLDER)
      .then((f) => {
        setFiles(f);
        setMergeSongs(f.includes(FILENAME_SONGS));
        setMergeConcerts(f.includes(FILENAME_CONCERTS));
        setMergeSettings(f.includes(FILENAME_SETTINGS));
      })
      .catch((e) => {
        console.warn("Cannot read directory", BACKUP_FOLDER, e);
      });
  }, []);
  return (
    <Dialog visible>
      <Dialog.Title>Ripristino backup ({files.length})</Dialog.Title>
      <Dialog.ScrollArea>
        <Text>
          Seleziona quali dati vuoi ripristinare. Brani e concerti verranno
          uniti a quelli eventualmente già presenti su questo dispositivo.
        </Text>
        <Checkbox.Item
          label="Repertorio"
          status={mergeSongs ? "checked" : "unchecked"}
          onPress={() => setMergeSongs(!mergeSongs)}
        />
        <Checkbox.Item
          label="Concerti"
          status={mergeConcerts ? "checked" : "unchecked"}
          onPress={() => setMergeConcerts(!mergeConcerts)}
        />
        <Checkbox.Item
          label="Impostazioni"
          status={mergeSettings ? "checked" : "unchecked"}
          onPress={() => setMergeSettings(!mergeSettings)}
        />
      </Dialog.ScrollArea>
      <Dialog.Actions>
        <Button onPress={props.close}>Annulla</Button>
        <Button onPress={importBackup} mode="contained" icon="import">
          Importa
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export const ArchiveImport: FC = () => {
  const [inspect, setInspect] = useState(false);

  const pickBackup = useCallback(async () => {
    setInspect(false);
    await makeDirectoryAsync(BACKUP_FOLDER, { intermediates: true });
    const res = await getDocumentAsync({
      type: "application/zip",
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (!res.canceled && res.assets && res.assets.length > 0) {
      await unzip(res.assets[0].uri, BACKUP_FOLDER);
      await deleteAsync(res.assets[0].uri);
    }
    setInspect(true);
  }, []);

  const removeBackup = useCallback(async () => {
    await deleteAsync(BACKUP_FOLDER, { idempotent: true });
    setInspect(false);
  }, []);

  return (
    <>
      <Text variant="titleMedium">Ripristino da backup</Text>
      <Button onPress={pickBackup} icon="download">
        Carica da...
      </Button>
      {inspect && (
        <Portal>
          <FolderInspector close={removeBackup} />
        </Portal>
      )}
    </>
  );
};
