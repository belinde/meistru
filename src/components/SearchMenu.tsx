import { FC, useCallback, useEffect, useRef, useState } from "react";
import { TextInput } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { useDataContext } from "../hooks/useDataContext";

export const SearchMenu: FC = () => {
  const data = useDataContext();
  const [text, setText] = useState(() => data.search);
  const ref = useRef<TextInput>(null);

  const [visible, setVisible] = useState(() => data.search !== "");

  useEffect(() => {
    if (visible) {
      ref.current?.focus();
    } else {
      ref.current?.blur();
    }
  }, [data, visible]);

  const reset = useCallback(() => {
    ref.current?.blur();
    setText("");
    setVisible(false);
    data.setSearch("");
  }, [data]);

  const search = useCallback(
    (s: string) => {
      setText(s);
      data.setSearch(s);
    },
    [data]
  );

  if (visible) {
    return (
      <Searchbar
        ref={ref}
        value={text}
        onChangeText={search}
        onIconPress={reset}
        onClearIconPress={reset}
        placeholder="Cerca..."
        searchAccessibilityLabel="Cerca..."
        aria-label="Cerca..."
        style={{ width: 300 }}
      />
    );
  }

  return (
    <IconButton
      icon="magnify"
      onPress={() => setVisible(true)}
      accessibilityLabel="Cerca"
      aria-label="Cerca"
    />
  );
};
