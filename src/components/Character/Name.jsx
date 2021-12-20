import { useState } from "react";
import FormControl from "react-bootstrap/FormControl";
import Stack from "react-bootstrap/Stack";
import { useRecoilState } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/domino-mask.svg";
import { name } from "state/character";

export default function Character() {
  const [nameValue, setName] = useRecoilState(name);
  const [isEditing, setEditing] = useState(false);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Name" />

      <FormControl
        plaintext={!isEditing}
        readOnly={!isEditing}
        value={nameValue}
        onChange={(event) => setName(event.target.value)}
        onClick={() => setEditing(true)}
        onKeyPress={({ charCode }) => charCode === 13 && setEditing(false)}
        onBlur={() => setEditing(false)}
      />
    </Stack>
  );
}
