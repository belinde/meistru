import { FC } from "react";
import { ConcertForm } from "../../components/ConcertForm";
import { Page } from "../../components/Page";
import { createIdentifier } from "../../functions";
import { useConcertList } from "../../hooks/useConcertList";
import { LibraryTabScreenProps } from "../types";

export const CreateConcert: FC<LibraryTabScreenProps<"Create">> = (props) => {
  const { addConcert } = useConcertList();
  return (
    <Page>
      <ConcertForm
        concert={{
          id: createIdentifier(),
          title: "",
          description: "",
          pieces: {},
        }}
        persister={(concert) =>
          addConcert(concert).then(() =>
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
