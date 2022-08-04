import { useRecoilState, useRecoilValue } from "recoil";
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import { FormControl, Stack } from "react-bootstrap";

import ImageIcon from "@neverquest/components/ImageIcon";
import { ReactComponent as AliveIcon } from "@neverquest/icons/domino-mask.svg";
import { ReactComponent as DeadIcon } from "@neverquest/icons/skull-crossed-bones.svg";
import { name } from "@neverquest/state/character";
import { isGameOver } from "@neverquest/state/settings";

export default function Name() {
  const [nameValue, setName] = useRecoilState(name);
  const isGameOverValue = useRecoilValue(isGameOver);

  const [isEditing, setEditing] = useState(false);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon Icon={isGameOverValue ? DeadIcon : AliveIcon} tooltip="Name" />

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
