import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import IconImage from "@neverquest/components/IconImage";
import { ReactComponent as Icon } from "@neverquest/icons/locked-chest.svg";
import { isLevelCompleted } from "@neverquest/state/encounter";
import { hasLooted } from "@neverquest/state/resources";
import { resourcesBalance } from "@neverquest/state/transactions/possessions";
import { AnimationType, UIVariant } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function ({ isDisabled }: { isDisabled: boolean }) {
  const hasLootedValue = useRecoilValue(hasLooted);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const balanceResources = useSetRecoilState(resourcesBalance);

  if (hasLootedValue || !isLevelCompletedValue) {
    return null;
  }

  return (
    <OverlayTrigger overlay={<Tooltip>Collect loot</Tooltip>} placement="top">
      <Button
        className={getAnimationClass({ type: AnimationType.FlipInX })}
        disabled={isDisabled}
        onClick={() => balanceResources({})}
        variant={UIVariant.Outline}
      >
        <IconImage Icon={Icon} />
      </Button>
    </OverlayTrigger>
  );
}
