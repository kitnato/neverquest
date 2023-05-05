import { useState } from "react";
import { FormControl } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LABEL_UNKNOWN } from "@neverquest/data/constants";
import { ReactComponent as IconDead } from "@neverquest/icons/dead.svg";
import { ReactComponent as IconAlive } from "@neverquest/icons/name.svg";
import { isGameOver, name } from "@neverquest/state/character";

export function Name() {
  const isGameOverValue = useRecoilValue(isGameOver);
  const [nameValue, setName] = useRecoilState(name);

  const [isEditing, setEditing] = useState(false);

  return (
    <IconDisplay
      contents={
        <FormControl
          className="hover-grow"
          onBlur={({ currentTarget: { value } }) => {
            if (!value) {
              setName(LABEL_UNKNOWN);
            }

            setEditing(false);
          }}
          onChange={({ target: { value } }) => setName(value)}
          onClick={({ currentTarget }) => {
            if (currentTarget.value === LABEL_UNKNOWN) {
              currentTarget.setSelectionRange(0, 0);
              currentTarget.select();
            }

            setEditing(true);
          }}
          onKeyDown={({ key }) => key === "Enter" && setEditing(false)}
          plaintext={!isEditing}
          value={nameValue}
        />
      }
      Icon={isGameOverValue ? IconDead : IconAlive}
      tooltip="Name"
    />
  );
}
