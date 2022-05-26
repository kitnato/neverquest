import { useAtomValue } from "jotai";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import ImageIcon from "neverquest/components/ImageIcon";
import useResource from "neverquest/hooks/useResource";
import icon from "neverquest/icons/open-treasure-chest.svg";
import { isLevelCompleted } from "neverquest/state/global";
import { hasLooted } from "neverquest/state/resources";
import { AnimationType, UIVariant } from "neverquest/types/ui";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function CollectLootButton() {
  const loot = useResource();
  const hasLootedValue = useAtomValue(hasLooted);
  const isLevelCompletedValue = useAtomValue(isLevelCompleted);

  if (hasLootedValue || !isLevelCompletedValue) {
    return null;
  }

  return (
    <OverlayTrigger overlay={<Tooltip>Collect loot</Tooltip>} placement="top">
      <Button
        className={getAnimationClass(AnimationType.FlipInX)}
        onClick={() => loot({})}
        variant={UIVariant.Outline}
      >
        <ImageIcon icon={icon} />
      </Button>
    </OverlayTrigger>
  );
}
