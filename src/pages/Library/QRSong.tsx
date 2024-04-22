import { FC, useCallback, useState } from "react";
import { View, useWindowDimensions } from "react-native";
import { Text } from "react-native-paper";
import QRCode from "react-qr-code";
import { Page } from "../../components/Page";
import { useDataContext } from "../../hooks/useDataContext";
import { useEffectOnFocus } from "../../hooks/useEffectOnFocus";
import { serializeSong } from "../../serialization";
import { Song } from "../../types";
import { LibraryTabScreenProps } from "../types";
import { UnexistingSong } from "./UnexistingSong";

export const QRSong: FC<LibraryTabScreenProps<"QRView">> = (props) => {
  const { width } = useWindowDimensions();

  const data = useDataContext();
  const [currentSong, setCurrentSong] = useState<Song>();

  const loader = useCallback(() => {
    setCurrentSong(data.songs.fetch(props.route.params.song));
  }, [data.songs, props.route.params.song]);

  useEffectOnFocus(loader);

  if (!currentSong) {
    return <UnexistingSong />;
  }

  return (
    <Page accessibilityLabel={`Brano selezionato: ${currentSong.title}`}>
      <View
        style={{
          height: "auto",
          backgroundColor: "white",
          padding: 10,
        }}
      >
        <QRCode size={width - 40} value={serializeSong(currentSong)} />
      </View>
      <Text>
        Usa questo QR Code per copiare rapidamente "{currentSong.title}" su un
        altro dispositivo.
      </Text>
      {currentSong.image ? (
        <Text>
          Attenzione: la fotografia dello spartito non è inclusa. Per trasferire
          tutte le informazioni devi utilizzare la funzione di esportazione
          della libreria.
        </Text>
      ) : null}
    </Page>
  );
};
