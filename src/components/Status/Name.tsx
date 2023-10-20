import { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LABEL_UNKNOWN } from "@neverquest/data/general";
import IconDead from "@neverquest/icons/dead.svg?react";
import IconAlive from "@neverquest/icons/name.svg?react";
import { isGameOver, name } from "@neverquest/state/character";

export function Name() {
  const isGameOverValue = useRecoilValue(isGameOver);
  const [nameValue, setName] = useRecoilState(name);

  const [canEdit, setCanEdit] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    new MutationObserver(() => {
      setCanEdit(!document.body.classList.contains("modal-open"));
    }).observe(document.body, { attributes: true });
  }, []);

  return (
    <IconDisplay
      contents={
        <FormControl
          className={canEdit ? "hover-grow" : undefined}
          disabled={!canEdit}
          onBlur={({ currentTarget: { value } }) => {
            if (!value) {
              setName(LABEL_UNKNOWN);
            }

            setIsEditing(false);
          }}
          onChange={({ target: { value } }) => setName(value)}
          onClick={({ currentTarget }) => {
            if (currentTarget.value === LABEL_UNKNOWN) {
              currentTarget.setSelectionRange(0, 0);
              currentTarget.select();
            }

            setIsEditing(true);
          }}
          onKeyDown={({ key }) => key === "Enter" && setIsEditing(false)}
          plaintext={!isEditing}
          value={nameValue}
        />
      }
      Icon={isGameOverValue ? IconDead : IconAlive}
      tooltip="Name"
    />
  );
}
