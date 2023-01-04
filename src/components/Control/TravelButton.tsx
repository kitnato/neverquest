import { MouseEvent } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import ImageIcon from "@neverquest/components/IconImage";
import { UNKNOWN } from "@neverquest/constants";
import useSwitchLocation from "@neverquest/hooks/actions/useSwitchLocation";
import { ReactComponent as Icon } from "@neverquest/icons/journey.svg";
import { isLevelCompleted, isWilderness, level } from "@neverquest/state/encounter";
import { hasLooted } from "@neverquest/state/resources";
import { AnimationType, UIVariant } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export default function ({ isDisabled }: { isDisabled: boolean }) {
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const isWildernessValue = useRecoilValue(isWilderness);
  const hasLootedValue = useRecoilValue(hasLooted);
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
            ? UNKNOWN
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
              : ""
          }
          disabled={isDisabled}
          onClick={({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
            currentTarget.blur();

            switchLocation();
          }}
          variant={UIVariant.Outline}
        >
          <ImageIcon Icon={Icon} isFlipped={!isWildernessValue} />
        </Button>
      </span>
    </OverlayTrigger>
  );
}
