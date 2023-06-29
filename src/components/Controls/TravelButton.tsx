import { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ConfirmationDialog } from "@neverquest/components/ConfirmationDialog";
import { IconImage } from "@neverquest/components/IconImage";
import { useToggleLocation } from "@neverquest/hooks/actions/useToggleLocation";
import { ReactComponent as IconTravel } from "@neverquest/icons/travel.svg";
import { hasBoughtFromMerchant } from "@neverquest/state/caravan";
import { isGameOver } from "@neverquest/state/character";
import { isStageCompleted, isWilderness, stageMaximum } from "@neverquest/state/encounter";
import { hasLooted } from "@neverquest/state/resources";
import { confirmationWarnings } from "@neverquest/state/settings";
import { LABEL_UNKNOWN } from "@neverquest/utilities/constants";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function TravelButton() {
  const confirmationWarningsValue = useRecoilValue(confirmationWarnings);
  const hasBoughtFromMerchantValue = useRecoilValue(hasBoughtFromMerchant);
  const hasLootedValue = useRecoilValue(hasLooted);
  const isGameOverValue = useRecoilValue(isGameOver);
  const isStageCompletedValue = useRecoilValue(isStageCompleted);
  const isWildernessValue = useRecoilValue(isWilderness);
  const stageMaximumValue = useRecoilValue(stageMaximum);

  const toggleLocation = useToggleLocation();

  const [showTravelConfirmation, setShowTravelConfirmation] = useState(false);

  const handleTravel = () => {
    if (
      confirmationWarningsValue &&
      !hasBoughtFromMerchantValue &&
      !isWildernessValue &&
      stageMaximumValue <= 3
    ) {
      setShowTravelConfirmation(true);
    } else {
      toggleLocation();
    }
  };

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
        <span className={getAnimationClass({ type: "bounceIn" })}>
          <Button
            className={
              isWildernessValue ? getAnimationClass({ isInfinite: true, type: "pulse" }) : undefined
            }
            disabled={isGameOverValue}
            onClick={handleTravel}
            variant="outline-dark"
          >
            <IconImage Icon={IconTravel} isMirrored={!isWildernessValue} />
          </Button>
        </span>
      </OverlayTrigger>

      <ConfirmationDialog
        confirmationLabel="Travel anyway"
        message="Questing will be significantly harder without proper gear."
        onConfirm={toggleLocation}
        setHide={() => setShowTravelConfirmation(false)}
        show={showTravelConfirmation}
        title="Nothing purchased from merchant!"
      />
    </>
  );
}
