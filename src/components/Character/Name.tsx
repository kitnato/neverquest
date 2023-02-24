import { useState } from "react";
import { FormControl } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReactComponent as AliveIcon } from "@neverquest/icons/domino-mask.svg";
import { ReactComponent as DeadIcon } from "@neverquest/icons/skull-crossed-bones.svg";
import { name } from "@neverquest/state/character";
import { isGameOver } from "@neverquest/state/settings";

export function Name() {
  const isGameOverValue = useRecoilValue(isGameOver);
  const [nameValue, setName] = useRecoilState(name);

  const [isEditing, setEditing] = useState(false);

  return (
    <IconDisplay
      contents={
        <FormControl
          className="hover-grow"
          onBlur={() => setEditing(false)}
          onChange={({ target: { value } }) => setName(value)}
          onClick={({ currentTarget: { select, setSelectionRange } }) => {
            setSelectionRange(0, 0);
            select();

            setEditing(true);
          }}
          onKeyDown={({ key }) => key === "Enter" && setEditing(false)}
          plaintext={!isEditing}
          value={nameValue}
        />
      }
      Icon={isGameOverValue ? DeadIcon : AliveIcon}
      tooltip="Name"
    />
  );
}
