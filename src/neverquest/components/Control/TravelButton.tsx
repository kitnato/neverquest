import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useRecoilValue, useSetRecoilState } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/journey.svg";
import { isWilderness, level, location } from "neverquest/state/global";
import { hasLooted } from "neverquest/state/loot";
import { AnimationType, UIVariant } from "neverquest/types/ui";
import { UNKNOWN } from "neverquest/utilities/constants";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function TravelButton() {
  const isWildernessValue = useRecoilValue(isWilderness);
  const hasLootedValue = useRecoilValue(hasLooted);
  const levelValue = useRecoilValue(level);
  const switchLocation = useSetRecoilState(location);

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
        onClick={(event) => {
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
