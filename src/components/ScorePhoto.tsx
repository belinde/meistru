import { FC } from "react";
import { Image, useWindowDimensions } from "react-native";
import { DOCUMENT_DIRECTORY, SCORE_PHOTO_RATIO } from "../constants";

export const ScorePhoto: FC<{ source: string; noCache?: number }> = (props) => {
  const { width } = useWindowDimensions();

  return (
    <Image
      height={width / SCORE_PHOTO_RATIO}
      width={width}
      resizeMode="contain"
      source={{
        uri: `${DOCUMENT_DIRECTORY}${props.source}?no-cache=${props.noCache || Date.now()}`,
      }}
    />
  );
};
