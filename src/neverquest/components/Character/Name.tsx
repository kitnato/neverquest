import { useAtom } from "jotai";
import { useState } from "react";
import FormControl from "react-bootstrap/FormControl";
import Stack from "react-bootstrap/Stack";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/domino-mask.svg";
import { name } from "neverquest/state/character";

export default function Character() {
  const [nameValue, setName] = useAtom(name);
  const [isEditing, setEditing] = useState(false);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Name" />

      <FormControl
        className="hover-grow"
        onBlur={() => setEditing(false)}
        onChange={({ target }) => setName(target.value)}
        onClick={({ currentTarget }) => {
          setEditing(true);
          currentTarget.setSelectionRange(0, 0);
          currentTarget.select();
        }}
        onKeyPress={({ key }) => key === "Enter" && setEditing(false)}
        plaintext={!isEditing}
        value={nameValue}
      />
    </Stack>
  );
}
