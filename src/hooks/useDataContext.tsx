import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { JsonCRUD } from "../JsonCRUD";
import { deleteFile } from "../functions";
import { Concert, Song } from "../types";

const songs = new JsonCRUD<Song, "id">(
  "songs.json",
  "id",
  (a, b) => a.title.localeCompare(b.title),
  async (song) => {
    if (song.image) {
      await deleteFile(song.image);
    }
  }
);

const concerts = new JsonCRUD<Concert, "id">("concerts.json", "id", (a, b) =>
  a.title.localeCompare(b.title)
);

const DataContext = createContext({
  songs,
  concerts,
});

export const DataProvider: FC<{ children: ReactNode }> = (props) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    Promise.all([songs.load(), concerts.load()]).then(() => setLoaded(true));
  }, []);

  if (!loaded) return null;

  return (
    <DataContext.Provider value={{ songs, concerts }}>
      {props.children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
