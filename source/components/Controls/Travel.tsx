import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { LABEL_UNKNOWN } from "@neverquest/data/general";
import { useToggleLocation } from "@neverquest/hooks/actions/useToggleLocation";
import IconFinalTravel from "@neverquest/icons/final-travel.svg?react";
import IconTravel from "@neverquest/icons/travel.svg?react";
import { hasFlatlined, isAttacking } from "@neverquest/state/character";
import { encounter, location } from "@neverquest/state/encounter";
import { encumbranceExtent } from "@neverquest/state/inventory";
import { hasLootedEssence } from "@neverquest/state/resources";
import { isShowing } from "@neverquest/state/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Travel() {
  const encounterValue = useRecoilValue(encounter);
  const encumbranceExtentValue = useRecoilValue(encumbranceExtent);
  const hasLootedEssenceValue = useRecoilValue(hasLootedEssence);
  const isAttackingValue = useRecoilValue(isAttacking);
  const hasFlatlinedValue = useRecoilValue(hasFlatlined);
  const isShowingLocation = useRecoilValue(isShowing("location"));
  const locationValue = useRecoilValue(location);

  const toggleLocation = useToggleLocation();

  // Occurs if the knapsack is sold and carrying more than the weight difference of its absence.
  const isOverEncumbered =
    locationValue === "caravan" && encumbranceExtentValue === "over-encumbered";

  if (encounterValue === "void" || hasLootedEssenceValue || locationValue === "caravan") {
    return (
      <OverlayTrigger
        overlay={
          <Tooltip>
            <span>
              {isOverEncumbered
                ? "Over-encumbered."
                : locationValue === "wilderness"
                  ? `Go to ${
                      !isShowingLocation || encounterValue === "res cogitans"
                        ? LABEL_UNKNOWN
                        : "caravan"
                    }`
                  : "Return to wilderness"}
            </span>
          </Tooltip>
        }
      >
        <div className={getAnimationClass({ animation: "bounceIn" })}>
          <Button
            className={
              !isAttackingValue && locationValue === "wilderness"
                ? getAnimationClass({ animation: "pulse", isInfinite: true })
                : undefined
            }
            disabled={isAttackingValue || hasFlatlinedValue || isOverEncumbered}
            onClick={toggleLocation}
            variant="outline-dark"
          >
            <IconImage
              Icon={encounterValue === "res cogitans" ? IconFinalTravel : IconTravel}
              isMirrored={locationValue === "caravan"}
            />
          </Button>
        </div>
      </OverlayTrigger>
    );
  }
}
