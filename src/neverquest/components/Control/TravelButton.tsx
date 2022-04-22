import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { UIVariant } from "neverquest/env";
import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/journey.svg";
import { isWilderness, level, location } from "neverquest/state/global";
import { hasLooted } from "neverquest/state/loot";
import { UNKNOWN } from "neverquest/utilities/constants";

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

  return (
    <OverlayTrigger
      overlay={<Tooltip>{`${isWildernessValue ? "Go to" : "Return to"} ${destination}`}</Tooltip>}
      placement="top"
    >
      <Button
        className={hasLootedValue ? undefined : "d-none"}
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
