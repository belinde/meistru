import { FC } from "react";
import { ConcertForm } from "../../components/ConcertForm/ConcertForm";
import { Page } from "../../components/Page";
import { createIdentifier } from "../../functions";
import { useDataContext } from "../../hooks/useDataContext";
import { LibraryTabScreenProps } from "../types";

export const CreateConcert: FC<LibraryTabScreenProps<"Create">> = (props) => {
  const data = useDataContext();
  return (
    <Page accessibilityLabel="Creazione nuovo concerto">
      <ConcertForm
        concert={{
          id: createIdentifier(),
          title: "",
          description: "",
          pieces: {},
        }}
        persister={(concert) =>
          data.concerts.upsert(concert).then(() =>
            props.navigation.navigate("Concert", {
              screen: "View",
              params: { concert: concert.id },
            })
          )
        }
      />
    </Page>
  );
};
