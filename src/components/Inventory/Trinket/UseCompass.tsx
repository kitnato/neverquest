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
  isStageCompleted,
  isStageStarted,
  isWilderness,
  stage,
  wildernesses,
} from "@neverquest/state/encounter";
import { isInventoryOpen } from "@neverquest/state/inventory";
import { hasLooted } from "@neverquest/state/resources";

export function UseCompass() {
  const hasLootedValue = useRecoilValue(hasLooted);
  const resetIsInventoryOpen = useResetRecoilState(isInventoryOpen);
  const isStageCompletedValue = useRecoilValue(isStageCompleted);
  const isStageStartedValue = useRecoilValue(isStageStarted);
  const isWildernessValue = useRecoilValue(isWilderness);
  const [stageValue, setStage] = useRecoilState(stage);
  const wildernessesValue = useRecoilValue(wildernesses);

  const [isShowingConfirmation, setIsShowingConfirmation] = useState(false);
  const [isShowingNavigation, setIsShowingNavigation] = useState(false);

  const resetWilderness = useResetWilderness();

  const canNavigate = (!isStageStartedValue || isStageCompletedValue) && isWildernessValue;

  const handleNavigate = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    setIsShowingNavigation(false);
    setStage(Number(value));

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
              if (isStageCompletedValue && !hasLootedValue) {
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
              <Form.Select disabled={!canNavigate} onChange={handleNavigate} value={stageValue}>
                {wildernessesValue.map((name, index) => {
                  const stageIndex = index + 1;

                  return (
                    <option key={name} value={stageIndex}>{`Level ${stageIndex} - ${name}`}</option>
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
