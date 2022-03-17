import { useState } from "react";
import FormControl from "react-bootstrap/FormControl";
import Stack from "react-bootstrap/Stack";
import { useRecoilState } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/domino-mask.svg";
import { name } from "neverquest/state/character";

export default function Character() {
  const [nameValue, setName] = useRecoilState(name);
  const [isEditing, setEditing] = useState(false);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Name" />

      <FormControl
        onBlur={() => setEditing(false)}
        onChange={(event) => setName(event.target.value)}
        onClick={(event) => {
          setEditing(true);
          event.currentTarget.select();
        }}
        onKeyPress={({ key }) => key === "Enter" && setEditing(false)}
        plaintext={!isEditing}
        readOnly={!isEditing}
        value={nameValue}
      />
    </Stack>
  );
}
