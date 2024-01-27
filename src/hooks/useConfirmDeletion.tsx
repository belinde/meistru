import { FC, ReactNode, useState } from "react";
import { GestureResponderEvent } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

export const useConfirmDeletion = () => {
  const [visible, setConfirmDeletionVisible] = useState(false);
  const ConfirmationDialog: FC<{
    children: ReactNode;
    onPress?: (e: GestureResponderEvent) => void;
  }> = (props) => (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={() => setConfirmDeletionVisible(false)}
      >
        <Dialog.Title>Conferma cancellazione</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{props.children}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={(e) => {
              props.onPress && props.onPress(e);
              setConfirmDeletionVisible(false);
            }}
          >
            Elimina
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
  return {
    setConfirmDeletionVisible,
    ConfirmationDialog,
  };
};
