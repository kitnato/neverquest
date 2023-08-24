import { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ConfirmationDialog } from "@neverquest/components/ConfirmationDialog";
import { IconImage } from "@neverquest/components/IconImage";
import { CREW } from "@neverquest/data/caravan";
import { useToggleLocation } from "@neverquest/hooks/actions/useToggleLocation";
import { ReactComponent as IconTravel } from "@neverquest/icons/travel.svg";
import { hasBoughtFromMerchant } from "@neverquest/state/caravan";
import { isGameOver } from "@neverquest/state/character";
import { isStageCompleted, isWilderness, stageMaximum } from "@neverquest/state/encounter";
import { isInventoryFull } from "@neverquest/state/inventory";
import { hasLooted } from "@neverquest/state/resources";
import { confirmationWarnings } from "@neverquest/state/settings";
import { LABEL_UNKNOWN } from "@neverquest/utilities/constants";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function TravelButton() {
  const confirmationWarningsValue = useRecoilValue(confirmationWarnings);
  const hasBoughtFromMerchantValue = useRecoilValue(hasBoughtFromMerchant);
  const hasLootedValue = useRecoilValue(hasLooted);
  const isGameOverValue = useRecoilValue(isGameOver);
  const isInventoryFullValue = useRecoilValue(isInventoryFull);
  const isStageCompletedValue = useRecoilValue(isStageCompleted);
  const isWildernessValue = useRecoilValue(isWilderness);
  const stageMaximumValue = useRecoilValue(stageMaximum);

  const toggleLocation = useToggleLocation();

  const [showPurchaseConfirmation, setShowPurchaseConfirmation] = useState(false);
  const [showOverburdenedConfirmation, setShowOverburdenedConfirmation] = useState(false);

  const handleTravel = () => {
    if (confirmationWarningsValue && !isWildernessValue) {
      if (!hasBoughtFromMerchantValue && stageMaximumValue <= 3) {
        setShowPurchaseConfirmation(true);
        return;
      }

      if (isInventoryFullValue && stageMaximumValue >= CREW.tailor.requiredStage) {
        setShowOverburdenedConfirmation(true);
        return;
      }
    }

    toggleLocation();
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
        setHidden={() => setShowPurchaseConfirmation(false)}
        show={showPurchaseConfirmation}
        title="Nothing purchased from merchant!"
      />

      <ConfirmationDialog
        confirmationLabel="Travel anyway"
        message="Gathering weighty items in the wilderness will be tricky."
        onConfirm={toggleLocation}
        setHidden={() => setShowOverburdenedConfirmation(false)}
        show={showOverburdenedConfirmation}
        title="Overburdened!"
      />
    </>
  );
}
