import { FC, ReactNode, useCallback, useState } from "react";
import { GestureResponderEvent } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

export const useConfirmDeletion = () => {
  const [visible, setConfirmDeletionVisible] = useState(false);

  const ConfirmationDialog: FC<{
    children: ReactNode;
    onPress?: (e: GestureResponderEvent) => void;
  }> = useCallback(
    (props) => {
      return (
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
                mode="outlined"
                onPress={(e) => {
                  console.log("Cancel pressed");
                  props.onPress && props.onPress(e);
                  setConfirmDeletionVisible(false);
                }}
              >
                Elimina {typeof props.onPress}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      );
    },
    [visible]
  );
  return {
    setConfirmDeletionVisible,
    ConfirmationDialog,
  };
};
