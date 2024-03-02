import { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { Retirement } from "@neverquest/components/Retirement";
import IconRetire from "@neverquest/icons/retire.svg?react";
import { hasFlatlined } from "@neverquest/state/character";
import { location } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Retire() {
  const hasFlatlinedValue = useRecoilValue(hasFlatlined);
  const isShowingRetire = useRecoilValue(isShowing("retire"));
  const locationValue = useRecoilValue(location);

  const [isShowingRetirement, setIsShowingRetirement] = useState(false);

  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip>
            <span>Retire</span>
          </Tooltip>
        }
      >
        <div
          className={isShowingRetire ? getAnimationClass({ animation: "bounceIn" }) : "invisible"}
        >
          <Button
            disabled={hasFlatlinedValue || locationValue === "wilderness"}
            onClick={() => {
              setIsShowingRetirement(true);
            }}
            variant="outline-dark"
          >
            <IconImage Icon={IconRetire} />
          </Button>
        </div>
      </OverlayTrigger>

      <Retirement state={[isShowingRetirement, setIsShowingRetirement]} />
    </>
  );
}
