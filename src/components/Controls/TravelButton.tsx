import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { LABEL_UNKNOWN } from "@neverquest/data/general";
import { useToggleLocation } from "@neverquest/hooks/actions/useToggleLocation";
import IconFinalTravel from "@neverquest/icons/final-travel.svg?react";
import IconTravel from "@neverquest/icons/travel.svg?react";
import { isGameOver } from "@neverquest/state/character";
import { encounter, isStageCompleted, location } from "@neverquest/state/encounter";
import { encumbranceExtent } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { hasLooted } from "@neverquest/state/resources";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function TravelButton() {
  const encounterValue = useRecoilValue(encounter);
  const encumbranceExtentValue = useRecoilValue(encumbranceExtent);
  const hasLootedValue = useRecoilValue(hasLooted);
  const isGameOverValue = useRecoilValue(isGameOver);
  const isShowingLocation = useRecoilValue(isShowing("location"));
  const isStageCompletedValue = useRecoilValue(isStageCompleted);
  const locationValue = useRecoilValue(location);

  const toggleLocation = useToggleLocation();

  // Occurs if the knapsack is sold and carrying more than the weight difference of its absence.
  const isOverEncumbered =
    locationValue === "caravan" && encumbranceExtentValue === "over-encumbered";

  if ((hasLootedValue && isStageCompletedValue) || !locationValue) {
    return (
      <OverlayTrigger
        overlay={
          <Tooltip>
            {isOverEncumbered
              ? "Over-encumbered - cannot move."
              : `${
                  locationValue === "wilderness"
                    ? `Go to ${
                        !isShowingLocation || encounterValue === "res cogitans"
                          ? LABEL_UNKNOWN
                          : "caravan"
                      }`
                    : "Return to wilderness"
                }`}
          </Tooltip>
        }
      >
        <span className={getAnimationClass({ name: "bounceIn" })}>
          <Button
            className={
              locationValue === "wilderness"
                ? getAnimationClass({ isInfinite: true, name: "pulse" })
                : undefined
            }
            disabled={isGameOverValue || isOverEncumbered}
            onClick={toggleLocation}
            variant="outline-dark"
          >
            <IconImage
              Icon={encounterValue === "res cogitans" ? IconFinalTravel : IconTravel}
              isMirrored={locationValue === "caravan"}
            />
          </Button>
        </span>
      </OverlayTrigger>
    );
  }
}
