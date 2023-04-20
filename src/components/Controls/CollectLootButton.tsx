import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { ReactComponent as IconChest } from "@neverquest/icons/locked-chest.svg";
import { isLevelCompleted } from "@neverquest/state/encounter";
import { hasLooted } from "@neverquest/state/resources";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function CollectLootButton({ isDisabled }: { isDisabled: boolean }) {
  const hasLootedValue = useRecoilValue(hasLooted);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);

  const transactResources = useTransactResources();

  if (hasLootedValue || !isLevelCompletedValue) {
    return null;
  }

  return (
    <OverlayTrigger overlay={<Tooltip>Collect loot</Tooltip>} placement="top">
      <span
        className={`d-inline-block ${getAnimationClass({
          type: "bounceIn",
        })}`}
      >
        <Button
          className={`${getAnimationClass({ isInfinite: true, type: "pulse" })}`}
          disabled={isDisabled}
          onClick={() => transactResources({})}
          variant="outline-dark"
        >
          <IconImage Icon={IconChest} />
        </Button>
      </span>
    </OverlayTrigger>
  );
}
