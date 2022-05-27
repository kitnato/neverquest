import { useAtom } from "jotai";
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
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
        onChange={({ target }: ChangeEvent<HTMLInputElement>) => setName(target.value)}
        onClick={({ currentTarget }: MouseEvent<HTMLInputElement>) => {
          setEditing(true);
          currentTarget.setSelectionRange(0, 0);
          currentTarget.select();
        }}
        onKeyPress={({ key }: KeyboardEvent<HTMLInputElement>) =>
          key === "Enter" && setEditing(false)
        }
        plaintext={!isEditing}
        value={nameValue}
      />
    </Stack>
  );
}
