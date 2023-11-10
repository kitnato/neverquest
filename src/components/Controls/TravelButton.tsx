import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { LABEL_UNKNOWN } from "@neverquest/data/general";
import { useToggleLocation } from "@neverquest/hooks/actions/useToggleLocation";
import IconTravel from "@neverquest/icons/travel.svg?react";
import { isGameOver } from "@neverquest/state/character";
import { isStageCompleted, isWilderness } from "@neverquest/state/encounter";
import { encumbranceExtent } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { hasLooted } from "@neverquest/state/resources";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function TravelButton() {
  const encumbranceExtentValue = useRecoilValue(encumbranceExtent);
  const hasLootedValue = useRecoilValue(hasLooted);
  const isGameOverValue = useRecoilValue(isGameOver);
  const isShowingLocation = useRecoilValue(isShowing("location"));
  const isStageCompletedValue = useRecoilValue(isStageCompleted);
  const isWildernessValue = useRecoilValue(isWilderness);

  const toggleLocation = useToggleLocation();

  // Happens only if the knapsack is sold and carrying more than the weight difference of its absence.
  const isOverEncumbered = !isWildernessValue && encumbranceExtentValue === "over-encumbered";

  if (!(hasLootedValue && isStageCompletedValue) && isWildernessValue) {
    return null;
  }

  return (
    <OverlayTrigger
      overlay={
        <Tooltip>
          {isOverEncumbered
            ? "Over-encumbered - cannot move."
            : `${isWildernessValue ? "Go to" : "Return to"} ${
                isWildernessValue ? (isShowingLocation ? "Caravan" : LABEL_UNKNOWN) : "Wilderness"
              }`}
        </Tooltip>
      }
    >
      <span className={getAnimationClass({ name: "bounceIn" })}>
        <Button
          className={
            isWildernessValue ? getAnimationClass({ isInfinite: true, name: "pulse" }) : undefined
          }
          disabled={isGameOverValue || isOverEncumbered}
          onClick={toggleLocation}
          variant="outline-dark"
        >
          <IconImage Icon={IconTravel} isMirrored={!isWildernessValue} />
        </Button>
      </span>
    </OverlayTrigger>
  );
}
