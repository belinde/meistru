import { FC } from "react";
import { Image, ImageSourcePropType, useWindowDimensions } from "react-native";

export const ScorePhoto: FC<{ source: ImageSourcePropType }> = (props) => {
  const { width } = useWindowDimensions();

  return (
    <Image
      height={width / 4}
      width={width}
      resizeMode="contain"
      source={props.source}
    />
  );
};
