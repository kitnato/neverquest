import { useAtom, useAtomValue } from "jotai";
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import { FormControl, Stack } from "react-bootstrap";

import ImageIcon from "neverquest/components/ImageIcon";
import aliveIcon from "neverquest/icons/domino-mask.svg";
import deadIcon from "neverquest/icons/skull-crossed-bones.svg";
import { name } from "neverquest/state/character";
import { gameOver } from "neverquest/state/global";

export default function Name() {
  const [nameValue, setName] = useAtom(name);
  const isGameOver = useAtomValue(gameOver);
  const [isEditing, setEditing] = useState(false);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={isGameOver ? deadIcon : aliveIcon} tooltip="Name" />

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
