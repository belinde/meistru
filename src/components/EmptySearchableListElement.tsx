import { FC } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useDataContext } from "../hooks/useDataContext";

export const EmptySearchableListElement: FC = () => {
  const { search } = useDataContext();

  if (search) {
    return (
      <View>
        <Text variant="bodyLarge" style={{ textAlign: "center" }}>
          Nessun elemento soddisfa la ricerca "{search}"
        </Text>
      </View>
    );
  }

  return (
    <View style={{ margin: 40 }}>
      <Text variant="bodyLarge" style={{ textAlign: "center" }}>
        Questa lista non contiene ancora elementi.
      </Text>
      <Text variant="bodySmall" style={{ textAlign: "center", marginTop: 60 }}>
        Puoi crearne di nuovi usando il pulsante più in basso
      </Text>
    </View>
  );
};
