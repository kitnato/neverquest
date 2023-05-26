import { type ChangeEvent, useState } from "react";
import { Button, Form, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { ConfirmationDialog } from "@neverquest/components/ConfirmationDialog";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness";
import { ReactComponent as IconCompass } from "@neverquest/icons/compass.svg";
import { ReactComponent as IconNavigation } from "@neverquest/icons/navigation.svg";
import {
  isLevelCompleted,
  isLevelStarted,
  isWilderness,
  level,
  wildernesses,
} from "@neverquest/state/encounter";
import { isInventoryOpen } from "@neverquest/state/inventory";
import { hasLooted } from "@neverquest/state/resources";

export function UseCompass() {
  const hasLootedValue = useRecoilValue(hasLooted);
  const resetIsInventoryOpen = useResetRecoilState(isInventoryOpen);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const isLevelStartedValue = useRecoilValue(isLevelStarted);
  const isWildernessValue = useRecoilValue(isWilderness);
  const [levelValue, setLevel] = useRecoilState(level);
  const wildernessesValue = useRecoilValue(wildernesses);

  const [isShowingConfirmation, setIsShowingConfirmation] = useState(false);
  const [isShowingNavigation, setIsShowingNavigation] = useState(false);

  const resetWilderness = useResetWilderness();

  const canNavigate = (!isLevelStartedValue || isLevelCompletedValue) && isWildernessValue;

  const handleNavigate = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    setIsShowingNavigation(false);
    setLevel(Number(value));

    resetIsInventoryOpen();
    resetWilderness();
  };

  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip>
            {isWildernessValue ? "Too many monsters." : "The caravan is interfering."}
          </Tooltip>
        }
        trigger={canNavigate ? [] : ["hover", "focus"]}
      >
        <span>
          <Button
            disabled={!canNavigate}
            onClick={() => {
              if (isLevelCompletedValue && !hasLootedValue) {
                setIsShowingConfirmation(true);
              } else {
                setIsShowingNavigation(true);
              }
            }}
            variant="outline-dark"
          >
            Use
          </Button>
        </span>
      </OverlayTrigger>

      <Modal onHide={() => setIsShowingNavigation(false)} show={isShowingNavigation}>
        <Modal.Header closeButton>
          <Modal.Title>
            <IconImage Icon={IconCompass} />
            &nbsp;Navigate the wilderness
          </Modal.Title>
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

      <ConfirmationDialog
        confirmationLabel="Navigate"
        message="Navigating now will forfeit all uncollected loot."
        onConfirm={() => setIsShowingNavigation(true)}
        setHide={() => setIsShowingConfirmation(false)}
        show={isShowingConfirmation}
        title="Forfeit loot?"
      />
    </>
  );
}
