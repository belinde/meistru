import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useCallback, useMemo } from "react";
import { Song } from "../types";

export const useSongList = () => {
  const songsStorage = useAsyncStorage("songs");

  const listSongs = useCallback(
    (): Promise<Song[]> =>
      songsStorage.getItem().then((value) => {
        if (value) {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed)) {
            return parsed;
          }
        }
        return [];
      }),
    [songsStorage]
  );

  const saveSongs = useCallback(
    (songs: Song[]) =>
      songsStorage.setItem(
        JSON.stringify(songs.sort((a, b) => a.title.localeCompare(b.title)))
      ),
    [songsStorage]
  );

  const addSong = useCallback(
    (song: Song) => listSongs().then((songs) => saveSongs([...songs, song])),
    [listSongs, saveSongs]
  );

  const editSong = useCallback(
    async (song: Song) => {
      const updatedSongs = await listSongs();
      const index = updatedSongs.findIndex((s) => s.id === song.id);
      if (index !== -1) {
        updatedSongs[index] = song;
        await saveSongs(updatedSongs);
      }
    },
    [listSongs, saveSongs]
  );

  const deleteSong = useCallback(
    async (id: string) => {
      const updatedSongs = await listSongs();
      const index = updatedSongs.findIndex((s) => s.id === id);
      if (index !== -1) {
        updatedSongs.splice(index, 1);
        await saveSongs(updatedSongs);
      }
    },
    [listSongs, saveSongs]
  );

  const getSong = useCallback(
    (id: string) =>
      listSongs().then((songs) => songs.find((song) => song.id === id)),
    [listSongs]
  );

  return useMemo(
    () => ({
      listSongs,
      addSong,
      editSong,
      getSong,
      deleteSong,
    }),
    [listSongs, addSong, editSong, getSong, deleteSong]
  );
};
