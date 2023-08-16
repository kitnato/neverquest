import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { useCollectLoot } from "@neverquest/hooks/actions/useCollectLoot";
import { ReactComponent as IconLoot } from "@neverquest/icons/loot.svg";
import { isGameOver } from "@neverquest/state/character";
import { isStageCompleted } from "@neverquest/state/encounter";
import { hasLooted, itemsLoot } from "@neverquest/state/resources";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function CollectLootButton() {
  const hasLootedValue = useRecoilValue(hasLooted);
  const isGameOverValue = useRecoilValue(isGameOver);
  const isStageCompletedValue = useRecoilValue(isStageCompleted);
  const itemsLootValue = useRecoilValue(itemsLoot);

  const gatherLoot = useCollectLoot();

  if ((hasLootedValue && itemsLootValue.length === 0) || !isStageCompletedValue) {
    return null;
  }

  return (
    <OverlayTrigger overlay={<Tooltip>Collect loot</Tooltip>}>
      <span className={getAnimationClass({ type: "bounceIn" })}>
        <Button
          className={
            !hasLootedValue
              ? `${getAnimationClass({ isInfinite: true, type: "pulse" })}`
              : undefined
          }
          disabled={isGameOverValue}
          onClick={gatherLoot}
          variant="outline-dark"
        >
          <IconImage Icon={IconLoot} />
        </Button>
      </span>
    </OverlayTrigger>
  );
}
