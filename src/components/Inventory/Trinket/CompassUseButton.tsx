import { type ChangeEvent, useState } from "react";
import { Button, Form, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReactComponent as IconNavigation } from "@neverquest/icons/navigation.svg";
import {
  isLevelCompleted,
  isLevelStarted,
  isWilderness,
  level,
  progress,
  wildernesses,
} from "@neverquest/state/encounter";
import { isInventoryOpen } from "@neverquest/state/inventory";
import { hasLooted } from "@neverquest/state/resources";

export function CompassUseButton() {
  const hasLootedValue = useRecoilValue(hasLooted);
  const resetIsInventoryOpen = useResetRecoilState(isInventoryOpen);
  const resetProgress = useResetRecoilState(progress);
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
    resetProgress();
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
        trigger={canNavigate ? [] : ["hover", "focus"]}
      >
        <span className="d-inline-block">
          <Button disabled={!canNavigate} onClick={() => setIsShowing(true)} variant="outline-dark">
            Use
          </Button>
        </span>
      </OverlayTrigger>

      <Modal onHide={() => setIsShowing(false)} show={isShowing}>
        <Modal.Header closeButton>
          <Modal.Title>Travel between wildernesses</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <IconDisplay
            contents={
              <Form.Select disabled={!canNavigate} onChange={handleNavigate} value={levelValue}>
                {wildernessesValue.map((name, index) => {
                  const levelIndex = index + 1;

                  return (
                    <option key={name} value={levelIndex}>{`Level ${levelIndex} - ${name}`}</option>
                  );
                })}
              </Form.Select>
            }
            Icon={IconNavigation}
            tooltip="Navigation"
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
