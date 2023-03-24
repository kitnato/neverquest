import { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ConfirmationDialog } from "@neverquest/components/ConfirmationDialog";
import { IconImage } from "@neverquest/components/IconImage";
import { LABEL_UNKNOWN } from "@neverquest/constants";
import { useToggleLocation } from "@neverquest/hooks/actions/useToggleLocation";
import { ReactComponent as IconTravel } from "@neverquest/icons/journey.svg";
import { hasBoughtFromMerchant } from "@neverquest/state/caravan";
import { isLevelCompleted, isWilderness, level } from "@neverquest/state/encounter";
import { hasLooted } from "@neverquest/state/resources";
import { AnimationType, UIVariant } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function TravelButton({ isDisabled }: { isDisabled: boolean }) {
  const hasBoughtFromMerchantValue = useRecoilValue(hasBoughtFromMerchant);
  const hasLootedValue = useRecoilValue(hasLooted);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const isWildernessValue = useRecoilValue(isWilderness);
  const levelValue = useRecoilValue(level);

  const toggleLocation = useToggleLocation();

  const [showTravelConfirmation, setShowTravelConfirmation] = useState(false);

  if (!(hasLootedValue && isLevelCompletedValue) && isWildernessValue) {
    return null;
  }

  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip>
            {`${isWildernessValue ? "Go to" : "Return to"} ${
              levelValue === 1 && isWildernessValue
                ? LABEL_UNKNOWN
                : isWildernessValue
                ? "Caravan"
                : "Wilderness"
            }`}
          </Tooltip>
        }
        placement="top"
      >
        <span
          className={`d-inline-block ${getAnimationClass({
            type: AnimationType.BounceIn,
          })}`}
        >
          <Button
            className={
              isWildernessValue
                ? getAnimationClass({ isInfinite: true, type: AnimationType.Pulse })
                : undefined
            }
            disabled={isDisabled}
            onClick={() => {
              if (!hasBoughtFromMerchantValue && !isWildernessValue && levelValue <= 3) {
                setShowTravelConfirmation(true);
              } else {
                toggleLocation();
              }
            }}
            variant={UIVariant.Outline}
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
