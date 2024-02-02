import {
  deleteAsync,
  documentDirectory,
  getInfoAsync,
  readAsStringAsync,
  writeAsStringAsync,
} from "expo-file-system";
import { SECTIONS } from "./constants";
import { InitialNote } from "./types";

export const createIdentifier = () =>
  Math.floor(1000 * (Date.now() + Math.random())).toString(36) +
  Math.floor(1000000000 * Math.random()).toString(36);

export const noteSorter = (a: InitialNote, b: InitialNote) => {
  const aSection = SECTIONS.indexOf(a.section);
  const bSection = SECTIONS.indexOf(b.section);
  if (aSection < bSection) return -1;
  if (aSection > bSection) return 1;
  if (a.subsection < b.subsection) return -1;
  if (a.subsection > b.subsection) return 1;
  return 0;
};

export const deleteFile = async (fileName: string) => {
  console.debug("deleteFile", documentDirectory + fileName);
  await deleteAsync(documentDirectory + fileName).catch((e) => {
    console.warn("Cannot delete file", fileName, e);
  });
};

export const readJsonFile = async <T>(
  fileName: string,
  defaultValue: T
): Promise<T> => {
  console.debug("readJsonFile", documentDirectory + fileName);
  const info = await getInfoAsync(documentDirectory + fileName);
  if (!info.exists) {
    return defaultValue;
  }
  const content = await readAsStringAsync(documentDirectory + fileName, {
    encoding: "utf8",
  }).catch((e) => {
    console.warn("Cannot open file", fileName, e);
    return null;
  });
  return content ? JSON.parse(content) : defaultValue;
};

export const writeJsonFile = async <T>(fileName: string, data: T) => {
  console.debug("writeJsonFile", documentDirectory + fileName);
  await writeAsStringAsync(documentDirectory + fileName, JSON.stringify(data), {
    encoding: "utf8",
  }).catch((e) => {
    console.warn("Cannot write file", fileName, e);
  });
};
