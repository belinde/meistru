import { FC } from "react";
import { ConcertForm } from "../../components/ConcertForm";
import { Page } from "../../components/Page";
import { useDataContext } from "../../hooks/useDataContext";
import { ConcertTabScreenProps } from "../types";

export const EditConcert: FC<ConcertTabScreenProps<"Edit">> = (props) => {
  const data = useDataContext();
  const currentConcert = data.concerts.fetch(props.route.params.concert);

  if (!currentConcert) {
    return null;
  }

  return (
    <Page>
      <ConcertForm
        concert={currentConcert}
        persister={(concert) =>
          data.concerts.update(concert).then(() =>
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
