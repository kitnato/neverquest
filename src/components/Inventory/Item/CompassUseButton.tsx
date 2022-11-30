import { ChangeEvent, MouseEvent, useState } from "react";
import { Button, Form, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import { ReactComponent as Icon } from "@neverquest/icons/treasure-map.svg";
import { isLevelCompleted, isWilderness, level, wildernesses } from "@neverquest/state/encounter";
import { isLevelStarted } from "@neverquest/state/monster";
import { hasLooted } from "@neverquest/state/resources";
import { UIVariant } from "@neverquest/types/ui";

export default function () {
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const isLevelStartedValue = useRecoilValue(isLevelStarted);
  const isWildernessValue = useRecoilValue(isWilderness);
  const hasLootedValue = useRecoilValue(hasLooted);
  const wildernessesValue = useRecoilValue(wildernesses);
  const [levelValue, setLevel] = useRecoilState(level);

  const [isShowing, setShowing] = useState(false);

  const canNavigate =
    (!isLevelStartedValue || (isLevelCompletedValue && hasLootedValue)) && isWildernessValue;

  const handleNavigate = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    setShowing(false);
    setLevel(+value);
  };

  const handleShowing = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    currentTarget.blur();

    setShowing(true);
  };

  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip>Requires a quiet wilderness.</Tooltip>}
        placement="top"
        trigger={!canNavigate ? ["hover", "focus"] : []}
      >
        <span className="d-inline-block">
          <Button disabled={!canNavigate} onClick={handleShowing} variant={UIVariant.Outline}>
            Use
          </Button>
        </span>
      </OverlayTrigger>

      <Modal onHide={() => setShowing(false)} show={isShowing}>
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
