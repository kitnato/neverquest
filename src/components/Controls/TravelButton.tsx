import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { LABEL_UNKNOWN } from "@neverquest/data/general";
import { useToggleLocation } from "@neverquest/hooks/actions/useToggleLocation";
import { ReactComponent as IconTravel } from "@neverquest/icons/travel.svg";
import { isGameOver } from "@neverquest/state/character";
import { isStageCompleted, isWilderness, stageMaximum } from "@neverquest/state/encounter";
import { hasLooted } from "@neverquest/state/resources";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function TravelButton() {
  const hasLootedValue = useRecoilValue(hasLooted);
  const isGameOverValue = useRecoilValue(isGameOver);
  const isStageCompletedValue = useRecoilValue(isStageCompleted);
  const isWildernessValue = useRecoilValue(isWilderness);
  const stageMaximumValue = useRecoilValue(stageMaximum);

  const toggleLocation = useToggleLocation();

  if (!(hasLootedValue && isStageCompletedValue) && isWildernessValue) {
    return null;
  }

  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip>
            {`${isWildernessValue ? "Go to" : "Return to"} ${
              stageMaximumValue === 1 && isWildernessValue
                ? LABEL_UNKNOWN
                : isWildernessValue
                ? "Caravan"
                : "Wilderness"
            }`}
          </Tooltip>
        }
      >
        <span className={getAnimationClass({ name: "bounceIn" })}>
          <Button
            className={
              isWildernessValue ? getAnimationClass({ isInfinite: true, name: "pulse" }) : undefined
            }
            disabled={isGameOverValue}
            onClick={toggleLocation}
            variant="outline-dark"
          >
            <IconImage Icon={IconTravel} isMirrored={!isWildernessValue} />
          </Button>
        </span>
      </OverlayTrigger>
    </>
  );
}
