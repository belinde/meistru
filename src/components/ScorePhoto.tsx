import { documentDirectory } from "expo-file-system";
import { FC } from "react";
import { Image, useWindowDimensions } from "react-native";

export const ScorePhoto: FC<{ source: string; noCache?: number }> = (props) => {
  const { width } = useWindowDimensions();

  return (
    <Image
      height={width / 5}
      width={width}
      resizeMode="contain"
      source={{
        uri: `${documentDirectory}${props.source}?no-cache=${props.noCache || Date.now()}`,
      }}
    />
  );
};
