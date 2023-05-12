import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { ReactComponent as IconRetire } from "@neverquest/icons/retire.svg";
import { isGameOver } from "@neverquest/state/character";
import { isWilderness } from "@neverquest/state/encounter";
import { getAnimationClass } from "@neverquest/utilities/getters";

// TODO
export function RetireButton() {
  const isGameOverValue = useRecoilValue(isGameOver);
  const isWildernessValue = useRecoilValue(isWilderness);

  const handleRetirement = () => {
    // TODO
  };

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Retire</Tooltip>}>
        <span
          className={`d-inline-block ${getAnimationClass({
            type: "bounceIn",
          })}`}
        >
          <Button
            className="invisible"
            disabled={isGameOverValue || isWildernessValue}
            onClick={handleRetirement}
            variant="outline-dark"
          >
            <IconImage Icon={IconRetire} />
          </Button>
        </span>
      </OverlayTrigger>
    </>
  );
}
