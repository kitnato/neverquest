import { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ConfirmationDialog } from "@neverquest/components/ConfirmationDialog";
import { IconImage } from "@neverquest/components/IconImage";
import { LABEL_UNKNOWN } from "@neverquest/data/constants";
import { useToggleLocation } from "@neverquest/hooks/actions/useToggleLocation";
import { ReactComponent as IconTravel } from "@neverquest/icons/travel.svg";
import { hasBoughtFromMerchant } from "@neverquest/state/caravan";
import { isGameOver } from "@neverquest/state/character";
import { isLevelCompleted, isWilderness, maximumLevel } from "@neverquest/state/encounter";
import { hasLooted } from "@neverquest/state/resources";
import { confirmControlWarnings } from "@neverquest/state/settings";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function TravelButton() {
  const confirmControlWarningsValue = useRecoilValue(confirmControlWarnings);
  const hasBoughtFromMerchantValue = useRecoilValue(hasBoughtFromMerchant);
  const hasLootedValue = useRecoilValue(hasLooted);
  const isGameOverValue = useRecoilValue(isGameOver);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const isWildernessValue = useRecoilValue(isWilderness);
  const maximumLevelValue = useRecoilValue(maximumLevel);

  const toggleLocation = useToggleLocation();

  const [showTravelConfirmation, setShowTravelConfirmation] = useState(false);

  const handleTravel = () => {
    if (
      confirmControlWarningsValue &&
      !hasBoughtFromMerchantValue &&
      !isWildernessValue &&
      maximumLevelValue <= 3
    ) {
      setShowTravelConfirmation(true);
    } else {
      toggleLocation();
    }
  };

  if (!(hasLootedValue && isLevelCompletedValue) && isWildernessValue) {
    return null;
  }

  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip>
            {`${isWildernessValue ? "Go to" : "Return to"} ${
              maximumLevelValue === 1 && isWildernessValue
                ? LABEL_UNKNOWN
                : isWildernessValue
                ? "Caravan"
                : "Wilderness"
            }`}
          </Tooltip>
        }
      >
        <span
          className={`d-inline-block ${getAnimationClass({
            type: "bounceIn",
          })}`}
        >
          <Button
            className={
              isWildernessValue ? getAnimationClass({ isInfinite: true, type: "pulse" }) : undefined
            }
            disabled={isGameOverValue}
            onClick={handleTravel}
            variant="outline-dark"
          >
            <IconImage Icon={IconTravel} isFlipped={!isWildernessValue} />
          </Button>
        </span>
      </OverlayTrigger>

      <ConfirmationDialog
        confirmationLabel="Travel anyway"
        message="Adventuring will be significantly harder without proper gear."
        onConfirm={toggleLocation}
        setHide={() => setShowTravelConfirmation(false)}
        show={showTravelConfirmation}
        title="Nothing purchased from merchant!"
      />
    </>
  );
}
