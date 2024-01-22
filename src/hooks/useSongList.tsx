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

  const saveSongs = () => {
    setSongs([...songs.sort((a, b) => a.title.localeCompare(b.title))]);
    return songsStorge.setItem(JSON.stringify(songs));
  };

  const addSong = (song: Song) => {
    songs.push(song);
    return saveSongs();
  };

  const editSong = (song: Song) => {
    const index = songs.findIndex((s) => s.id === song.id);
    if (index !== -1) {
      songs[index] = song;
      return saveSongs();
    }
  };

  return { songs, addSong, editSong };
};
