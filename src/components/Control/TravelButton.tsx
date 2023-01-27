import { MouseEvent } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { LABEL_UNKNOWN } from "@neverquest/constants";
import { useSwitchLocation } from "@neverquest/hooks/actions/useSwitchLocation";
import { ReactComponent as Icon } from "@neverquest/icons/journey.svg";
import { isLevelCompleted, isWilderness, level } from "@neverquest/state/encounter";
import { hasLooted } from "@neverquest/state/resources";
import { AnimationType, UIVariant } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function TravelButton({ isDisabled }: { isDisabled: boolean }) {
  const hasLootedValue = useRecoilValue(hasLooted);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const isWildernessValue = useRecoilValue(isWilderness);
  const levelValue = useRecoilValue(level);

  const switchLocation = useSwitchLocation();

  if (!(hasLootedValue && isLevelCompletedValue) && isWildernessValue) {
    return null;
  }

  return (
    <OverlayTrigger
      overlay={
        <Tooltip>{`${isWildernessValue ? "Go to" : "Return to"} ${
          levelValue === 1 && isWildernessValue
            ? LABEL_UNKNOWN
            : isWildernessValue
            ? "Caravan"
            : "Wilderness"
        }`}</Tooltip>
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
          onClick={({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
            currentTarget.blur();

            switchLocation();
          }}
          variant={UIVariant.Outline}
        >
          <IconImage Icon={Icon} isFlipped={!isWildernessValue} />
        </Button>
      </span>
    </OverlayTrigger>
  );
}
