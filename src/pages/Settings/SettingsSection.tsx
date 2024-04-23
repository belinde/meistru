import { FC, ReactNode } from "react";
import { Card, Icon } from "react-native-paper";

export const SettingsSection: FC<{
  children: ReactNode;
  title: string;
  icon: string;
}> = (props) => {
  return (
    <Card style={{ marginBottom: 24 }}>
      <Card.Title
        title={props.title}
        titleVariant="titleLarge"
        left={({ size }) => <Icon source={props.icon} size={size} />}
      />
      <Card.Content>{props.children}</Card.Content>
    </Card>
  );
};
