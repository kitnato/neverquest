import { useState } from "react";
import {
  Button,
  FormSelect,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
  OverlayTrigger,
  Stack,
  Tooltip,
} from "react-bootstrap";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness";
import IconCompass from "@neverquest/icons/compass.svg?react";
import IconNavigation from "@neverquest/icons/navigation.svg?react";
import {
  isStageCompleted,
  isStageStarted,
  location,
  stage,
  wildernesses,
} from "@neverquest/state/encounter";
import { isInventoryOpen } from "@neverquest/state/inventory";
import { formatNumber } from "@neverquest/utilities/formatters";

export function CompassNavigate() {
  const resetIsInventoryOpen = useResetRecoilState(isInventoryOpen);
  const isStageCompletedValue = useRecoilValue(isStageCompleted);
  const isStageStartedValue = useRecoilValue(isStageStarted);
  const locationValue = useRecoilValue(location);
  const [stageValue, setStage] = useRecoilState(stage);
  const wildernessesValue = useRecoilValue(wildernesses);

  const [isShowingNavigation, setIsShowingNavigation] = useState(false);

  const progressQuest = useProgressQuest();
  const resetWilderness = useResetWilderness();

  const canNavigate =
    (!isStageStartedValue || isStageCompletedValue) && locationValue === "wilderness";

  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip>The needle is spinning.</Tooltip>}
        trigger={canNavigate ? [] : ["hover", "focus"]}
      >
        <span>
          <Button
            disabled={!canNavigate}
            onClick={() => {
              setIsShowingNavigation(true);
            }}
            variant="outline-dark"
          >
            Navigate
          </Button>
        </span>
      </OverlayTrigger>

      <Modal
        onHide={() => {
          setIsShowingNavigation(false);
        }}
        show={isShowingNavigation}
      >
        <ModalHeader closeButton>
          <ModalTitle>
            <Stack direction="horizontal" gap={3}>
              <IconImage Icon={IconCompass} />
              Navigate the wilderness
            </Stack>
          </ModalTitle>
        </ModalHeader>

        <ModalBody>
          <IconDisplay Icon={IconNavigation} tooltip="Navigation">
            <FormSelect
              disabled={!canNavigate}
              onChange={({ target: { value } }) => {
                progressQuest({ quest: "warpingWilderness" });

                setIsShowingNavigation(false);
                setStage(Number(value));

                resetIsInventoryOpen();
                resetWilderness();
              }}
              value={stageValue}
            >
              {wildernessesValue.map((name, index) => {
                const stageIndex = index + 1;

                return (
                  <option key={name} value={stageIndex}>{`Stage ${formatNumber({
                    value: stageIndex,
                  })} - ${name}`}</option>
                );
              })}
            </FormSelect>
          </IconDisplay>
        </ModalBody>
      </Modal>
    </>
  );
}
