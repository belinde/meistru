import { FC, useEffect, useState } from "react";
import { ConcertForm } from "../../components/ConcertForm";
import { Page } from "../../components/Page";
import { useConcertList } from "../../hooks/useConcertList";
import { Concert } from "../../types";
import { ConcertTabScreenProps } from "../types";

export const EditConcert: FC<ConcertTabScreenProps<"Edit">> = (props) => {
  const { getConcert, editConcert } = useConcertList();
  const [currentConcert, setCurrentConcert] = useState<Concert>();
  useEffect(() => {
    if (currentConcert) return;
    getConcert(props.route.params.concert).then(setCurrentConcert);
  }, [currentConcert, getConcert, props.route.params.concert]);

  if (!currentConcert) {
    return null;
  }

  return (
    <Page>
      <ConcertForm
        concert={currentConcert}
        persister={(concert) =>
          editConcert(concert).then(() =>
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
