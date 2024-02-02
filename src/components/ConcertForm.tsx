import { FC, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";
import { createIdentifier } from "../functions";
import { Concert } from "../types";
import { ConcertPieceForm } from "./ConcertPieceForm/ConcertPieceForm";
import { ConcertPiecesList } from "./ConcertPiecesList";

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
  const [title, setTitle] = useState(() => props.concert.title);
  const [description, setDescription] = useState(
    () => props.concert.description
  );
  const [pieces, setPieces] = useState(() => props.concert.pieces);
  const [editing, setEditing] = useState<string>();
  console.debug("Rendering ConcertForm");
  return (
    <>
      <ScrollView>
        <View style={style.container}>
          <TextInput
            mode="outlined"
            label="Titolo"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            mode="outlined"
            label="Descrizione"
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <ConcertPiecesList
            pieces={pieces}
            renderAction={(note, i) => (
              <>
                <IconButton icon="arrow-up" onPress={() => {} /* TODO */} />
                <IconButton icon="arrow-down" onPress={() => {} /* TODO */} />
                <IconButton icon="pencil" onPress={() => setEditing(i)} />
              </>
            )}
          />
          <Button
            onPress={() => {
              const id = createIdentifier();
              pieces[id] = {
                id,
                song: "",
                order:
                  Math.max(...Object.values(pieces).map((p) => p.order)) + 1,
                played: false,
              };
              setEditing(id);
            }}
            mode="outlined"
            icon="plus"
          >
            Aggiungi brano
          </Button>

          {editing !== undefined ? (
            <ConcertPieceForm
              piece={pieces[editing]}
              save={(changed) => {
                if (changed.id !== editing) {
                  delete pieces[editing];
                }
                pieces[changed.id] = changed;
                setPieces({ ...pieces });
                setEditing(undefined);
              }}
              remove={() => {
                delete pieces[editing];
                setPieces({ ...pieces });
                setEditing(undefined);
              }}
            />
          ) : null}
        </View>
      </ScrollView>

      <Button
        icon="content-save"
        mode="contained"
        disabled={!title}
        onPress={() =>
          props.persister({
            id: props.concert.id,
            title,
            description,
            pieces,
          })
        }
      >
        Salva
      </Button>
    </>
  );
};
