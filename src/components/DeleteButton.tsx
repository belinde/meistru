import { FC } from "react";
import { Button } from "react-native-paper";
import { useConfirmDeletion } from "../hooks/useConfirmDeletion";

export const DeleteButton: FC<Parameters<typeof Button>["0"]> = (props) => {
  const { setConfirmDeletionVisible, ConfirmationDialog } =
    useConfirmDeletion();
  return (
    <>
      <Button
        {...props}
        icon="delete"
        mode="contained-tonal"
        onPress={() => setConfirmDeletionVisible(true)}
      >
        Elimina
      </Button>
      <ConfirmationDialog onPress={props.onPress}>
        {props.children}
      </ConfirmationDialog>
    </>
  );
};
