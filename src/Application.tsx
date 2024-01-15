import { useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { Button } from "react-native-paper";
import { HomeScreenNavigationProp } from "../types";
import { SongList } from "./components/SongList";

export const Application: FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <>
      <SongList
        songs={[
          {
            id: "aaa",
            artist: "Lucio Dalla",
            title: "Anna e Marco",
            initialNotes: [],
          },
        ]}
      />
      <Button onPress={() => navigation.navigate("Profile")}>Profile</Button>
    </>
  );
};
