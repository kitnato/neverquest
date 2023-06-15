import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { ReactComponent as IconLoot } from "@neverquest/icons/loot.svg";
import { isGameOver } from "@neverquest/state/character";
import { isStageCompleted } from "@neverquest/state/encounter";
import { hasLooted } from "@neverquest/state/resources";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function CollectLootButton() {
  const isGameOverValue = useRecoilValue(isGameOver);
  const hasLootedValue = useRecoilValue(hasLooted);
  const isStageCompletedValue = useRecoilValue(isStageCompleted);

  const transactResources = useTransactResources();

  if (hasLootedValue || !isStageCompletedValue) {
    return null;
  }

  return (
    <OverlayTrigger overlay={<Tooltip>Collect loot</Tooltip>}>
      <span className={getAnimationClass({ type: "bounceIn" })}>
        <Button
          className={`${getAnimationClass({ isInfinite: true, type: "pulse" })}`}
          disabled={isGameOverValue}
          onClick={() => transactResources({})}
          variant="outline-dark"
        >
          <IconImage Icon={IconLoot} />
        </Button>
      </span>
    </OverlayTrigger>
  );
}
