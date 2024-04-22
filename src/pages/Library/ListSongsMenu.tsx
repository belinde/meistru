import { useNavigation } from "@react-navigation/native";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera/next";
import { FC, useCallback, useRef, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { Dialog, IconButton, Portal } from "react-native-paper";
import { useDataContext } from "../../hooks/useDataContext";
import { unserializeSong } from "../../serialization";

export const ListSongsMenu: FC = () => {
  const { width } = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  const [status, requestPermissions] = useCameraPermissions();
  const { songs } = useDataContext();
  const scanned = useRef("");
  const navigation = useNavigation();

  const showScanner = useCallback(async () => {
    if (!status) return;
    let current = status;
    while (!current.granted) {
      current = await requestPermissions();
    }
    setVisible(true);
  }, [requestPermissions, status]);

  const qrcodeScanned = useCallback(
    (res: BarcodeScanningResult) => {
      const maybeSong = unserializeSong(res.data);
      if (maybeSong && scanned.current !== maybeSong.id) {
        scanned.current = maybeSong.id;
        songs.add(maybeSong);
        setVisible(false);
        navigation.navigate("Library", {
          screen: "View",
          params: { song: maybeSong.id },
        });
      }
    },
    [navigation, songs]
  );

  return (
    <>
      <IconButton icon="qrcode-plus" onPress={showScanner} />
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Scansiona QR</Dialog.Title>
          <Dialog.Content style={{ height: width }}>
            <CameraView
              barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
              onBarcodeScanned={qrcodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
};
