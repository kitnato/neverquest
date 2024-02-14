import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FormControl } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LABEL_UNKNOWN, NAME_LENGTH_MAXIMUM } from "@neverquest/data/general";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import IconFlatlined from "@neverquest/icons/flatlined.svg?react";
import IconName from "@neverquest/icons/name.svg?react";
import { hasFlatlined, name } from "@neverquest/state/character";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Name() {
  const hasFlatlinedValue = useRecoilValue(hasFlatlined);
  const [nameValue, setName] = useRecoilState(name);

  const [canEdit, setCanEdit] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const element = useRef<HTMLInputElement | null>(null);

  const progressQuest = useProgressQuest();

  useEffect(() => {
    const { current } = element;

    if (current !== null && isEditing) {
      if (nameValue === LABEL_UNKNOWN) {
        current.select();
      } else {
        current.focus();
      }
    }
  }, [isEditing, nameValue]);

  useLayoutEffect(() => {
    new MutationObserver(() => {
      const isModalOpen = document.body.classList.contains("modal-open");

      setCanEdit(!isModalOpen);
      setIsEditing(false);
    }).observe(document.body, { attributeFilter: ["class"] });
  }, []);

  return (
    <IconDisplay
      className={getAnimationClass({ animation: "flipInX" })}
      Icon={hasFlatlinedValue ? IconFlatlined : IconName}
      tooltip="Name"
    >
      {isEditing ? (
        <FormControl
          onBlur={({ currentTarget: { value } }) => {
            const trimmedValue = value.trim().replaceAll(/\s+/g, " ");

            if (trimmedValue === "") {
              setName(LABEL_UNKNOWN);
            } else {
              setName(trimmedValue);
              progressQuest({ quest: "settingName" });

              if (trimmedValue.toLowerCase().replaceAll(/[^\da-z]/g, "") === "patient7") {
                progressQuest({ quest: "settingPatientName" });
              }
            }

            setIsEditing(false);
          }}
          onChange={({ target: { value } }) => {
            if (value.length >= NAME_LENGTH_MAXIMUM) {
              return;
            }

            setName(value);
          }}
          onKeyDown={({ key }) => {
            if (key === "Enter") {
              setIsEditing(false);
            }
          }}
          ref={element}
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
