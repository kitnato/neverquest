import { ChangeEvent, MouseEvent, useState } from "react";
import { Button, Form, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import { ReactComponent as Icon } from "@neverquest/icons/treasure-map.svg";
import {
  isLevelCompleted,
  isLevelStarted,
  isWilderness,
  level,
  wildernesses,
} from "@neverquest/state/encounter";
import { isInventoryOpen } from "@neverquest/state/inventory";
import { hasLooted } from "@neverquest/state/resources";
import { UIVariant } from "@neverquest/types/ui";

export default function () {
  const hasLootedValue = useRecoilValue(hasLooted);
  const resetIsInventoryOpen = useResetRecoilState(isInventoryOpen);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const isLevelStartedValue = useRecoilValue(isLevelStarted);
  const isWildernessValue = useRecoilValue(isWilderness);
  const [levelValue, setLevel] = useRecoilState(level);
  const wildernessesValue = useRecoilValue(wildernesses);

  const [isShowing, setIsShowing] = useState(false);

  const canNavigate =
    (!isLevelStartedValue || (isLevelCompletedValue && hasLootedValue)) && isWildernessValue;

  const handleNavigate = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    setIsShowing(false);
    resetIsInventoryOpen();
    setLevel(+value);
  };

  const handleShowing = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    currentTarget.blur();

    setIsShowing(true);
  };

  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip>
            {isWildernessValue
              ? `Too ${isLevelCompletedValue ? "much loot" : "many monsters"}.`
              : "The caravan is interfering."}
          </Tooltip>
        }
        placement="top"
        trigger={!canNavigate ? ["hover", "focus"] : []}
      >
        <span className="d-inline-block">
          <Button disabled={!canNavigate} onClick={handleShowing} variant={UIVariant.Outline}>
            Use
          </Button>
        </span>
      </OverlayTrigger>

      <Modal onHide={() => setIsShowing(false)} show={isShowing}>
        <Modal.Header closeButton>
          <Modal.Title>Navigate to another wilderness</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <IconDisplay
            contents={
              <Form.Select disabled={!canNavigate} onChange={handleNavigate} value={levelValue}>
                {wildernessesValue.map(({ name }, index) => {
                  const levelIndex = index + 1;

                  return (
                    <option key={name} value={levelIndex}>{`Level ${levelIndex} - ${name}`}</option>
                  );
                })}
              </Form.Select>
            }
            Icon={Icon}
            tooltip="Navigation"
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
