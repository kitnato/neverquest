import { useRecoilState, useRecoilValue } from "recoil";
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import { FormControl } from "react-bootstrap";

import IconDisplay from "@neverquest/components/IconDisplay";
import { ReactComponent as AliveIcon } from "@neverquest/icons/domino-mask.svg";
import { ReactComponent as DeadIcon } from "@neverquest/icons/skull-crossed-bones.svg";
import { name } from "@neverquest/state/character";
import { isGameOver } from "@neverquest/state/settings";

export default function () {
  const [nameValue, setName] = useRecoilState(name);
  const isGameOverValue = useRecoilValue(isGameOver);

  const [isEditing, setEditing] = useState(false);

  return (
    <IconDisplay
      contents={
        <FormControl
          className="hover-grow"
          onBlur={() => setEditing(false)}
          onChange={({ target }: ChangeEvent<HTMLInputElement>) => setName(target.value)}
          onClick={({ currentTarget }: MouseEvent<HTMLInputElement>) => {
            setEditing(true);
            currentTarget.setSelectionRange(0, 0);
            currentTarget.select();
          }}
          onKeyDown={({ key }: KeyboardEvent<HTMLInputElement>) =>
            key === "Enter" && setEditing(false)
          }
          plaintext={!isEditing}
          value={nameValue}
        />
      }
      Icon={isGameOverValue ? DeadIcon : AliveIcon}
      tooltip="Name"
    />
  );
}
