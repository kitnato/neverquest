import { type ChangeEvent, useState } from "react";
import { Button, Form, Modal, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

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
import { formatValue } from "@neverquest/utilities/formatters";

export function CompassNavigate() {
  const resetIsInventoryOpen = useResetRecoilState(isInventoryOpen);
  const isStageCompletedValue = useRecoilValue(isStageCompleted);
  const isStageStartedValue = useRecoilValue(isStageStarted);
  const isWildernessValue = useRecoilValue(isWilderness);
  const [stageValue, setStage] = useRecoilState(stage);
  const wildernessesValue = useRecoilValue(wildernesses);

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
        overlay={<Tooltip>The needle is spinning.</Tooltip>}
        trigger={canNavigate ? [] : ["hover", "focus"]}
      >
        <span>
          <Button
            disabled={!canNavigate}
            onClick={() => setIsShowingNavigation(true)}
            variant="outline-dark"
          >
            Navigate
          </Button>
        </span>
      </OverlayTrigger>

      <Modal onHide={() => setIsShowingNavigation(false)} show={isShowingNavigation}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Stack direction="horizontal" gap={3}>
              <IconImage Icon={IconCompass} />
              Navigate the wilderness
            </Stack>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <IconDisplay
            contents={
              <Form.Select disabled={!canNavigate} onChange={handleNavigate} value={stageValue}>
                {wildernessesValue.map((name, index) => {
                  const stageIndex = index + 1;

                  return (
                    <option key={name} value={stageIndex}>{`Stage ${formatValue({
                      value: stageIndex,
                    })} - ${name}`}</option>
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
