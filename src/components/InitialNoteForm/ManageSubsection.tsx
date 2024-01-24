import { FC, useState } from "react";
import DropDown from "react-native-paper-dropdown";

export const ManageSubsection: FC<{
  subsection: number;
  setSubsection: (s: number) => void;
}> = (props) => {
  const [visible, setVisible] = useState(false);

  return (
    <DropDown
      visible={visible}
      onDismiss={() => setVisible(false)}
      showDropDown={() => setVisible(true)}
      label="Sottosezione"
      mode="outlined"
      value={props.subsection}
      setValue={props.setSubsection}
      list={[0, 1, 2, 3, 4].map((s) => ({
        label: s ? s.toString() : "-",
        value: s,
      }))}
    />
  );
};
