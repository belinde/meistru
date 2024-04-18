import { FC } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useDataContext } from "../hooks/useDataContext";

export const EmptySearchableListElement: FC = () => {
  const { search } = useDataContext();

  return (
    <View>
      <Text variant="labelLarge" style={{ textAlign: "center" }}>
        {search
          ? `Nessun elemento soddisfa la ricerca "${search}"`
          : "Questa lista non contiene ancora alcun elemento."}
      </Text>
    </View>
  );
};
