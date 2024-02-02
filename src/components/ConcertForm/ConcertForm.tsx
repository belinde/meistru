import { FC, useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { Concert } from "../../types";
import { ConcertPiecesManagement } from "./ConcertPiecesManagement";
import { ConcertTextInput } from "./ConcertTextInput";

const style = StyleSheet.create({
  container: {
    display: "flex",
    rowGap: 16,
  },
});

export const ConcertForm: FC<{
  concert: Concert;
  persister: (concert: Concert) => void;
}> = (props) => {
  const concert = useRef(props.concert);

  return (
    <>
      <ScrollView>
        <View style={style.container}>
          <ConcertTextInput
            concert={concert}
            field="title"
            label="Titolo"
            mandatory
          />
          <ConcertTextInput
            concert={concert}
            field="description"
            label="Descrizione"
            multiline
          />
          <ConcertPiecesManagement concert={concert} />
        </View>
      </ScrollView>

      <Button
        icon="content-save"
        mode="contained"
        onPress={() => props.persister(concert.current)}
      >
        Salva
      </Button>
    </>
  );
};
