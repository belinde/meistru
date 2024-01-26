import { FC, useState } from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";

export const DeleteButton: FC<Parameters<typeof Button>["0"]> = (props) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        {...props}
        icon="delete"
        mode="contained-tonal"
        onPress={() => setVisible(true)}
      >
        Elimina
      </Button>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Conferma cancellazione</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{props.children}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={(e) => {
                props.onPress && props.onPress(e);
                setVisible(false);
              }}
            >
              Elimina
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
