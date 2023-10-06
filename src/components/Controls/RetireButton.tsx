import { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { Retirement } from "@neverquest/components/Retirement";
import { RETIREMENT_MINIMUM } from "@neverquest/data/general";
import { ReactComponent as IconRetire } from "@neverquest/icons/retire.svg";
import { isGameOver } from "@neverquest/state/character";
import { isWilderness, stage } from "@neverquest/state/encounter";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function RetireButton() {
  const isGameOverValue = useRecoilValue(isGameOver);
  const isWildernessValue = useRecoilValue(isWilderness);
  const stageValue = useRecoilValue(stage);

  const [isShowingRetire, setIsShowingRetire] = useState(false);

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Retire</Tooltip>}>
        <span
          className={`${
            stageValue >= RETIREMENT_MINIMUM ? getAnimationClass({ name: "bounceIn" }) : "invisible"
          }`}
        >
          <Button
            disabled={isGameOverValue || isWildernessValue}
            onClick={() => setIsShowingRetire(true)}
            variant="outline-dark"
          >
            <IconImage Icon={IconRetire} />
          </Button>
        </span>
      </OverlayTrigger>

      <Retirement showing={[isShowingRetire, setIsShowingRetire]} />
    </>
  );
}
