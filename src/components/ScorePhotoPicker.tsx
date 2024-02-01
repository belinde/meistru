import { documentDirectory, moveAsync } from "expo-file-system";
import {
  CameraType,
  MediaTypeOptions,
  launchCameraAsync,
  useCameraPermissions,
} from "expo-image-picker";
import { FC, useCallback } from "react";
import { Button } from "react-native-paper";

export const ScorePhotoPicker: FC<{
  songId: string;
  getImageUrl: (url: string) => void;
}> = (props) => {
  const [permission, requestPermission] = useCameraPermissions();

  const pickImage = useCallback(async () => {
    let result = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      cameraType: CameraType.back,
      exif: false,
      aspect: [5, 1],
      quality: 0.5,
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

  if (!permission) return null;

  return (
    <Button
      icon="camera"
      mode="outlined"
      onPress={permission.granted ? pickImage : requestPermission}
    >
      Scatta foto
    </Button>
  );
};
