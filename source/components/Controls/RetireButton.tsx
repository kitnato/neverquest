import { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { Retirement } from "@neverquest/components/Retirement";
import { RETIREMENT_STAGE_MINIMUM } from "@neverquest/data/general";
import IconRetire from "@neverquest/icons/retire.svg?react";
import { isGameOver } from "@neverquest/state/character";
import { location, stageMaximum } from "@neverquest/state/encounter";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function RetireButton() {
  const isGameOverValue = useRecoilValue(isGameOver);
  const locationValue = useRecoilValue(location);
  const stageMaximumValue = useRecoilValue(stageMaximum);

  const [isShowingRetire, setIsShowingRetire] = useState(false);

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Retire</Tooltip>}>
        <span
          className={`${
            stageMaximumValue >= RETIREMENT_STAGE_MINIMUM
              ? getAnimationClass({ animation: "bounceIn" })
              : "invisible"
          }`}
        >
          <Button
            disabled={isGameOverValue || locationValue === "wilderness"}
            onClick={() => {
              setIsShowingRetire(true);
            }}
            variant="outline-dark"
          >
            <IconImage Icon={IconRetire} />
          </Button>
        </span>
      </OverlayTrigger>

      <Retirement state={[isShowingRetire, setIsShowingRetire]} />
    </>
  );
}
