import { FC, useState } from "react";
import DropDown from "react-native-paper-dropdown";
import { SECTIONS } from "../../constants";
import { Section } from "../../types";

export const ManageSection: FC<{
  section: Section;
  setSection: (s: Section) => void;
}> = (props) => {
  const [visible, setVisible] = useState(false);
  return (
    <DropDown
      visible={visible}
      onDismiss={() => setVisible(false)}
      showDropDown={() => setVisible(true)}
      label="Sezione"
      mode="outlined"
      value={props.section}
      setValue={props.setSection}
      list={SECTIONS.map((s) => ({ label: s, value: s }))}
    />
  );
};
