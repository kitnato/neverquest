import { useRecoilValue } from "recoil";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import ImageIcon from "neverquest/components/ImageIcon";
import { UIVariant } from "neverquest/env";
import useLoot from "neverquest/hooks/useLoot";
import icon from "neverquest/icons/open-treasure-chest.svg";
import { isLevelCompleted } from "neverquest/state/global";
import { hasLooted } from "neverquest/state/loot";

export default function CollectLootButton() {
  const loot = useLoot();
  const hasLootedValue = useRecoilValue(hasLooted);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);

  if (!isLevelCompletedValue) {
    return null;
  }

  return (
    <OverlayTrigger overlay={<Tooltip>Collect loot</Tooltip>} placement="top">
      <Button
        className={hasLootedValue ? "d-none" : undefined}
        onClick={() => loot({})}
        variant={UIVariant.Outline}
      >
        <ImageIcon icon={icon} />
      </Button>
    </OverlayTrigger>
  );
}
