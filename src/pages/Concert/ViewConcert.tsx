import { FC, useCallback, useState } from "react";
import { Button } from "react-native-paper";
import { ConcertDisplay } from "../../components/ConcertDisplay";
import { Page } from "../../components/Page";
import { useDataContext } from "../../hooks/useDataContext";
import { useEffectOnFocus } from "../../hooks/useEffectOnFocus";
import { Concert } from "../../types";
import { ConcertTabScreenProps } from "../types";

export const ViewConcert: FC<ConcertTabScreenProps<"View">> = (props) => {
  const data = useDataContext();
  const [currentConcert, setCurrentConcert] = useState<Concert>();

  const loader = useCallback(() => {
    setCurrentConcert(data.concerts.fetch(props.route.params.concert));
  }, [data.concerts, props.route.params.concert]);

  useEffectOnFocus(loader);

  if (!currentConcert) return null;

  return (
    <Page>
      <ConcertDisplay concert={currentConcert} />
      <Button
        mode="contained"
        icon="human-capacity-increase"
        onPress={() => {
          data.settings.setConcertMode(currentConcert.id);
        }}
      >
        Modalità concerto
      </Button>
    </Page>
  );
};
