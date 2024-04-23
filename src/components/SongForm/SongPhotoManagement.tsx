import { CameraView, useCameraPermissions } from "expo-camera/next";
import { deleteAsync, documentDirectory, moveAsync } from "expo-file-system";
import { SaveFormat, manipulateAsync } from "expo-image-manipulator";
import { FC, MutableRefObject, useCallback, useRef, useState } from "react";
import { useWindowDimensions } from "react-native";
import { Button } from "react-native-paper";
import { Song } from "../../types";
import { ScorePhoto } from "../ScorePhoto";

export const SongPhotoManagement: FC<{
  song: MutableRefObject<Song>;
}> = (props) => {
  const { width } = useWindowDimensions();
  const height = Math.round(width / 5);
  const [image, setImage] = useState(() => props.song.current.image);
  const [noCache, setNoCache] = useState(Date.now());
  const [status, requestPermissions] = useCameraPermissions();
  const [capturing, setCapturing] = useState(false);
  const [elaborating, setElaborating] = useState(false);

  const camera = useRef<CameraView>(null);

  const pickImage = useCallback(async () => {
    let current = status;
    while (!current?.granted) {
      current = await requestPermissions();
    }

    if (!capturing) {
      setCapturing(true);
      return;
    }

    if (!camera.current) return;
    setElaborating(true);
    camera.current
      .takePictureAsync({ exif: false, imageType: "jpg", quality: 1 })
      .then(async (picture) => {
        if (picture) {
          const cropped = await manipulateAsync(
            picture.uri,
            [
              {
                crop: {
                  originX: 0,
                  originY: picture.height / 2 - picture.width / 10,
                  width: picture.width,
                  height: picture.width / 5,
                },
              },
              {
                resize: {
                  width,
                  height,
                },
              },
            ],
            { format: SaveFormat.JPEG }
          );
          const filename = `score_${props.song.current.id}.jpeg`;
          await moveAsync({
            from: cropped.uri,
            to: documentDirectory + filename,
          });

          props.song.current.image = filename;
          setImage(filename);
          setNoCache(Date.now());
          setCapturing(false);
          deleteAsync(picture.uri);
        }
      })
      .finally(() => setElaborating(false));
  }, [status, capturing, requestPermissions, width, height, props.song]);

  return (
    <>
      {image && !capturing && <ScorePhoto source={image} noCache={noCache} />}
      {capturing && (
        <CameraView
          ref={camera}
          style={{ height, width }}
          flash="auto"
          facing="back"
          mode="picture"
        />
      )}
      <Button
        icon={elaborating ? "timer-sand" : "camera"}
        mode="outlined"
        onPress={pickImage}
        disabled={elaborating}
      >
        {capturing ? "Scatta foto" : "Modifica"}
      </Button>
    </>
  );
};
