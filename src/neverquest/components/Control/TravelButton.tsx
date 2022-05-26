import { MouseEvent } from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useAtomValue, useSetAtom } from "jotai";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/journey.svg";
import { isWilderness, level, location } from "neverquest/state/global";
import { hasLooted } from "neverquest/state/resources";
import { AnimationType, UIVariant } from "neverquest/types/ui";
import { UNKNOWN } from "neverquest/utilities/constants";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function TravelButton() {
  const isWildernessValue = useAtomValue(isWilderness);
  const hasLootedValue = useAtomValue(hasLooted);
  const levelValue = useAtomValue(level);
  const switchLocation = useSetAtom(location);

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
        className={isWildernessValue ? getAnimationClass(AnimationType.Pulse, true) : ""}
        onClick={(event: MouseEvent<HTMLButtonElement>) => {
          switchLocation("");
          event.currentTarget.blur();
        }}
        variant={UIVariant.Outline}
      >
        <ImageIcon icon={icon} flipped={!isWildernessValue} />
      </Button>
    </OverlayTrigger>
  );
}
