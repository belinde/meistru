import { NOTE_NAMES } from "../constants";
import { NoteName } from "../types";
import { useDataContext } from "./useDataContext";

export const useNoteName = () => {
  const data = useDataContext();
  return (note: NoteName) =>
    data.settings.getNoteStyle() === "latin" ? NOTE_NAMES[note] : note;
};
