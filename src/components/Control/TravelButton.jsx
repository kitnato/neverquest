import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useRecoilValue, useSetRecoilState } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/journey.svg";
import { isWilderness, level, location } from "state/global";
import { hasLooted } from "state/loot";
import { MODE_CARAVAN, MODE_WILDERNESS } from "utilities/constants";

export default function TravelButton() {
  const isWildernessValue = useRecoilValue(isWilderness);
  const hasLootedValue = useRecoilValue(hasLooted);
  const levelValue = useRecoilValue(level);
  const changeLocation = useSetRecoilState(location);

  const destination = (() => {
    if (levelValue === 1 && isWildernessValue) {
      return "???";
    }

    return isWildernessValue ? MODE_CARAVAN : MODE_WILDERNESS;
  })();

  return (
    <OverlayTrigger
      overlay={
        <Tooltip>
          {`${isWildernessValue ? "Go to" : "Return to"} ${destination}`}
        </Tooltip>
      }
      placement="top"
    >
      <Button
        className={!hasLootedValue && "d-none"}
        onClick={changeLocation}
        variant="outline-dark"
      >
        <ImageIcon icon={icon} />
      </Button>
    </OverlayTrigger>
  );
}
