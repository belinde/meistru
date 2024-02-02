import { FC, MutableRefObject, useCallback, useState } from "react";
import { Song } from "../../types";
import { ScorePhoto } from "../ScorePhoto";
import { ScorePhotoPicker } from "../ScorePhotoPicker";

export const SongPhotoManagement: FC<{
  song: MutableRefObject<Song>;
}> = (props) => {
  const [image, setImage] = useState(() => props.song.current.image);
  const getImageUrl = useCallback(
    (url: string) => {
      props.song.current.image = url;
      setImage(url);
    },
    [props.song]
  );
  return (
    <>
      {image && <ScorePhoto source={image} />}
      <ScorePhotoPicker
        songId={props.song.current.id}
        getImageUrl={getImageUrl}
      />
    </>
  );
};
