import { documentDirectory, moveAsync } from "expo-file-system";
import {
  CameraType,
  MediaTypeOptions,
  getCameraPermissionsAsync,
  launchCameraAsync,
  requestCameraPermissionsAsync,
} from "expo-image-picker";
import { FC, useCallback } from "react";
import { Button } from "react-native-paper";

const recursiveRequestPermission = async () => {
  let permission = await getCameraPermissionsAsync();
  while (!permission.granted) {
    permission = await requestCameraPermissionsAsync();
  }
};

export const ScorePhotoPicker: FC<{
  songId: string;
  getImageUrl: (url: string) => void;
}> = (props) => {
  const pickImage = useCallback(async () => {
    await recursiveRequestPermission();
    let result = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      cameraType: CameraType.back,
      exif: false,
      aspect: [5, 1],
    });

    if (!result.canceled) {
      const filename = `score_${props.songId}.jpeg`;
      await moveAsync({
        from: result.assets[0].uri,
        to: documentDirectory + filename,
      });
      props.getImageUrl(filename);
    }
  }, [props]);

  return (
    <Button icon="camera" mode="outlined" onPress={pickImage}>
      Scatta foto
    </Button>
  );
};
