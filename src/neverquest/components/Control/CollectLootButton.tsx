import { useRecoilValue } from "recoil";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import ImageIcon from "neverquest/components/ImageIcon";
import { UIAnimationType, UIVariant } from "neverquest/env";
import useReserve from "neverquest/hooks/useReserve";
import icon from "neverquest/icons/open-treasure-chest.svg";
import { isLevelCompleted } from "neverquest/state/global";
import { hasLooted } from "neverquest/state/loot";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function CollectLootButton() {
  const loot = useReserve();
  const hasLootedValue = useRecoilValue(hasLooted);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);

  if (hasLootedValue || !isLevelCompletedValue) {
    return null;
  }

  return (
    <OverlayTrigger overlay={<Tooltip>Collect loot</Tooltip>} placement="top">
      <Button
        className={getAnimationClass(UIAnimationType.FlipInX)}
        onClick={() => loot({})}
        variant={UIVariant.Outline}
      >
        <ImageIcon icon={icon} />
      </Button>
    </OverlayTrigger>
  );
}
