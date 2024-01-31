import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
import { Concert } from "../types";

export const useConcertList = () => {
  const concertsStorage = useAsyncStorage("concerts");

  const listConcerts = useCallback(
    (): Promise<Concert[]> =>
      concertsStorage.getItem().then((value) => {
        if (value) {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed)) {
            return parsed;
          }
        }
        return [];
      }),
    [concertsStorage]
  );

  const saveConcerts = useCallback(
    (concerts: Concert[]) =>
      concertsStorage.setItem(
        JSON.stringify(concerts.sort((a, b) => a.title.localeCompare(b.title)))
      ),
    [concertsStorage]
  );

  const addConcert = useCallback(
    (concert: Concert) =>
      listConcerts().then((concerts) => saveConcerts([...concerts, concert])),
    [listConcerts, saveConcerts]
  );

  const editConcert = useCallback(
    async (concert: Concert) => {
      const updatedConcerts = await listConcerts();
      const index = updatedConcerts.findIndex((c) => c.id === concert.id);
      if (index !== -1) {
        updatedConcerts[index] = concert;
        await saveConcerts(updatedConcerts);
      }
    },
    [listConcerts, saveConcerts]
  );

  const deleteConcert = useCallback(
    async (id: string) => {
      const updatedConcerts = await listConcerts();
      const index = updatedConcerts.findIndex((s) => s.id === id);
      if (index !== -1) {
        updatedConcerts.splice(index, 1);
        await saveConcerts(updatedConcerts);
      }
    },
    [listConcerts, saveConcerts]
  );

  const getConcert = useCallback(
    (id: string) =>
      listConcerts().then((concerts) =>
        concerts.find((concert) => concert.id === id)
      ),
    [listConcerts]
  );

  return {
    listConcerts,
    addConcert,
    editConcert,
    getConcert,
    deleteConcert,
  };
};
