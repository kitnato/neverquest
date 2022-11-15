import { MouseEvent } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import ImageIcon from "@neverquest/components/IconImage";
import { UNKNOWN } from "@neverquest/constants";
import useSwitchLocation from "@neverquest/hooks/actions/useSwitchLocation";
import { ReactComponent as Icon } from "@neverquest/icons/journey.svg";
import { isWilderness, level } from "@neverquest/state/encounter";
import { hasLooted } from "@neverquest/state/resources";
import { AnimationType, UIVariant } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function ({ isDisabled }: { isDisabled: boolean }) {
  const isWildernessValue = useRecoilValue(isWilderness);
  const hasLootedValue = useRecoilValue(hasLooted);
  const levelValue = useRecoilValue(level);

  const switchLocation = useSwitchLocation();

  const destination = (() => {
    if (levelValue === 1 && isWildernessValue) {
      return UNKNOWN;
    }

    return isWildernessValue ? "Caravan" : "Wilderness";
  })();

  if (!hasLootedValue) {
    return null;
  }

  return (
    <OverlayTrigger
      overlay={<Tooltip>{`${isWildernessValue ? "Go to" : "Return to"} ${destination}`}</Tooltip>}
      placement="top"
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
    </OverlayTrigger>
  );
}
