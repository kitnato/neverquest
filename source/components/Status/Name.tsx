import { useLayoutEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LABEL_UNKNOWN } from "@neverquest/data/general";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import IconDead from "@neverquest/icons/dead.svg?react";
import IconAlive from "@neverquest/icons/name.svg?react";
import { isGameOver, name } from "@neverquest/state/character";

export function Name() {
  const isGameOverValue = useRecoilValue(isGameOver);
  const [nameValue, setName] = useRecoilState(name);

  const [canEdit, setCanEdit] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const progressQuest = useProgressQuest();

  useLayoutEffect(() => {
    new MutationObserver(() => {
      const isModalOpen = document.body.classList.contains("modal-open");

      setCanEdit(!isModalOpen);
      setIsEditing(false);
    }).observe(document.body, { attributes: true });
  }, []);

  return (
    <IconDisplay Icon={isGameOverValue ? IconDead : IconAlive} tooltip="Name">
      {isEditing ? (
        <FormControl
          onBlur={({ currentTarget: { value } }) => {
            if (!value) {
              setName(LABEL_UNKNOWN);
            }

            setIsEditing(false);
          }}
          onChange={({ target: { value } }) => {
            if (!value) {
              return;
            }

            setName(value);
            progressQuest({ quest: "settingName" });
          }}
          onKeyDown={({ key }) => {
            if (key === "Enter") {
              setIsEditing(false);
            }
          }}
          value={nameValue}
        />
      ) : (
        <span
          className={canEdit ? "hover-grow" : undefined}
          onClick={() => {
            if (canEdit) {
              setIsEditing(true);
            }
          }}
        >
          {nameValue}
        </span>
      )}
    </IconDisplay>
  );
}
