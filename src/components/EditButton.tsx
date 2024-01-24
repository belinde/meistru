import { FC } from "react";
import { Button } from "react-native-paper";

export const EditButton: FC<
  Omit<Parameters<typeof Button>["0"], "children">
> = (props) => {
  return (
    <Button icon="pencil" mode="contained" {...props}>
      Modifica
    </Button>
  );
};
