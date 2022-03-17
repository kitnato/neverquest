import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import ImageIcon from "neverquest/components/ImageIcon";
import { UIVariant } from "neverquest/env.d";
import icon from "neverquest/icons/open-treasure-chest.svg";
import { isLevelCompleted, show } from "neverquest/state/global";
import { hasLooted } from "neverquest/state/loot";

export default function CollectLootButton() {
  const [hasLootedValue, loot] = useRecoilState(hasLooted);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const setShow = useSetRecoilState(show);

  const handleCollect = () => {
    setShow((currentShow) => ({ ...currentShow, inventory: true }));
    loot(true);
  };

  if (!isLevelCompletedValue) {
    return null;
  }

  return (
    <OverlayTrigger overlay={<Tooltip>Collect loot</Tooltip>} placement="top">
      <Button
        className={hasLootedValue ? "d-none" : undefined}
        onClick={handleCollect}
        variant={UIVariant.Outline}
      >
        <ImageIcon icon={icon} />
      </Button>
    </OverlayTrigger>
  );
}
