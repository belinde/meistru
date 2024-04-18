import { FC, useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { List } from "react-native-paper";
import { useDataContext } from "../hooks/useDataContext";
import { useEffectOnFocus } from "../hooks/useEffectOnFocus";
import { Concert } from "../types";
import { EmptySearchableListElement } from "./EmptySearchableListElement";

export const ConcertList: FC<{ onPress: (concert: Concert) => void }> = (
  props
) => {
  const data = useDataContext();
  const [concerts, setConcerts] = useState<Concert[]>();
  const [refreshing, setRefreshing] = useState(false);

  const applyFilter = useCallback(
    (s: Concert[]) => {
      const filter = data.search.toLowerCase().trim();
      setConcerts(
        filter === ""
          ? s
          : s.filter((song) => song.title.toLowerCase().includes(filter))
      );
    },
    [data.search]
  );

  const refresh = useCallback(() => {
    setRefreshing(true);
    data.concerts
      .load()
      .then(applyFilter)
      .finally(() => {
        setRefreshing(false);
      });
  }, [applyFilter, data.concerts]);

  useEffectOnFocus(refresh);

  useEffect(() => {
    applyFilter(data.concerts.list());
  }, [applyFilter, data.concerts]);

  return (
    <FlatList
      data={concerts}
      refreshing={refreshing}
      onRefresh={refresh}
      renderItem={(row) => (
        <List.Item
          title={row.item.title}
          description={row.item.description}
          left={() => <List.Icon icon="account-music" />}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => props.onPress(row.item)}
          titleNumberOfLines={2}
          descriptionNumberOfLines={1}
        />
      )}
      keyExtractor={(song) => song.id}
      ListEmptyComponent={EmptySearchableListElement}
    />
  );
};
