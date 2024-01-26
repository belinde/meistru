import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useState } from "react";
import { Song } from "../types";

export const useSongList = () => {
  const songsStorge = useAsyncStorage("songs");
  const [songs, setSongs] = useState<Song[]>([]);

  useFocusEffect(() => {
    songsStorge.getItem().then((value) => {
      if (value) {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
          setSongs(parsed);
        }
      }
    });
  });

  const saveSongs = async () => {
    setSongs([...songs.sort((a, b) => a.title.localeCompare(b.title))]);
    await songsStorge.setItem(JSON.stringify(songs));
  };

  const addSong = async (song: Song) => {
    songs.push(song);
    await saveSongs();
  };

  const editSong = async (song: Song) => {
    const index = songs.findIndex((s) => s.id === song.id);
    if (index !== -1) {
      songs[index] = song;
      await saveSongs();
    }
  };

  const deleteSong = async (id: string) => {
    const index = songs.findIndex((s) => s.id === id);
    if (index !== -1) {
      songs.splice(index, 1);
      await saveSongs();
    }
  };

  const getSong = (id: string) => {
    return songs.find((song) => song.id === id);
  };

  return { songs, addSong, editSong, getSong, deleteSong };
};
