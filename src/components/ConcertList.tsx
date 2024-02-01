import { FC, useCallback, useState } from "react";
import { FlatList } from "react-native";
import { List } from "react-native-paper";
import { useDataContext } from "../hooks/useDataContext";
import { useEffectOnFocus } from "../hooks/useEffectOnFocus";
import { Concert } from "../types";

export const ConcertList: FC<{ onPress: (concert: Concert) => void }> = (
  props
) => {
  const data = useDataContext();
  const [concerts, setConcerts] = useState<Concert[]>();
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(() => {
    setRefreshing(true);
    data.concerts
      .load()
      .then(setConcerts)
      .finally(() => {
        setRefreshing(false);
      });
  }, [data.concerts]);

  useEffectOnFocus(refresh);

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
    />
  );
};
