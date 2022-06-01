import { useAtomValue, useSetAtom } from "jotai";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/locked-chest.svg";
import { isLevelCompleted } from "neverquest/state/global";
import { hasLooted, resourcesBalance } from "neverquest/state/resources";
import { AnimationType, UIVariant } from "neverquest/types/ui";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function CollectLootButton() {
  const hasLootedValue = useAtomValue(hasLooted);
  const isLevelCompletedValue = useAtomValue(isLevelCompleted);
  const balanceResources = useSetAtom(resourcesBalance);

  if (hasLootedValue || !isLevelCompletedValue) {
    return null;
  }

  return (
    <OverlayTrigger overlay={<Tooltip>Collect loot</Tooltip>} placement="top">
      <Button
        className={getAnimationClass(AnimationType.FlipInX)}
        onClick={() => balanceResources({})}
        variant={UIVariant.Outline}
      >
        <ImageIcon icon={icon} />
      </Button>
    </OverlayTrigger>
  );
}
