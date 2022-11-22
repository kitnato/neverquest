import { ChangeEvent, MouseEvent, useState } from "react";
import { Button, Form, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import ImageIcon from "@neverquest/components/IconImage";
import { ReactComponent as Icon } from "@neverquest/icons/treasure-map.svg";
import { isLevelCompleted, isWilderness, level, wildernesses } from "@neverquest/state/encounter";
import { hasCompass } from "@neverquest/state/inventory";
import { isMonsterEngaged } from "@neverquest/state/monster";
import { UIVariant } from "@neverquest/types/ui";

export default function ({ isDisabled }: { isDisabled: boolean }) {
  const hasCompassValue = useRecoilValue(hasCompass);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const isMonsterEngagedValue = useRecoilValue(isMonsterEngaged);
  const isWildernessValue = useRecoilValue(isWilderness);
  const wildernessesValue = useRecoilValue(wildernesses);
  const [levelValue, setLevel] = useRecoilState(level);

  const [isShowing, setShowing] = useState(false);

  const canNavigate = (!isMonsterEngagedValue || isLevelCompletedValue) && isWildernessValue;

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
        overlay={
          <Tooltip>{`Cannot navigate ${
            isWildernessValue ? "while monsters are hunting" : "while at the Caravan"
          }.`}</Tooltip>
        }
        placement="top"
        trigger={canNavigate ? [] : ["hover", "focus"]}
      >
        <span className="d-inline-block">
          <Button
            disabled={isDisabled || !canNavigate}
            onClick={handleShowing}
            style={{ visibility: hasCompassValue ? "visible" : "hidden" }}
            variant={UIVariant.Outline}
          >
            <ImageIcon Icon={Icon} />
          </Button>
        </span>
      </OverlayTrigger>

      <Modal onHide={() => setShowing(false)} show={isShowing}>
        <Modal.Header closeButton>
          <Modal.Title>Navigate to another wilderness</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Select disabled={!canNavigate} onChange={handleNavigate} value={levelValue}>
            {wildernessesValue.map(({ name }, index) => {
              const levelIndex = index + 1;

              return (
                <option key={name} value={levelIndex}>{`Level ${levelIndex} - ${name}`}</option>
              );
            })}
          </Form.Select>
        </Modal.Body>
      </Modal>
    </>
  );
}
