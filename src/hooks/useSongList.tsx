import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useState } from "react";
import { Song } from "../types";

export const useSongList = () => {
  const { getItem, setItem } = useAsyncStorage("songs");
  const [songs, setSongs] = useState<Song[]>([]);

  useFocusEffect(() => {
    getItem().then((value) => {
      if (value) {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
          setSongs(parsed);
        }
      }
    });
  });

  const addSong = (song: Song) => {
    songs.push(song);
    setSongs([...songs.sort((a, b) => a.title.localeCompare(b.title))]);
    return setItem(JSON.stringify(songs));
  };

  return { songs, addSong };
};
