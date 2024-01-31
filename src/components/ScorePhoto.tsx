import { FC } from "react";
import { Image, useWindowDimensions } from "react-native";

export const ScorePhoto: FC<{ source: string }> = (props) => {
  const { width } = useWindowDimensions();

  return (
    <Image
      height={width / 4}
      width={width}
      resizeMode="contain"
      source={{ uri: `${props.source}?cache=${Date.now()}` }}
    />
  );
};
