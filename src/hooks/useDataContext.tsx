import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { JsonCRUD } from "../JsonCRUD";
import { Settings } from "../Settings";
import { deleteFile } from "../functions";
import { Concert, Song } from "../types";

const songs = new JsonCRUD<Song, "id">(
  "songs.json",
  "id",
  (a, b) => a.title.localeCompare(b.title),
  async (song) => {
    if (song.image) {
      await deleteFile(song.image).catch(() =>
        alert("Impossibile eliminare il brano.")
      );
    }
  }
);

const concerts = new JsonCRUD<Concert, "id">("concerts.json", "id", (a, b) =>
  a.title.localeCompare(b.title)
);

const settings = new Settings();

const DataContext = createContext({
  songs,
  concerts,
  settings,
  search: "",
  setSearch: (_: string) => {},
});

export const DataProvider: FC<{ children: ReactNode }> = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    Promise.all([songs.load(), concerts.load(), settings.load()]).then(() =>
      setLoaded(true)
    );
  }, []);

  if (!loaded) return null;

  return (
    <DataContext.Provider
      value={{ songs, concerts, settings, search, setSearch }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
