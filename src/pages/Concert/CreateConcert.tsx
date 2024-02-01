import { FC } from "react";
import { ConcertForm } from "../../components/ConcertForm";
import { Page } from "../../components/Page";
import { createIdentifier } from "../../functions";
import { useDataContext } from "../../hooks/useDataContext";
import { LibraryTabScreenProps } from "../types";

export const CreateConcert: FC<LibraryTabScreenProps<"Create">> = (props) => {
  const data = useDataContext();
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
          data.concerts.add(concert).then(() =>
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
